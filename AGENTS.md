<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Contentstack Kickstart: Next.js – Agent Guide

**Universeel startpunt** voor contributors en AI-agents. Gedetailleerde conventies en diepgaande regels zijn vastgelegd in [`.agents/rules/`](.agents/rules/), [`.agents/agents/`](.agents/agents/) en [`.agents/skills/*/SKILL.md`](.agents/skills/).

## Projectoverzicht & Doel

| Veld | Detail |
| --- | --- |
| **Applicatie:** | Portfolio Website van Edwin Schipper |
| **Doel:** | Productie portfolio-website gebouwd met Next.js 16 App Router, React 19, Tailwind CSS 4 en Contentstack Headless CMS (Delivery SDK, Visual Builder & Live Preview). |
| **Repository:** | https://github.com/EdwinSchipper/Portfolio-Nextjs |

## Tech Stack & Tooling

| Gebied | Details |
| --- | --- |
| **Taal** | TypeScript 5 (`strict` in [tsconfig.json](tsconfig.json)) |
| **Framework** | Next.js 16.4 (Turbopack, App Router, Server Components in [next.config.mjs](next.config.mjs)) |
| **UI & Styling** | React 19, Tailwind CSS 4 ([postcss.config.mjs](postcss.config.mjs), [app/globals.css](app/globals.css)), Headless UI v2 ([@headlessui/react](package.json)), Heroicons |
| **CMS & Data** | Contentstack Delivery SDK v5, Contentstack Live Preview Utils v4, DOMPurify (`isomorphic-dompurify`) |
| **Analytics** | Google Tag Manager (`@next/third-parties/google`), Google Consent Mode v2 |
| **Linter & Build** | ESLint 9 (flat config in [eslint.config.mjs](eslint.config.mjs)), `eslint-config-next` |

## Commando's (Quick Reference)

| Commando | Doel |
| --- | --- |
| `pnpm install` | Afhankelijkheden installeren |
| `pnpm dev` | Lokale ontwikkelsessie starten (Turbopack) |
| `pnpm build` | Productie Next.js applicatie compileren |
| `pnpm start` | Productieserver lokaal draaien |
| `pnpm lint` | ESLint validatie uitvoeren |
| `pnpm type-check` | TypeScript types controleren (`tsc --noEmit`) |

---

## Git Commit Message Guidelines (Nederlands)

Commit messages moeten te allen tijde haarscherp, specifiek en informatief zijn. Generieke of vage omschrijvingen zijn niet toegestaan.
Als **harde regel** geldt dat de voertaal van alle commit messages (onderwerp en body) **ALTIJD het Nederlands** is.

### 1. Formaat
```text
<type>(<specifieke-scope>): <gebiedende wijs omschrijving van de kernwijziging in het Nederlands>

[Verplichte body bij wijzigingen met meer dan 1 bestand of bij logica-aanpassingen]
- Waarom: <concrete aanleiding, bug of doel>
- Wat: <specifieke functies, interfaces, componenten of bestanden die zijn gewijzigd>
- Impact: <technische of visuele consequentie, bijv. type-safety, Live Preview binding, layout geometrie>
```

### 2. Typen & Specifieke Scopes
- `feat`: Nieuwe functionaliteit of route (bijv. `(portfolio-detail)`, `(cookie-consent)`, `(hero-banner)`)
- `fix`: Bugfix of correctie (bijv. `(timeline-node)`, `(preview-binding)`, `(scrollbar-padding)`)
- `perf`: Performance-, caching- of streaming-optimalisatie (bijv. `(cms-caching)`, `(routing-cms)`, `(image-delivery)`)
- `refactor`: Structuur- of architectuurwijziging zonder feature-wijziging (bijv. `(analytics-utils)`, `(ui-primitives)`)
- `style`: Visuele afwerking of CSS conform design system (bijv. `(button-variants)`, `(dark-mode)`)
- `docs`: Documentatie of agent instructies (bijv. `(readme)`, `(agents-md)`, `(quality-gate)`)
- `chore`: Tooling, configs, dependencies (bijv. `(next-config)`, `(eslint)`, `(deps)`)

