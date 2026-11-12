---
name: contentstack-kickstart
description: Contentstack Delivery SDK v5, DRY queries, server TTL-caching (withServerCache), Live Preview ($), en content model uitlijning.
---

# Contentstack Architectuur – Next.js 16 & Delivery SDK v5

## Wanneer te gebruiken

- Bij het wijzigen of uitbreiden van Contentstack data-queries, caching of Live Preview initialisatie in [`lib/cms/`](../../../lib/cms/).
- Bij het afstemmen van Contentstack content types (`homepage`, `page`, `portfolio_item`) en Visual Builder `$` bindings.
- Controleer vóór SDK-wijzigingen de geïnstalleerde versies (`package.json`) en typings in `node_modules/@contentstack/*/dist/` op `@deprecated` API's.

## Instructies

### Centrale CMS-module (`lib/cms/`)

- **[`lib/cms/client.ts`](../../../lib/cms/client.ts)**: Initialiseert `stack` via `@contentstack/delivery-sdk` en `getContentstackEndpoint` uit `@contentstack/utils` op basis van [`lib/env.ts`](../../../lib/env.ts). `initLivePreview()` bevat een module-level `isLivePreviewInitialized` guard zodat `ContentstackLivePreview.init()` maximaal één keer per browsersessie draait.
- **[`lib/cms/queries.ts`](../../../lib/cms/queries.ts)**:
  - **DRY Query Consolidation**: Gebruik altijd de gedeelde interne helpers `fetchSingleEntry`, `fetchEntryUrls` en `withServerCache` (60s server TTL-cache + in-flight Promise deduplicatie) in combinatie met `React.cache()`, plus `clearServerQueryCache()` voor on-demand revalidatie via [`lib/cms/revalidation.ts`](../../../lib/cms/revalidation.ts).
  - **Centrale Static Params Resolvers**: `getDynamicRouteStaticParams()` en `getPortfolioRouteStaticParams()` bouwen de statische route-parameters centraal op via `splitUrlSegments()`.
  - Browser-aanroepen (`typeof window !== "undefined"`) en Live Preview (`isPreview`) slaan `withServerCache` automatisch over zodat Visual Builder wijzigingen real-time zichtbaar zijn.

### Veiligheid & Live Preview Bindings

- Render Contentstack Rich Text HTML uitsluitend gezuiverd via `isomorphic-dompurify` (`DOMPurify.sanitize`).
- Behoud `page?.$` en block `$` (`data-cslp`) attributen en `VB_EmptyBlockParentClass` voor Visual Builder.
- Houd alle interfaces in [`lib/types/`](../../../lib/types/) 100% vrij van `as any` casts.

