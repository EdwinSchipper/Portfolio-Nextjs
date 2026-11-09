import React from "react";
import * as OutlineIcons from "@heroicons/react/24/outline";
import * as SolidIcons from "@heroicons/react/24/solid";
import * as MiniIcons from "@heroicons/react/20/solid";
import * as MicroIcons from "@heroicons/react/16/solid";
import { CSLPAttribute } from "@/lib/types";

/**
 * All known Heroicon names in PascalCase (e.g. 'ArrowRightIcon', 'SparklesIcon', 'TagIcon').
 * Also allows string for dynamic Contentstack inputs (e.g. 'arrow-right', 'tag').
 */
export type KnownHeroIconName = keyof typeof OutlineIcons;
export type IconName = KnownHeroIconName | (string & {});

/**
 * Heroicons style variants:
 * - outline: 24x24 stroke icons (Heroicons default)
 * - solid: 24x24 filled icons
 * - mini: 20x20 filled icons (for tight UI / badges)
 * - micro: 16x16 filled icons (for ultra-compact inline text)
 */
export type IconVariant = "outline" | "solid" | "mini" | "micro";

/**
 * Standard preset sizes mapping to Tailwind classes.
 * 'custom' leaves sizing entirely to the className.
 */
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "custom";

export const iconSizeStyles: Record<IconSize, string> = {
  xs: "w-3.5 h-3.5",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10",
  custom: "",
};

export type IconComponent = React.ComponentType<
  React.ComponentProps<"svg"> & { title?: string; titleId?: string }
>;

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "ref"> {
  /**
   * Icon name from Heroicons (e.g. 'ArrowRightIcon', 'arrow-right', 'calendar', 'sparkles').
   * Supports PascalCase, kebab-case, snake_case, and camelCase.
   */
  name?: IconName;
  /**
   * Direct Heroicon or custom SVG component.
   * Enables optimal tree-shaking when used directly in code.
   */
  icon?: IconComponent;
  /**
   * Heroicons style variant (outline, solid, mini, micro).
   * @default 'outline'
   */
  variant?: IconVariant;
  /**
   * Semantic size preset.
   * @default 'md'
   */
  size?: IconSize;
  /**
   * Additional Tailwind classes (e.g. text color, stroke width, hover states).
   */
  className?: string;
  /**
   * Contentstack Live Preview and Visual Builder attributes (`data-cslp`).
   */
  cslp?: CSLPAttribute;
  /**
   * Accessible text. If provided, sets `role="img"` and `aria-label`.
   * If omitted, the icon is marked `aria-hidden="true"` as decorative.
   */
  label?: string;
  /**
   * Optional fallback React element rendered when the requested icon name is not found.
   * @default null
   */
  fallback?: React.ReactNode;
}

/**
 * Map of icon libraries indexed by variant.
 */
const variantIconLibraries: Record<
  IconVariant,
  Record<string, IconComponent | undefined>
> = {
  outline: OutlineIcons,
  solid: SolidIcons,
  mini: MiniIcons,
  micro: MicroIcons,
};

/**
 * Normalizes any icon name variant (kebab-case, snake_case, or missing 'Icon' suffix)
 * to official Heroicons PascalCase format (e.g. 'arrow-right' -> 'ArrowRightIcon').
 */
export function normalizeIconName(name: string): string {
  if (!name || typeof name !== "string") return "";

  const trimmed = name.trim();
  if (!trimmed) return "";

  const clean = trimmed
    .replace(/[-_]icon$/i, "")
    .replace(/Icon$/, "");

  const pascal = clean
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return `${pascal}Icon`;
}

/**
 * Resolves an icon component from either a direct component or by name & variant.
 */
export function resolveIconComponent(
  name?: string,
  variant: IconVariant = "outline",
  icon?: IconComponent
): IconComponent | null {
  if (icon) return icon;
  if (!name) return null;

  const library = variantIconLibraries[variant] || OutlineIcons;

  if (library[name]) {
    return library[name] ?? null;
  }

  const normalized = normalizeIconName(name);
  if (library[normalized]) {
    return library[normalized] ?? null;
  }

  if (variant !== "outline" && OutlineIcons[normalized as keyof typeof OutlineIcons]) {
    return OutlineIcons[normalized as keyof typeof OutlineIcons];
  }

  return null;
}

/**
 * Universal Icon Component for Next.js, Hero Icons, and Contentstack.
 *
 * Features:
 * - Full Heroicons support: outline (24x24), solid (24x24), mini (20x20), micro (16x16).
 * - React Server Component (RSC) compatible: 0 client runtime overhead when rendered on the server.
 * - Dual usage:
 *   1. Direct component import: `<Icon icon={ChevronRightIcon} size="sm" />` (100% tree-shakeable)
 *   2. Dynamic name lookup: `<Icon name="arrow-right" variant="solid" />` (Contentstack CMS friendly)
 * - Automatic name normalization: handles 'arrow-right', 'arrow_right', 'ArrowRight', or 'ArrowRightIcon'.
 * - Contentstack Live Preview: binds `cslp` / `data-cslp` attributes directly.
 * - Accessibility by default: `aria-hidden="true"` when decorative, or `role="img"` with `aria-label` when `label` is provided.
 * - Fluid sizing with default `shrink-0` to prevent SVG squashing in flex containers.
 */
export default function Icon({
  name,
  icon,
  variant = "outline",
  size = "md",
  className = "",
  cslp,
  label,
  fallback = null,
  strokeWidth,
  ...svgProps
}: IconProps) {
  const ResolvedIcon = resolveIconComponent(name, variant, icon);

  if (!ResolvedIcon) {
    return <>{fallback}</>;
  }

  const sizeClass = iconSizeStyles[size] || "";
  const combinedClassName = `shrink-0 inline-block ${sizeClass} ${className}`.trim();

  const accessibilityProps = label
    ? {
        role: "img",
        "aria-label": label,
      }
    : {
        "aria-hidden": true as const,
      };

  return React.createElement(ResolvedIcon, {
    className: combinedClassName,
    strokeWidth,
    ...accessibilityProps,
    ...cslp,
    ...svgProps,
  });
}