### 3. Strikte Kwaliteitseisen
1. **Geen vage omschrijvingen**: Gebruik nooit generieke termen zoals "update code", "fix bug", "changes", "tweaks" of "refactor components".
2. **Specifieke Scopes**: Gebruik de meest nauwe scope (`(portfolio-detail)` i.p.v. `(app)` of `(components)`).
3. **Benoem het 'Wat' én het 'Waarom'**: Een commit message moet over 6 maanden nog exact duidelijk maken welke ontwerpkeuze is gemaakt.
4. **Voertaal ALTIJD Nederlands**: Zowel de onderwerpregel als de body zijn 100% in het Nederlands geschreven.

### 4. Voorbeelden (Goed vs. Fout)
| Fout (te generiek / Engels) ❌ | Goed (specifiek, contextrijk & Nederlands) ✅ |
| :--- | :--- |
| `feat(detail): add page` | `feat(portfolio-detail): voeg dynamische /portfolio/[slug] pagina met Live Preview toe` |
| `fix(ui): fix button` | `fix(cookie-consent): harmoniseer knoppen via Button UI primitive en verwijder inline overrides` |
| `refactor(components): reorder folders` | `refactor(analytics): centraliseer page_view payload logica in analytics-utils helper` |
| `style(timeline): update position` | `style(timeline): centreer bolletje exact op de rasterlijn via wiskundige -left-[11px] offset` |
| `chore: update dependencies` | `chore(deps): upgrade @headlessui/react naar v2.2.10 en migreer Description alias` |

---

## Wijzigingen & Goedkeuringsbeleid (Change Approval Policy)

- **STRIKT VERBODEN: Nooit zelfstandig commits of pushes maken**:
  - Voer NOOIT uit eigen beweging een `git commit` of `git push` uit.
  - Vraag na het valideren/testen altijd eerst aan de gebruiker of er gecommit mag worden, en stel het commitbericht in het Nederlands voor.
  - Voer `git commit` UITSLUITEND en ALLEEN uit wanneer de gebruiker hier expliciet en letterlijk opdracht toe heeft gegeven (bijv. "commit", "maak een commit", "ja commit").

- **Aanpassingen niet stilzwijgend doorvoeren**:
  - Voer geen ingrijpende wijzigingen, bestandsoverschrijvingen of configuratie-aanpassingen stilzwijgend of automatisch door zonder dat de gebruiker hiervoor expliciet akkoord heeft gegeven of erom heeft gevraagd.
  - Leg voorgestelde wijzigingen altijd eerst duidelijk en beknopt uit (welke bestanden, wat er verandert en waarom), zodat de gebruiker deze kan beoordelen.
  - Geef de gebruiker te allen tijde de regie over het accepteren of weigeren van codeaanpassingen en git commits.
  - Vraag bij twijfel of meerdere oplossingsrichtingen eerst om verduidelijking of toestemming voordat je bestanden wijzigt.

---

## Import-integriteit & Refactoring Beleid (Import Integrity & Cleanup Policy)

Na elke herstructurering, verplaatsing van bestanden (`git mv`), hernoeming of refactoring MOET de agent altijd proactief de volgende controles uitvoeren:
1. **Codebase-breed zoeken op oude paden en exports**:
   - Controleer via grep of verouderde relatieve paden (bijv. `./Header`, `components/ui/Header`) of oude identifiers ergens zijn achtergebleven.
   - Loop alle betrokken `index.ts` (barrel) bestanden na: verwijder verouderde exports en zorg dat nieuwe paden correct zijn opgenomen.
2. **Afhankelijkheids- & typecontrole**:
   - Voer altijd `pnpm type-check` (`tsc --noEmit`) uit om te verifiëren dat alle TypeScript imports en types sluitend zijn.
   - Voer altijd `pnpm lint` uit om te garanderen dat de linter geen ongebruikte variabelen of verouderde imports signaleert.
3. **Documentatie & referenties**:
   - Controleer of documentatiebestanden (zoals `README.md` of `AGENTS.md`) nog verwijzen naar verouderde structuren en werk deze direct bij.
4. **Proactieve rapportage**:
   - Meld de uitkomst van deze import- en syntaxcontroles altijd expliciet en beknopt in de samenvatting aan de gebruiker.

---

