import {
  cardGridColumns,
  colSpans,
  colorModes,
  containerWidths,
  defaultHeading,
  gridColumns,
  HEADING_VALUES,
  serviceCardSpans,
  showcaseVariants,
  type ColSpanKey,
  type ColorModeKey,
  type ContainerWidthKey,
  type GridColumnsKey,
  type HeadingType,
  type ServiceCardSpanKey,
  type ShowcaseVariantClasses,
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

  const key = String(span).trim() as ColSpanKey;
  return colSpans[key] ?? fallback;
}

/**
 * Resolves a column count or string (1-4) to responsive Tailwind grid column classes.
 */
export function getGridColumnsClass(
  columns?: number | string,
  defaultColumns: GridColumnsKey = "3"
): string {
  const key = String(columns ?? "").trim() as GridColumnsKey;
  return gridColumns[key] ?? gridColumns[defaultColumns];
}

/**
 * Resolves a card section column count (1-4) to responsive Tailwind card grid classes.
 */
export function getCardGridColumnsClass(
  columns?: number | string,
  defaultColumns: GridColumnsKey = "3"
): string {
  const matched = String(columns ?? "").match(/[1-4]/)?.[0] as GridColumnsKey | undefined;
  return (matched ? cardGridColumns[matched] : undefined) ?? cardGridColumns[defaultColumns];
}

/**
 * Maps Contentstack `grid_size` ('1', '2', '3') to Tailwind column span classes for service cards.
 */
export function getServiceCardColSpan(
  gridSize?: number | string,
  defaultSize: ServiceCardSpanKey = "3"
): string {
  const key = String(gridSize ?? "").trim() as ServiceCardSpanKey;
  return serviceCardSpans[key] ?? serviceCardSpans[defaultSize];
}

/**
 * Resolves a Contentstack container width token to Tailwind max-width classes.
 */
export function getContainerClass(
  width?: string,
  defaultWidth: ContainerWidthKey = "large"
): string {
  const key = normalizeTokenKey(width, defaultWidth) as ContainerWidthKey;
  const fallbackKey = normalizeTokenKey(defaultWidth, "large") as ContainerWidthKey;

  return containerWidths[key] ?? containerWidths[fallbackKey] ?? containerWidths.large;
}

/**
 * Resolves a Contentstack color mode string ("default" | "alt") to section surface classes.
 */
export function getColorModeClass(mode?: string): string {
  const key = normalizeTokenKey(mode, "default") as ColorModeKey;
  return colorModes[key] ?? colorModes.default;
}

/**
 * Resolves a showcase variant ("surface" | "plain") to its container and frame surface classes.
 */
export function getShowcaseVariantClasses(variant?: string): ShowcaseVariantClasses {
  const key = normalizeTokenKey(variant, "surface");
  return key === "plain" ? showcaseVariants.plain : showcaseVariants.surface;
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

/**
 * Checks whether a normalized href targets an external HTTP(S) or protocol-relative origin.
 */
export function isExternalHref(href?: string): boolean {
  return Boolean(
    href &&
      (href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("/" + "/"))
  );
}
