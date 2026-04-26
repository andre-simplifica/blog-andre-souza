# Publishing Workflow

This repository keeps the blog source in GitHub and uses Hashnode as the publishing channel.

## Drafting

1. Draft or update Markdown posts in this repository.
2. Keep publishable Hashnode posts as `.md` files in the repository root.
3. Write public posts in English, even when the source notes are in Portuguese.
4. Use natural, confident American English. Avoid mechanical translations, generic AI phrasing, hype, and filler.
5. Commit and push only the files related to the current blog task.

## Hashnode Frontmatter

Use frontmatter like this for each post:

```yaml
---
title: "Post title"
slug: "post-slug"
tags: codex, oracle-apex, plsql
domain: andre-souza.hashnode.dev
subtitle: "Short reader-facing promise."
seoTitle: "Search-friendly title"
seoDescription: "Specific 140-160 character description."
enableToc: true
saveAsDraft: true
---
```

Set `saveAsDraft: false` only when the post is ready to publish.

## GitHub And Hashnode

The desired flow is:

1. Codex creates or updates the Markdown post locally.
2. The change is committed and pushed to GitHub.
3. Hashnode imports or publishes the changed Markdown file from GitHub.

Current Hashnode publication domain: `andre-souza.hashnode.dev`.

If the Hashnode dashboard does not expose "Publish from GitHub" for this publication, do not publish through the visual editor as the default workflow. Keep GitHub as the source of truth and use either Hashnode's supported GitHub publishing flow or an API-based automation once configured.

## Images

Store screenshots and illustrations in `assets/`.

For Hashnode cover images, upload the image to Hashnode's CDN first and use the returned URL in `cover`.

For inline screenshots, prefer stable URLs after publication. During drafting, keep the source image in `assets/` and replace local placeholders with final URLs before publishing if Hashnode requires CDN-hosted images.

## Initial Editorial Queue

1. `2026-04-26-building-oracle-apex-ai-skills.md`
2. `2026-04-26-using-codex-with-apex-ai-skills.md`
