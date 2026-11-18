"use client";

import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { ProjectShowcaseItem } from "@/lib/types";
import { Button, Label } from "@/components/ui";

export type { ProjectShowcaseItem };

export type ProjectShowcaseVariant = "surface" | "plain";

export interface ProjectShowcaseProps {
  items: ProjectShowcaseItem[];
  variant?: ProjectShowcaseVariant;
  ariaLabel?: string;
  className?: string;
}

const showcaseVariants: Record<
  ProjectShowcaseVariant,
  { container: string; frame: string }
> = {
  surface: {
    container:
      "rounded-md border border-border-100 dark:border-border-200 bg-background-200 dark:bg-background-900 p-5 md:p-8 shadow-xl",
    frame:
      "border border-border-100 dark:border-border-200 bg-background-100 dark:bg-background-950",
  },
  plain: {
    container: "",
    frame: "",
  },
};

/**
 * ProjectShowcase: Tabbed showcase component with preview image, metadata overlay and animated tab indicators.
 */
export default function ProjectShowcase({
  items,
  variant = "surface",
  ariaLabel = "Uitgelichte projecten",
  className = "",
}: ProjectShowcaseProps) {
  if (items.length === 0) {
    return null;
  }

  const variantClasses = showcaseVariants[variant];

  return (
    <section
      aria-label={ariaLabel}
      className={`${variantClasses.container} ${className}`.trim()}
    >
      <TabGroup className="space-y-6">
        <TabPanels>
          {items.map((item) => (
            <TabPanel key={item.id} className="focus:outline-none">

              <div>02 — Expertise</div>
              <div>Eén aanspreekpunt voor design en  development</div>

              <div>From solo open-source developers, to companies like Stripe and Typeform. We&apos;ve seen the library used for data processing tools, chatbot builders, machine learning, musical synthesizers, and more.</div>

              <div
                className={`relative aspect-video w-full overflow-hidden rounded-md ${variantClasses.frame}`.trim()}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt || item.tabTitle}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 1120px"
                    className="object-cover object-center transition-transform duration-300 motion-reduce:transition-none"
                    {...item.imageCslp}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs md:text-sm text-content-300 dark:text-content-300">
                    Geen afbeelding beschikbaar
                  </div>
                )}

                {(item.badgeLabel || (item.href && item.linkLabel)) && (
                  <>
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background-950/85 via-background-950/35 to-transparent pointer-events-none"
                    />
                    <div className="relative z-10 flex h-full items-end justify-between gap-4 p-4 md:p-6">
                      {item.badgeLabel ? (
                        <Label variant="pill" cslp={item.badgeCslp}>
                          {item.badgeLabel}
                        </Label>
                      ) : (
                        <span />
                      )}

                      {item.href && item.linkLabel && (
                        <div className="shrink-0 w-fit">
                          <Button href={item.href} variant="primary" size="sm" arrow>
                            {item.linkLabel}
                          </Button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </TabPanel>
          ))}
        </TabPanels>

        <TabList
          aria-label={ariaLabel}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 font-content"
        >
          {items.map((item) => (
            <Tab
              key={item.id}
              className="group flex flex-col items-start md:items-center text-left md:text-center pt-1 pb-2 px-2 rounded-md cursor-pointer transition-colors focus-visible:outline-none data-focus:ring-2 data-focus:ring-accent7-900/60 dark:data-focus:ring-accent8-900/60"
            >
              <div className="relative mb-4 h-0.5 w-full rounded-full bg-border-100 dark:bg-border-200 overflow-hidden">
                <div className="h-full w-0 bg-accent7-900 dark:bg-accent8-900 transition-all duration-300 group-data-selected:w-full motion-reduce:transition-none" />
              </div>

              <span
                className="text-sm md:text-base font-semibold text-content-100/70 dark:text-content-200/70 transition-colors group-hover:text-title-100 dark:group-hover:text-title-200 group-data-selected:text-title-100 dark:group-data-selected:text-title-200"
                {...item.titleCslp}
              >
                {item.tabTitle}
              </span>

              <p
                className="mt-1.5 text-xs md:text-sm leading-relaxed text-content-100/60 dark:text-content-200/60 transition-colors group-data-selected:text-content-100 dark:group-data-selected:text-content-200"
                {...item.descriptionCslp}
              >
                {item.tabDescription}
              </p>
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </section>
  );
}
