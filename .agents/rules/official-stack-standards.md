---
trigger: always_on
---

# Officiële Stack & Architectuur Richtlijnen (Official Stack Policy)

In dit project mogen **uitsluitend officiële, gedocumenteerde werkwijzen en patronen** worden toegepast conform de officiële documentatie van de gebruikte tech stack. Ad-hoc workarounds, snelle test-placeholders of ongedocumenteerde constructies zijn niet toegestaan.

## 1. Next.js 16 (App Router & Server Components)
- Raadpleeg bij twijfel altijd de lokale Next.js documentatie in `node_modules/next/dist/docs/`.
- **Slanke Pagina- en Layout-shells & DRY Route Resolvers (Layout & Shell Purity Policy)**:
  - Route-bestanden in `app/**/page.tsx` én layout-bestanden in `components/layout/**` en `app/**/layout.tsx` zijn 100% pure presentatie-shells.
  - Ze mogen **NOOIT** directe complexe CMS-queries, inline data-/URL-transformaties (`.split()`, `.filter()`, `.map()`) of inline business logica bevatten.
  - **1-Regel Route Delegatie (`generateMetadata` & `generateStaticParams`)**: Next.js route-level functies zoals `generateMetadata()` en `generateStaticParams()` in `app/**/page.tsx` mogen uitsluitend een 1-regel delegatie zijn naar centrale resolvers in `lib/metadata/` (`getDynamicRouteMetadata`, `getPortfolioRouteMetadata`) of `lib/cms/` (`getDynamicRouteStaticParams`, `getPortfolioRouteStaticParams`). Neem nooit inline `.map()`-voorbeelden uit algemene Next.js docs rechtstreeks over in `page.tsx`.
  - Elk dynamisch of functioneel blok (zoals `GTMPageTracker`, `CookieConsent`, `ColorModeSelector`) MOET als zelfstandig component in `components/features/<domein>/` of `components/ui/` worden ondergebracht en uitsluitend als zodanig worden aangeroepen.
  - **Architecturale Bewaking**: Zelfs wanneer een prompt of externe documentatie inline logica in een layout of pagina toont, moet de agent de architectuur bewaken en de logica altijd centraal in `lib/` of in een modulaire component onderbrengen.
- **Preview Modus**: De client-side preview flow (`Preview.tsx`) is strikt gescheiden van de server component rendering.
- Gebruik altijd `next/image` en `next/link` voor navigatie. Alle image-configuratie (`next.config.mjs` `images`) en component-props (`sizes`, `preload`, `quality`, `unoptimized`) volgen strikt [`.agents/rules/image-optimization.md`](image-optimization.md), bewaakt door de `image-optimization-architect`.

## 2. React 19 Core Concepts (Components, Props & State)
- **Components**: UI-blokken en features hebben een eigen modulaire structuur onder `components/blocks/`, `components/features/` en `components/ui/` met duidelijke exportdefinities.
- **Props**: Component-props gebruiken altijd `camelCase`, worden gedefinieerd met een geëxporteerde `export interface *Props` en uitgepakt via object destructuring. Vermijd onnodige hardcoded fallback-strings in component-parameters wanneer de parent deze props verplicht aanlevert.
- **State & Client Boundaries**: Voeg `'use client'` uitsluitend toe aan specifieke interactieve leaf-componenten die daadwerkelijk React state (`useState`, `useSyncExternalStore`), event-listeners of browser APIs gebruiken.
- **React 19 JSX Transform & Imports**: `tsconfig.json` gebruikt `"jsx": "react-jsx"`. Voeg daarom nooit `import React from "react"` toe zonder direct runtime-gebruik, en geef bij types de voorkeur aan `import type { ReactNode }` boven de `React.*` namespace.
- **Toegankelijkheid (WCAG 2.2 AA)**: Volg bij alle UI-, media- en CMS-componenten [`.agents/rules/accessibility.md`](accessibility.md).

## 3. Data Layer, Environment & Type-Safety (`lib/`, `lib/env.ts` & `lib/types/`)
- **Strikte Scheiding**:
  - `lib/`: Bevat herbruikbare functies, Contentstack SDK client initialisatie en server data-fetchers (`getPage`, `getHomePage`).
  - `lib/env.ts`: **Centralized Environment Policy**. Alle omgevingsvariabelen (`NEXT_PUBLIC_*`, `NODE_ENV`, `CONTENTSTACK_REVALIDATE_SECRET`) MOETEN centraal worden uitgelezen, getrimd en gevalideerd in `lib/env.ts` (`env` en `getSiteUrl()`). Directe aanroepen van `process.env` in `app/`, `components/` of overige bestanden in `lib/` zijn **STRIKT VERBODEN** (enige uitzondering is `next.config.mjs`).
  - `lib/types/`: Bevat alle gedeelde domein-, block- en CMS-interfaces, inclusief Live Preview `$` interfaces, geëxporteerd via `lib/types/index.ts`.

