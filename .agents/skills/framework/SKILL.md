---
name: framework
description: Next.js 16.4 (Turbopack), React 19, Tailwind CSS v4, PostCSS, Headless UI v2 en next/image configuratie.
---

# Framework & Tooling – Next.js 16 & Tailwind CSS v4

## Wanneer te gebruiken

- Bij aanpassingen aan [`next.config.mjs`](../../../next.config.mjs), [`postcss.config.mjs`](../../../postcss.config.mjs), [`app/globals.css`](../../../app/globals.css) of [`package.json`](../../../package.json).
- Bij het toevoegen van externe afbeeldingsdomeinen voor `next/image` of design tokens in Tailwind CSS v4.

## Instructies

### Stack & Scripts

- [`package.json`](../../../package.json) scripts (gebruik altijd `pnpm`):
  - `pnpm dev`: `next dev` (Turbopack)
  - `pnpm build`: `next build`
  - `pnpm start`: `next start`
  - `pnpm lint`: `eslint .`
  - `pnpm type-check`: `tsc --noEmit`
- Kern-dependencies: Next.js 16.4, React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), `@headlessui/react` v2, `@heroicons/react`, `@next/third-parties`, `@contentstack/delivery-sdk` v5, `@contentstack/live-preview-utils` v4, `isomorphic-dompurify`.

### Next.js Configuratie (`next.config.mjs`)

- [`next.config.mjs`](../../../next.config.mjs) bevat cruciale productie-instellingen die behouden moeten blijven:
  - `images`: De `formats`, `qualities`, `minimumCacheTTL`, `deviceSizes`, `imageSizes` en `remotePatterns` (met `pathname`) worden uitsluitend bepaald door [`.agents/rules/image-optimization.md`](../../rules/image-optimization.md) en bewaakt door de [`image-optimization-architect`](../../agents/image-optimization-architect.md). Wijzig deze waarden nooit zonder die rule en de lokale versie-docs (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`) te raadplegen.
  - `serverExternalPackages: ["isomorphic-dompurify"]` voor stabiele SSR compilatie.
  - `compiler.removeConsole` in productie (met behoud van `error`).
  - `headers()` voor HTTP Security Headers ([`.agents/rules/security-headers.md`](../../rules/security-headers.md): `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`) en AI agent discovery (`/ai-catalog.json`, `/.well-known/ai-catalog.json`, `/llms.txt`).

### Tailwind CSS v4, Layout & UI Primitives

- [`app/globals.css`](../../../app/globals.css) definieert alle centrale `@theme` design tokens, typografie en animaties.
- Gebruik altijd de UI primitives uit [`components/ui/`](../../../components/ui/) (`Button`, `Toast`, `Label`, `Icon`, `RichText`) en globale site-chrome uit [`components/layout/`](../../../components/layout/) (`Header`, `Footer`, `Breadcrumbs`, `ColorModeSelector`, `NavigationProgress`) zonder ruwe `<button>` elementen of inline `<svg>` tags.

