import React from "react";
import Link from "next/link";
import type { CSLPAttribute } from "@/lib/types";

export type ButtonVariant =
  | "primary"
  | "brand"
  | "secondary"
  | "inverted"
  | "icon"
  | "icon-inverted"
  | "link"
  | "link-dark"
  | "link-neutral";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  children?: React.ReactNode;
  className?: string;
  cslp?: CSLPAttribute;
  target?: string;
  rel?: string;
}

const ctaBaseStyles =
  "w-full md:w-fit flex lg:w-auto lg:inline-flex justify-center items-center gap-2 font-semibold rounded-md duration-200 font-content tracking-tight whitespace-nowrap text-mediumM sm:text-small px-5 py-2.5 lg:px-7 lg:py-3";

const iconBaseStyles =
  "inline-flex items-center justify-center rounded-full border transition-all duration-200";

const linkBaseStyles =
  "p-0 bg-transparent font-semibold shadow-none transition-colors duration-200";

export const iconButtonSizeClass = "w-11 h-11 lg:w-9 lg:h-9";

const variantStyles: Record<ButtonVariant, string> = {
  primary: `${ctaBaseStyles} bg-background-900 dark:bg-background-200 text-title-200 dark:text-title-100 dark:hover:brightness-110 border border-border-100 dark:border-border-200 hover:bg-accent7-900 hover:border-accent7-900 dark:hover:bg-accent8-900 dark:hover:border-accent8-900 dark:hover:text-title-100`,
  brand: `${ctaBaseStyles} bg-accent7-900 dark:bg-accent8-900 text-title-200 dark:text-title-100 dark:hover:brightness-110 border border-border-100 dark:border-border-200 hover:bg-accent7-900 hover:border-accent7-900 dark:hover:bg-accent8-900 dark:hover:border-accent8-900 dark:hover:text-title-100`,
  secondary: `${ctaBaseStyles} bg-background-200 dark:bg-background-900 text-title-100 dark:text-title-200 dark:hover:brightness-110 border border-border-100 dark:border-border-200 hover:bg-accent7-900 hover:border-accent7-900 dark:hover:bg-accent8-900 dark:hover:border-accent8-900 dark:hover:text-title-100`,
  inverted: `${ctaBaseStyles} bg-background-200 text-title-100 dark:hover:brightness-110 border border-border-200 hover:bg-accent7-900 hover:border-accent7-900 hover:text-title-200 dark:hover:bg-accent8-900 dark:hover:border-accent8-900 dark:hover:text-title-100`,
  icon: `${iconBaseStyles} bg-background-100 dark:bg-background-800 text-content-100 dark:text-content-200 border-border-100 dark:border-border-200 hover:border-border-100 dark:hover:border-border-200/60 hover:text-title-100 dark:hover:text-title-200`,
  "icon-inverted": `${iconBaseStyles} bg-background-900/70 text-title-200 border-border-200/50 hover:border-border-200 hover:text-title-200`,
  link: `${linkBaseStyles} text-accent7-900 dark:text-accent8-900 hover:underline`,
  "link-dark": `${linkBaseStyles} text-content-100/70 dark:text-content-200/50 hover:text-title-100 dark:hover:text-title-200 hover:underline`,
  "link-neutral": `${linkBaseStyles} text-title-100 dark:text-title-200 hover:text-accent7-900 dark:hover:text-accent8-900`,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-smallM sm:text-small",
  md: "px-6 py-3.5 text-smallM sm:text-small",
  lg: "px-8 py-4 text-baseM sm:text-base",
  icon: `${iconButtonSizeClass} p-0 shrink-0`,
};

/**
 * Universal Button component:
 * - Renders a Next.js <Link> (or native <a> for mailto/tel) when `href` is provided.
 * - Renders a native HTML <button> when `href` is omitted.
 * - Supports consistent brand variants, link variants, icon buttons, sizes, arrow animations, and Contentstack live preview (cslp).
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className = "",
  cslp,
  target,
  rel,
  ...buttonProps
}: ButtonProps) {
  const isLinkVariant =
    variant === "link" || variant === "link-dark" || variant === "link-neutral";
  const isIconVariant = variant === "icon" || variant === "icon-inverted";
  const sizeClass = isLinkVariant
    ? size === "sm"
      ? "text-xs"
      : size === "lg"
        ? "text-smallM sm:text-small"
        : "text-xs sm:text-sm"
    : isIconVariant && size === "md"
      ? sizeStyles.icon
      : sizeStyles[size];
  const variantClass = variantStyles[variant];
  const interactionClass = isIconVariant
    ? "group cursor-pointer"
    : "group inline-flex items-center gap-1.5 cursor-pointer";

  const baseClasses =
    `${interactionClass} ${sizeClass} ${variantClass} ${className}`.trim();

  const content = (
    <>
      <span
        className={
          isIconVariant ? "inline-flex items-center justify-center" : undefined
        }
      >
        {children}
      </span>
      {arrow && (
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href) {
    const isProtocolAnchor =
      href.startsWith("mailto:") || href.startsWith("tel:");

    if (isProtocolAnchor) {
      return (
        <a
          href={href}
          className={baseClasses}
          target={target}
          rel={rel}
          {...cslp}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={baseClasses}
        target={target}
        rel={rel}
        {...cslp}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      {...buttonProps}
      {...cslp}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
