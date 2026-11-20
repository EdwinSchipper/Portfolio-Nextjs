---
name: code-review
description: Pull Request checklist, architectuurbewaking en severity-richtlijnen voor code reviews.
---

# Code Review & Architectuur Checklist

## Wanneer te gebruiken

- Vóór het voorstellen van een commit/PR of bij het beoordelen van codewijzigingen op kwaliteit, veiligheid en architectuur.

## Instructies

### Review Checklist

- **Shell Purity, Static Shell & DRY Resolvers**: Zijn `app/**/layout.tsx` en `app/**/page.tsx` 100% zuivere, **synchrone** shells zonder inline `.split()`, `.filter()`, `.join()`, `.map()` of directe SDK-logica? Wordt `await params` in `page.tsx` uitsluitend **binnen** `<Suspense>` (en in `generateMetadata()`) uitgevoerd en loopt pad-resolutie via `resolveCmsPath()`? Lopen `generateMetadata()` en `generateStaticParams()` via 1-regel delegaties naar [`lib/metadata/`](../../../lib/metadata/) en [`lib/cms/`](../../../lib/cms/)?
- **DRY CMS Queries, Error-Semantiek & Caching**: Worden nieuwe queries in [`lib/cms/queries.ts`](../../../lib/cms/queries.ts) afgehandeld via `fetchSingleEntry`, `fetchEntryUrls` en `withServerCache` (met `normalizeCmsUrl`, directe `serverQueryCache.delete` TTL-evictie) + `React.cache()`, begrenst `lib/cms/client.ts` SDK requests met `STACK_REQUEST_TIMEOUT_MS` en begrensd retry-beleid (`STACK_RETRY_LIMIT` + `isRetryableStackError` voor `ECONNABORTED`/`EPIPE` en `408`/`5xx`), en worden API-/netwerkfouten op de server doorgegooid i.p.v. omgezet naar `404`?
- **Environment, Config & Security Headers Integriteit**: Worden alle omgevingsvariabelen uit [`lib/env.ts`](../../../lib/env.ts) gelezen, is [`.env.example`](../../../.env.example) gesynchroniseerd, bevat [`next.config.mjs`](../../../next.config.mjs) geen ongevraagde `experimental.*` flags (*"not recommended for production"*, zoals `experimental.agentUpgrade`), en respecteren wijzigingen of externe bronnen [`security-headers.md`](../../rules/security-headers.md) (`Strict-Transport-Security`, CSP incl. Visual Builder `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` en `rel="noopener noreferrer"` op `target="_blank"`)?
- **Veiligheid & Live Preview**: Wordt alle Rich Text HTML gezuiverd met `isomorphic-dompurify` vóór `dangerouslySetInnerHTML`, blijven `$` (`data-cslp`) attributen behouden en trekken client preview-wrappers geen onnodige code in productie-clientbundles?
- **UI, Layout, A11Y & Types**: Zijn app-chrome componenten ondergebracht in [`components/layout/`](../../../components/layout/) met expliciete barrel (geen `export *`), worden uitsluitend UI primitives uit [`components/ui/`](../../../components/ui/) en tree-shakeable icon-imports gebruikt (geen `import *` over volledige icon-sets in client-bundles), zonder `as any` casts, zonder `@deprecated` API's, zonder ongebruikte `import React`, zonder hardcoded hex-/debug-kleuren of typo-uitgeschakelde classes, en conform [`accessibility.md`](../../rules/accessibility.md) (landmarks, `<time>`, `sr-only`/`aria-hidden`, touch targets `44px`/`36px`, `prefers-reduced-motion` via `useSyncExternalStore`)?
- **Image Optimization**: Volgen `next/image` en `next.config.mjs` [`image-optimization.md`](../../rules/image-optimization.md)? Geldige media queries in `sizes`, maximaal één LCP-`preload` per route (geen deprecated `priority`), `quality` binnen `images.qualities`, `unoptimized` voor SVG/GIF/< 10 KB, `width`/`height` of `fill` voor CLS en `remotePatterns` beperkt met `pathname`?
- **Quality Gate**: Slagen `tsc --noEmit --noUnusedLocals --noUnusedParameters`, `pnpm type-check`, `pnpm lint` en `pnpm build` zonder waarschuwingen?

