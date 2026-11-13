---
name: next-app
description: Next.js 16 App Router structuur, pure route-shells, RSC Suspense streaming met skeletons, en server vs client component grenzen.
---

# Next.js 16 App Router & Component Architectuur

## Wanneer te gebruiken

- Bij het maken of wijzigen van routes in `app/`, layouts in `components/layout/` of features in `components/features/`.
- Bij het bepalen van Server vs. Client Component grenzen (`'use client'`) en `<Suspense>` streaming.

## Instructies

### Pure Route- en Layout-Shells (Shell Purity Policy)

- [`app/layout.tsx`](../../../app/layout.tsx), [`app/(home)/page.tsx`](../../../app/%28home%29/page.tsx), [`app/[...slug]/page.tsx`](../../../app/%5B...slug%5D/page.tsx) en [`app/portfolio/[slug]/page.tsx`](../../../app/portfolio/%5Bslug%5D/page.tsx) zijn 100% zuivere presentatie-shells.
- Route-level functies zoals `generateMetadata()` en `generateStaticParams()` in `page.tsx` zijn altijd **1-regel delegaties** naar centrale resolvers in [`lib/metadata/`](../../../lib/metadata/) en [`lib/cms/`](../../../lib/cms/) — plaats nooit inline `.split()`, `.filter()` of `.map()` logica in `page.tsx`.
- Alle CMS-pagina-routes gebruiken ISR (`export const revalidate = 3600;` + on-demand webhook `POST /api/revalidate`) en hebben per route-segment een eigen `loading.tsx` (`HomePageSkeleton`, `PageSkeleton`, `PortfolioDetailSkeleton`) zonder root-level `app/loading.tsx` overlap.

### Server vs. Client Components

- Plaats `'use client'` uitsluitend op interactieve leaf-componenten en maak een Client Component nooit `async`.
- [`components/features/pages/Page.tsx`](../../../components/features/pages/Page.tsx) en [`HomePage.tsx`](../../../components/features/pages/HomePage.tsx) zijn Server Components; [`Preview.tsx`](../../../components/features/pages/Preview.tsx) en [`PortfolioPreview.tsx`](../../../components/features/portfolio/PortfolioPreview.tsx) verzorgen client-side Live Preview updates (houd client-preview los van productie-bundles en vermijd `import *` op icon-sets in client-reachable code).
- Gebruik in submappen altijd expliciete named barrel exports (`export { X } from "./X"`), nooit `export *`.

