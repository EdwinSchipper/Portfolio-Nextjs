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
- **DRY CMS Queries & Caching**: Worden nieuwe queries in [`lib/cms/queries.ts`](../../../lib/cms/queries.ts) afgehandeld via `fetchSingleEntry`, `fetchEntryUrls` en `withServerCache` + `React.cache()`?
- **Environment Integriteit**: Worden alle omgevingsvariabelen uit [`lib/env.ts`](../../../lib/env.ts) gelezen en is [`.env.example`](../../../.env.example) gesynchroniseerd?
- **Veiligheid & Live Preview**: Wordt alle Rich Text HTML gezuiverd met `isomorphic-dompurify` vóór `dangerouslySetInnerHTML` en blijven `$` (`data-cslp`) attributen behouden?
- **UI & Types**: Worden uitsluitend UI primitives uit [`components/ui/`](../../../components/ui/) en `@heroicons/react` gebruikt, zonder `as any` casts, zonder `@deprecated` API's en zonder achtergebleven `//` comments of `console.log`?
- **Image Optimization**: Volgen `next/image` en `next.config.mjs` [`image-optimization.md`](../../rules/image-optimization.md)? Geldige media queries in `sizes`, maximaal één LCP-`preload` per route (geen deprecated `priority`), `quality` binnen `images.qualities`, `unoptimized` voor SVG/GIF/< 10 KB, `width`/`height` of `fill` voor CLS en `remotePatterns` beperkt met `pathname`?
- **Quality Gate**: Slagen `pnpm type-check`, `pnpm lint` en `pnpm build` zonder waarschuwingen?

