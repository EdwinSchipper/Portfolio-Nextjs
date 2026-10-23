import React from "react";

/**
 * Tailored skeleton for the portfolio case study detail view.
 * Matches PortfolioDetail's exact layout, header gradient, and visual dimensions
 * to eliminate Cumulative Layout Shift (CLS) during HTTP streaming.
 */
export default function PortfolioDetailSkeleton() {
  return (
    <article
      role="status"
      aria-label="Case study wordt geladen..."
      className="w-full animate-pulse font-content"
    >
      {/* 1. Header with matching brand gradient */}
      <header className="relative w-full flex flex-col justify-end pt-40 md:pt-40 lg:pt-52 pb-10 md:pb-16 lg:pb-24 overflow-hidden border-b border-border-100/30 dark:border-border-200/5 -mt-[109px] mb-14 lg:mb-20 bg-gradient-to-tl from-accent7-200/30 to-accent7-500/60 dark:from-accent8-100 dark:via-accent8-100 dark:to-accent8-300">
        <div className="relative z-10 w-full max-w-4xl xl:max-w-6xl px-10 sm:px-14 md:px-20 lg:px-12 mx-auto flex flex-col items-start space-y-4">
          {/* Label placeholder */}
          <div className="h-6 w-24 rounded-full bg-border-100/60 dark:bg-background-900/60" />
          {/* Title placeholder */}
          <div className="h-10 sm:h-14 w-3/4 max-w-xl rounded-lg bg-border-100/70 dark:bg-background-900/70" />
        </div>
      </header>

      {/* 2. Breadcrumbs placeholder */}
      <div className="mx-auto max-w-4xl xl:max-w-6xl w-full px-10 sm:px-14 md:px-20 lg:px-12 mb-10 flex gap-2 items-center">
        <div className="h-4 w-12 rounded bg-content-100/10 dark:bg-content-200/10" />
        <span className="text-content-100/20 dark:text-content-200/20 text-xs">/</span>
        <div className="h-4 w-16 rounded bg-content-100/10 dark:bg-content-200/10" />
        <span className="text-content-100/20 dark:text-content-200/20 text-xs">/</span>
        <div className="h-4 w-28 rounded bg-content-100/20 dark:bg-content-200/20" />
      </div>

      {/* 3. Section 01: Hero visual + Overview */}
      <div className="flex lg:items-center justify-center sm:max-w-xl md:max-w-4xl lg:max-w-7xl container lg:w-full px-6 sm:px-0 md:px-14 lg:px-20 xl:px-12 mx-auto mb-14 lg:mb-40">
        <div className="w-full mx-auto flex flex-col md:grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Hero Image skeleton */}
          <div className="w-full rounded-md order-2 md:order-1 md:col-span-6 lg:col-span-7 h-[220px] sm:h-[325px] md:h-[400px] lg:h-[500px] xl:h-[50vh] bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200" />

          {/* Right: Overview text skeleton */}
          <div className="w-full order-1 md:order-2 md:col-span-6 lg:col-span-5 flex flex-col space-y-5">
            <div className="h-5 w-24 rounded-full bg-border-100/60 dark:bg-background-900/60" />
            <div className="h-8 w-4/5 rounded-lg bg-border-100 dark:bg-background-900" />
            <div className="space-y-3 pt-2">
              <div className="h-4 w-full rounded bg-content-100/10 dark:bg-content-200/10" />
              <div className="h-4 w-11/12 rounded bg-content-100/10 dark:bg-content-200/10" />
              <div className="h-4 w-4/5 rounded bg-content-100/10 dark:bg-content-200/10" />
              <div className="h-4 w-2/3 rounded bg-content-100/10 dark:bg-content-200/10" />
            </div>

            {/* Tech stack badges placeholder */}
            <div className="pt-4 flex gap-2">
              <div className="h-8 w-24 rounded-full bg-border-100 dark:bg-background-900" />
              <div className="h-8 w-20 rounded-full bg-border-100 dark:bg-background-900" />
              <div className="h-8 w-28 rounded-full bg-border-100 dark:bg-background-900" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Case study wordt geladen...</span>
    </article>
  );
}
