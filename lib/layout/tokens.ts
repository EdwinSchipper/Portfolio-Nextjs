/**
 * Layout Tokens & Standards for Contentstack Blocks
 * 
 * Provides a Single Source of Truth for:
 * 1. Container Widths (small, default, large, wide)
 * 2. Section Color Modes (default, alt)
 * 3. Grid Column Utilities
 * 4. Semantic Headings (h1, h2, h3, h4, h5, h6)
 */

export const containerWidths: Record<string, string> = {
  small: "w-full lg:max-w-4xl",
  default: "w-full lg:max-w-5xl",
  medium: "w-full lg:max-w-5xl",
  large: "w-full lg:max-w-7xl",
  wide: "w-full lg:max-w-[1400px] xl:max-w-[1536px]",
  container: "w-full lg:max-w-[1400px] xl:max-w-[1536px]",
  full: "w-full max-w-none lg:max-w-none",
};

export const colorModes: Record<string, string> = {
  default: "bg-transparent",
  alt: "bg-background-200 dark:bg-background-900 border-y border-border-100 dark:border-border-200 py-20 sm:py-36",
};

export const colSpans: Record<string, string> = {
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

export const HEADING_VALUES = ["h1", "h2", "h3", "h4", "h5"] as const;
export type HeadingType = (typeof HEADING_VALUES)[number] | "h6";
export const defaultHeading: HeadingType = "h2";
