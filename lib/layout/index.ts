/**
 * Layout Module: Design tokens and layout helper functions.
 */

export {
  containerWidths,
  colorModes,
  showcaseVariants,
  colSpans,
  gridColumns,
  cardGridColumns,
  serviceCardSpans,
  HEADING_VALUES,
  defaultHeading,
} from "./tokens";
export type {
  ContainerWidthKey,
  ColorModeKey,
  ShowcaseVariantKey,
  ShowcaseVariantClasses,
  ColSpanKey,
  GridColumnsKey,
  ServiceCardSpanKey,
  HeadingType,
} from "./tokens";

export {
  getColSpanClass,
  getGridColumnsClass,
  getCardGridColumnsClass,
  getServiceCardColSpan,
  getContainerClass,
  getColorModeClass,
  getShowcaseVariantClasses,
  getHeadingTag,
  isExternalHref,
} from "./helpers";
