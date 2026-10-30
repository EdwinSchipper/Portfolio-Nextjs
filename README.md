# Portfolio Edwin Schipper (Next.js & Contentstack)

> **Status:** 🚧 In ontwikkeling (Work in Progress)

De officiële portfolio- en showcase-website van Edwin Schipper ([Ontwerpbureau Schipper](https://www.edwinschipper.nl)), gebouwd met [Next.js 16](https://nextjs.org) (App Router & Turbopack), [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com) en aangedreven door het headless CMS [Contentstack](https://www.contentstack.com).

---

## 📌 Projectoverzicht & Context

Deze webapplicatie dient als het centrale portfolio en platform voor grafische vormgeving, UX/Webdesign en frontend web development. De content wordt dynamisch beheerd in Contentstack en realtime gesynchroniseerd via Contentstack Live Preview en de Visual Builder.

De applicatie is gebouwd met een sterke focus op performance, een modulaire driepijler-architectuur en een geautomatiseerde CI/CD-pipeline.

---

## 🧭 Ontwikkelstatus & Roadmap

Hieronder vind je een gestructureerd overzicht van wat er reeds is geïmplementeerd, wat momenteel onder handen is en wat er op de planning staat:

| Pijler | Status | Omschrijving |
| :--- | :---: | :--- |
| **Componenten-Architectuur** | 🟢 `Done` | Strikt opgedeeld in een **Driepijler-architectuur**: `UI` (primitives), `Blocks` (Contentstack Modular Blocks) en `Features` (Pages, Portfolio, Analytics). |
| **Headless CMS Integratie** | 🟢 `Done` | Contentstack Delivery SDK gekoppeld met dynamische pagina-rendering (`[...slug]`), Visual Builder en Live Preview ondersteuning. |
| **Next.js & Performance** | 🟢 `Done` | Next.js 16 (Turbopack) geoptimaliseerd met AVIF/WebP beeldconversie, 30 dagen asset-caching en server-side API fetch logging. |
| **Typografie & Google Fonts** | 🟢 `Done` | `Outfit`, `Newsreader` en `Cascadia Mono` geïntegreerd via `next/font/google` met correcte monospace fallbacks en Tailwind `@theme` variabelen. |
| **DevOps & CI Pipeline** | 🟢 `Done` | Geautomatiseerde continuous integration via GitHub Actions (`ci.yml`) met ESLint, TypeScript type-check en build-validatie met repository secrets. |
| **Root Opschoning** | 🟢 `Done` | Overbodige Kickstart template-bestanden (`package-lock.json`, Talisman, lege scripts, corporate scans) verwijderd; volledig gemigreerd naar `pnpm`. |
| **Styling & Responsive Finetuning** | 🟡 `In Progress` | Optimaliseren van Tailwind CSS v4 syntax (`grow`, `aspect-16/10`, `h-*`), mobiele layout-uitlijning en dark-mode kleurenharmonie. |
| **Data Typering & Architectuur** | 🟢 `Completed` | Monolithische `lib/types.ts` gemoduleerd naar een domeingestuurde structuur in `lib/types/` (`core`, `blocks`, `pages`, `index`). |
| **Next.js Beveiligingsupdate** | 🟢 `Completed` | Upgraded van Next.js `16.4.0` naar `16.4.3` met Turbopack en Node 22 LTS ondersteuning. |
| **Foutafhandeling & 404** | 🟢 `Completed` | Huisstijl-conforme `app/not-found.tsx` en `app/error.tsx` met error boundaries en herstelacties geïmplementeerd. |
| **AI Agent Discovery (ARD)** | 🟢 `Completed` | `ai-catalog.json` (ARD-specificatie) en `llms.txt` met open CORS-headers geconfigureerd voor autonome AI-agents. |
| **Google Analytics & Tag Manager** | 🔴 `To Do` | GTM container (`@next/third-parties/google`) en Google Analytics 4 (GA4) volledig en betrouwbaar inrichten: dataLayer pageview tracking bij client-side navigatie, custom event tracking en consent mode. |
| **SEO, Metadata & A11y** | 🔴 `To Do` | Paginabrede koppenhiërarchie valideren, gestructureerde data (Schema.org JSON-LD) uitbreiden en Lighthouse audits uitvoeren. |
| **Productie Deployment** | 🔴 `To Do` | Definitieve livegang via Vercel met productie environment variables en custom domain koppeling. |

---

## 🏛️ Architectuur: Drie Pijlers & Domein Types

De codebase volgt een strikte scheiding van verantwoordelijkheden over presentatie, CMS-modellen en domein-types:

```text
lib/
├── cms/        # Contentstack SDK client, Live Preview & queries (client.ts, queries.ts)
├── layout/     # Design tokens, grid spans & layout helpers (tokens.ts, helpers.ts)
├── metadata/   # SEO OpenGraph builders & route resolvers (builders.ts, resolvers.ts)
├── types/      # Domeinmodellen & CMS-primitives (core.ts, blocks.ts, pages.ts)
└── index.ts    # Centrale barrel re-export (@/lib)

components/
├── ui/         # Design System primitives & presentational componenten
│               # (Button, Label, Icon, Breadcrumbs, Header, Footer)
│               # -> Volledig ontkoppeld van CMS-logica of schema's
│
├── blocks/     # Contentstack Modular Blocks & BlockRenderer
│   ├── BlockRenderer.tsx
│   ├── items/  # HeroBlock, CtaBlock, ResumeSection, GridSection, CardSection, etc.
│   └── index.ts
│               # -> 1-op-1 gekoppeld aan Contentstack Modular Block entries en Visual Builder
│
├── features/   # Zelfstandige domeinfunctionaliteiten & pagina-modules
│   ├── analytics/  # GTM tracking feature (GTMPageTracker)
│   ├── pages/      # Pagina-level weergaves & preview handlers (HomePage, Page, Preview)
│   ├── portfolio/  # Portfolio detailweergave, previews, filters en techstack
│   └── index.ts
│
└── index.ts    # Centrale barrel export (ui, blocks, features)
```

---

## 🚀 Aan de slag (Getting Started)

### Vereisten (Prerequisites)

* **Node.js**: v20+ (aanbevolen: v22 LTS)
* **Package Manager**: [pnpm](https://pnpm.io/) v10+

### 1. Repository klonen & dependencies installeren

```bash
git clone https://github.com/EdwinSchipper/Portfolio-Nextjs.git
cd Portfolio-Nextjs
pnpm install
```

### 2. Lokale environment variables instellen

Maak een lokaal omgevingsbestand aan in de root (`.env.local`):

```env
NEXT_PUBLIC_CONTENTSTACK_API_KEY=jouw_api_key
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=jouw_delivery_token
NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN=jouw_preview_token
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=preview
NEXT_PUBLIC_CONTENTSTACK_REGION=EU
NEXT_PUBLIC_CONTENTSTACK_PREVIEW=true
NEXT_PUBLIC_CONTENTSTACK_IMAGE_HOSTNAME=eu-images.contentstack.com
NEXT_PUBLIC_GTM_ID=GTM-MPHNZZW4
NEXT_PUBLIC_SITE_URL=https://www.edwinschipper.nl
```

### 3. Development server starten

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

---

## ⚙️ Beschikbare Scripts

| Commando | Omschrijving |
| :--- | :--- |
| `pnpm dev` | Start de Next.js development server met Turbopack hot-reloading |
| `pnpm build` | Bouwt de geoptimaliseerde productie-bundel en valideert alle routes |
| `pnpm start` | Start de gebouwde productie-server lokaal |
| `pnpm run lint` | Controleert de codekwaliteit met ESLint 9 |
| `pnpm run type-check` | Valideert alle TypeScript types zonder bestanden te emitteren (`tsc --noEmit`) |

---

## 🔄 DevOps & CI/CD Pipeline

Het project maakt gebruik van geautomatiseerde kwaliteitscontroles via **GitHub Actions** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

Bij elke push en pull request naar `main`, `master` of `development` draait de pipeline automatisch de volgende checks:

1. **Installatie**: `pnpm install --frozen-lockfile` met Node.js 22 LTS caching.
2. **Code Linting**: `pnpm run lint` (ESLint 9).
3. **Type Safety**: `pnpm run type-check` (TypeScript 5).
4. **Productie Build**: `pnpm run build` (Next.js 16 compilatie met veilige repository secrets).

### Vereiste GitHub Secrets
Voor het succesvol draaien van de CI-pipeline zijn de volgende **Repository Secrets** geconfigureerd in GitHub (*Settings ➔ Secrets and variables ➔ Actions*):
* `NEXT_PUBLIC_CONTENTSTACK_API_KEY`
* `NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN`
* `NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN`

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack)
* **UI Library:** [React 19](https://react.dev)
* **Headless CMS:** [Contentstack](https://www.contentstack.com) (Delivery SDK v5 & Live Preview Utils)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/postcss`)
* **Typografie:** [Google Fonts](https://fonts.google.com) (`Outfit`, `Newsreader`, `Cascadia Mono`) via `next/font`
* **Taal:** [TypeScript 5](https://www.typescriptlang.org) (Strict mode)
* **DevOps & CI:** [GitHub Actions](https://github.com/features/actions)
* **Package Manager:** [pnpm v10](https://pnpm.io/)
* **Analytics:** Google Tag Manager (`@next/third-parties/google`)

---

## 📄 Licentie

Dit project is uitgebracht onder de [MIT Licentie](LICENSE).
