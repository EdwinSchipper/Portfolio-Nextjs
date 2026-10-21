import React from "react";

/**
 * Tailored skeleton for the Homepage.
 * Perfectly mirrors the HeroBlock layout and responsive grid
 * to eliminate Cumulative Layout Shift (CLS) during HTTP streaming.
 */
export default function HomePageSkeleton() {
  return (
    <section
      role="status"
      aria-label="Homepage wordt geladen..."
      className="w-full flex flex-col mb-14 sm:mb-40 md:mb-40 xl:mb-60 px-10 sm:px-14 md:px-20 lg:px-20 xl:px-14 mt-10 lg:my-40 font-content animate-pulse"
    >
      <div className="mx-auto w-full container lg:justify-center items-start grid grid-cols-12 gap-y-20 sm:gap-y-28 lg:gap-y-8">
        {/* Left Column: Label, Heading, Description, Stats & CTA */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-5 xl:col-span-4 self-center flex">
          <div className="flex flex-col gap-y-7 md:gap-y-8 w-full">
            {/* Label badge */}
            <div className="h-6 w-28 rounded-full bg-border-100/60 dark:bg-background-900/60" />

            {/* Headline H1 placeholder */}
            <div className="space-y-3">
              <div className="h-10 sm:h-12 xl:h-14 w-11/12 rounded-lg bg-border-100 dark:bg-background-900" />
              <div className="h-10 sm:h-12 xl:h-14 w-3/4 rounded-lg bg-border-100 dark:bg-background-900" />
            </div>

            {/* Intro text placeholder */}
            <div className="space-y-3 pt-1 max-w-md">
              <div className="h-4 sm:h-5 w-full rounded bg-content-100/10 dark:bg-content-200/10" />
              <div className="h-4 sm:h-5 w-5/6 rounded bg-content-100/10 dark:bg-content-200/10" />
              <div className="h-4 sm:h-5 w-2/3 rounded bg-content-100/10 dark:bg-content-200/10" />
            </div>

            {/* Micro-links / Experience stats placeholder */}
            <div className="flex items-center gap-x-7 sm:gap-x-10">
              <div className="space-y-1">
                <div className="h-8 w-16 rounded bg-border-100 dark:bg-background-900" />
                <div className="h-3 w-20 rounded bg-content-100/10 dark:bg-content-200/10" />
              </div>
              <div className="border-l-2 border-border-100 dark:border-border-200 pl-7 sm:pl-10 space-y-1">
                <div className="h-8 w-14 rounded bg-border-100 dark:bg-background-900" />
                <div className="h-3 w-24 rounded bg-content-100/10 dark:bg-content-200/10" />
              </div>
            </div>

            {/* CTA Button placeholder */}
            <div className="pt-2">
              <div className="h-12 w-48 rounded-full bg-border-100 dark:bg-background-900" />
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visuals Grid */}
        <div className="col-span-12 sm:col-span-12 lg:col-span-7 xl:col-span-8 md:px-0 lg:px-10 xl:px-20 -mx-5 md:-mx-0 mt-0 lg:self-center xl:self-start w-full">
          <div className="grid grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))] gap-2 w-full max-w-lg sm:max-w-none mx-auto relative h-[360px] sm:h-[580px] md:h-[500px] xl:h-[600px]">
            {/* Visual 1 (UX) */}
            <div className="col-start-1 col-end-6 row-start-1 row-end-11 rounded-md bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200" />
            {/* Visual 2 (Vormgeving) */}
            <div className="col-start-6 col-end-12 row-start-3 row-end-7 rounded-md bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200" />
            {/* Visual 3 (Development) */}
            <div className="col-start-6 col-end-13 row-start-7 row-end-13 rounded-md bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200" />
          </div>
        </div>
      </div>
      <span className="sr-only">Homepage wordt geladen...</span>
    </section>
  );
}
