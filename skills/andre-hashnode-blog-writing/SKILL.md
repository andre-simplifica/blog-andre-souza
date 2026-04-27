---
name: andre-hashnode-blog-writing
description: Write, revise, and polish Andre Souza's English Hashnode blog posts about Oracle APEX, PL/SQL, OCI, Codex, AI-assisted development, GitHub workflows, and SaaS/product engineering. Use when creating new content, turning Portuguese notes into publishable English, improving a draft, or checking whether a post is ready for Hashnode.
---

# Andre Hashnode Blog Writing

## Purpose

Use this skill to create public, useful, technically credible blog content from real work without exposing private project details.

This blog should help experienced developers understand practical Oracle APEX, PL/SQL, OCI, Codex, GitHub, AI-assisted development, and SaaS/product engineering workflows. It is not a private work log, support notebook, or place to publish customer-specific implementation details.

## Use This Skill When

- Creating a new canonical date-prefixed Markdown post in the blog repository.
- Turning rough notes, Portuguese instructions, screenshots, or repo evidence into an English article.
- Revising or polishing an existing draft before publishing.
- Checking whether a post has enough context, structure, specificity, and Hashnode-ready metadata.

For publishing mechanics, also follow the repository `AGENTS.md` and `docs/publishing-workflow.md`.

## Voice

Write in natural, confident American English.

The voice should sound like an experienced engineer and founder sharing practical work from real Oracle APEX, PL/SQL, OCI, Codex, GitHub, and SaaS/product delivery. It should be direct, specific, and useful to other developers.

Prefer:

- Practical field notes over broad thought leadership.
- Concrete workflow, tradeoff, and validation detail over generic advice.
- Measured confidence over hype.
- First-person experience when the source material supports it.
- Short paragraphs and clear transitions.
- Clear opinions grounded in evidence, not motivational language.

Avoid:

- Mechanical translation from Portuguese.
- Generic AI tone, inflated claims, or filler.
- Invented examples, metrics, business rules, timelines, tools, APIs, or production facts.
- Corporate jargon unless it is the actual term used in the domain.
- Posts that only make sense to readers who already know the full background.

## Public Safety

The user controls the ideas. Do not add claims that are not supported by the user's notes, repository evidence, runtime evidence, screenshots, or explicit direction.

If a useful point is missing, either leave a placeholder in a draft note or ask for the missing fact. Do not fill gaps with "typical" Oracle/APEX behavior.

Before publishing or committing public content, check for:

- Secrets, tokens, credentials, cookies, authorization headers, wallets, connection strings, private keys, or API keys.
- Private hostnames, internal URLs, local-only endpoints, database service names, workspace names, schema names, or customer identifiers.
- Production payloads, logs, stack traces, screenshots, or error messages that expose private data.
- Customer names, employee names, financial data, commercial data, support tickets, or operational incidents that were not explicitly intended for publication.
- Business rules, implementation details, or examples copied from a private application when a generic version would be enough.

If a concrete example is valuable but too specific, generalize it. Keep the technical lesson while removing private identifiers.

For technical articles:

- Verify names of repositories, packages, workflows, files, pages, tools, and commands before using them as facts.
- Explain business or operational constraints only when they are present in the source context.
- Treat production-safety claims carefully. Say what the workflow does, what it checks, and what still needs human review.

## Article Structure

Use this structure as a default, not as a rigid template:

1. Strong opening: a real problem, a practical observation, or a concise statement of why the topic matters now.
2. Short setup: give the reader the minimum context needed to follow the article.
3. Standalone takeaway: early in the post, make clear what the reader will learn or be able to evaluate.
4. Body sections: use descriptive H2/H3 headings that move the argument forward.
5. Concrete examples: include commands, repo paths, workflow steps, screenshots, or decision points when they make the article more useful.
6. Practical close: end with what readers can apply, inspect, try, or question in their own work.

Use TL;DR bullets only when the post is long enough to benefit from them. Keep them standalone and understandable to a cold reader.

## Reader Context

Write for Oracle APEX developers, PL/SQL developers, OCI users, AI-assisted development practitioners, and technical entrepreneurs building real software.

Introduce terms before relying on them. For example, if a post uses "skills", "SQLcl exports", "Page Designer", "MCP", "Codex", or "APEX readable export", define the term briefly the first time it matters.

For series posts, include one or two sentences of prior context. Do not assume the reader read the earlier article.

## Drafting Rules

- Start from the canonical date-prefixed Markdown file when one already exists.
- Treat Hashnode `cuid` files as backups, not the primary editing source.
- Keep public posts in English, even when source notes are in Portuguese.
- Keep draft notes inside HTML comments only when they are useful and safe to publish in the public repository.
- Remove placeholders, private reminders, and unresolved internal notes before setting `saveAsDraft: false`.
- Use screenshots only when the source image is safe for a public repository and public article.

## Hashnode Markdown

Keep Markdown simple and Hashnode-friendly:

- One H1 matching the article title.
- Clear H2/H3 headings.
- Short paragraphs, usually one to three sentences.
- Simple bullets or numbered lists when they improve scanning.
- Code fences with language tags for commands, SQL, PL/SQL, JavaScript, YAML, or Markdown.
- Screenshots and assets stored under `assets/` when provided by the user.

Keep frontmatter valid and use this baseline:

```yaml
---
title: "Clear, specific title"
slug: "clear-specific-slug"
tags: codex, oracle-apex, plsql, ai, developer-tools
domain: andre-souza.hashnode.dev
subtitle: "Short reader-facing promise."
seoTitle: "Search-friendly title"
seoDescription: "Specific 140-160 character description."
enableToc: true
saveAsDraft: true
---
```

Use `saveAsDraft: false` only when the user explicitly wants the post published or updated publicly.

## Quality Checklist

Before considering a draft ready, verify:

- The first 25% is understandable without external context.
- The article states the practical problem or value early.
- Technical terms are introduced before they are used as load-bearing concepts.
- Claims are backed by user notes, repo evidence, screenshots, runtime evidence, or linked sources.
- The post contains enough concrete detail to be useful to experienced developers.
- The tone is human, direct, and specific, without generic AI phrasing.
- Paragraphs and headings are easy to scan on mobile.
- Frontmatter is valid and points to `andre-souza.hashnode.dev`.
- Canonical edits are in a date-prefixed Markdown file, not a Hashnode `cuid` backup file.
- Public-safety review found no secrets, private URLs, customer data, private logs, or internal-only implementation details.
- If publishing, `saveAsDraft: false` is intentional and requested.
