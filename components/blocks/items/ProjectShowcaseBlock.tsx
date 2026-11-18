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
  getColorModeClass,
  getContainerClass,
  getGridColumnsClass,
  getShowcaseVariantClasses,
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
 * ProjectShowcaseBlock: Contentstack modular block rendering a surface/plain showcase with split header, tabbed preview image and centered indicators.
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
    variant,
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
  const colorModeClass = getColorModeClass(colorModeKey);
  const variantClasses = getShowcaseVariantClasses(variant);
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
      className={`col-span-full w-full mb-44 md:mb-32 ${colorModeClass} ${className}`.trim()}
    >
      <div className={`mx-auto sm:px-14 md:px-20 xl:px-14 ${containerClass}`}>
        <div
          className={items.length === 0 ? VB_EmptyBlockParentClass : undefined}
        >
          <div className={`font-content ${variantClasses.container}`.trim()}>
            {hasHeader && (
              <div className="mb-14 md:mb-24">
                {label && (
                  <div className="w-full">
                    <Label variant="brand" cslp={labelCslp}>
                      {label}
                    </Label>
                  </div>
                )}

                {(title || hasRightHeader) && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                    {title && (
                      <div className="lg:col-span-6">
                        <h2
                          id={headingId}
                          className="text-title_1M sm:text-title_1 font-bold text-title-100 dark:text-title-200 text-balance"
                          {...titleCslp}
                        >
                          {title}
                        </h2>
                      </div>
                    )}

                    {hasRightHeader && (
                      <div className="lg:col-span-6 flex flex-col gap-5">
                        {intro && (
                          <p
                            className="text-mediumM sm:text-medium text-content-100 dark:text-content-200 text-pretty"
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
                              <span className="underline underline-offset-4 font-bold">
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
              <TabGroup className="space-y-10 md:space-y-10" {...itemsCslp}>
                <TabPanels>
                  {items.map((item) => {
                    const isExternalItemLink = isExternalHref(item.href);

                    return (
                      <TabPanel
                        key={item.id}
                        className="focus:outline-none space-y-6"
                      >
                        <div
                          className={`relative aspect-4/3 md:aspect-video w-full overflow-hidden max-h-155 rounded-md ${variantClasses.frame}`.trim()}
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

                          {(item.badgeLabel ||
                            (item.href && item.linkLabel)) && (
                            <>
                              <div
                                aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background-950/55 via-background-950/20 to-transparent pointer-events-none"
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
                  className={`grid ${gridColsClass} gap-5 md:gap-10 font-content`}
                >
                  {items.map((item) => (
                    <Tab
                      key={item.id}
                      className="group flex flex-col items-center text-center cursor-pointer transition-colors focus-visible:outline-none data-focus:ring-2 data-focus:ring-accent7-900/60 dark:data-focus:ring-accent8-900/60"
                    >
                      <div className="relative mb-4 h-0.5 w-full rounded-full bg-border-100 dark:bg-border-200 overflow-hidden">
                        <div className="h-full w-0 bg-accent7-900 dark:bg-accent8-900 transition-all duration-300 group-data-selected:w-full motion-reduce:transition-none" />
                      </div>

                      <span
                        className="text-smallM sm:text-small font-bold text-title-100/75 dark:text-title-200/75 transition-colors group-hover:text-title-100 dark:group-hover:text-title-200 group-data-selected:text-title-100 dark:group-data-selected:text-title-200"
                        {...item.titleCslp}
                      >
                        {item.tabTitle}
                      </span>

                      <p
                        className="text-smallM sm:text-small text-content-100/75 dark:text-content-200/75 max-w-xs transition-colors group-data-selected:text-content-100 dark:group-data-selected:text-content-200"
                        {...item.descriptionCslp}
                      >
                        {item.tabDescription}
                      </p>
                    </Tab>
                  ))}
                </TabList>
              </TabGroup>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
