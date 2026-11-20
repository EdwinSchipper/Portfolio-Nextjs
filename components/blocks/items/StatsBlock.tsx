import { createElement, useId } from "react";
import { VB_EmptyBlockParentClass } from "@contentstack/live-preview-utils";
import type { CSLPAttribute, StatsBlock as StatsBlockType } from "@/lib/types";
import { normalizeStatsBlock } from "@/lib/cms";
import {
  getColorModeClass,
  getContainerClass,
  getHeadingTag,
} from "@/lib/layout";
import { Label, RichText } from "@/components/ui";

export interface StatsBlockProps {
  data?: StatsBlockType;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  className?: string;
}

/**
 * StatsBlock: Contentstack modular block rendering a split headline with intro copy and border-divided metric rows.
 */
export default function StatsBlock({
  data,
  previewAttr,
  width,
  colorMode,
  className = "",
}: StatsBlockProps) {
  const headingId = useId();
  const normalized = normalizeStatsBlock(data, {
    width,
    colorMode,
  });

  if (!normalized) return null;

  const {
    rawWidth,
    colorModeKey,
    label,
    heading,
    headingTag: headingTagValue,
    intro,
    labelCslp,
    headingCslp,
    introCslp,
    items,
    itemsCslp,
  } = normalized;

  const hasContent = Boolean(label || heading || intro || items.length > 0);
  if (!hasContent) {
    return null;
  }

  const containerClass = getContainerClass(rawWidth, "large");
  const colorModeClass = getColorModeClass(colorModeKey);
  const resolvedHeadingTag = getHeadingTag(headingTagValue, "h2");

  return (
    <section
      {...previewAttr}
      aria-labelledby={heading ? headingId : undefined}
      aria-label={heading ? undefined : "Statistieken en achtergrond"}
      data-color-mode={colorModeKey}
      data-container-width={rawWidth}
      className={`col-span-full w-full ${colorModeClass} ${className}`.trim()}
    >
      <div className={`mx-auto px-10 sm:px-14 md:px-20 xl:px-14 pb-20 font-content ${containerClass}`}>
        {label && (
          <Label variant="brand" className="block w-full" cslp={labelCslp}>
            {label}
          </Label>
        )}

        {(heading || intro || items.length > 0) && (
          <div className="lg:grid lg:grid-cols-12 space-y-10 lg:space-y-0 lg:space-x-32 items-start">
            {heading && (
              <div className="lg:col-span-7">
                {createElement(
                  resolvedHeadingTag,
                  {
                    id: headingId,
                    className:
                      "text-title_2M md:text-title_2 font-bold text-title-100 dark:text-title-200 text-pretty max-w-11/12 lg:max-w-full",
                    ...headingCslp,
                  },
                  heading
                )}
              </div>
            )}

            {(intro || items.length > 0) && (
              <div
                className={`lg:col-span-5 space-y-10 md:space-y-12 ${items.length === 0 ? VB_EmptyBlockParentClass : ""
                  }`.trim()}
              >
                {intro && (
                  <RichText
                    content={intro}
                    cslp={introCslp}
                    plainTextClassName=""
                    className="text-baseM md:text-base text-content-100 dark:text-content-200 text-pretty"
                  />
                )}

                {items.length > 0 && (
                  <dl
                    {...itemsCslp}
                    className="border-y border-border-100 dark:border-border-200 divide-y divide-border-100 dark:divide-border-200"
                  >
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-6 py-4 md:py-4"
                      >
                        <dt
                          className="text-mediumM sm:text-small text-content-100 dark:text-content-200"
                          {...item.labelCslp}
                        >
                          {item.label}
                        </dt>
                        <dd
                          className="text-title_4M md:text-title_4 lg:text-title_3 font-bold text-title-100 dark:text-title-200 tabular-nums shrink-0"
                          {...item.valueCslp}
                        >
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
