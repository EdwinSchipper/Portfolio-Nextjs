# Contentstack & Data Query Richtlijnen (Contentstack Query Policy)

In dit project hanteren we strikte kwaliteits- en performance-eisen voor alle data queries en interacties met de Contentstack Delivery SDK.

## 1. Verbod op Onnodige Over-fetching & Ongelimiteerde Payloads
- **Optimaliseer Contentstack Queries**:
  - Haal alleen entries en velden op die daadwerkelijk nodig zijn voor de weergave (`.only(...)` bij zware content types of specifieke lijstweergaven).
  - Vermijd diepe ongecontroleerde referentie-resoluties (`includeReference`) tenzij expliciet vereist voor geneste componenten.

## 2. Type-Safety & Data Contracten (`lib/types/`)
- **Sluitende TypeScript Interfaces**:
  - Alle data afkomstig van Contentstack moet 1-op-1 aansluiten op de TypeScript interfaces in `lib/types/`.
  - Pas Live Preview metadata (`$` velden / `data-cslp` bindings) altijd type-veilig toe in de corresponderende interfaces.

## 3. Beveiliging & Rich Text Rendering
- **Veilige HTML Sanitization**:
  - Content afkomstig uit Contentstack Rich Text editors mag NOOIT direct via `dangerouslySetInnerHTML` worden gerenderd zonder sanitization.
  - Gebruik altijd `isomorphic-dompurify` om HTML te zuiveren vóór injectie.

## 4. Live Preview & Visual Builder Integriteit
- Garandeer dat Live Preview attributen (`page?.$` / block `$` bindings) intact blijven op DOM-nodes, zodat editors in Visual Builder direct realtime updates kunnen zien.
- Respecteer lege blok-states via de geëigende Visual Builder classes (`VB_EmptyBlockParentClass`).