## Contentstack & Data Query Richtlijnen (Contentstack Query Policy)

- **Verbod op Onnodige Over-fetching**:
  - Haal uitsluitend de benodigde velden op (`.only(...)`). Vermijd ongecontroleerde geneste referentie-resoluties (`includeReference`).
- **Sluitende Type-Safety in `lib/types/`**:
  - Alle data afkomstig van Contentstack moet 1-op-1 aansluiten op de TypeScript interfaces in `lib/types/`.
  - Pas Live Preview metadata (`$` velden / `data-cslp` bindings) altijd type-veilig toe. Geen ad-hoc `any` casts.
- **HTML Sanitization**:
  - Content afkomstig uit Contentstack Rich Text mag NOOIT direct via `dangerouslySetInnerHTML` worden gerenderd zonder sanitization. Gebruik ALTIJD `isomorphic-dompurify`.
- **Live Preview & Visual Builder Integriteit**:
  - Garandeer dat Live Preview attributen (`page?.$` / block `$` bindings en `data-cslp`) intact blijven op DOM-nodes.
  - Respecteer Visual Builder lege blok-states via `VB_EmptyBlockParentClass`.

---

## Officiële Stack & Architectuur Richtlijnen (Official Stack Policy)

- **STRIKT VERPLICHT: Uitsluitend officiële werkwijzen conform stack-documentatie**:
  - Pas in dit project alleen patronen toe conform de officiële documentatie van **Next.js 16** (`node_modules/next/dist/docs/`), **React 19**, **Tailwind CSS v4**, **Headless UI v2** en **Contentstack SDK v5**.
  - Geen ad-hoc workarounds, inline placeholder-hacks of ongedocumenteerde constructies.
