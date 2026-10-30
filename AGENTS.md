# Contentstack Kickstart: Next.js – Agent guide

**Universal entry point** for contributors and AI agents. Detailed conventions live in **`skills/*/SKILL.md`**.

## What this repo is

| Field | Detail |
| --- | --- |
| **Name:** | https://github.com/contentstack/kickstart-next |
| **Purpose:** | Contentstack Kickstarts are the minimum amount of code needed to connect to Contentstack. This repo is a Next.js starter with SDK initialization, live preview, and Visual Builder setup. |
| **Out of scope (if any):** | Not a general-purpose SDK—it is a **starter app**. Production hardening, multi-page routing, and automated tests are left to consumers unless added here. |

## Tech stack (at a glance)

| Area | Details |
| --- | --- |
| Language | TypeScript 5 (`strict` in [tsconfig.json](tsconfig.json)) |
| Build | pnpm, Next.js 16 ([package.json](package.json), [next.config.mjs](next.config.mjs)) |
| Tests | **None in-repo** (no `test` script; no test files). Optional runners only if the team adds them. |
| Lint / coverage | ESLint 9, flat config ([eslint.config.mjs](eslint.config.mjs)); `eslint-config-next` (core-web-vitals + typescript). No coverage tooling configured. |
| Other | React 19, Tailwind CSS 4 ([postcss.config.mjs](postcss.config.mjs), [app/globals.css](app/globals.css)); Contentstack Delivery SDK and Live Preview utilities. |

## Commands (quick reference)

| Command Type | Command |
| --- | --- |
| Install | `pnpm install` |
| Build | `pnpm build` |
| Dev | `pnpm dev` |
| Start (production) | `pnpm start` |
| Test | *(not defined)* |
| Lint | `pnpm lint` |
| Type-check | `pnpm type-check` |

**CI:** Continuous Integration draait via GitHub Actions ([.github/workflows/ci.yml](.github/workflows/ci.yml)) en valideert automatisch ESLint (`pnpm lint`), TypeScript types (`pnpm type-check`) en Next.js build (`pnpm build`).

## AI Agent Operational Guidelines (Speed & Scope)

To maintain maximum development velocity and avoid latency:

1. **Direct execution over repetitive research:**
   - On follow-up, iterative, or incremental requests (such as adding a field, tweaking a layout, adjusting typography, or updating spacing), **do not** repeat broad codebase discovery, grep entire directories, or re-read files that are already understood in the conversation context.
   - Jump directly to the known target files (primarily `lib/types/` and the relevant component in `components/blocks/` or `components/ui/`).
2. **Stay strictly in scope:**
   - Make precise, surgical modifications using single-pass replacements.
   - Do not touch unrelated components, styles, or configuration.
3. **No unrequested browser runs or roundtrip diagnostics:**
   - Do **not** spin up browser subagents or execute HTTP/curl diagnostics unless the user explicitly asks for visual verification or browser testing.
4. **Validation:**
   - Validate changes quickly with `npm run lint`.
5. **Concise reporting:**
   - Respond directly and concisely in Dutch with what was changed, avoiding conversational boilerplate or repeating full file summaries.

## Agent Rules & Policies

Strikte regels en kwaliteitsstandaarden voor agents zijn georganiseerd in [`.agents/rules/`](.agents/rules/):

| Regel | Pad | Doel |
| --- | --- | --- |
| Change Approval | [`.agents/rules/change-approval.md`](.agents/rules/change-approval.md) | Nooit zelfstandig committen of pushen; altijd expliciete toestemming |
| Git Commits | [`.agents/rules/git-commits.md`](.agents/rules/git-commits.md) | Conventional Commits standaard met verplichte body bij grotere wijzigingen |
| Import Integrity | [`.agents/rules/import-integrity.md`](.agents/rules/import-integrity.md) | Opschonen oude paden/barrels na refactor, `tsc --noEmit` & lint |
| Contentstack Queries | [`.agents/rules/contentstack-queries.md`](.agents/rules/contentstack-queries.md) | Payload-optimalisatie, type-safety, sanitization en Visual Builder integriteit |
| Official Stack | [`.agents/rules/official-stack-standards.md`](.agents/rules/official-stack-standards.md) | Next.js 16 App Router, React 19, scheiding server/client, Tailwind CSS v4 |

## Where the documentation lives: skills

| Skill | Path | What it covers |
| --- | --- | --- |
| Dev workflow | [skills/dev-workflow/SKILL.md](skills/dev-workflow/SKILL.md) | Local setup, env, seed stack, CI expectations, CODEOWNERS |
| Contentstack kickstart | [skills/contentstack-kickstart/SKILL.md](skills/contentstack-kickstart/SKILL.md) | Delivery stack, live preview, `getPage`, env and content model alignment |
| Framework | [skills/framework/SKILL.md](skills/framework/SKILL.md) | Next.js/Tailwind/PostCSS config, `package.json` scripts and deps, image hosts |
| Next.js app | [skills/next-app/SKILL.md](skills/next-app/SKILL.md) | App Router, components, client vs server, rendering patterns |
| TypeScript style | [skills/typescript-style/SKILL.md](skills/typescript-style/SKILL.md) | `tsconfig`, ESLint rules, typing content models |
| Testing | [skills/testing/SKILL.md](skills/testing/SKILL.md) | Current test state (none), credentials policy, CI vs tests |
| Code review | [skills/code-review/SKILL.md](skills/code-review/SKILL.md) | PR checklist and severity hints |

The [skills/](skills/) directory layout is described in [skills/README.md](skills/README.md).

## Using Cursor (optional)

If you use **Cursor**, [.cursor/rules/README.md](.cursor/rules/README.md) only points to **AGENTS.md**—the same docs as everyone else.
