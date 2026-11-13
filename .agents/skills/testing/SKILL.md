---
name: testing
description: Kwaliteitscontrole, pre-flight validatie, CI-workflows en geheimbeheer.
---

# Testing, Pre-Flight Validatie & Geheimbeheer

## Wanneer te gebruiken

- Bij het valideren van wijzigingen vóór een commit of het controleren van de CI-pijplijn.

## Instructies

### Master Production Quality Gate

Voer vóór elke commit lokaal de volgende controles uit:
1. **Zero-Comment check**:
   `git grep --untracked -n -P "(^|[^:])//|\{/\*" -- "app/" "components/" "lib/"` (0 resultaten voor gewijzigde bestanden; enkel TSDoc `/** ... */` toegestaan).
2. **Zero-Console check**:
   `git grep --untracked -n "console\.log(" -- "app/" "components/" "lib/"` (0 resultaten).
3. **Zero-Any & Centralized Env check**:
   `git grep --untracked -n -P "\bas any\b|:\s*any\b" -- "app/" "components/" "lib/"` en `git grep --untracked -n "process\.env" -- "app/" "components/" "lib/" ":!lib/env.ts"` (0 resultaten).
4. **Image Optimization & Design Token checks** ([`image-optimization.md`](../../rules/image-optimization.md)):
   `git grep --untracked -n -P "\bpriority\b" -- "app/" "components/" ":!app/sitemap.ts"`, `git grep --untracked -n -P "sizes=\x22[^\x22]*\b(sm|md|lg|xl):" -- "app/" "components/"` en `git grep --untracked -n -P "(bg|text|border|ring|fill|stroke|from|via|to)-\[#[0-9a-fA-F]{3,8}\]" -- "app/" "components/"` (0 resultaten).
5. **Unused-Code, Type-check, Lint & Build**:
   `pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters`, `pnpm type-check`, `pnpm lint` en `pnpm build` moeten met 0 fouten of waarschuwingen slagen.

### Geheimbeheer (Credentials Policy)

- Commit nooit echte API keys, delivery tokens of preview tokens. Gebruik uitsluitend placeholders in [`.env.example`](../../../.env.example) en documentatie; echte tokens horen alleen in `.env.local` (genegeerd door Git).

