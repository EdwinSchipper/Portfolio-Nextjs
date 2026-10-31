# Officiële Stack & Architectuur Richtlijnen (Official Stack Policy)

In dit project mogen **uitsluitend officiële, gedocumenteerde werkwijzen en patronen** worden toegepast conform de officiële documentatie van de gebruikte tech stack. Ad-hoc workarounds, snelle test-placeholders of ongedocumenteerde constructies zijn niet toegestaan.

## 1. Next.js 16 (App Router)
- Raadpleeg bij twijfel altijd de lokale Next.js documentatie in `node_modules/next/dist/docs/`.
- **Slanke Pagina-shells**: Route-bestanden in `app/**/page.tsx` zijn Server Components die server-side data ophalen (`getPage` / `getHomePage`) en doorgeven aan de page display componenten.
- **Preview Modus**: De client-side preview flow (`Preview.tsx`) is strikt gescheiden van de production server component flow.
- Gebruik altijd `next/image` (met geconfigureerde `remotePatterns` in `next.config.mjs`) en `next/link` voor navigatie.

## 2. React 19 Core Concepts (Components, Props & State)
- **Components**: UI-blokken en features hebben een eigen modulaire structuur onder `components/blocks/` en `components/features/` met duidelijke exportdefinities.
- **Props**: Component-props gebruiken altijd `camelCase`, worden gedefinieerd met een geëxporteerde `export interface *Props` en uitgepakt via object destructuring.
- **State & Client Boundaries**: Voeg `'use client'` uitsluitend toe aan componenten die daadwerkelijk React state (`useState`, `useEffect`), event-listeners of browser APIs gebruiken (zoals de Live Preview wrapper).

## 3. Data Layer & Type-Safety (`lib/` & `lib/types/`)
- **Strikte Scheiding**:
  - `lib/`: Bevat herbruikbare logica, Contentstack SDK client initialisatie en server data fetch functies.
  - `lib/types/`: Bevat alle gedeelde domein-, block- en CMS-interfaces, inclusief Live Preview `$` interfaces.

## 4. UI & Styling
- Gebruik uitsluitend **Tailwind CSS v4** classes en officiële `@heroicons/react` iconen.

## 5. Zero-Deprecation & Actuele Library API Standaarden
- **Geen Deprecated Aliassen**: Pas altijd uitsluitend de actuele API-syntaxis toe van geïnstalleerde packages (zoals `@headlessui/react` v2, Next.js 16, React 19).
- **Headless UI v2**: Gebruik actuele componenten zoals `<Description>` (en nooit de verouderde `<DialogDescription>`), Tailwind `data-closed` modifier classes en ingebouwde `transition` props.
- **Strict Lint & Type Deprecations**: TypeScript-deprecations (`@deprecated` / `ts(6385)`) en linter warnings moeten direct bij de eerste implementatieslag opgelost zijn en mogen nooit als 'acceptabel' worden beschouwd.

## 6. Wiskundige Geometrie & CSS Layout Verificatie
- **Geen Arbitraire Magic Numbers**: Gebruik nooit willekeurige 'gok'-classes zoals `translate-x-[6.5px]` zonder wiskundige verificatie van parent container borders, paddings en box-sizing.
- **Absolute Positioning & Timeline Nodes**: Berekeningen voor absolute elementen (zoals timeline indicators op borderlijnen) moeten altijd wiskundig sluitend zijn ten opzichte van de parent geometry (bijv. `-left-[11px]` voor een 20px indicator op een 2px borderlijn: hart op `x = -1px`).

## 7. Design System & UI Component Integriteit (`components/ui/`)
- **Hergebruik van UI Primitives**: Gebruik voor interactieve elementen en feedback altijd de officiële componenten uit `components/ui/` (`Button`, `Toast`, `Label`, etc.).
- **Verbod op Raw `<button>` Elements**: Schrijf nooit losse `<button>` HTML-tags met ad-hoc Tailwind styling in features, blokken of pagina's. Gebruik altijd `<Button>` met de juiste variant (`primary`, `brand`, `secondary`, `link`, `link-dark`).
- **Geen Ad-Hoc Styling-Overrides op UI Componenten**: Vervuil UI-componenten niet met inline styling-overrides via `className` (zoals handmatige `opacity`, `dark:bg-*` of `dark:text-*` hacks). Laat de centrale UI-component zijn eigen styling bepalen.
- **Strikte Scheiding van UI en Feature Logica**:
  - `components/ui/`: Bevat pure, herbruikbare presentatie-componenten (zoals `Toast.tsx`, `Button.tsx`).
  - `components/features/`: Bevat uitsluitend business/applicatielogica (zoals `CookieConsent.tsx`), die de UI opbouwt door het componeren van `components/ui/` componenten zonder daarin eigen card/button styling opnieuw uit te vinden.
