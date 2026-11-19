/**
 * Layout tokens and grid standards shared across modular Contentstack blocks.
 */

export type ContainerWidthKey =
  | "small"
  | "default"
  | "medium"
  | "large"
  | "wide"
  | "container"
  | "full";

export type ColorModeKey = "default" | "alt";

export interface ColorModeSurfaceClasses {
  section: string;
  wrapper: string;
  container: string;
  frame: string;
}

export type ColSpanKey =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

export type GridColumnsKey = "1" | "2" | "3" | "4";

export type ServiceCardSpanKey = "1" | "2" | "3";

export const sectionMargin = "mb-28 sm:mb-40 lg:mb-40 xl:mb-52";

export const altMobileCounterMargin = "-mt-28 sm:mt-0";

export const containerWidths: Record<ContainerWidthKey, string> = {
  small: "w-full lg:max-w-4xl",
  default: "w-full lg:max-w-5xl",
  medium: "w-full lg:max-w-5xl",
  large: "w-full lg:max-w-7xl",
  wide: "w-full lg:max-w-[1400px] xl:max-w-[1536px]",
  container: "w-full lg:max-w-[1400px] xl:max-w-[1536px]",
  full: "w-full max-w-none lg:max-w-none",
};

export const colorModes: Record<ColorModeKey, string> = {
  default: `${sectionMargin} bg-transparent`,
  alt: `${altMobileCounterMargin} ${sectionMargin} bg-background-200 dark:bg-background-900 border-y border-border-100 dark:border-border-200 py-20 sm:py-36`,
};

export const colorModeSurfaces: Record<ColorModeKey, ColorModeSurfaceClasses> = {
  default: {
    section: sectionMargin,
    wrapper: "px-10 sm:px-14 md:px-20 xl:px-14",
    container: "",
    frame: "",
  },
  alt: {
    section: `${altMobileCounterMargin} ${sectionMargin}`,
    wrapper: "sm:px-14 md:px-20 xl:px-14",
    container:
      "sm:rounded-md border-t border-b sm:border border-border-100/50 dark:border-border-200 bg-background-200 dark:bg-background-900 py-14 p-10 sm:p-10 md:p-14 xl:p-20",
    frame:
      "border border-border-100/60 dark:border-border-200/60 bg-background-100 dark:bg-background-950",
  },
};

export const colSpans: Record<ColSpanKey, string> = {
  "1": "col-span-12 lg:col-span-1",
  "2": "col-span-12 lg:col-span-2",
  "3": "col-span-12 lg:col-span-3",
  "4": "col-span-12 lg:col-span-4",
  "5": "col-span-12 lg:col-span-5",
  "6": "col-span-12 lg:col-span-6",
  "7": "col-span-12 lg:col-span-7",
  "8": "col-span-12 lg:col-span-8",
  "9": "col-span-12 lg:col-span-9",
  "10": "col-span-12 lg:col-span-10",
  "11": "col-span-12 lg:col-span-11",
  "12": "col-span-12",
};

export const gridColumns: Record<GridColumnsKey, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 lg:grid-cols-2",
  "3": "grid-cols-1 lg:grid-cols-3",
  "4": "grid-cols-1 lg:grid-cols-4",
};

export const cardGridColumns: Record<GridColumnsKey, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 lg:grid-cols-2",
  "3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export const serviceCardSpans: Record<ServiceCardSpanKey, string> = {
  "1": "col-span-full",
  "2": "col-span-full md:col-span-6",
  "3": "col-span-full md:col-span-4",
};

export const HEADING_VALUES = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
export type HeadingType = (typeof HEADING_VALUES)[number];
export const defaultHeading: HeadingType = "h2";