- **Architectuurstandaarden**:
  1. **Slanke Pagina- en Layout-shells & DRY Route Resolvers (Layout & Shell Purity Policy)**:
     - Layouts (`components/layout/**` en `app/**/layout.tsx`) en pagina-shells (`app/**/page.tsx`) zijn 100% pure presentatie-shells.
     - Ze mogen **NOOIT** directe complexe CMS queries, inline data-/URL-transformaties (`.split()`, `.filter()`, `.map()`) of inline business logica bevatten.
     - Route-level functies zoals `generateMetadata()` en `generateStaticParams()` in `app/**/page.tsx` zijn altijd een 1-regel delegatie naar centrale resolvers in `lib/metadata/` of `lib/cms/` (`getDynamicRouteStaticParams`, `getPortfolioRouteStaticParams`).
     - In `lib/cms/queries.ts` geldt een strikt **DRY Query Consolidation** principe: gedeelde SDK-logica (`isConfigured`, `withServerCache`, `addEditableTags`, `.only(["url", "updated_at"])`) loopt altijd via centrale generieke helpers (`fetchSingleEntry`, `fetchEntryUrls`).
     - Elk dynamisch of functioneel blok (zoals `GTMPageTracker`, `CookieConsent`, `ColorModeSelector`) MOET een zelfstandig component zijn.
     - Zelfs wanneer een prompt of externe documentatie inline logica in een layout of pagina toont, moet de agent de architectuur bewaken en de logica altijd centraal in `lib/` of in een modulaire component onderbrengen.
  2. **React 19 Core Concepts (Components, Props, State)**:
     - Props gebruiken altijd `camelCase`, een geëxporteerde `export interface *Props` en object destructuring.
     - `'use client'` wordt uitsluitend geplaatst op interactieve leaf-componenten die daadwerkelijk React state of browser events vereisen.
  3. **Strikte Scheiding `lib/`, `lib/env.ts` en `lib/types/`**:
     - `lib/`: Bevat herbruikbare functies, SDK initialisaties en server data-fetchers (`getPage`, `getHomePage`).
     - `lib/env.ts`: **Centralized Environment Policy**. Alle omgevingsvariabelen (`NEXT_PUBLIC_*`, `NODE_ENV`, `CONTENTSTACK_REVALIDATE_SECRET`) MOETEN centraal worden uitgelezen, getrimd en gevalideerd in `lib/env.ts`. Directe `process.env` aanroepen in `app/`, `components/` of overige bestanden in `lib/` zijn **STRIKT VERBODEN** (enige uitzondering is `next.config.mjs`).
     - `lib/types/`: Bevat alle gedeelde interfaces, inclusief block- en Live Preview `$` interfaces, geëxporteerd via `lib/types/index.ts`.
  4. **UI Primitives & Design System (`components/ui/` & `app/globals.css`)**:
     - Gebruik NOOIT ruwe `<button>` HTML elementen met ad-hoc Tailwind styling in features, blokken of pagina's; gebruik altijd `<Button>` uit `@/components/ui`.
     - Vervuil UI-componenten nooit met inline styling-overrides via `className` (zoals `opacity-70`). Laat de UI primitive zijn eigen styling bepalen; layout wordt bepaald door de parent wrapper.
     - Gebruik uitsluitend `@heroicons/react` iconen; geen losse inline `<svg>` elementen.
     - Gebruik centrale Tailwind v4 tokens uit `app/globals.css`.
  5. **Semantische & Domeingerichte Naamgeving (Semantic Domain Naming Policy)**:
     - Gebruik betekenisvolle, contextuele variabelenamen (bijv. `urlParams`, `projectSlug`, `activeTheme`).
     - Gebruik `heading` en `subheading` voor UI-sectietitels en kaartkoppen, zodat `title` strikt gereserveerd blijft voor specifieke CMS-entiteiten (`project.title`, `page.title`) en HTML-attributen (`document.title`).
  6. **Strikt Verbod op @deprecated API's (Zero-Deprecation Policy)**:
     - Het is ten strengste verboden methodes, parameters of aliassen te gebruiken die door de geïnstalleerde package als `@deprecated` zijn aangemerkt (zoals `@headlessui/react` v2 `<DialogDescription>` i.p.v. `<Description>`, of legacy React APIs).
     - Inspecteer proactief `.d.ts` definities; zorg voor 0 deprecation hints (`ts 6385`).
  7. **Zelfvoorzienende Feature Components (Self-Contained Features Policy)**:
     - Features zijn modulair en zelfvoorzienend; ze beheren hun eigen event subscriptions (`useSyncExternalStore`) en state zonder toplevel shells te vervuilen.
  8. **Strikte Barrel Exports & No Wildcards in Submappen (Explicit Barrels Policy)**:
     - In feature-, block- en cms/layout/metadata-submappen (`components/features/<domein>/index.ts`, `components/blocks/<domein>/index.ts`, `components/blocks/index.ts`, `lib/cms/index.ts`, `lib/layout/index.ts`, `lib/metadata/index.ts`) zijn wildcard exports (`export *`) ten strengste verboden. Gebruik uitsluitend expliciet benoemde exports (`export { X } from './X'` en `export type { XProps } from './X'`). Alleen toplevel aggregatie-indexen (`components/index.ts`, `components/ui/index.ts`, `lib/index.ts`, `lib/types/index.ts`) mogen submappen aggregeren.
  9. **No Abbreviations Policy**:
     - Schrijf component- en bestandsnamen ALTIJD voluit: `Button` (nooit `Btn`), `Card`, `Dialog`, `Navigation`, etc.
  10. **Wiskundige Geometrie & CSS Layout Verificatie**:
     - Geen arbitraire magic numbers (`translate-x-[6.5px]`). Alle positionering moet wiskundig sluitend zijn ten opzichte van border, padding en elementafmetingen (zoals `-left-[11px]` voor een 20px indicator op een 2px borderlijn: hart exact op de lijn).
  11. **Asynchrone Architectuur, ISR, RSC Streaming & Waterfall Preventie (Async & Streaming Policy)**:
     - Client components (`'use client'`) mogen **NOOIT** `async` zijn; asynchrone logica leeft in user event handlers of React 19 Actions (`useTransition`, `useActionState`, `use(promise)`).
     - CMS-routes (`app/(home)/page.tsx`, `app/[...slug]/page.tsx`, `app/portfolio/[slug]/page.tsx`) gebruiken `export const revalidate = 3600;` in combinatie met `generateStaticParams()` (1-regel resolver delegatie) en on-demand invalidatie via `POST /api/revalidate`, geen onnodige `export const dynamic = "force-dynamic";`.
     - Elke route-segment map (`app/(home)/`, `app/[...slug]/`, `app/portfolio/[slug]/`) heeft een eigen `loading.tsx` met het bijbehorende CLS-vrije skeleton (`HomePageSkeleton`, `PageSkeleton`, `PortfolioDetailSkeleton`), zodat skeletons nooit tussen routes lekken of dubbel gestapeld worden.
     - Meervoudige server-queries worden **ALTIJD** parallel uitgevoerd via `Promise.all` om waterfalls te voorkomen.
     - Server CMS data-fetchers (`getPage`, `getHomePage`, `getPortfolioItemByUrl`, `getAllPageUrls`, `getAllPortfolioUrls`) MOETEN in zowel `React.cache()` als `withServerCache` (60s TTL + in-flight deduplicatie; wordt overgeslagen bij `isPreview` en geleegd via `clearServerQueryCache()` bij revalidatie) staan.
     - Route parameters in Next.js 15/16 zijn Promises: altijd unwrap met `const { slug } = await params;`.
     - Verbod op willekeurige `setTimeout` / wait hacks in `useEffect`.

