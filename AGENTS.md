<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Contentstack Kickstart: Next.js – Agent Guide

**Centraal startpunt** voor contributors en AI-agents. Bindende regels staan uitsluitend éénmaal vastgelegd in [`.agents/rules/`](.agents/rules/) (single source of truth, zonder duplicatie), aangevuld met [`.agents/agents/`](.agents/agents/) en [`.agents/skills/*/SKILL.md`](.agents/skills/).

## Projectoverzicht & Tech Stack

| Gebied | Details |
| --- | --- |
| **Applicatie** | Portfolio Website van Edwin Schipper (`https://www.edwinschipper.nl`, gehost op Contentstack Launch) |
| **Repository** | https://github.com/EdwinSchipper/Portfolio-Nextjs (`development` is werkbranch; `.agents/` & `AGENTS.md` staan niet op `main`) |
| **Framework** | TypeScript 5 (`strict`), Next.js 16.4 (Turbopack, App Router in [next.config.mjs](next.config.mjs)), React 19 |
| **UI & Styling** | Tailwind CSS v4 ([app/globals.css](app/globals.css)), Headless UI v2 (`@headlessui/react`), Heroicons / `react-icons` |
| **CMS & Data** | Contentstack Delivery SDK v5, Live Preview Utils v4, `isomorphic-dompurify` |
| **Analytics** | Google Tag Manager (`@next/third-parties/google`), Google Consent Mode v2 |
| **Linter & Build** | ESLint 9 (`eslint.config.mjs`), `pnpm` |

## Commando's & Architectuur (Quick Reference)

| Commando | Doel |
| --- | --- |
| `pnpm dev` | Lokale ontwikkelsessie starten (Turbopack) |
| `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters` | Ongebruikte imports, locals & parameters controleren |
| `pnpm type-check` | TypeScript types controleren (`tsc --noEmit`) |
| `pnpm lint` | ESLint validatie uitvoeren |
| `pnpm build` | Productie Next.js applicatie compileren |
| `pnpm release:main` | Release-branch `release/main` genereren vanaf `origin/main` zonder `.agents/` en `AGENTS.md` |

- `app/`: Pure route-shells (`layout.tsx`, `(home)/`, `[...slug]/`, `portfolio/[slug]/`) met 1-regel `generateMetadata`/`generateStaticParams` delegaties, per-segment `loading.tsx` skeletons en `api/revalidate`.
- `components/`: Pure UI primitives in `ui/` (`Button`, `Label`, `Icon`, `Toast`, `RichText`), globale layout-chrome in `layout/` (`Header`, `Footer`, `Breadcrumbs`, `ColorModeSelector`, `NavigationProgress`), modulaire CMS-blokken in `blocks/` en domein-features in `features/` (`analytics`, `pages`, `portfolio`).
- `lib/`: Centrale environment in [lib/env.ts](lib/env.ts), Contentstack SDK/queries/mappers in `cms/`, layout-tokens in `layout/`, SEO-resolvers in `metadata/` en gedeelde domein-interfaces in `types/`.

---

## Agent Rules ([`.agents/rules/`](.agents/rules/))

