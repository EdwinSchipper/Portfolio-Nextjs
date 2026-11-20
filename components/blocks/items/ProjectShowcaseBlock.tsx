"use client";

import { useId } from "react";
import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import type {
  CSLPAttribute,
  ProjectShowcaseBlock as ProjectShowcaseBlockType,
} from "@/lib/types";
import { normalizeProjectShowcaseBlock } from "@/lib/cms";
import {
  getColorModeSurfaceClasses,
  getContainerClass,
  getGridColumnsClass,
  isExternalHref,
} from "@/lib/layout";
import { Button, Label } from "@/components/ui";

export interface ProjectShowcaseBlockProps {
  data?: ProjectShowcaseBlockType;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  className?: string;
}

/**
 * ProjectShowcaseBlock: Contentstack modular block rendering a showcase with optional alt surface overlay, split header, tabbed preview image and centered indicators.
 */
export default function ProjectShowcaseBlock({
  data,
  previewAttr,
  width,
  colorMode,
  className = "",
}: ProjectShowcaseBlockProps) {
  const headingId = useId();
  const normalized = normalizeProjectShowcaseBlock(data, { width, colorMode });
  if (!normalized) return null;

  const {
    rawWidth,
    colorModeKey,
    label,
    title,
    intro,
    linkHref,
    linkLabel,
    labelCslp,
    titleCslp,
    introCslp,
    linkCslp,
    items,
    itemsCslp,
  } = normalized;

  const hasLeftHeader = Boolean(label || title);
  const hasRightHeader = Boolean(intro || (linkHref && linkLabel));
  const hasHeader = hasLeftHeader || hasRightHeader;

  if (!hasHeader && items.length === 0) {
    return null;
  }

  const containerClass = getContainerClass(rawWidth, "large");
  const surfaceClasses = getColorModeSurfaceClasses(colorModeKey);
  const gridColsClass = getGridColumnsClass(items.length);
  const isExternalSectionLink = isExternalHref(linkHref);
  const sectionLinkHasArrow = Boolean(linkLabel?.trim().endsWith("→"));
  const ariaLabel = title || "Uitgelichte projecten showcase";

  return (
    <section
      {...previewAttr}
      aria-labelledby={title ? headingId : undefined}
      aria-label={title ? undefined : ariaLabel}
      data-color-mode={colorModeKey}
      data-container-width={rawWidth}
      className={`col-span-full w-full ${surfaceClasses.section} ${className}`.trim()}
    >
      <div className={`mx-auto ${surfaceClasses.wrapper} ${containerClass}`}>
        <div
          className={`font-content ${surfaceClasses.container} ${items.length === 0 ? VB_EmptyBlockParentClass : ""
            }`.trim()}
        >
          {hasHeader && (
            <div className="mb-14 md:mb-20">
              {label && (
                <Label variant="brand" className="block w-full" cslp={labelCslp}>
                  {label}
                </Label>
              )}

              {(title || hasRightHeader) && (
                <div className="lg:grid lg:grid-cols-12 space-y-6 lg:space-y-10 xl:space-y-0 lg:space-x-20 items-start">
                  {title && (
                    <div className="lg:col-span-11 xl:col-span-6">
                      <h2
                        id={headingId}
                        className="text-title_1M md:text-title_1 font-bold text-title-100 dark:text-title-200 text-balance md:max-w-10/12"
                        {...titleCslp}
                      >
                        {title}
                      </h2>
                    </div>
                  )}

                  {hasRightHeader && (
                    <div className="lg:col-span-11 xl:col-span-6 flex flex-col gap-5">
                      {intro && (
                        <p
                          className="text-baseM md:text-base text-content-100 dark:text-content-200 text-pretty"
                          {...introCslp}
                        >
                          {intro}
                        </p>
                      )}

                      {linkHref && linkLabel && (
                        <div className="w-fit">
                          <Button
                            href={linkHref}
                            variant="link-neutral"
                            arrow={!sectionLinkHasArrow}
                            target={
                              isExternalSectionLink ? "_blank" : undefined
                            }
                            rel={
                              isExternalSectionLink
                                ? "noopener noreferrer"
                                : undefined
                            }
                            cslp={linkCslp}
                          >
                            <span className="underline underline-offset-4 font-bold text-mediumM md:text-medium">
                              {linkLabel}
                            </span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {items.length > 0 && (
            <TabGroup className="space-y-5 md:space-y-10" {...itemsCslp}>
              <TabPanels>
                {items.map((item) => {
                  const isExternalItemLink = isExternalHref(item.href);

                  return (
                    <TabPanel key={item.id} className="focus:outline-none">
                      <div
                        className={`relative aspect-4/3 md:aspect-video w-full overflow-hidden max-h-60 md:max-h-100 lg:max-h-130 rounded-md ${surfaceClasses.frame}`.trim()}
                      >
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.imageAlt || item.tabTitle}
                            fill
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 1120px"
                            className="object-cover object-center"
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
                              className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background-950/55 via-background-950/20 to-transparent pointer-events-none"
                            />
                            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-4 md:p-9">
                              {item.badgeLabel && (
                                <Label variant="pill" cslp={item.badgeCslp}>
                                  {item.badgeLabel}
                                </Label>
                              )}

                              {item.href && item.linkLabel && (
                                <div className="ml-auto shrink-0 w-fit">
                                  <Button
                                    href={item.href}
                                    variant="inverted"
                                    size="sm"
                                    target={
                                      isExternalItemLink ? "_blank" : undefined
                                    }
                                    rel={
                                      isExternalItemLink
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                    cslp={item.linkCslp}
                                  >
                                    {item.linkLabel}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </TabPanel>
                  );
                })}
              </TabPanels>

              <TabList
                aria-label={ariaLabel}
                className={`grid ${gridColsClass} gap-5 lg:gap-20 font-content md:px-14`}
              >
                {items.map((item) => (
                  <Tab
                    key={item.id}
                    className="group flex flex-col items-center text-center cursor-pointer transition-colors motion-reduce:transition-none focus-visible:outline-none data-focus:ring-2 data-focus:ring-accent7-900/60 dark:data-focus:ring-accent8-900/60"
                  >
                    <span
                      aria-hidden="true"
                      className="relative block mb-4 h-0.75 w-full rounded-full bg-border-100 dark:bg-border-200 overflow-hidden"
                    >
                      <span className="block h-full w-0 bg-accent7-900 dark:bg-accent8-900 transition-all duration-300 group-data-selected:w-full motion-reduce:transition-none" />
                    </span>

                    <span
                      className="block text-mediumM sm:text-medium mb-0.5 font-bold text-title-100/75 dark:text-title-200/75 transition-colors group-hover:text-title-100 dark:group-hover:text-title-200 group-data-selected:text-title-100 dark:group-data-selected:text-title-200 motion-reduce:transition-none"
                      {...item.titleCslp}
                    >
                      {item.tabTitle}
                    </span>

                    <span
                      className="block text-smallM sm:text-small text-content-100/75 dark:text-content-200/75 transition-colors group-data-selected:text-content-100 dark:group-data-selected:text-content-200 motion-reduce:transition-none"
                      {...item.descriptionCslp}
                    >
                      {item.tabDescription}
                    </span>
                  </Tab>
                ))}
              </TabList>
            </TabGroup>
          )}
        </div>
      </div>
    </section>
  );
}
