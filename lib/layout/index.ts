/**
 * Layout Module: Design tokens and layout helper functions.
 */

export {
  containerWidths,
  colorModes,
  colSpans,
  HEADING_VALUES,
  defaultHeading,
} from "./tokens";
export type {
  ContainerWidthKey,
  ColorModeKey,
  ColSpanKey,
  HeadingType,
} from "./tokens";

export {
  getColSpanClass,
  getContainerClass,
  getColorModeClass,
  getHeadingTag,
} from "./helpers";
