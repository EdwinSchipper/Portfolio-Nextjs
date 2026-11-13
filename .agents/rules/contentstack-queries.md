---
trigger: always_on
---

# Contentstack & Data Query Richtlijnen (Contentstack Query Policy)

In dit project hanteren we strikte kwaliteits-, beveiligings- en performance-eisen voor alle data queries en interacties met de Contentstack Delivery SDK.

## 1. Verbod op Onnodige Over-fetching & Ongelimiteerde Payloads
- **Optimaliseer Contentstack Queries**:
  - Haal alleen entries en velden op die daadwerkelijk nodig zijn voor de weergave (`.only(...)` bij zware content types of specifieke lijstweergaven).
  - Vermijd diepe ongecontroleerde referentie-resoluties (`includeReference`) tenzij expliciet vereist voor geneste componenten.
  - Maak waar van toepassing gebruik van paginering of limieten (`.limit()`, `.skip()`) om geheugengebruik en payloadgrootte minimaal te houden.

## 2. Type-Safety & Data Contracten (`lib/types/`)
- **Sluitende TypeScript Interfaces**:
  - Alle data afkomstig van Contentstack moet 1-op-1 aansluiten op de TypeScript interfaces in `lib/types/`.
  - Pas Live Preview metadata (`$` velden / `data-cslp` bindings) altijd type-veilig toe in de corresponderende interfaces (bijv. `PageProps`, `BlockProps`).
  - Maak nooit ad-hoc `any` casts voor Contentstack SDK responses.

## 3. Beveiliging & Rich Text Rendering
- **Veilige HTML Sanitization**:
  - Content afkomstig uit Contentstack Rich Text editors mag NOOIT direct via `dangerouslySetInnerHTML` worden gerenderd zonder sanitization.
  - Gebruik altijd `isomorphic-dompurify` om HTML te zuiveren vóór injectie in de DOM.

## 4. Live Preview & Visual Builder Integriteit
- Garandeer dat Live Preview attributen (`page?.$` / block `$` bindings en `data-cslp`) intact blijven op DOM-nodes, zodat contentredacteuren in Visual Builder direct realtime previews kunnen zien en klikken.
- Respecteer lege blok-states via de geëigende Visual Builder classes (`VB_EmptyBlockParentClass`).
- Zorg dat client-side Live Preview wrappers (`Preview.tsx`, `PortfolioPreview.tsx`) strikt gescheiden blijven van Server Components: importeer ze niet statisch via gedeelde route-barrels in productie-clientbundles als daardoor server/block/DOMPurify/SDK-bomen naar de client worden meegebundeld, en voorkom onnodige hydrate-mismatches.
- Bewaak dat `initLivePreview()` een module-level guard gebruikt zodat `ContentstackLivePreview.init()` maximaal één keer per browsersessie wordt aangeroepen.

## 5. DRY Query Architectuur, Server Caching & Error-Semantiek (`lib/cms/queries.ts`)
- **Geen Gedupliceerde SDK-Boilerplate (DRY Principle)**:
  - Schrijf nooit losse copy-paste functies voor vergelijkbare Contentstack queries. Gebruik centrale, generieke interne helpers (`fetchSingleEntry`, `fetchEntryUrls`, `withServerCache`) die `isConfigured`-validatie, `try/catch`-afhandeling, `includeReference`, `QueryOperation.EQUALS` en `contentstack.Utils.addEditableTags` op één centrale plek afhandelen.
- **Expliciete Error-Semantiek (`404` vs. Runtime/API-fout)**:
  - `fetchSingleEntry` retourneert uitsluitend `undefined` wanneer `!isConfigured` of wanneer Contentstack geldig `entries: []` teruggeeft (zodat `notFound()` alleen bij daadwerkelijk ontbrekende entries `404` serveert).
  - Netwerk-, API- en runtime-fouten op de server worden gelogd én doorgegooid (`throw error`), zodat Next.js ISR bij storingen de laatst geldige cache behoudt of `app/error.tsx` activeert in plaats van een `404` te serveren/cachen.
  - Client-side Live Preview refresh-aanroepen (`Preview.tsx`, `PortfolioPreview.tsx`) vangen fouten zelf veilig af in een `try/catch`.
- **Centrale Static Params & URL Resolvers**:
  - Alle URL-segmentatie (`splitUrlSegments`) en opbouw van `generateStaticParams` arrays (`getDynamicRouteStaticParams`, `getPortfolioRouteStaticParams`) horen centraal in `lib/cms/queries.ts` en nooit inline in `app/**/page.tsx`.
- **Server-Side TTL Cache & In-Flight Deduplicatie**:
  - Omdat `@contentstack/delivery-sdk` onder de motorkap Axios gebruikt (en niet Next.js `fetch`), moeten server-queries via zowel `React.cache()` als `withServerCache` (TTL + in-flight Promise deduplicatie) worden gecachet. Browser-aanroepen (`typeof window !== "undefined"`) en Live Preview (`isPreview`) slaan `withServerCache` automatisch over; bij on-demand webhooks (`POST /api/revalidate`) leegt `clearServerQueryCache()` de in-memory cache direct.
