---
trigger: always_on
---

# Master Production Quality Gate & Pre-Flight Checks

Vóór ELKE commit en vóór ELKE push naar een remote branch MOET de agent de Master Production Quality Gate proactief en zonder uitzondering lokaal valideren.

## 1. Zero-Comment Policy (Geen `//` of `{/* */}`)
Productiecode moet zelfdocumenterend en schoon zijn. Achtergebleven debug-commentaar, TODO's of code-notities in productiebestanden zijn niet toegestaan.

- **Verificatiecommando** (inclusief untracked bestanden):
  ```bash
  git grep --untracked -n -P "(^|[^:])//|\{/\*" -- "app/" "components/" "lib/"
  ```
  *(0 resultaten toegestaan; vereiste uitzonderingen: officiële JSDoc/TSDoc documentatieblokken `/** ... */` en URL-protocollen zoals `https://`)*.
- **Let op string literals**: Gebruik in code nooit twee opeenvolgende slashes (`//`) in strings of regexes (tenzij voorafgegaan door `:`), omdat de regex-validator dit markeert als commentaar. Gebruik veilige alternatieven zoals `'/' + '/'`.

## 2. Zero-Console Policy
Geen achtergebleven `console.log` statements in client- of servercode:

- **Verificatiecommando**:
  ```bash
  git grep --untracked -n "console\.log(" -- "app/" "components/" "lib/"
  ```
  *(0 resultaten toegestaan. Gebruik uitsluitend gecontroleerde `console.error` of `console.warn` bij expliciete foutafhandeling)*.

## 3. Zero-Any & Centralized Environment Gates
- **Geen `any` of `as any` casts**:
  ```bash
  git grep --untracked -n -P "\bas any\b|:\s*any\b" -- "app/" "components/" "lib/"
  ```
  *(0 resultaten toegestaan)*.
- **Geen directe `process.env` buiten `lib/env.ts`**:
  ```bash
  git grep --untracked -n "process\.env" -- "app/" "components/" "lib/" ":!lib/env.ts"
  ```
  *(0 resultaten toegestaan)*.

## 4. Zero-Overfetching & Safe Sanitization (Contentstack)
- **Geen overbodige payloads**: Controleer dat Contentstack SDK queries specifiek zijn en `.only(...)` gebruiken waar mogelijk.
- **Geen ongesaniteerde HTML**: Controleer dat geen enkele Contentstack Rich Text weergave direct in `dangerouslySetInnerHTML` staat zonder `isomorphic-dompurify`.
  ```bash
  git grep --untracked -n "dangerouslySetInnerHTML" -- "app/" "components/"
  ```
  *(Moet altijd gezuiverd zijn met DOMPurify.sanitize of het officiële Contentstack Consent/JSON-LD script betreffen)*.

## 5. Image Optimization, Design Token & Accessibility Gates (`next/image` & WCAG 2.2 AA)
Conform [`.agents/rules/image-optimization.md`](image-optimization.md), [`.agents/rules/official-stack-standards.md`](official-stack-standards.md) en [`.agents/rules/accessibility.md`](accessibility.md):
```bash
git grep --untracked -n -P "\bpriority\b" -- "app/" "components/" ":!app/sitemap.ts"
git grep --untracked -n -P "sizes=\x22[^\x22]*\b(sm|md|lg|xl):" -- "app/" "components/"
git grep --untracked -n -P "(bg|text|border|ring|fill|stroke|from|via|to)-\[#[0-9a-fA-F]{3,8}\]" -- "app/" "components/"
git grep --untracked -n -P "(bg|text|border|ring|fill|stroke|from|via|to)-(red|green|blue|yellow|teal|indigo|purple|pink|orange|amber|lime|emerald|cyan|sky|violet|fuchsia|rose)-[0-9]{2,4}|-[0-9]{4}\b" -- "app/" "components/"
```
*(0 resultaten toegestaan: `priority` is deprecated sinds Next.js 16 → gebruik `preload`; `sizes` bevat uitsluitend geldige media queries; kleuren gebruiken uitsluitend `@theme` tokens uit `app/globals.css` zonder debug-paletten of ongeldige 4-cijferige schalen; verwijder ook handmatig uitgeschakelde/typo Tailwind-classes zoals `spa1ce-y-2` of `lg:ga1p-16` altijd direct. `quality={...}` waarden moeten in `images.qualities` staan.)*

## 6. Linter, Unused-Code & Type-Safety Gates
- **Ongebruikte imports, variabelen & parameters (`react-jsx`)**:
  ```bash
  pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters
  ```
  *(0 resultaten toegestaan; voorkomt o.a. achtergebleven `import React from "react"` en dode lokale bindings)*.
- **TypeScript compilatie**:
  ```bash
  pnpm type-check
  ```
  *(Moet eindigen met 0 fouten, `tsc --noEmit`)*.
- **ESLint**:
  ```bash
  pnpm lint
  ```
  *(Moet slagen met 0 errors en 0 warnings)*.
- **Next.js Productiebuild**:
  ```bash
  pnpm build
  ```
  *(Moet succesvol compileren zonder build waarschuwingen)*.