---

## Master Production Quality Gate & Pre-Flight Checks

Vóór ELKE commit en vóór ELKE push naar een remote branch MOET de agent de Master Production Quality Gate proactief en zonder uitzondering lokaal valideren:

1. **Zero-Comment Policy (Geen `//` of `{/* */}`)**:
   - Controleer ALTIJD inclusief untracked/unstaged bestanden via:
     ```bash
     git grep --untracked -n -P "(^|[^:])//|\{/\*" -- "app/" "components/" "lib/"
     ```
     *(0 resultaten toegestaan; uitgezonderd officiële JSDoc/TSDoc blokken `/** ... */` en URL-protocollen)*.
   - **Let op string literals**: Gebruik in code NOOIT twee opeenvolgende slashes (`//`) in strings of regexes (tenzij voorafgegaan door `:`), omdat de regex dit markeert als commentaar. Gebruik veilige alternatieven zoals `'/' + '/'`.
2. **Zero-Console Policy**:
   - ```bash
     git grep --untracked -n "console\.log(" -- "app/" "components/" "lib/"
     ```
     *(0 resultaten toegestaan)*.
3. **Zero-Any & Centralized Environment Gates**:
   - ```bash
     git grep --untracked -n -P "\bas any\b|:\s*any\b" -- "app/" "components/" "lib/"
     git grep --untracked -n "process\.env" -- "app/" "components/" "lib/" ":!lib/env.ts"
     ```
     *(0 resultaten toegestaan)*.
4. **Zero-Overfetching & Safe Sanitization**:
   - Alle Contentstack Rich Text weergaves in `dangerouslySetInnerHTML` moeten gezuiverd zijn met `isomorphic-dompurify`.
5. **Image Optimization Gate** ([`.agents/rules/image-optimization.md`](.agents/rules/image-optimization.md)):
   - ```bash
     git grep --untracked -n -P "\bpriority\b" -- "app/" "components/" ":!app/sitemap.ts"
     git grep --untracked -n -P "sizes=\x22[^\x22]*\b(sm|md|lg|xl):" -- "app/" "components/"
     ```
     *(0 resultaten toegestaan)*.
6. **Linter & Type-Safety Gates**:
   - `pnpm type-check` (0 errors, `tsc --noEmit`).
   - `pnpm lint` (0 warnings/errors).
   - `pnpm build` (succesvolle Next.js productiebuild).

---

## Agent Rules & Policies ([`.agents/`](.agents/))

Strikte regels en kwaliteitsstandaarden voor agents zijn georganiseerd in [`.agents/rules/`](.agents/rules/):

