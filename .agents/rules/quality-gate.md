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

## 3. Zero-Overfetching & Safe Sanitization (Contentstack)
- **Geen overbodige payloads**: Controleer dat Contentstack SDK queries specifiek zijn en `.only(...)` gebruiken waar mogelijk.
- **Geen ongesaniteerde HTML**: Controleer dat geen enkele Contentstack Rich Text weergave direct in `dangerouslySetInnerHTML` staat zonder `isomorphic-dompurify`.
  ```bash
  git grep --untracked -n "dangerouslySetInnerHTML" -- "app/" "components/"
  ```
  *(Moet altijd gezuiverd zijn met DOMPurify.sanitize of het officiële Contentstack Consent/JSON-LD script betreffen)*.

## 4. Linter & Type-Safety Gates
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

