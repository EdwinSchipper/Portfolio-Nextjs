import {
  containerWidths,
  colorModes,
  colSpans,
  HEADING_VALUES,
  type HeadingType,
  defaultHeading,
} from "./tokens";

/**
 * Resolves a column span number/string to Tailwind grid classes.
 */
export function getColSpanClass(span?: number | string, fallback = "col-span-12"): string {
  if (!span) return fallback;
  return colSpans[String(span).trim()] ?? fallback;
}

/**
 * Resolves a Contentstack width string to standard Tailwind max-w classes.
 */
export function getContainerClass(width?: string, defaultWidth = "large"): string {
  const key = String(width || defaultWidth).trim().toLowerCase();
  return (
    containerWidths[key] ??
    containerWidths[defaultWidth.trim().toLowerCase()] ??
    containerWidths.large
  );
}

/**
 * Resolves a Contentstack color mode string ("Default" | "Alt") to background & border classes.
 */
export function getColorModeClass(mode?: string): string {
  const key = String(mode || "default").trim().toLowerCase();
  return colorModes[key] ?? colorModes.default;
}

/**
 * Resolves a Contentstack heading string ("h1", "h2", etc.) to a valid HTML heading tag.
 * Defaults to "h2" to maintain healthy SEO and prevent duplicate H1 tags.
 */
export function getHeadingTag(
  heading?: string | string[],
  fallback: HeadingType = defaultHeading
): HeadingType {
  if (!heading) return fallback;
  const value = Array.isArray(heading) ? heading[0] : heading;
  if (!value || typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase() as HeadingType;
  return (HEADING_VALUES as readonly string[]).includes(normalized) || normalized === "h6"
    ? normalized
    : fallback;
}
