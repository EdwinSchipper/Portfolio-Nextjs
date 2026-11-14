/**
 * Tailored skeleton for the Homepage.
 * Perfectly mirrors the HeroBlock layout and responsive grid
 * to eliminate Cumulative Layout Shift (CLS) during HTTP streaming.
 */
export default function HomePageSkeleton() {
  return (
    <section
      id="hero-section"
      role="status"
      aria-label="Homepage wordt geladen..."
      className="relative overflow-hidden bg-background-950 w-full flex flex-col -mt-23 md:-mt-27 lg:-mt-29.25 px-8 sm:px-14 md:px-20 lg:px-20 xl:px-28 pt-32 md:pt-36 lg:pt-40 pb-8 sm:pb-24 lg:pb-30 xl:pb-20 font-content min-h-dvh animate-pulse"
    >
      <div className="mt-auto mx-auto w-full max-w-[1980px] lg:justify-center items-end grid grid-cols-12 gap-y-20 sm:gap-y-28 lg:gap-y-40 xl:gap-y-8">
        <div className="col-span-12 lg:col-span-8 self-end flex">
          <div className="flex flex-col gap-y-10 md:gap-y-20 xl:gap-y-20 w-full">
            <div className="space-y-4 max-w-4xl">
              <div className="h-12 sm:h-16 md:h-20 xl:h-24 w-11/12 rounded-lg bg-title-200/15" />
              <div className="h-12 sm:h-16 md:h-20 xl:h-24 w-3/4 rounded-lg bg-title-200/15" />
            </div>

            <div className="space-y-3 max-w-3xl">
              <div className="h-5 sm:h-7 w-full rounded bg-content-200/15" />
              <div className="h-5 sm:h-7 w-4/5 rounded bg-content-200/15" />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 self-end">
          <div className="flex flex-col items-end gap-2 w-full">
            <div className="h-4 sm:h-5 w-20 rounded bg-content-200/15" />
            <div className="h-4 sm:h-5 w-52 rounded bg-content-200/15" />
          </div>
        </div>
      </div>
      <span className="sr-only">Homepage wordt geladen...</span>
    </section>
  );
}
