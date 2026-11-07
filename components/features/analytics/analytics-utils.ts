/**
 * Utility functies en types voor Google Tag Manager (GTM), Google Analytics 4 (GA4)
 * en Google Consent Mode v2 binnen Next.js 16 App Router.
 */

export type ConsentState = 'granted' | 'denied';

export interface ConsentModeParams {
  analytics_storage?: ConsentState;
  ad_storage?: ConsentState;
  ad_user_data?: ConsentState;
  ad_personalization?: ConsentState;
  wait_for_update?: number;
}

export interface PageViewPayload {
  event: 'page_view';
  page_path: string;
  page_title: string;
  page_type: string;
  theme_mode: 'dark' | 'light';
  content_language: string;
}

declare global {
  interface Window {
    gtag?: (
      command: 'consent',
      action: 'default' | 'update',
      params: ConsentModeParams
    ) => void;
  }
}

/**
 * Bepaalt het paginatype op basis van het opgegeven pad (pathname).
 * Normaliseert trailing slashes om foutieve matches te voorkomen.
 */
export function getPageType(pathname: string | null | undefined): string {
  if (!pathname) return 'homepage';
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/') return 'homepage';
  if (normalized === '/portfolio') return 'portfolio_overview';
  if (normalized.startsWith('/portfolio/')) return 'portfolio_detail';
  if (normalized === '/over-mij' || normalized === '/overmij' || normalized === '/about') {
    return 'about';
  }
  if (normalized === '/resume' || normalized === '/cv') return 'resume';
  return 'page';
}

/**
 * Bepaalt de huidige actieve thema-modus van het document (dark of light).
 * Controleert zowel de actieve class op <html> als localStorage en systeemvoorkeur.
 */
export function getThemeMode(): 'dark' | 'light' {
  if (typeof document === 'undefined') return 'light';
  if (document.documentElement.classList.contains('dark')) return 'dark';
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return 'dark';
    if (stored === 'light') return 'light';
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {
    return 'light';
  }
  return 'light';
}

/**
 * Bepaalt de taal van de huidige pagina via het <html> lang attribuut met veilige fallback.
 */
export function getContentLanguage(): string {
  if (typeof document === 'undefined') return 'nl-NL';
  return document.documentElement.lang || 'nl-NL';
}

/**
 * Bouwt het gestandaardiseerde payload-object voor een page_view event.
 */
export function buildPageViewPayload(
  pathname: string,
  searchParamsString?: string
): PageViewPayload {
  const queryString = searchParamsString?.replace(/^\?/, '');
  const url = queryString ? `${pathname}?${queryString}` : pathname;
  const pageTitle = typeof document !== 'undefined' ? document.title : '';

  return {
    event: 'page_view',
    page_path: url,
    page_title: pageTitle,
    page_type: getPageType(pathname),
    theme_mode: getThemeMode(),
    content_language: getContentLanguage(),
  };
}

/**
 * Stuurt een officiële Google Consent Mode v2 update naar de dataLayer
 * via de synchroon geregistreerde window.gtag functie.
 */
export function updateGoogleConsent(params: ConsentModeParams): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', params);
  }
}

/**
 * Genereert het synchrone inline initialisatie-script voor Google Consent Mode v2.
 * Wordt vóór de GTM container uitgevoerd zodat alle tags direct de juiste consent-state lezen.
 */
export function getConsentDefaultScript(): string {
  return `(function(){window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=gtag;let savedConsent=null;try{savedConsent=localStorage.getItem('cookie_consent');}catch(e){}const analyticsState=savedConsent==='accepted'?'granted':'denied';gtag('consent','default',{'analytics_storage':analyticsState,'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});})();`;
}
