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

