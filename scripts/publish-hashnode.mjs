import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const endpoint = "https://gql.hashnode.com";
const token = process.env.HASHNODE_TOKEN || "";
const host = process.env.HASHNODE_HOST || "";

function eventName() {
  return process.env.GITHUB_EVENT_NAME || "";
}

function parseScalar(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  return trimmed;
}

function parsePost(file) {
  const raw = readFileSync(file, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;

  const data = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    data[line.slice(0, separator).trim()] = parseScalar(line.slice(separator + 1));
  }

  return {
    data,
    content: match[2].trimStart(),
  };
}

function readEvent() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath || !existsSync(eventPath)) return {};
  return JSON.parse(readFileSync(eventPath, "utf8"));
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function rootMarkdownFilesFromInput() {
  const explicit = process.env.HASHNODE_FILES || "";
  if (explicit.trim()) {
    return explicit
      .split(",")
      .map((file) => file.trim())
      .filter(Boolean);
  }

  const event = readEvent();
  if (eventName() === "workflow_dispatch" || !event.before || /^0+$/.test(event.before)) {
    return git(["ls-files", "*.md"]).split("\n").filter(Boolean);
  }

  return git(["diff", "--name-only", "--diff-filter=AM", event.before, event.after || "HEAD", "--", "*.md"])
    .split("\n")
    .filter(Boolean);
}

function shouldConsider(file) {
  return path.dirname(file) === "." && file.endsWith(".md") && file !== "README.md";
}

async function callHashnode(query, variables) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();
  if (!response.ok || result.errors) {
    const message = result.errors?.map((error) => error.message).join("; ") || response.statusText;
    throw new Error(message);
  }
  return result.data;
}

async function publicationId() {
  const data = await callHashnode(
    `query Publication($host: String!) {
      publication(host: $host) {
        id
      }
    }`,
    { host },
  );

  if (!data.publication?.id) throw new Error(`Hashnode publication not found for ${host}`);
  return data.publication.id;
}

async function postBySlug(publication, slug) {
  const data = await callHashnode(
    `query PostBySlug($publication: ObjectId, $slug: String!) {
      publication(id: $publication) {
        post(slug: $slug) {
          id
          slug
          title
          url
        }
      }
    }`,
    { publication, slug },
  );
  return data.publication?.post || null;
}

function compact(input) {
  return JSON.parse(JSON.stringify(input));
}

function publishInput(parsed, publication) {
  const data = parsed.data;
  return compact({
    publicationId: publication,
    title: data.title,
    subtitle: data.subtitle || undefined,
    slug: data.slug,
    contentMarkdown: parsed.content,
    originalArticleURL: data.canonical || undefined,
    disableComments: data.disableComments === true,
    metaTags: {
      title: data.seoTitle || data.title,
      description: data.seoDescription || data.subtitle || undefined,
      image: data.ogImage || undefined,
    },
    settings: {
      enableTableOfContent: data.enableToc === true,
      delisted: data.hideFromHashnodeCommunity === true,
    },
  });
}

function updateInput(parsed, existing, publication) {
  const data = parsed.data;
  return compact({
    id: existing.id,
    publicationId: publication,
    title: data.title,
    subtitle: data.subtitle || undefined,
    slug: data.slug,
    contentMarkdown: parsed.content,
    originalArticleUrl: data.canonical || undefined,
    metaTags: {
      title: data.seoTitle || data.title,
      description: data.seoDescription || data.subtitle || undefined,
      image: data.ogImage || undefined,
    },
    settings: {
      isTableOfContentEnabled: data.enableToc === true,
      delisted: data.hideFromHashnodeCommunity === true,
      disableComments: data.disableComments === true,
    },
  });
}

async function publish(parsed, publication) {
  return callHashnode(
    `mutation PublishPost($input: PublishPostInput!) {
      publishPost(input: $input) {
        post {
          id
          slug
          title
          url
        }
      }
    }`,
    { input: publishInput(parsed, publication) },
  );
}

async function update(parsed, existing, publication) {
  return callHashnode(
    `mutation UpdatePost($input: UpdatePostInput!) {
      updatePost(input: $input) {
        post {
          id
          slug
          title
          url
        }
      }
    }`,
    { input: updateInput(parsed, existing, publication) },
  );
}

async function main() {
  if (!host) throw new Error("HASHNODE_HOST is required");

  if (!token) {
    console.log("::warning::HASHNODE_TOKEN secret is not configured. Skipping Hashnode publication.");
    return;
  }

  const files = rootMarkdownFilesFromInput().filter(shouldConsider);
  if (!files.length) {
    console.log("No root Markdown posts changed.");
    return;
  }

  const publication = await publicationId();

  for (const file of files) {
    const parsed = parsePost(file);
    if (!parsed) {
      console.log(`Skipping ${file}: no YAML frontmatter.`);
      continue;
    }
    if (parsed.data.ignorePost === true || parsed.data.saveAsDraft === true) {
      console.log(`Skipping ${file}: draft or ignored.`);
      continue;
    }
    if (parsed.data.domain && parsed.data.domain !== host) {
      console.log(`Skipping ${file}: domain ${parsed.data.domain} does not match ${host}.`);
      continue;
    }
    if (!parsed.data.title || !parsed.data.slug) {
      throw new Error(`${file} must define title and slug in frontmatter`);
    }

    const existing = await postBySlug(publication, parsed.data.slug);
    if (existing) {
      const result = await update(parsed, existing, publication);
      console.log(`Updated ${file}: ${result.updatePost.post.url || result.updatePost.post.slug}`);
    } else {
      const result = await publish(parsed, publication);
      console.log(`Published ${file}: ${result.publishPost.post.url}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
