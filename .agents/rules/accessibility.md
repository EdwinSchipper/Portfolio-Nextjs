---
trigger: always_on
---

# Accessibility (WCAG 2.2 AA) & Reduced Motion Richtlijnen

Toegankelijkheid is standaard onderdeel van elke UI- en CMS-component binnen de geïnstalleerde stack (**Next.js 16.4**, **React 19**, **Headless UI v2**, **Tailwind CSS v4** en **Contentstack Visual Builder / Live Preview**). Let op: `eslint-config-next/core-web-vitals` activeert slechts 6 basis `jsx-a11y/*`-regels; onderstaande standaarden vullen dat aan.

## 1. Landmarks, Semantiek & Contentstack Live Preview (`$`)
- **Benoemde Landmarks**: Secties met een zelfstandige inhoudsrol (zoals de Hero) gebruiken `<section aria-labelledby="...">` gekoppeld aan de bijbehorende heading (`id`), zodat ze als herkenbare regio in screenreader-overzichten verschijnen.
- **Heading-hiërarchie**: Gebruik precies één `<h1>` per pagina en een doorlopende hiërarchie (`h1` → `h2` → `h3`), ook bij dynamische Contentstack-blokken.
- **Live Preview op Semantische Nodes**: Plaats Contentstack Live Preview attributen (`page?.$`, `$` / `data-cslp`) rechtstreeks op het semantische HTML-element (`<h1>`, `<p>`, status-label) en voeg nooit extra decoratieve wrappers of geneste interactieve elementen toe voor Visual Builder.
- **Tijd & Status (`<time>`)**: Tijdstippen en datums gebruiken altijd een semantisch `<time dateTime="...">` element (nooit een `<span>` met `aria-label`). Periodiek verversende klokken gebruiken `aria-live="off"` zodat schermlezers niet elke seconde onderbreken.
- **Decoratieve Tekens & Context**: Decoratieve leestekens rond CMS- of UI-waarden (`[`, `]`, `—`, status-stippen) krijgen `aria-hidden="true"`. Geef context waar nodig via `<span className="sr-only">` (bijv. `Locatie: `, `Status: `).
- **Afbeeldingen**: Decoratieve `<Image>` / SVG-ornamenten krijgen `alt=""` (en `aria-hidden="true"` op de container); informatieve CMS-afbeeldingen lezen het alt/description-veld met een zinvolle fallback.

## 2. Touch Targets, Keyboard & Headless UI v2
- **Touch Targets (WCAG 2.2 AA+)**: Alle knoppen en links zijn minimaal `24×24px`; ronde icon-knoppen gebruiken centraal `sizeStyles.icon` (`w-11 h-11 lg:w-9 lg:h-9`: `44px` op mobiel, `36px` op desktop) en `iconButtonSizeClass` uit `components/ui/Button.tsx` zonder losse per-component overrides.
- **Geen Geneste Interactieve Elementen**: Plaats nooit een `<button>` binnen een `<a>`/`<Link>` of andersom; groepeer bijv. logo en merknaam in één `<Link>`.
- **Focus & Modals**: Interactieve overlays, drawers en dialogen gebruiken `@headlessui/react` v2 (zonder `@deprecated` aliassen) voor focus-management, Escape-sluiting en `aria-*` koppelingen. Alle interactieve elementen behouden zichtbare `:focus-visible` indicatoren.

## 3. Contrast, Media Scrims & Streaming (Next.js 16)
- **Scrims Over Media**: Tekst en transparante navigatie boven achtergrondfoto's of video's krijgen contrasterende gradient scrims (top en bottom) op basis van `@theme` design tokens uit `app/globals.css`.
- **CLS-vrije Skeletons**: Route-segment `loading.tsx` skeletons spiegelen de werkelijke layout-afmetingen zodat streaming geen visuele of focus-sprongen veroorzaakt.

## 4. `prefers-reduced-motion` (React 19 + Tailwind CSS v4)
- **CSS Reduced Motion**: Decoratieve CSS-animaties en video-lagen dragen `motion-reduce:hidden` of `motion-reduce:animate-none`.
- **Hydration-Veilige Media (`useSyncExternalStore`)**: Achtergrondvideo's lezen `(prefers-reduced-motion: reduce)` uit via `useSyncExternalStore` met `getServerSnapshot = () => true`, zodat `<video autoPlay>` nooit vóór React-hydratatie begint te spelen of videodata downloadt bij `reduce`, terwijl het eerste frame al via `<Image preload fetchPriority="high">` zichtbaar is.

