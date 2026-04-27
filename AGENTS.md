# AGENTS.md

This repository is the source and backup for Andre Souza's Hashnode blog.

## Context

- Hashnode publication: `andre-souza.hashnode.dev`
- GitHub repository: `andre-simplifica/blog-andre-souza`
- Publishing workflow: `.github/workflows/publish-hashnode.yml`
- Publishing script: `scripts/publish-hashnode.mjs`
- Main audience: Oracle APEX developers, PL/SQL developers, Oracle OCI users, AI-assisted development practitioners, and technical entrepreneurs building real products.

## Writing Rules

- Blog content must be written in English, even when notes or instructions are provided in Portuguese.
- Use natural, confident American English. Avoid mechanical translation, generic AI tone, hype, and filler.
- Prefer practical, real-world articles based on actual work with Oracle APEX, #orclAPEX, PL/SQL, OCI, Codex, AI, GitHub, and SaaS/product development.
- Keep the writing specific enough to be useful to experienced developers.
- When the user provides screenshots, place source files under `assets/` and reference them from the post.

## Source Files

- Canonical editable posts are date-prefixed Markdown files in the repository root, such as `2026-04-26-building-oracle-apex-ai-skills.md`.
- Hashnode may create backup Markdown files with generated names and `cuid` in frontmatter, such as `cmogguimj000102k14u381051.md`.
- Treat generated `cuid` files as backups only. Do not use them as the primary editing source when a date-prefixed canonical file exists.
- Do not edit `README.md` or docs unless the task is about repository documentation or workflow instructions.

## Publishing Flow

For publishable changes:

1. Inspect `git status --short --branch`.
2. Edit the canonical Markdown source file.
3. Keep frontmatter valid and set `domain: andre-souza.hashnode.dev`.
4. Use `saveAsDraft: true` for drafts, and `saveAsDraft: false` only when the user wants the post published or updated publicly.
5. Commit only the files related to the current blog task.
6. Push to `origin main`.
7. Verify the `Publish Hashnode` GitHub Actions run.
8. Verify the public Hashnode article, or use Hashnode GraphQL to confirm `content.markdown` when browser rendering is unreliable.

## Operational Notes

- The custom GitHub Actions/API workflow publishes from GitHub to Hashnode.
- Hashnode's own GitHub integration may push backup files back to this repository after publication.
- The publisher intentionally skips files whose frontmatter contains `cuid`.
- If the normal push workflow does not trigger, use workflow dispatch with the `files` input set to the canonical Markdown file name.
