# Andre Souza Blog

Source repository for Hashnode posts.

## Publishing Flow

1. Draft or update Markdown posts in this repository.
2. Keep publishable Hashnode posts as `.md` files in the repository root.
3. Commit and push to GitHub.
4. Hashnode's GitHub integration imports the changed Markdown files.
5. Use `saveAsDraft: true` while drafting; remove it or set it to `false` when the post is ready to publish.

## Hashnode Setup

Install the Hashnode GitHub app on this repository and enable "Publish from GitHub" in the Hashnode dashboard.

Required frontmatter for each post:

```yaml
---
title: "Post title"
slug: "post-slug"
tags: codex, oracle-apex, plsql
domain: your-domain.hashnode.dev
saveAsDraft: true
---
```

Update `domain` after the Hashnode publication domain is confirmed.

## Images

Store screenshots and illustrations in `assets/`. For Hashnode covers, upload the image to Hashnode's CDN first and use the returned URL in `cover`.

For inline screenshots, prefer stable URLs after publication. During drafting, keep the source image in `assets/` and replace local placeholders with final URLs before publishing.

## Initial Editorial Queue

1. `2026-04-26-building-oracle-apex-ai-skills.md`
2. `2026-04-26-using-codex-with-apex-ai-skills.md`