| Regel | Pad | Doel |
| --- | --- | --- |
| Change Approval | [`.agents/rules/change-approval.md`](.agents/rules/change-approval.md) | Nooit zelfstandig committen of pushen; altijd expliciete toestemming |
| Git Commits | [`.agents/rules/git-commits.md`](.agents/rules/git-commits.md) | Conventional Commits standaard met verplichte body bij grotere wijzigingen; **voertaal ALTIJD Nederlands** |
| Import Integrity | [`.agents/rules/import-integrity.md`](.agents/rules/import-integrity.md) | Opschonen oude paden/barrels na refactor, `tsc --noEmit` & lint |
| Contentstack Queries | [`.agents/rules/contentstack-queries.md`](.agents/rules/contentstack-queries.md) | Payload-optimalisatie, DRY queries, server TTL-cache, sanitization en Visual Builder integriteit |
| Analytics Standards | [`.agents/rules/analytics-standards.md`](.agents/rules/analytics-standards.md) | Google Tag Manager, GA4, Consent Mode v2 (`IArguments`), AVG/GDPR en Zero-PII |
| Official Stack | [`.agents/rules/official-stack-standards.md`](.agents/rules/official-stack-standards.md) | Next.js 16 App Router, React 19, Headless UI v2, DRY route resolvers, Zero-Deprecation & layout geometrie |
| Image Optimization | [`.agents/rules/image-optimization.md`](.agents/rules/image-optimization.md) | Versie-gedreven `next/image` standaarden, Contentstack Launch / Next.js caching en bandwidthbeheersing (formats, qualities, TTL, sizes), `remotePatterns` met `pathname` en LCP-`preload` |
| Quality Gate | [`.agents/rules/quality-gate.md`](.agents/rules/quality-gate.md) | Zero-Comment, Zero-Console, linter en pre-flight productievalidatie |

### Gespecialiseerde Subagents ([`.agents/agents/`](.agents/agents/))

| Subagent | Pad | Specialisme |
| --- | --- | --- |
| Contentstack Architect | [`.agents/agents/contentstack-architect.md`](.agents/agents/contentstack-architect.md) | Contentstack Delivery SDK, DRY queries & caching, Visual Builder & Live Preview (`$`), Rich Text sanitization, content models |
| Analytics & GTM Architect | [`.agents/agents/analytics-architect.md`](.agents/agents/analytics-architect.md) | Google Tag Manager, GA4, Consent Mode v2, @next/third-parties, privacy compliance, timing en dataLayer verrijking |
| Environment & Architecture Guardian | [`.agents/agents/env-architecture-architect.md`](.agents/agents/env-architecture-architect.md) | Centrale `lib/env.ts` & `.env.example` bewaking, Next.js 16 / React 19 asynchrone architectuur, DRY route resolvers, streaming skeletons, barrel- en import-integriteit en zero-deprecation |
| Image Optimization Architect | [`.agents/agents/image-optimization-architect.md`](.agents/agents/image-optimization-architect.md) | `next/image` volgens geïnstalleerde Next.js versie-docs, Contentstack Launch caching/bandwidth, Contentstack asset delivery, responsive `sizes`, LCP-preload en zero-deprecation op image API's |

---

## Documentatie & Skills ([`.agents/skills/`](.agents/skills/))

| Skill | Pad | Onderwerp |
| --- | --- | --- |
| Dev workflow | [`.agents/skills/dev-workflow/SKILL.md`](.agents/skills/dev-workflow/SKILL.md) | Lokale setup, `lib/env.ts`, seed stack, CI en Quality Gate |
| Contentstack kickstart | [`.agents/skills/contentstack-kickstart/SKILL.md`](.agents/skills/contentstack-kickstart/SKILL.md) | Delivery SDK v5, DRY queries, `withServerCache`, Live Preview (`$`) |
| Framework | [`.agents/skills/framework/SKILL.md`](.agents/skills/framework/SKILL.md) | Next.js 16.4, Tailwind CSS v4, PostCSS en UI primitives (image config via Image Optimization rule) |
| Next.js app | [`.agents/skills/next-app/SKILL.md`](.agents/skills/next-app/SKILL.md) | App Router, pure route-shells, `<Suspense>` skeletons, client vs server |
| TypeScript style | [`.agents/skills/typescript-style/SKILL.md`](.agents/skills/typescript-style/SKILL.md) | `tsconfig`, Zero-Any, Zero-Deprecation, typing content models |
| Testing | [`.agents/skills/testing/SKILL.md`](.agents/skills/testing/SKILL.md) | Master Production Quality Gate, pre-flight validatie, geheimbeheer |
| Code review | [`.agents/skills/code-review/SKILL.md`](.agents/skills/code-review/SKILL.md) | PR- en architectuur-checklist |
