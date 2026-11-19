/**
 * Layout Module: Design tokens and layout helper functions.
 */

export {
  sectionMargin,
  altMobileCounterMargin,
  containerWidths,
  colorModes,
  colorModeSurfaces,
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
  ColorModeSurfaceClasses,
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
  getColorModeSurfaceClasses,
  getHeadingTag,
  isExternalHref,
} from "./helpers";
