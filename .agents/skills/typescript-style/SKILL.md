---
name: typescript-style
description: Strikte TypeScript 5 conventies, Zero-Any en Zero-Deprecation beleid, en domein-gedreven interfaces in lib/types/.
---

# TypeScript & Linting Standaarden

## Wanneer te gebruiken

- Bij het aanpassen van TypeScript interfaces in [`lib/types/`](../../../lib/types/), component-props of ESLint/TSConfig instellingen.

## Instructies

### Strikte Type-Safety & Zero-Any Beleid

- [`tsconfig.json`](../../../tsconfig.json) staat op `"strict": true` met pad-alias `@/*`.
- **Zero-Any Policy**: Het gebruik van `any` of `as any` casts in `app/`, `components/` en `lib/` is **strikt verboden**. Vang Contentstack schema-variaties altijd type-veilig op in [`lib/types/blocks.ts`](../../../lib/types/blocks.ts), [`lib/types/pages.ts`](../../../lib/types/pages.ts) en [`lib/types/core.ts`](../../../lib/types/core.ts).
- **Zero-Deprecation Policy**: Gebruik nooit `@deprecated` gemarkeerde functies, componenten of types (`ts 6385`).
- **React 19 `react-jsx` & Unused Imports**: `tsconfig.json` staat op `"jsx": "react-jsx"`. Schrijf nooit `import React from "react"` voor JSX; haal types bij voorkeur binnen met `import type { ReactNode }` en verifieer op 0 dode imports via `tsc --noEmit --noUnusedLocals --noUnusedParameters`.

### Component Props & Naamgeving

- Definieer en exporteer voor elk component een `export interface *Props` met `camelCase` properties.
- Gebruik `heading` en `subheading` voor UI-sectiekoppen zodat `title` gereserveerd blijft voor CMS-entiteiten en HTML-attributen.
- Gebruik geen afkortingen in component- of bestandsnamen (`Button`, `Navigation`, `Dialog`).

