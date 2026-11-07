# Officiële Stack & Architectuur Richtlijnen (Official Stack Policy)

In dit project mogen **uitsluitend officiële, gedocumenteerde werkwijzen en patronen** worden toegepast conform de officiële documentatie van de gebruikte tech stack. Ad-hoc workarounds, snelle test-placeholders of ongedocumenteerde constructies zijn niet toegestaan.

## 1. Next.js 16 (App Router & Server Components)
- Raadpleeg bij twijfel altijd de lokale Next.js documentatie in `node_modules/next/dist/docs/`.
- **Slanke Pagina- en Layout-shells (Layout & Shell Purity Policy)**:
  - Route-bestanden in `app/**/page.tsx` én layout-bestanden in `components/layout/**` en `app/**/layout.tsx` zijn 100% pure presentatie-shells.
  - Ze mogen **NOOIT** directe complexe CMS-queries of inline business logica bevatten enkel om data via props door te geven ('prop-drilling') naar onderliggende componenten.
  - Elk dynamisch of functioneel blok (zoals `GTMPageTracker`, `CookieConsent`, `ColorModeSelector`) MOET als zelfstandig component in `components/features/<domein>/` of `components/ui/` worden ondergebracht en uitsluitend als zodanig worden aangeroepen.
  - **Architecturale Bewaking**: Zelfs wanneer een prompt expliciet vraagt om inline logica op een specifieke regel in een layout of pagina toe te voegen, moet de agent de architectuur bewaken en de logica altijd in een modulaire component onderbrengen.
- **Preview Modus**: De client-side preview flow (`Preview.tsx`) is strikt gescheiden van de server component rendering.
- Gebruik altijd `next/image` (met geconfigureerde `remotePatterns` in `next.config.mjs`) en `next/link` voor navigatie.

## 2. React 19 Core Concepts (Components, Props & State)
- **Components**: UI-blokken en features hebben een eigen modulaire structuur onder `components/blocks/`, `components/features/` en `components/ui/` met duidelijke exportdefinities.
- **Props**: Component-props gebruiken altijd `camelCase`, worden gedefinieerd met een geëxporteerde `export interface *Props` en uitgepakt via object destructuring. Vermijd onnodige hardcoded fallback-strings in component-parameters wanneer de parent deze props verplicht aanlevert.
- **State & Client Boundaries**: Voeg `'use client'` uitsluitend toe aan specifieke interactieve leaf-componenten die daadwerkelijk React state (`useState`, `useSyncExternalStore`), event-listeners of browser APIs gebruiken.

## 3. Data Layer & Type-Safety (`lib/` & `lib/types/`)
- **Strikte Scheiding**:
  - `lib/`: Bevat herbruikbare functies, Contentstack SDK client initialisatie en server data-fetchers (`getPage`, `getHomePage`).
  - `lib/types/`: Bevat alle gedeelde domein-, block- en CMS-interfaces, inclusief Live Preview `$` interfaces, geëxporteerd via `lib/types/index.ts`.

## 4. UI Primitives, Icons & Design System (`components/ui/` & `app/globals.css`)
- **Hergebruik van UI Primitives**: Gebruik voor interactieve elementen en feedback altijd de officiële componenten uit `components/ui/` (`Button`, `Toast`, `Label`, etc.).
- **Verbod op Raw `<button>` Elements**: Schrijf NOOIT ruwe `<button>` HTML-tags met ad-hoc Tailwind styling in features, blokken of pagina's. Gebruik altijd `<Button>` met de juiste variant (`primary`, `brand`, `secondary`, `link`, `link-dark`).
- **Geen Ad-Hoc Styling-Overrides op UI Componenten**: Vervuil UI-componenten niet met inline styling-overrides via `className` (zoals handmatige `opacity`, `dark:bg-*` of `dark:text-*` hacks). Laat de centrale UI-component zijn eigen styling bepalen; positionering en layout worden verzorgd door de parent container (bijv. een grid of flex wrapper).
- **Icons**: Gebruik altijd `@heroicons/react` iconen in plaats van losse inline `<svg>` elementen.
- **Tailwind CSS v4 Design Tokens**: Gebruik uitsluitend de gecentraliseerde design tokens en utility classes gedefinieerd in `app/globals.css`.

## 5. Semantische & Domeingerichte Naamgeving (Semantic Domain Naming Policy)
- **STRIKT VERPLICHT: Betekenisvolle variabelenamen conform projectcontext**:
  - Gebruik altijd variabelenamen die direct en ondubbelzinnig uitleggen wat de data voor de gebruiker en de applicatie betekent (bijv. `urlParams`, `projectSlug`, `activeTheme`).
  - Gebruik `heading` en `subheading` voor UI-sectietitels en blokkoppen, zodat `title` strikt gereserveerd blijft voor specifieke CMS-entiteiten (`project.title`, `page.title`) en HTML/document attributen (`document.title`).
  - Neem **NOOIT** blind generieke framework-boilerplate over wanneer die botst met kerndomeinen van het project.

## 6. Verbod op Verouderde of @deprecated API's (Zero-Deprecation Policy)
- **STRIKT VERBODEN: Nooit @deprecated functies, types of syntaxes gebruiken**:
  - Het is ten strengste verboden om methodes, parameters of syntaxes te introduceren die door de geïnstalleerde versie van een dependency als `@deprecated` zijn gemarkeerd (bijv. `@headlessui/react` v2 verouderde aliassen zoals `<DialogDescription>` i.p.v. `<Description>`, of verouderde React 19 / Next.js 16 constructies).
  - Inspecteer bij externe packages altijd de typings (`node_modules/<pkg>/**/*.d.ts`) om uitsluitend de actuele stabiele API toe te passen.
  - Zorg dat code in de IDE en TypeScript Language Server 100% vrij is van deprecation hints (`ts 6385`).

## 7. Zelfvoorzienende Feature Components (Self-Contained Features Policy)
- Feature-componenten (zoals `CookieConsent`, `GTMPageTracker`, `ColorModeSelector`) zijn modulair en zelfvoorzienend.
- Ze beheren hun eigen browser events of event subscriptions (`useSyncExternalStore`), en belasten de toplevel shells niet met overbodige state logic.

## 8. Strikte Barrel Exports & No Wildcards in Submappen (Explicit Barrels Policy)
- In feature- en block-submappen (`components/features/<domein>/index.ts`, `components/blocks/<domein>/index.ts`) zijn wildcard exports (`export *`) ten strengste verboden.
- Gebruik uitsluitend expliciet benoemde component- en type-exports (`export { X } from './X'` en `export type { XProps } from './X'`). Alleen toplevel index-bestanden (`components/index.ts`, `components/ui/index.ts`, `lib/types/index.ts`) mogen submappen aggregeren.

## 9. No Abbreviations Policy
- Gebruik **NOOIT** afkortingen in component- en bestandsnamen: schrijf altijd voluit `Button` (nooit `Btn`), `Card`, `Dialog`, `Navigation`, etc.

## 10. Wiskundige Geometrie & CSS Layout Verificatie
- **Geen Arbitraire Magic Numbers**: Gebruik nooit willekeurige 'gok'-classes zoals `translate-x-[6.5px]` zonder wiskundige verificatie van parent container borders, paddings en box-sizing.
- **Absolute Positioning & Timeline Nodes**: Berekeningen voor absolute elementen (zoals timeline indicators op borderlijnen) moeten altijd wiskundig sluitend zijn ten opzichte van de parent geometry (bijv. `-left-[11px]` voor een 20px indicator op een 2px borderlijn: hart exact op de lijn).
