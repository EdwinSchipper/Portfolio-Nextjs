---
name: dev-workflow
description: Local setup, Contentstack seeding, env vars, CI expectations, and PR ownership for kickstart-next.
---

# Dev workflow – kickstart-next

## When to use

- You are cloning the repo, running it locally, or opening a pull request.
- You need to know what runs in CI versus what you must run locally.

## Instructions

### Local setup

- Install dependencies with `pnpm install`.
- Copy `.env.example` to `.env` and fill in values from your Contentstack stack (see product [README.md](../../README.md)).
- Required variables use the `NEXT_PUBLIC_CONTENTSTACK_*` prefix; see `.env.example` for names.

### Contentstack stack

- Install the Contentstack CLI (`npm install -g @contentstack/cli`), configure region if prompted, and log in (`csdx auth:login`).
- Seed a compatible stack: `csdx cm:stacks:seed --repo "contentstack/kickstart-stack-seed" --org "<YOUR_ORG_ID>" -n "Kickstart Stack"` (details in [README.md](../../README.md)).
- Create a delivery token with preview scope and preview token enabled; enable Live Preview in the stack and point it at the Preview environment.

### Run the app

- Development: `pnpm dev`, then open `http://localhost:3000`.
- Production build locally: `pnpm build` then `pnpm start`.

### Lint

- Run `pnpm lint` and `pnpm type-check` before pushing.

### CI (GitHub Actions)

- [.github/workflows/ci.yml](../../.github/workflows/ci.yml): Draait automatisch `pnpm lint`, `pnpm type-check` en `pnpm build` op push en PR naar `main`, `master` en `development`.
