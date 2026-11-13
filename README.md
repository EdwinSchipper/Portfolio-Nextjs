# Portfolio Edwin Schipper (Next.js 16 & Contentstack)

> **Status:** 🚧 In ontwikkeling (Pre-Launch Optimalisatie)
>
> **Huidige focus:**
> - 🎨 **UI/UX & Responsive Finetuning:** Verfijnen van mobiele en desktop layouts, typografische schalen en dark-mode kleurenharmonie over alle modulaire Contentstack-blokken.
> - 🔍 **SEO, Structured Data & Lighthouse:** Uitbreiden van Schema.org JSON-LD en het borgen van maximale Core Web Vitals scores richting productie-livegang.

De officiële portfolio- en showcase-website van Edwin Schipper ([Ontwerpbureau Schipper](https://www.edwinschipper.nl)), gebouwd met [Next.js 16](https://nextjs.org) (App Router & Turbopack), [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com), [Headless UI v2](https://headlessui.com) en aangedreven door het headless CMS [Contentstack](https://www.contentstack.com).

---

## 📌 Projectoverzicht & Doelstelling

Deze webapplicatie vormt het centrale portfolio- en case-studyplatform voor grafische vormgeving, UX/Webdesign en frontend web development. Alle pagina's, modulaire secties en portfolio-cases worden beheerd in Contentstack en realtime gekoppeld aan de Next.js frontend via de Contentstack Delivery SDK v5, Live Preview v4 en de Visual Builder.

De applicatie is ontworpen volgens strikte architectuurprincipes:
- **Slanke Presentatie-Shells (`app/`)**: Layouts en route-bestanden bevatten geen inline CMS-queries of prop-drilling.
- **HTTP Chunked Streaming (`<Suspense>`)**: Elke route streamt asynchrone serverdata achter een op maat gemaakt, CLS-vrij skeleton-component.
- **Zero-Waterfall Data Fetching**: Request deduplicatie via `React.cache()` tussen metadata- en pagina-rendering en parallelle queries via `Promise.all`.
- **100% Type-Safety & Veiligheid**: Geen `as any` casts, centrale environment-validatie in `lib/env.ts` en verplichte HTML-sanitization via `isomorphic-dompurify`.

---

## 🗺️ Ontwikkelstatus & Roadmap

Hieronder staat het actuele overzicht van afgeronde mijlpalen (`Done`), lopende verfijningen (`In Progress`) en geplande stappen richting livegang (`To Do`):

| Onderdeel | Status | Omschrijving |
| :--- | :---: | :--- |
| **Driepijler Component-Architectuur** | ✅ `Done` | Strikte scheiding tussen `ui/` (Design System primitives), `layout/` (globale site-chrome), `blocks/` (Contentstack Modular Blocks) en `features/` (`analytics`, `pages`, `portfolio`) met expliciete barrel-exports. |
| **Headless CMS & Visual Builder** | ✅ `Done` | Contentstack Delivery SDK v5 gekoppeld met Live Preview v4 (`$`), `VB_EmptyBlockParentClass` en `skipInitialRender` voor real-time editing zonder dubbele client-fetches. |
| **RSC Streaming & Waterfall Preventie** | ✅ `Done` | Symmetrische route-shells (`/`, `/[...slug]`, `/portfolio/[slug]`) met `<Suspense>` streaming, CLS-vrije skeletons (`HomePageSkeleton`, `PageSkeleton`, `PortfolioDetailSkeleton`), `React.cache()` deduplicatie en `Promise.all` sitemap-queries. |
| **Centrale Environment (`lib/env.ts`)** | ✅ `Done` | Type-veilige single source of truth (`env` & `getSiteUrl()`) voor alle Contentstack-, GTM- en site-URL variabelen; `0` losse `process.env` aanroepen buiten `lib/env.ts`. |
| **Strikte TypeScript Type-Safety** | ✅ `Done` | Domein-gedreven interfaces in `lib/types/` (`core`, `blocks`, `pages`) met **0 `as any` casts** in de gehele codebase en 100% `DOMPurify` Rich Text sanitization. |
| **Analytics & Google Consent Mode v2** | ✅ `Done` | AVG/GDPR-conforme cookiebanner (`CookieConsent` op Headless UI v2), synchrone Consent Mode v2 initialisatie en verrijkte GTM `page_view` events (`page_type`, `theme_mode`, `content_language`). |
| **Design System, Fonts & Dark Mode** | ✅ `Done` | Tailwind CSS v4 `@theme` design tokens, `Outfit`, `Newsreader` & `Cascadia Mono` via `next/font/google`, en SSR-veilige `ColorModeSelector` via `useSyncExternalStore`. |
| **Foutafhandeling & AI Discovery (ARD)** | ✅ `Done` | Huisstijl-conforme `app/not-found.tsx` & `app/error.tsx` boundaries, dynamische `sitemap.xml` / `robots.txt`, plus `ai-catalog.json` en `llms.txt` met open CORS-headers. |
| **DevOps & CI/CD Pipeline** | ✅ `Done` | GitHub Actions workflow (`ci.yml`) op Node 22 LTS & `pnpm` met geautomatiseerde ESLint 9, `tsc --noEmit` en Next.js 16 productiebuild-validatie. |
| **UI/UX & Responsive Finetuning** | 🔄 `In Progress` | Verfijnen van Tailwind CSS v4 spacing, mobiele layout-uitlijning, typografische schalen en dark-mode contrasten over alle modulaire blokken. |
| **Code Hygiene & JSDoc Standaardisatie** | 🔄 `In Progress` | Opschonen van resterende legacy inline-comments in oudere `components/blocks/items/` en `components/ui/` bestanden conform de Zero-Comment standaard. |
| **SEO, Structured Data & Lighthouse** | 📋 `To Do` | Uitbreiden van Schema.org JSON-LD (naast `BreadcrumbList` ook `Person` / `CreativeWork`), valideren van koppenhiërarchie en 95–100 Lighthouse scores borgen. |
| **Productie Deployment & Domein** | 🔄 `In Progress` | Live op Contentstack Launch (`www.edwinschipper.nl`) met Next.js 16 runtime, ISR (`3600s`) & `/api/revalidate` webhook; productie-environment en definitieve domein-afronding nog lopend. |

---

## 🏛️ Architectuur & Mappenstructuur

De codebase volgt een strikte scheiding tussen route-shells, domein-features, CMS-blokken, UI-primitives en server-bibliotheken:

```text
app/
├── layout.tsx              # Pure root presentatie-shell (Fonts, GTMPageTracker, Header, Footer, CookieConsent)
├── (home)/                 # Homepage route-group (page.tsx & loading.tsx met HomePageSkeleton)
├── [...slug]/              # Dynamische CMS subpagina's (page.tsx & loading.tsx met PageSkeleton)
├── portfolio/[slug]/       # Portfolio case-study detail (page.tsx & loading.tsx met PortfolioDetailSkeleton)
├── api/revalidate/         # On-demand ISR webhook endpoint voor Contentstack Publish events
├── sitemap.ts              # Parallelle (Promise.all) XML-sitemap generator met .only() velden-optimalisatie
└── robots.ts               # Dynamische robots.txt configuratie gekoppeld aan env.siteUrl

lib/
├── env.ts                  # Centrale, strikt getypeerde environment configuratie (env & getSiteUrl)
├── cms/                    # Contentstack SDK v5 client, Live Preview v4 init & React.cache() queries
├── layout/                 # Design tokens, grid-spans & semantische heading helpers
├── metadata/               # SEO OpenGraph builders & route-specifieke metadata resolvers
├── types/                  # Domeinmodellen & CMS-interfaces (core.ts, blocks.ts, pages.ts)
└── index.ts                # Centrale barrel export (@/lib)

components/
├── ui/                     # Pure Design System primitives
│                           # (Button, Label, Icon, Toast, RichText)
├── layout/                 # Globale navigatie & layout-chrome
│                           # (Header, Footer, Breadcrumbs, ColorModeSelector, NavigationProgress)
├── blocks/                 # Contentstack Modular Blocks & automatische BlockRenderer registry
│   ├── BlockRenderer.tsx
│   ├── items/              # HeroBlock, CtaBlock, ResumeSection, GridSection, CardSection,
│   │                       # FeaturedProjectsBlock, ExperienceTimelineBlock, NumberedSection,
│   │                       # ServiceCardBlock, ContentBlock
│   └── index.ts
├── features/               # Zelfvoorzienende domeinmodules
│   ├── analytics/          # Google Consent Mode v2 & GTM (GTMPageTracker, CookieConsent, CookieSettingsButton)
│   ├── pages/              # Pagina-containers, Live Preview wrapper & skeletons (HomePage, Page, Preview)
│   └── portfolio/          # Case-study detailweergave, techstack & skeletons (PortfolioDetail, PortfolioPreview)
└── index.ts                # Centrale barrel export (@/components)
```

---

## 🚀 Aan de Slag (Getting Started)

### 1. Vereisten & Installatie

Zorg dat **Node.js v20+** (aanbevolen: **v22 LTS**) en **[pnpm](https://pnpm.io/) v10+** zijn geïnstalleerd:

```bash
git clone https://github.com/EdwinSchipper/Portfolio-Nextjs.git
cd Portfolio-Nextjs
pnpm install
```

### 2. Omgevingsvariabelen (`.env.local`)

Kopieer het meegeleverde voorbeeldbestand [`.env.example`](.env.example) naar `.env.local` en vul de waarden in:

```bash
cp .env.example .env.local
```

| Variabele | Scope | Verplicht | Toelichting |
| :--- | :---: | :---: | :--- |
| `NEXT_PUBLIC_CONTENTSTACK_API_KEY` | Client & Server | Ja | Unieke identifier van de Contentstack Stack. |
| `NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN` | Client & Server | Ja | Read-only Delivery Token voor gepubliceerde content. |
| `NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN` | Client & Server | Nee | Preview Token voor Contentstack Live Preview & Visual Builder. |
| `NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT` | Client & Server | Ja | Doelomgeving in Contentstack (bijv. `production` of `preview`). |
| `NEXT_PUBLIC_CONTENTSTACK_REGION` | Client & Server | Nee | Datacenter-regio (`EU`, `NA` of `AZURE_NA`; standaard `EU`). |
| `NEXT_PUBLIC_CONTENTSTACK_PREVIEW` | Client & Server | Nee | Schakelt Live Preview / Visual Builder in (`true` of `false`). |
| `NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME` | Build / Next.js | Nee | Extra toegestane CDN-hostname voor `next/image` optimalisatie. |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | Nee | Canonieke basis-URL; valt automatisch terug op `https://www.edwinschipper.nl`. |
| `CONTENTSTACK_REVALIDATE_SECRET` | Server Only | Nee | Geheim token (`x-revalidate-secret`) voor on-demand ISR via `POST /api/revalidate`. |
| `NEXT_PUBLIC_GTM_ID` | Client & Server | Nee | Google Tag Manager Container ID (bijv. `GTM-XXXXXXX`). |

### 3. Development Server Starten

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

---

## ⚙️ Beschikbare Scripts

| Commando | Omschrijving |
| :--- | :--- |
| `pnpm dev` | Start de lokale Next.js 16 development server met Turbopack |
| `pnpm build` | Compileert de geoptimaliseerde productiebuild en valideert alle routes |
| `pnpm start` | Start de gecompileerde productie-server lokaal |
| `pnpm lint` | Controleert de codekwaliteit en import-integriteit met ESLint 9 |
| `pnpm type-check` | Valideert alle TypeScript-types strikt zonder bestanden te emitteren (`tsc --noEmit`) |

---

## 🔄 DevOps, CI/CD & Quality Gate

Elke push en Pull Request naar `main`, `master` of `development` wordt automatisch gevalideerd via **GitHub Actions** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)):

1. **Dependency Integriteit**: `pnpm install --frozen-lockfile` op Node.js 22 LTS.
2. **Code Linting**: `pnpm run lint` (ESLint 9 flat config, `0` warnings toegestaan).
3. **Strikte Type-Safety**: `pnpm run type-check` (`tsc --noEmit`, `0` errors en `0` `as any` casts).
4. **Productie Build**: `pnpm run build` (Next.js 16 Turbopack compilatie met geconfigureerde repository secrets).

---

## 🛠️ Tech Stack

| Categorie | Technologie |
| :--- | :--- |
| **Framework & Runtime** | [Next.js 16.4](https://nextjs.org) (App Router, Turbopack, RSC Streaming), [React 19.3](https://react.dev), [TypeScript 5](https://www.typescriptlang.org) (`strict`) |
| **Styling & UI Primitives** | [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/postcss`), [Headless UI v2](https://headlessui.com), [Heroicons v2](https://heroicons.com) |
| **Typografie** | [Google Fonts](https://fonts.google.com) (`Outfit`, `Newsreader`, `Cascadia Mono`) via `next/font/google` |
| **Headless CMS & Security** | [Contentstack Delivery SDK v5](https://www.contentstack.com), Live Preview Utils v4, `isomorphic-dompurify` |
| **Analytics & Privacy** | Google Tag Manager (`@next/third-parties/google`), Google Consent Mode v2 |
| **Tooling & CI/CD** | [pnpm v10](https://pnpm.io/), ESLint 9, GitHub Actions, Contentstack Launch |

---

## 📄 Licentie

Dit project is uitgebracht onder de [MIT Licentie](LICENSE).
