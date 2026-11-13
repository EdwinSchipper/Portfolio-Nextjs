---
name: code-review
description: Pull Request checklist, architectuurbewaking en severity-richtlijnen voor code reviews.
---

# Code Review & Architectuur Checklist

## Wanneer te gebruiken

- Vóór het voorstellen van een commit/PR of bij het beoordelen van codewijzigingen op kwaliteit, veiligheid en architectuur.

## Instructies

### Review Checklist

- **Shell Purity & DRY Resolvers**: Zijn `app/**/layout.tsx` en `app/**/page.tsx` 100% zuivere shells zonder inline `.split()`, `.filter()`, `.map()` of directe SDK-logica? Lopen `generateMetadata()` en `generateStaticParams()` via 1-regel delegaties naar [`lib/metadata/`](../../../lib/metadata/) en [`lib/cms/`](../../../lib/cms/)?
- **DRY CMS Queries, Error-Semantiek & Caching**: Worden nieuwe queries in [`lib/cms/queries.ts`](../../../lib/cms/queries.ts) afgehandeld via `fetchSingleEntry`, `fetchEntryUrls` en `withServerCache` + `React.cache()`, en worden API-/netwerkfouten op de server doorgegooid i.p.v. omgezet naar `404`?
- **Environment Integriteit**: Worden alle omgevingsvariabelen uit [`lib/env.ts`](../../../lib/env.ts) gelezen en is [`.env.example`](../../../.env.example) gesynchroniseerd?
- **Veiligheid & Live Preview**: Wordt alle Rich Text HTML gezuiverd met `isomorphic-dompurify` vóór `dangerouslySetInnerHTML`, blijven `$` (`data-cslp`) attributen behouden en trekken client preview-wrappers geen onnodige code in productie-clientbundles?
- **UI, A11Y & Types**: Worden uitsluitend UI primitives uit [`components/ui/`](../../../components/ui/) en tree-shakeable icon-imports gebruikt (geen `import *` over volledige icon-sets in client-bundles), zonder `as any` casts, zonder `@deprecated` API's, zonder ongebruikte `import React`, zonder hardcoded hex-/debug-kleuren of typo-uitgeschakelde classes, en conform [`accessibility.md`](../../rules/accessibility.md) (landmarks, `<time>`, `sr-only`/`aria-hidden`, touch targets `44px`/`36px`, `prefers-reduced-motion` via `useSyncExternalStore`)?
- **Image Optimization**: Volgen `next/image` en `next.config.mjs` [`image-optimization.md`](../../rules/image-optimization.md)? Geldige media queries in `sizes`, maximaal één LCP-`preload` per route (geen deprecated `priority`), `quality` binnen `images.qualities`, `unoptimized` voor SVG/GIF/< 10 KB, `width`/`height` of `fill` voor CLS en `remotePatterns` beperkt met `pathname`?
- **Quality Gate**: Slagen `tsc --noEmit --noUnusedLocals --noUnusedParameters`, `pnpm type-check`, `pnpm lint` en `pnpm build` zonder waarschuwingen?

