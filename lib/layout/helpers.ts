import {
  colSpans,
  colorModes,
  containerWidths,
  defaultHeading,
  HEADING_VALUES,
  type HeadingType,
} from "./tokens";

function normalizeTokenKey(value: string | undefined, fallback: string): string {
  const trimmed = (value ?? "").trim().toLowerCase();
  return trimmed.length > 0 ? trimmed : fallback;
}

/**
 * Resolves a column span number or string to responsive Tailwind grid span classes.
 */
export function getColSpanClass(span?: number | string, fallback = "col-span-12"): string {
  if (span === undefined || span === null) {
    return fallback;
  }

  const key = String(span).trim();
  return key.length > 0 ? (colSpans[key] ?? fallback) : fallback;
}

/**
 * Resolves a Contentstack container width token to Tailwind max-width classes.
 */
export function getContainerClass(width?: string, defaultWidth = "large"): string {
  const key = normalizeTokenKey(width, defaultWidth.trim().toLowerCase());
  const fallbackKey = normalizeTokenKey(defaultWidth, "large");

  return containerWidths[key] ?? containerWidths[fallbackKey] ?? containerWidths.large;
}

/**
 * Resolves a Contentstack color mode string ("default" | "alt") to section surface classes.
 */
export function getColorModeClass(mode?: string): string {
  const key = normalizeTokenKey(mode, "default");
  return colorModes[key] ?? colorModes.default;
}

/**
 * Resolves a Contentstack heading selection to a valid HTML heading tag,
 * defaulting to "h2" to preserve document outline and avoid duplicate H1 headings.
 */
export function getHeadingTag(
  heading?: string | string[],
  fallback: HeadingType = defaultHeading
): HeadingType {
  if (!heading) {
    return fallback;
  }

  const rawValue = Array.isArray(heading) ? heading[0] : heading;
  if (typeof rawValue !== "string") {
    return fallback;
  }

  const normalized = rawValue.trim().toLowerCase();
  return (HEADING_VALUES as readonly string[]).includes(normalized)
    ? (normalized as HeadingType)
    : fallback;
}
