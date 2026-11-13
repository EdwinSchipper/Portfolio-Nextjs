import {
  createElement,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react";
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  ArrowLongLeftIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  ChartBarIcon,
  ChartPieIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CircleStackIcon,
  ClockIcon,
  CloudIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  CubeIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EyeIcon,
  FireIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
  InformationCircleIcon,
  KeyIcon,
  LanguageIcon,
  LightBulbIcon,
  LinkIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PaintBrushIcon,
  PencilIcon,
  PencilSquareIcon,
  PhoneIcon,
  PhotoIcon,
  PuzzlePieceIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  RocketLaunchIcon,
  ServerIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SparklesIcon,
  Square2StackIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
  StarIcon,
  SwatchIcon,
  TagIcon,
  TrophyIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  WindowIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { CSLPAttribute } from "@/lib/types";

export type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { title?: string; titleId?: string }
>;

const OUTLINE_ICONS = {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  ArrowLongLeftIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  ChartBarIcon,
  ChartPieIcon,
  CheckBadgeIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  CircleStackIcon,
  ClockIcon,
  CloudIcon,
  CodeBracketIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  CubeIcon,
  CubeTransparentIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EyeIcon,
  FireIcon,
  GlobeAltIcon,
  HeartIcon,
  HomeIcon,
  InformationCircleIcon,
  KeyIcon,
  LanguageIcon,
  LightBulbIcon,
  LinkIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PaintBrushIcon,
  PencilIcon,
  PencilSquareIcon,
  PhoneIcon,
  PhotoIcon,
  PuzzlePieceIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  RocketLaunchIcon,
  ServerIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SparklesIcon,
  Square2StackIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
  StarIcon,
  SwatchIcon,
  TagIcon,
  TrophyIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  WindowIcon,
  WrenchScrewdriverIcon,
} as const satisfies Record<string, IconComponent>;

/**
 * Curated Heroicon names in PascalCase (e.g. 'ArrowRightIcon', 'SparklesIcon', 'TagIcon').
 * Also allows string for dynamic Contentstack inputs (e.g. 'arrow-right', 'tag').
 */
export type KnownHeroIconName = keyof typeof OUTLINE_ICONS;
export type IconName = KnownHeroIconName | (string & {});

/**
 * Icon style variants preserved for prop compatibility.
 * Resolves to the curated Heroicons 24x24 outline registry for optimal tree-shaking.
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

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
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
  fallback?: ReactNode;
}

const variantIconLibraries: Record<
  IconVariant,
  Record<string, IconComponent | undefined>
> = {
  outline: OUTLINE_ICONS,
  solid: OUTLINE_ICONS,
  mini: OUTLINE_ICONS,
  micro: OUTLINE_ICONS,
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

  const library = variantIconLibraries[variant] || OUTLINE_ICONS;

  if (library[name]) {
    return library[name] ?? null;
  }

  const normalized = normalizeIconName(name);
  if (library[normalized]) {
    return library[normalized] ?? null;
  }

  return null;
}

/**
 * Universal Icon Component for Next.js, Heroicons, and Contentstack.
 * Uses an explicit tree-shakeable Heroicons registry instead of wildcard imports.
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

  return createElement(ResolvedIcon, {
    className: combinedClassName,
    strokeWidth,
    ...accessibilityProps,
    ...cslp,
    ...svgProps,
  });
}
