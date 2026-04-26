---
title: "Why I Built Oracle APEX AI Skills"
slug: "why-i-built-oracle-apex-ai-skills"
tags: oracle-apex, plsql, ai, codex, developer-tools
domain: andre-souza.hashnode.dev
subtitle: "AI-assisted Oracle APEX development should be safer than guessing."
seoTitle: "Why I Built Oracle APEX AI Skills"
seoDescription: "Why I created Oracle APEX AI Skills to help AI agents work safely with APEX, PL/SQL, SQLcl, exports, and real project standards."
enableToc: true
saveAsDraft: false
---

# Why I Built Oracle APEX AI Skills

I just published a new open-source project for the Oracle APEX community:

[Oracle APEX AI Skills](https://github.com/andre-simplifica/oracle-apex-ai-skills)

![Vibe Coding for Oracle APEX](https://raw.githubusercontent.com/andre-simplifica/oracle-apex-ai-skills/main/assets/vibe-coding-oracle-apex.png align="center")

It is a reusable set of AI skills and development playbooks designed to help tools like Codex, Claude Code, and other AI agents work better with Oracle APEX projects.

The main idea is simple: AI-assisted development should not mean guessing.

That matters even more now, because AI is becoming part of the daily development workflow for more teams. A lot of developers are curious about it, but many still see it as either magical, risky, or too complicated to apply to real production work. I wanted to start sharing more of what I am learning in my own day-to-day work, both to help other developers catch up and to make some of these ideas feel less mysterious.

Oracle APEX is a good example of why context matters.

An AI agent cannot work safely in an APEX project by only generating code from a prompt. It needs to understand how to inspect the existing application, respect Page Designer, use SQLcl properly, work with PL/SQL packages, review readable exports, validate runtime behavior, follow project standards, and avoid inventing tables, columns, packages, APIs, or business rules.

That is the gap this repository is trying to address.

## What the project provides

The repository separates reusable APEX guidance from project-specific standards.

The reusable core contains skills and playbooks for common Oracle APEX development work: inspecting pages, handling PL/SQL changes, thinking through runtime validation, working with exports, and keeping the agent inside safer boundaries.

The project-specific part stays inside each application's own profile, usually in a `.oracle-apex-ai/` folder. That is where a team can document its own page patterns, package ownership rules, help conventions, dashboard standards, validation expectations, and examples of pages that should or should not be copied.

That separation is important. A shared APEX skill should not know private business rules from one application. At the same time, a real project needs more than generic Oracle APEX advice. It needs its own standards written down in a way an AI agent can actually use.

## Why I built it

I created this because I kept seeing the same pattern in real work.

When the agent has no project context, it guesses. It may suggest a table that does not exist, miss a Dynamic Action, ignore a page process, generate PL/SQL that does not match the local package style, or treat an exported APEX page as something it should edit directly.

When the agent has clear instructions and a repeatable workflow, the quality changes. It starts by inspecting what already exists. It asks better questions. It can follow the package ownership model. It knows when runtime validation matters. It can separate "this is a code change" from "this is a Page Designer configuration change." It becomes much easier to review the work because the reasoning follows a known path.

That does not remove the need for an experienced APEX developer. It makes the collaboration more useful.

For me, the value is not just speed. It is consistency. If the same validation checklist, export rule, PL/SQL guardrail, and project profile are reused every day, the agent gets less random and the team gets a clearer development process.

## What I hope happens next

This is still early, and that is part of the reason I wanted to make it public.

Oracle APEX teams have different conventions. Some rely heavily on Page Designer. Some keep most logic in packages. Some use SQLcl exports carefully. Some have mature project standards, while others keep too much knowledge in people's heads.

The better these shared skills become, the faster and safer the workflow gets for everyone using AI with APEX.

Suggestions, issues, pull requests, and contributions are very welcome:

[https://github.com/andre-simplifica/oracle-apex-ai-skills](https://github.com/andre-simplifica/oracle-apex-ai-skills)

If you are experimenting with Codex, Claude Code, or any other AI coding agent in an Oracle APEX project, I would love to hear what patterns are working for you and where the current tools still fall short.
