---
name: dev-workflow
description: Lokale setup, centrale omgevingsvariabelen (lib/env.ts), Contentstack stack seeding, pnpm scripts en CI-kwaliteitseisen.
---

# Dev Workflow – Portfolio Website (Next.js 16 & Contentstack)

## Wanneer te gebruiken

- Bij het lokaal opzetten, draaien of valideren van de applicatie.
- Bij het controleren van vereiste omgevingsvariabelen en pre-flight checks vóór een commit of pull request.

## Instructies

### Lokale setup & Environment (`lib/env.ts`)

- Installeer afhankelijkheden met `pnpm install`.
- Kopieer [`.env.example`](../../../.env.example) naar `.env.local` en vul de Contentstack en GTM variabelen in.
- **Centralized Environment Policy**: Alle omgevingsvariabelen (`NEXT_PUBLIC_*`, `NODE_ENV`, `CONTENTSTACK_REVALIDATE_SECRET`) worden uitsluitend centraal uitgelezen en gevalideerd in [`lib/env.ts`](../../../lib/env.ts). Gebruik nooit rechtstreeks `process.env` in `app/`, `components/` of `lib/cms/`.

### Commando's

- Ontwikkeling (Turbopack): `pnpm dev` (`http://localhost:3000`).
- TypeScript controle: `pnpm type-check` (`tsc --noEmit`).
- Linter: `pnpm lint` (`eslint .`).
- Productie-build: `pnpm build` gevolgd door `pnpm start`.
- Release-branch voorbereiden: `pnpm release:main` (maakt `release/main` vanaf `origin/main` met `development` zonder `.agents/` en `AGENTS.md`).

### CI & Master Production Quality Gate

- [`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml) voert automatisch `pnpm lint`, `pnpm type-check` en `pnpm build` uit.
- Vóór elke commit moeten lokaal de Zero-Comment, Zero-Console, `pnpm type-check`, `pnpm lint` en `pnpm build` controles slagen.
- Voer nooit zelfstandig `git commit` of `git push` uit zonder expliciete opdracht van de gebruiker; commitberichten zijn altijd 100% in het Nederlands.
- Schakel na het pushen van `release/main` (`git push -u --force-with-lease origin release/main`) altijd terug naar `development` en geef direct de Pull Request link (`https://github.com/EdwinSchipper/Portfolio-Nextjs/compare/main...release/main?expand=1`) aan de gebruiker.

