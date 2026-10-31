/**
 * Utility functies voor het verrijken van Google Tag Manager en Google Analytics data.
 */

/**
 * Bepaalt het paginatype op basis van het opgegeven pad (pathname).
 * Strip eventuele trailing slashes om foutieve matches (zoals /portfolio/ vs /portfolio) te voorkomen.
 */
export function getPageType(pathname: string | null | undefined): string {
  if (!pathname) return 'homepage';
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized === '/') return 'homepage';
  if (normalized === '/portfolio') return 'portfolio_overview';
  if (normalized.startsWith('/portfolio/')) return 'portfolio_detail';
  if (normalized === '/over-mij' || normalized === '/overmij' || normalized === '/about') return 'about';
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
    // Negeer sandboxed environments of storage restricties
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
export function buildPageViewPayload(pathname: string, searchParamsString?: string) {
  const queryString = searchParamsString?.replace(/^\?/, '');
  const url = queryString ? `${pathname}?${queryString}` : pathname;
  const pageTitle = typeof document !== 'undefined' ? document.title : '';

  return {
    event: 'page_view' as const,
    page_path: url,
    page_title: pageTitle,
    page_type: getPageType(pathname),
    theme_mode: getThemeMode(),
    content_language: getContentLanguage(),
  };
}