| Regel | Pad | Kernverantwoordelijkheid |
| --- | --- | --- |
| Accessibility | [`.agents/rules/accessibility.md`](.agents/rules/accessibility.md) | WCAG 2.2 AA landmarks, `<time>`/`sr-only` semantiek, touch targets (`44px`/`36px`), scrims & `prefers-reduced-motion` |
| Analytics Standards | [`.agents/rules/analytics-standards.md`](.agents/rules/analytics-standards.md) | GTM, GA4, Consent Mode v2 (`IArguments`), AVG/GDPR en Zero-PII |
| Change Approval | [`.agents/rules/change-approval.md`](.agents/rules/change-approval.md) | Nooit zelfstandig committen of pushen; wijzigingen eerst voorleggen |
| Contentstack Queries | [`.agents/rules/contentstack-queries.md`](.agents/rules/contentstack-queries.md) | `.only()` queries, DRY helpers, server TTL-cache, DOMPurify sanitization & Visual Builder (`$`) |
| Git Commits | [`.agents/rules/git-commits.md`](.agents/rules/git-commits.md) | Conventional Commits met verplichte body; voertaal **altijd Nederlands** |
| Image Optimization | [`.agents/rules/image-optimization.md`](.agents/rules/image-optimization.md) | Versie-gedreven `next/image` props (`preload`, `sizes`, `qualities`), Launch caching & `remotePatterns` |
| Import Integrity | [`.agents/rules/import-integrity.md`](.agents/rules/import-integrity.md) | Codebase-wide grep op oude paden/barrels, `tsc --noEmit`, `lint` & docs na refactors |
| Official Stack | [`.agents/rules/official-stack-standards.md`](.agents/rules/official-stack-standards.md) | Pure shells, React 19, `lib/env.ts`, expliciete subfolder-barrels (incl. `layout/`), Zero-Deprecation & async streaming |
| Quality Gate | [`.agents/rules/quality-gate.md`](.agents/rules/quality-gate.md) | Zero-Comment (`//`), Zero-Console, Zero-Any, design-tokens, image-checks, `tsc`, `eslint` & `pnpm build` |
| Security Headers | [`.agents/rules/security-headers.md`](.agents/rules/security-headers.md) | Verplichte `next.config.mjs` headers voor Contentstack Launch (`Strict-Transport-Security`, CSP incl. `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) & `rel="noopener noreferrer"` |

## Gespecialiseerde Subagents ([`.agents/agents/`](.agents/agents/))

| Subagent | Pad | Specialisme |
| --- | --- | --- |
| Contentstack Architect | [`.agents/agents/contentstack-architect.md`](.agents/agents/contentstack-architect.md) | Delivery SDK v5, DRY queries & caching, Visual Builder (`$`), Rich Text sanitization, content models |
| Analytics & GTM Architect | [`.agents/agents/analytics-architect.md`](.agents/agents/analytics-architect.md) | GTM, GA4, Consent Mode v2, `@next/third-parties`, privacy & dataLayer payloads |
| Environment & Architecture Guardian | [`.agents/agents/env-architecture-architect.md`](.agents/agents/env-architecture-architect.md) | `lib/env.ts` & `.env.example`, HTTP security headers (`next.config.mjs`), Next.js 16 / React 19 architectuur, barrels & zero-deprecation |
| Image Optimization Architect | [`.agents/agents/image-optimization-architect.md`](.agents/agents/image-optimization-architect.md) | Versie-specifieke `next/image`, Contentstack Launch bandwidth/caching, `remotePatterns` & LCP-`preload` |

## Documentatie & Skills ([`.agents/skills/`](.agents/skills/))

| Skill | Pad | Onderwerp |
| --- | --- | --- |
| Dev workflow | [`.agents/skills/dev-workflow/SKILL.md`](.agents/skills/dev-workflow/SKILL.md) | Lokale setup, `lib/env.ts`, seed stack, CI en Quality Gate |
| Contentstack kickstart | [`.agents/skills/contentstack-kickstart/SKILL.md`](.agents/skills/contentstack-kickstart/SKILL.md) | Delivery SDK v5, DRY queries, `withServerCache`, Live Preview (`$`) |
| Framework | [`.agents/skills/framework/SKILL.md`](.agents/skills/framework/SKILL.md) | Next.js 16.4, Tailwind CSS v4, `next.config.mjs` security headers, `layout/` & `ui/` primitives |
| Next.js app | [`.agents/skills/next-app/SKILL.md`](.agents/skills/next-app/SKILL.md) | App Router, pure route-shells, `<Suspense>` skeletons, client vs server |
| TypeScript style | [`.agents/skills/typescript-style/SKILL.md`](.agents/skills/typescript-style/SKILL.md) | `tsconfig`, Zero-Any, Zero-Deprecation, typing content models |
| Testing | [`.agents/skills/testing/SKILL.md`](.agents/skills/testing/SKILL.md) | Master Production Quality Gate, pre-flight validatie, geheimbeheer |
| Code review | [`.agents/skills/code-review/SKILL.md`](.agents/skills/code-review/SKILL.md) | PR-, security-headers- en architectuur-checklist |