## 4. UI Primitives, Icons & Design System (`components/ui/` & `app/globals.css`)
- **Hergebruik van UI Primitives**: Gebruik voor interactieve elementen en feedback altijd de officiële componenten uit `components/ui/` (`Button`, `Toast`, `Label`, etc.).
- **Verbod op Raw `<button>` Elements**: Schrijf NOOIT ruwe `<button>` HTML-tags met ad-hoc Tailwind styling in features, blokken of pagina's. Gebruik altijd `<Button>` met de juiste variant (`primary`, `brand`, `secondary`, `link`, `link-dark`).
- **Geen Ad-Hoc Styling-Overrides op UI Componenten**: Vervuil UI-componenten niet met inline styling-overrides via `className` (zoals handmatige `opacity`, `dark:bg-*` of `dark:text-*` hacks). Laat de centrale UI-component zijn eigen styling bepalen; positionering en layout worden verzorgd door de parent container (bijv. een grid of flex wrapper).
- **Icons**: Gebruik altijd `@heroicons/react` (of `react-icons` voor merkiconen zoals GitHub/LinkedIn) in plaats van losse inline `<svg>` elementen. Gebruik in componenten die door client-boundaries geraakt kunnen worden geen wildcard `import * as ...` op volledige icon-sets; gebruik expliciete named imports of een begrensde icon-map zodat tree-shaking intact blijft.
- **Tailwind CSS v4 Design Tokens**: Gebruik uitsluitend de gecentraliseerde design tokens en utility classes gedefinieerd in `app/globals.css`. Gebruik nooit debug-kleuren of ongeldige/typo-classes (zoals `bg-red-200`, `bg-teal-3000`, `spa1ce-y-2`) om styling tijdelijk uit te schakelen — verwijder ongebruikte classes altijd direct.

## 5. Semantische & Domeingerichte Naamgeving (Semantic Domain Naming Policy)
- **STRIKT VERPLICHT: Betekenisvolle variabelenamen conform projectcontext**:
  - Gebruik altijd variabelenamen die direct en ondubbelzinnig uitleggen wat de data voor de gebruiker en de applicatie betekent (bijv. `urlParams`, `projectSlug`, `activeTheme`).
  - Gebruik `heading` en `subheading` voor UI-sectietitels en blokkoppen, zodat `title` strikt gereserveerd blijft voor specifieke CMS-entiteiten (`project.title`, `page.title`) en HTML/document attributen (`document.title`).
  - Neem **NOOIT** blind generieke framework-boilerplate over wanneer die botst met kerndomeinen van het project.

## 6. Verbod op Verouderde of @deprecated API's (Zero-Deprecation Policy)
- **STRIKT VERBODEN: Nooit @deprecated functies, types of syntaxes gebruiken**:
  - Het is ten strengste verboden om methodes, parameters of syntaxes te introduceren die door de geïnstalleerde versie van een dependency als `@deprecated` zijn gemarkeerd (bijv. `@headlessui/react` v2 verouderde aliassen zoals `<DialogDescription>` i.p.v. `<Description>`, `next/image` `priority` i.p.v. `preload` (Next.js 16), `onLoadingComplete` i.p.v. `onLoad`, `images.domains` i.p.v. `remotePatterns`, of verouderde React 19 / Next.js 16 constructies).
  - Inspecteer bij externe packages altijd de typings (`node_modules/<pkg>/**/*.d.ts`) om uitsluitend de actuele stabiele API toe te passen.
  - Zorg dat code in de IDE en TypeScript Language Server 100% vrij is van deprecation hints (`ts 6385`).

## 7. Zelfvoorzienende Feature Components (Self-Contained Features Policy)
- Feature-componenten (zoals `CookieConsent`, `GTMPageTracker`, `ColorModeSelector`) zijn modulair en zelfvoorzienend.
- Ze beheren hun eigen browser events of event subscriptions (`useSyncExternalStore`), en belasten de toplevel shells niet met overbodige state logic.

## 8. Strikte Barrel Exports & No Wildcards in Submappen (Explicit Barrels Policy)
- In feature-, block- en cms/layout/metadata-submappen (`components/features/<domein>/index.ts`, `components/blocks/<domein>/index.ts`, `components/blocks/index.ts`, `lib/cms/index.ts`, `lib/layout/index.ts`, `lib/metadata/index.ts`) zijn wildcard exports (`export *`) ten strengste verboden.
- Gebruik daar uitsluitend expliciet benoemde component-, functie- en type-exports (`export { X } from './X'` en `export type { XProps } from './X'`). Alleen toplevel aggregatie-indexen (`components/index.ts`, `components/ui/index.ts`, `lib/index.ts`, `lib/types/index.ts`) mogen submappen aggregeren.

