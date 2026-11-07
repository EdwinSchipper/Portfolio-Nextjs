# Google Tag Manager, GA4 & Consent Mode v2 Richtlijnen (Analytics Policy)

In dit project hanteren we uitsluitend de officiële, moderne werkwijzen van Next.js 16 (`@next/third-parties/google`), React 19 en Google (Consent Mode v2, GTM & GA4). Legacy workarounds, `any` casts of arbitraire timeouts zijn niet toegestaan.

## 1. Architectuur & Layout Zuiverheid
- **Zelfvoorzienende Feature-Module (`components/features/analytics/`)**:
  - `app/layout.tsx` blijft een 100% pure presentatie-shell zonder handmatige `<head>` tags of inline scripts.
  - Zowel de synchrone Consent Mode v2 initialisatie (`getConsentDefaultScript`), de `<GoogleTagManager>` container als de route-tracker worden modulair afgehandeld binnen `GTMPageTracker.tsx`.

## 2. Google Consent Mode v2 & IArguments Protocol
- **Synchrone Initialisatie vóór GTM**:
  - Het default consent script (`gtag('consent', 'default', { ... })`) wordt gerenderd vóór `<GoogleTagManager />`, zodat de standaardstatus in `window.dataLayer` staat voordat `gtm.js` (`afterInteractive`) laadt.
- **Verplichte V2 Parameters**:
  - `analytics_storage`: `'granted'` | `'denied'` (op basis van `localStorage.getItem('cookie_consent')`)
  - `ad_storage`: `'denied'`
  - `ad_user_data`: `'denied'`
  - `ad_personalization`: `'denied'`
  - `wait_for_update`: `500`
- **Type-Safe `Window` & `IArguments` Push**:
  - Gebruik NOOIT `(window as any)` casts of rest-parameter arrays (`(...args) => dataLayer.push(args)`), omdat GTM reguliere arrays negeert voor `gtag` commando's.
  - Gebruik altijd de getypeerde `updateGoogleConsent(params: ConsentModeParams)` helper in `analytics-utils.ts`, die via `window.gtag` of een echte `function () { window.dataLayer?.push(arguments); }` een authentiek `IArguments` object pusht.

## 3. Next.js 16 App Router & React 19 Route Tracking
- **Geen Legacy `setTimeout` Hacks**:
  - React 19 hoist en commit `<title>` metadata synchroon tijdens de DOM-commitfase vóórdat passieve `useEffect` hooks draaien. Gebruik daarom NOOIT arbitraire `setTimeout(..., 100)` workarounds uit het React 18 / Next.js 13 tijdperk.
- **Suspense Boundary**:
  - Omdat `useSearchParams()` wordt gebruikt voor query-parameter tracking, blijft de interne tracker-hook gewrapt in `<Suspense fallback={null}>` binnen `GTMPageTracker`.

## 4. DataLayer & Event Payload Standaardisatie
- **Centrale Payload Builder**:
  - Alle `page_view` events worden opgebouwd via `buildPageViewPayload` (`PageViewPayload` interface) uit `components/features/analytics/analytics-utils.ts`.
- **Verplichte Contextuele Parameters**:
  - `page_type`: Genormaliseerde routering (`'homepage'`, `'portfolio_detail'`, `'portfolio_overview'`, `'about'`, `'resume'`, `'page'`).
  - `theme_mode`: Actieve status (`'dark'` of `'light'`), met fallback op `localStorage` en `matchMedia`.
  - `content_language`: Paginataal (`'nl-NL'`).
- **Strikte Barrel Exports**:
  - In `components/features/analytics/index.ts` worden uitsluitend expliciet benoemde functies en types geëxporteerd (geen `export *` wildcards).

## 5. Privacy, AVG/GDPR & Zero-PII Policy
- **STRIKT VERBODEN: Nooit PII (Personally Identifiable Information) meesturen**:
  - Het is ten strengste verboden om e-mailadressen, namen, telefoonnummers, exacte IP-adressen of demografische data (leeftijd, geslacht) handmatig in de `dataLayer` of via event-parameters mee te sturen.
  - Demografische data mag in GA4 uitsluitend verzameld worden via Google Signals.
- **Heropenen van Voorkeuren**:
  - Bezoekers kunnen hun cookiekeuze altijd heropenen via `CookieSettingsButton` (`open_cookie_preferences` event).
