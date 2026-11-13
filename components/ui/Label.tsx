import React from "react";
import type { CSLPAttribute } from "@/lib/types";

export type LabelVariant = "brand" | "numbered" | "pill" | "muted";

export interface LabelProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  variant?: LabelVariant;
  className?: string;
  cslp?: CSLPAttribute;
  as?: "span" | "div" | "p";
}

/**
 * Parses and formats numbered label strings like "01 — VISIE" or "02 - IMPACT":
 * Highlights the leading number in coral brand color (#f05a46), followed by a dash and the label.
 */
function renderNumberedContent(text: string) {
  const match = text.match(/^(\d+)\s*[-—]\s*(.+)$/);
  if (match) {
    return (
      <span className="flex gap-3 relative w-full mb-3 lg:mb-4 tracking-tight items-baseline">
        <span className="font-bold text-accent7-900 dark:text-accent8-900 font-playfull text-label">{match[1]}</span>
        <span className="font-medium text-accent7-900 dark:text-accent8-900 text-label">—</span>
        <span className="font-medium uppercase text-title-100 dark:text-title-200 text-noteM md:text-note">{match[2]}</span>
      </span>
    );
  }
  return text;
}

const variantStyles: Record<LabelVariant, string> = {
  brand: "font-content text-accent7-900 dark:text-accent8-900 text-labelM md:text-label tracking-tight font-normal dark:font-normal dark:md:font-normal",
  numbered: "",
  pill: "badge-item inline-flex items-center justify-center whitespace-nowrap w-fit border rounded-md font-playfull text-[12px] border-border-100 dark:border-border-200 text-title-100 dark:text-title-200 bg-background-200 dark:bg-background-900 px-3 py-1.5",
  muted: "font-content text-content-300 dark:text-content-300",
};

/**
 * Universal Label component:
 * - Brand section overline (default uppercase coral #f05a46).
 * - Automatic parsing for numbered patterns ("01 — VISIE").
 * - Pill badge variant for tags and category labels.
 * - Supports Contentstack live preview bindings (cslp).
 */
export default function Label({
  children,
  variant = "brand",
  className = "",
  cslp,
  as: Component = "span",
  ...restProps
}: LabelProps) {
  if (!children) return null;

  const isString = typeof children === "string";
  const hasNumberedPattern = isString && /^(\d+)\s*[-—]\s*(.+)$/.test(children);

  const effectiveVariant: LabelVariant =
    variant === "brand" && hasNumberedPattern ? "numbered" : variant;

  const content =
    (effectiveVariant === "numbered" || hasNumberedPattern) && isString
      ? renderNumberedContent(children)
      : children;

  const baseClass = variantStyles[effectiveVariant] || variantStyles.brand;

  return (
    <Component
      {...cslp}
      {...restProps}
      className={`${baseClass} ${className}`}
    >
      {content}
    </Component>
  );
}