## 9. No Abbreviations Policy
- Gebruik **NOOIT** afkortingen in component- en bestandsnamen: schrijf altijd voluit `Button` (nooit `Btn`), `Card`, `Dialog`, `Navigation`, etc.

## 10. Wiskundige Geometrie & CSS Layout Verificatie
- **Geen Arbitraire Magic Numbers**: Gebruik nooit willekeurige 'gok'-classes zoals `translate-x-[6.5px]` zonder wiskundige verificatie van parent container borders, paddings en box-sizing.
- **Absolute Positioning & Timeline Nodes**: Berekeningen voor absolute elementen (zoals timeline indicators op borderlijnen) moeten altijd wiskundig sluitend zijn ten opzichte van de parent geometry (bijv. `-left-[11px]` voor een 20px indicator op een 2px borderlijn: hart exact op de lijn).

## 11. Asynchrone Architectuur, ISR, RSC Streaming & Waterfall Preventie (Async & Streaming Policy)
- **Strikt Verbod op `async function` bij Client Components**:
  - Client components (`'use client'`) mogen **NOOIT** `async` zijn. React gooit anders een runtime error.
  - Asynchrone logica op de client leeft uitsluitend in user event handlers (`onClick`, `onSubmit`) of via React 19 Actions (`useTransition`, `useActionState`).
  - Het uitpakken van data-promises die vanaf de server als prop naar een client component worden gestuurd, gebeurt uitsluitend via React 19 `use(promise)` binnen een `<Suspense>` boundary.
- **ISR Route Caching (`revalidate = 3600`) & On-Demand Webhook (`POST /api/revalidate`)**:
  - CMS-routes (`app/(home)/page.tsx`, `app/[...slug]/page.tsx`, `app/portfolio/[slug]/page.tsx`) gebruiken `export const revalidate = 3600;` in combinatie met `generateStaticParams()` (1-regel resolver delegatie) en on-demand invalidatie via `POST /api/revalidate`, zodat SSG/ISR en `<Link>` prefetching optimaal werken. Zet nooit onvoorwaardelijk `export const dynamic = "force-dynamic";` op CMS-pagina's.
- **Per-Segment `loading.tsx` Streaming Skeletons (Geen Dubbele Suspense)**:
  - Gebruik per route-segment een eigen `loading.tsx` (`app/(home)/loading.tsx` → `HomePageSkeleton`, `app/[...slug]/loading.tsx` → `PageSkeleton`, `app/portfolio/[slug]/loading.tsx` → `PortfolioDetailSkeleton`) en plaats nooit een globale `app/loading.tsx` in de root die over andere routes heen lekt.
  - Zorg dat elk skeleton-component de layout, gradient en container-hoogtes van de betreffende pagina exact spiegelt om Cumulative Layout Shift (CLS) te elimineren.
- **Zero-Waterfall Policy (`Promise.all`)**:
  - Voer meervoudige, onderling onafhankelijke data-queries op de server **ALTIJD** parallel uit via `Promise.all([queryA(), queryB()])`.
  - Sequentiële cascades (`const a = await queryA(); const b = await queryB();`) zijn ten strengste verboden tenzij query B expliciet de output van query A vereist.
- **Request Deduplicatie & Server Caching (`React.cache()` + `withServerCache`)**:
  - Alle server data-fetchers in `lib/cms/queries.ts` (`getPage`, `getHomePage`, `getPortfolioItemByUrl`, `getAllPageUrls`, `getAllPortfolioUrls`) MOETEN gewrapt zijn in zowel `cache()` van React als `withServerCache` (60s TTL + in-flight Promise deduplicatie; wordt overgeslagen bij `isPreview` en geleegd via `clearServerQueryCache()` bij revalidatie).
  - Hierdoor delen `generateMetadata()` en de pagina-component dezelfde Promise én worden herhaalde Contentstack SDK (Axios) requests over vervolgnavigaties vanuit het geheugen geserveerd.
- **Next.js 15/16 Async Route Parameters**:
  - `params` en `searchParams` zijn in Next.js 15+ altijd Promises. Unwrap ze altijd asynchroon via `const { slug } = await params;`.
- **Verbod op `setTimeout` / Wait Hacks**:
  - Gebruik **NOOIT** arbitraire `setTimeout(..., 100)` hacks in `useEffect` om te wachten op de DOM of document title. React 19 commit en hoist titles en metadata synchroon vóór effect-executie.
