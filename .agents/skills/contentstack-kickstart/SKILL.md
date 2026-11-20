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

- **[`lib/cms/client.ts`](../../../lib/cms/client.ts)**: Initialiseert `stack` via `@contentstack/delivery-sdk` (begrensd met `STACK_REQUEST_TIMEOUT_MS = 10_000` en begrensd retry-beleid: `retryOnError: true`, `STACK_RETRY_LIMIT = 3`, `STACK_RETRY_DELAY_MS = 500`, `isRetryableStackError` voor `ECONNABORTED`/`EPIPE` en `408`/`5xx`) en `getContentstackEndpoint` uit `@contentstack/utils` op basis van [`lib/env.ts`](../../../lib/env.ts). `initLivePreview()` bevat een module-level `isLivePreviewInitialized` guard zodat `ContentstackLivePreview.init()` maximaal één keer per browsersessie draait.
- **[`lib/cms/queries.ts`](../../../lib/cms/queries.ts)**:
  - **DRY Query Consolidation**: Gebruik altijd de gedeelde interne helpers `fetchSingleEntry`, `fetchEntryUrls` en `withServerCache` (60s server TTL-cache met directe `serverQueryCache.delete(cacheKey)` bij verlopen entries + in-flight Promise deduplicatie op `normalizeCmsUrl` cache-keys) in combinatie met `React.cache()`, plus `clearServerQueryCache()` voor on-demand revalidatie via [`lib/cms/revalidation.ts`](../../../lib/cms/revalidation.ts).
  - **Error-Semantiek (`404` vs. API-fout)**: `fetchSingleEntry` retourneert alleen `undefined` bij `!isConfigured` of een lege CMS-respons (`entries: []`); API-/netwerkfouten worden op de server doorgegooid (`throw error`) voor ISR-behoud/`error.tsx` en in client-preview wrappers (`Preview.tsx`, `PortfolioPreview.tsx`) veilig afgevangen.
  - **Centrale URL-Normalisatie & Static Params Resolvers**: `resolveCmsPath()`, `normalizeCmsUrl()`, `getDynamicRouteStaticParams()` en `getPortfolioRouteStaticParams()` bouwen paden en statische route-parameters centraal op.
  - **DRY Payload Mappers ([`lib/cms/mappers.ts`](../../../lib/cms/mappers.ts))**: Gebruik gedeelde type-veilige helpers (`pickFirstString`, `pickFirstGridSpan`, `pickFirstCslp`) voor het normaliseren van Contentstack blokken.
  - Browser-aanroepen (`typeof window !== "undefined"`) en Live Preview (`isPreview`) slaan `withServerCache` automatisch over zodat Visual Builder wijzigingen real-time zichtbaar zijn.

### Veiligheid & Live Preview Bindings

- Render Contentstack Rich Text HTML uitsluitend gezuiverd via `isomorphic-dompurify` (`DOMPurify.sanitize`).
- Behoud `page?.$` en block `$` (`data-cslp`) attributen en `VB_EmptyBlockParentClass` voor Visual Builder, en houd client preview-wrappers los van productie-clientbundles.
- Houd alle interfaces in [`lib/types/`](../../../lib/types/) 100% vrij van `as any` casts.

