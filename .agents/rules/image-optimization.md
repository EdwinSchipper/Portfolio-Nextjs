---
trigger: always_on
---

# Image Optimization & Contentstack Launch Richtlijnen (Image Optimization Policy)

Afbeeldingen worden uitsluitend geleverd via `next/image` (op Contentstack Launch via de ingebouwde Next.js Image Optimizer en edge caching) volgens de officiële documentatie van **de geïnstalleerde Next.js versie** (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`). Lees bij elke versie-upgrade eerst de `Version History` tabel in die documentatie en werk deze rule bij.

## 1. Versie-gedreven Standaarden
- Controleer vóór elke wijziging de geïnstalleerde `next` versie en de bijbehorende lokale docs; neem nooit voorbeelden uit oudere Next.js versies over.
- **Zero-Deprecation**: Gebruik nooit `@deprecated` image props of config. Voor Next.js 16+:
  - `priority` is deprecated → gebruik `preload` (of `loading="eager"` / `fetchPriority="high"`).
  - `onLoadingComplete` is deprecated → gebruik `onLoad`.
  - `images.domains` is deprecated → gebruik `remotePatterns`.
  - `next/legacy/image` is verboden.

## 2. `next.config.mjs` Standaardconfiguratie (kostenefficiënt)
| Optie | Standaard | Reden |
| --- | --- | --- |
| `formats` | `["image/webp"]` | Eén modern formaat houdt cache-varianten en transformatiebelasting laag |
| `qualities` | `[75]` | Verplicht sinds Next.js 16; elke extra waarde = extra varianten |
| `minimumCacheTTL` | `2678400` (31 dagen) | Lange edge/CDN-cacheduur; minder hernieuwde origin-fetches en transformaties |
| `deviceSizes` | Afgestemd op layout (max ~`1920`) | Geen 2048/3840 varianten voor een max-width ~1280px layout |
| `imageSizes` | Afgestemd op werkelijk gebruikte vaste breedtes | Minder mogelijke varianten |
| `remotePatterns` | Contentstack hosts **met** `pathname: "/v3/assets/<apiKey>/**"` | Voorkomt misbruik van de optimizer door andere stacks |
| `maximumRedirects` | Standaard `3` (evt. `0` als CDN niet redirect) | Redirects worden niet opnieuw op `remotePatterns` gevalideerd |

Afwijken van deze standaarden mag alleen met expliciete motivatie en akkoord van de gebruiker.

## 3. Component-regels (`next/image`)
- **`sizes` is verplicht** bij responsive afbeeldingen en bevat uitsluitend geldige media queries (bijv. `"(max-width: 768px) 100vw, 50vw"`). Tailwind-notatie (`"sm:50vw md:940px"`) is ongeldig en verboden.
- Breakpoints in `sizes` sluiten aan op Tailwind v4 (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px) en de werkelijke gerenderde breedte.
- Alleen het LCP-beeld boven de vouw krijgt `preload` / `fetchPriority="high"`; maximaal één LCP-preload per route.
- **Theme detection (light/dark swap):** Gebruik bij twee `<Image>`-tags die via CSS wisselen (`hidden dark:block` / `block dark:hidden`) altijd de standaard `loading="lazy"` (eventueel met `fetchPriority="high"`), en **nooit** `preload` of `loading="eager"` — anders downloadt de browser beide afbeeldingen.
- **Art direction (`<picture>`) / CSS `image-set()`:** Gebruik `getImageProps()` uit `next/image` wanneer per viewport een andere bronafbeelding of uitsnede nodig is.
- `quality` mag uitsluitend een waarde uit `images.qualities` zijn.
- `unoptimized` voor SVG, GIF en afbeeldingen < 10 KB (bij `src` eindigend op `.svg` gebeurt dit automatisch).
- Altijd `width`/`height` of `fill` met een gesizede parent voor CLS-vrije rendering.
- Live Preview `$` bindings (`{...(image?.$ && image.$.url)}`) blijven intact.

## 4. Contentstack Image Delivery Loader
- Een custom `images.loaderFile` naar de Contentstack Image Delivery API (`?width=&quality=&auto=webp`) is toegestaan als officieel Next.js patroon, maar wordt uitsluitend ingevoerd na expliciet akkoord van de gebruiker.

## 5. Verificatie
```bash
git grep -n -P "\bpriority\b" -- "app/" "components/" ":!app/sitemap.ts"
git grep -n -P "sizes=\x22[^\x22]*\b(sm|md|lg|xl):" -- "app/" "components/"
git grep -n -E "quality=\{" -- "app/" "components/"
```
*(De eerste twee moeten 0 resultaten geven; `quality` waarden moeten in `images.qualities` staan.)*
