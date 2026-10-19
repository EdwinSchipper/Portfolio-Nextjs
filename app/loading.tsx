import React from "react";

/**
 * Route-level streaming skeleton for fast initial perceived load.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page content..."
      className="w-full flex flex-col mb-14 sm:mb-40 md:mb-40 xl:mb-60 px-10 sm:px-14 md:px-20 lg:px-20 xl:px-14 mt-10 lg:my-40 animate-pulse"
    >
      <div className="w-full lg:max-w-7xl mx-auto space-y-8">
        {/* Label badge placeholder */}
        <div className="h-6 w-32 rounded-full bg-border-100 dark:bg-background-900" />

        {/* Hero headline placeholder */}
        <div className="space-y-4 max-w-3xl">
          <div className="h-10 sm:h-16 w-11/12 rounded-lg bg-border-100 dark:bg-background-900" />
          <div className="h-10 sm:h-16 w-3/4 rounded-lg bg-border-100 dark:bg-background-900" />
        </div>

        {/* Intro text placeholder */}
        <div className="space-y-3 max-w-2xl pt-2">
          <div className="h-4 sm:h-5 w-full rounded bg-content-100/10 dark:bg-content-200/10" />
          <div className="h-4 sm:h-5 w-5/6 rounded bg-content-100/10 dark:bg-content-200/10" />
          <div className="h-4 sm:h-5 w-2/3 rounded bg-content-100/10 dark:bg-content-200/10" />
        </div>

        {/* CTA Button placeholder */}
        <div className="pt-4">
          <div className="h-12 w-48 rounded-full bg-border-100 dark:bg-background-900" />
        </div>

        {/* Visual placeholders grid */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 rounded-2xl bg-border-100/70 dark:bg-background-900/70" />
          <div className="h-64 rounded-2xl bg-border-100/70 dark:bg-background-900/70" />
          <div className="h-64 rounded-2xl bg-border-100/70 dark:bg-background-900/70" />
        </div>
      </div>
      <span className="sr-only">Inhoud wordt geladen...</span>
    </div>
  );
}
