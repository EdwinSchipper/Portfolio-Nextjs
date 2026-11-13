# HTTP Security Headers & Contentstack Launch Richtlijnen

Contentstack Launch (Cloudflare CDN) verzorgt HTTPS-certificaten en response-caching, maar voegt uit zichzelf **geen** applicatieve HTTP-beveiligingsheaders (`Strict-Transport-Security`, volledige `Content-Security-Policy`, etc.) toe. Deze moeten expliciet in `next.config.mjs` (`async headers()`) worden beheerd en bewaakt door de `env-architecture-architect`.

## 1. Verplichte Basisheaders (`/:path*` in `next.config.mjs`)
- **`Strict-Transport-Security`:** minimaal `max-age=63072000; includeSubDomains` (2 jaar HTTPS-verplichting; browsers negeren deze header over HTTP op `localhost` conform RFC 6797). Voeg `; preload` uitsluitend toe als het hoofddomein (`apex`) eveneens HSTS meestuurt.
- **`X-Content-Type-Options`:** `nosniff`
- **`Referrer-Policy`:** `strict-origin-when-cross-origin`
- **`Permissions-Policy`:** `camera=(), microphone=(), geolocation=()`
- **`Content-Security-Policy`:** minimaal `frame-ancestors 'self' https://*.contentstack.com;` zodat Contentstack Visual Builder de site veilig mag insluiten zonder clickjacking van derden toe te staan.

## 2. CSP Uitbreidingen & Externe Bronnen (Third-Party Impact)
- Controleer bij het toevoegen of wijzigen van externe scripts, fonts, afbeeldingen, video's of API-calls direct `next.config.mjs` (`headers()` CSP en `images.remotePatterns`):
  - **Contentstack:** `https://*.contentstack.com` (Visual Builder/API), `images.contentstack.io` / `*-images.contentstack.com` / `*-assets.contentstack.com` (media).
  - **Google Tag Manager / GA4:** `googletagmanager.com` en `google-analytics.com`.
  - **Inline scripts:** test strengere `script-src`-regels altijd eerst met `Content-Security-Policy-Report-Only` zodat inline Consent Mode / Next.js scripts (of nonces) niet stilzwijgend blokkeren.
- Gebruik op externe `<a target="_blank">` en `<Button target="_blank">` links altijd `rel="noopener noreferrer"`.

