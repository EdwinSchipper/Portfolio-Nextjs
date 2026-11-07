/**
 * Tailored skeleton for standard CMS subpages (/over-ons, /portfolio, /contact, etc.).
 * Mirrors the exact subpage gradient header, breadcrumbs, and content grid of Page.tsx
 * to eliminate Cumulative Layout Shift (CLS) during HTTP chunked streaming.
 */
export default function PageSkeleton() {
  return (
    <section
      role="status"
      aria-label="Pagina wordt geladen..."
      className="w-full animate-pulse font-content"
    >
      <div className="relative w-full flex flex-col justify-end pt-40 md:pt-40 lg:pt-52 pb-10 md:pb-16 lg:pb-24 overflow-hidden border-b border-border-100/30 dark:border-border-200/5 -mt-27.25 mb-14 lg:mb-20 bg-linear-to-tl from-accent7-200/30 to-accent7-500/60 dark:from-accent8-100 dark:via-accent8-100 dark:to-accent8-300">
        <div className="relative z-10 w-full max-w-4xl xl:max-w-6xl px-10 sm:px-14 md:px-20 lg:px-12 mx-auto flex flex-col items-start space-y-4">
          <div className="h-6 w-28 rounded-full bg-border-100/60 dark:bg-background-900/60" />
          <div className="h-10 sm:h-14 w-3/4 max-w-xl rounded-lg bg-border-100/70 dark:bg-background-900/70" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl xl:max-w-6xl w-full px-10 sm:px-14 md:px-20 lg:px-12 mb-10 flex gap-2 items-center">
        <div className="h-4 w-12 rounded bg-content-100/10 dark:bg-content-200/10" />
        <span className="text-content-100/20 dark:text-content-200/20 text-xs">/</span>
        <div className="h-4 w-24 rounded bg-content-100/20 dark:bg-content-200/20" />
      </div>

      <div className="mx-auto max-w-4xl xl:max-w-6xl w-full px-10 sm:px-14 md:px-20 lg:px-12 mb-28 space-y-6">
        <div className="h-8 w-1/2 rounded-lg bg-border-100 dark:bg-background-900" />
        <div className="space-y-3 max-w-2xl">
          <div className="h-4 w-full rounded bg-content-100/10 dark:bg-content-200/10" />
          <div className="h-4 w-11/12 rounded bg-content-100/10 dark:bg-content-200/10" />
          <div className="h-4 w-4/5 rounded bg-content-100/10 dark:bg-content-200/10" />
        </div>
      </div>

      <span className="sr-only">Pagina wordt geladen...</span>
    </section>
  );
}

