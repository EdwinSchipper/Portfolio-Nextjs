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
- Zorg dat client-side Live Preview wrappers (`Preview.tsx`) strikt gescheiden blijven van Server Components en geen onnodige hydrate-mismatches veroorzaken.
