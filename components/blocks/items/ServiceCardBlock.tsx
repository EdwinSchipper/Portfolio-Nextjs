import React from "react";
import Image from "next/image";
import { ServiceCardBlock as ServiceCardBlockType, CSLPAttribute } from "@/lib/types";
import { Label } from "@/components/ui";

/**
 * Maps Contentstack `grid_size` ('1', '2', '3') to Tailwind column span classes.
 */
export function getGridColSpan(gridSize?: string): string {
  const size = String(gridSize || "").trim();
  switch (size) {
    case "1":
      return "col-span-full";
    case "2":
      return "col-span-full md:col-span-6";
    case "3":
      return "col-span-full md:col-span-4";
    default:
      return "col-span-full md:col-span-4";
  }
}

export interface ServiceCardBlockProps {
  data?: ServiceCardBlockType;
  previewAttr?: CSLPAttribute;
  gridSize?: "1" | "2" | "3" | string;
  className?: string;
}

/**
 * ServiceCardBlock: Clean single-file card block with text or image-tag layout.
 */
export default function ServiceCardBlock({
  data,
  previewAttr,
  gridSize,
  className = "",
}: ServiceCardBlockProps) {
  if (!data) return null;

  const colSpanClass = getGridColSpan(gridSize || data?.grid_size);
  const cardTitle = data.card_title;
  const cardText = data.card_text;
  const cardImage = data.image;
  const rawVariant = (data.card_variant || data.variant || "").toLowerCase();

  const isImageVariant =
    rawVariant.includes("image") ||
    rawVariant.includes("tag") ||
    (Boolean(cardImage?.url) && rawVariant !== "default");

  const meta = data.$;

  return (
    <div {...previewAttr} className={`${colSpanClass} ${className} font-content`}>
      {isImageVariant ? (
        <div className="flex flex-col h-full">
          {cardImage?.url && (
            <div className="relative w-full aspect-16/10 rounded-md overflow-hidden mb-4 border border-border-100 dark:border-border-200 bg-background-200 dark:bg-background-900">
              <Image
                src={cardImage.url}
                alt={cardImage.title || (typeof cardTitle === "string" ? cardTitle : "Service card image")}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                {...(cardImage?.$ && cardImage?.$.url)}
              />
            </div>
          )}

          {cardTitle && (
            <div className="mb-3">
              <Label variant="pill" cslp={meta && meta.card_title}>
                {cardTitle}
              </Label>
            </div>
          )}

          {cardText && (
            <p
              {...(meta && meta.card_text)}
              className="text-mediumM sm:text-small text-content-100 dark:text-content-200 leading-relaxed whitespace-pre-line"
            >
              {cardText}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col h-full p-8 md:p-10 rounded-md border border-border-100 dark:border-border-200 bg-background-200 dark:bg-background-900">
          {cardTitle && (
            <h3
              {...(meta && meta.card_title)}
              className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 mb-3"
            >
              {cardTitle}
            </h3>
          )}

          {cardText && (
            <p
              {...(meta && meta.card_text)}
              className="text-mediumM sm:text-small text-content-100 dark:text-content-200 leading-relaxed whitespace-pre-line"
            >
              {cardText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
