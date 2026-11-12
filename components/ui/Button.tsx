import React from "react";
import Link from "next/link";
import type { CSLPAttribute } from "@/lib/types";

export type ButtonVariant =
  | "primary"
  | "brand"
  | "secondary"
  | "link"
  | "link-dark";

export type ButtonSize = "sm" | "md" | "lg";

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

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "w-full md:w-fit flex lg:w-auto lg:inline-flex justify-center items-center gap-2 font-semibold rounded-md duration-200 font-content tracking-tight whitespace-nowrap text-mediumM sm:text-small px-5 py-2.5 lg:px-7 lg:py-3 bg-background-900 dark:bg-background-200 text-title-200 dark:text-title-100 dark:hover:brightness-110 border border-border-100 dark:border-border-200 hover:bg-accent7-900 hover:border-accent7-900 dark:hover:bg-accent8-900 dark:hover:border-accent8-900 dark:hover:text-title-100",
  brand:
    "w-full md:w-fit flex lg:w-auto lg:inline-flex justify-center items-center gap-2 font-semibold rounded-md duration-200 font-content tracking-tight whitespace-nowrap text-mediumM sm:text-small px-5 py-2.5 lg:px-7 lg:py-3 bg-accent7-900 dark:bg-accent8-900 text-title-200 dark:text-title-100 dark:hover:brightness-110 border border-border-100 dark:border-border-200 hover:bg-accent7-900 hover:border-accent7-900 dark:hover:bg-accent8-900 dark:hover:border-accent8-900 dark:hover:text-title-100",
  secondary:
    "w-full md:w-fit flex lg:w-auto lg:inline-flex justify-center items-center gap-2 font-semibold rounded-md duration-200 font-content tracking-tight whitespace-nowrap text-mediumM sm:text-small px-5 py-2.5 lg:px-7 lg:py-3 bg-background-200 dark:bg-background-900 text-title-100 dark:text-title-200 dark:hover:brightness-110 border border-border-100 dark:border-border-200 hover:bg-accent7-900 hover:border-accent7-900 dark:hover:bg-accent8-900 dark:hover:border-accent8-900 dark:hover:text-title-100",
  link:
    "p-0 bg-transparent text-[#f05a46] font-semibold hover:underline shadow-none",
  "link-dark":
    "p-0 bg-transparent text-content-100/70 dark:text-content-200/50 hover:text-title-100 dark:hover:text-title-200 font-semibold hover:underline shadow-none transition-colors duration-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-smallM sm:text-small",
  md: "px-6 py-3.5 text-smallM sm:text-small",
  lg: "px-8 py-4 text-baseM sm:text-base",
};

/**
 * Universal Button component:
 * - Renders a Next.js <Link> when `href` is provided.
 * - Renders a native HTML <button> when `href` is omitted.
 * - Supports consistent brand variants, sizes, arrow animations, and Contentstack live preview (cslp).
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
  const isLinkVariant = variant === "link" || variant === "link-dark";
  const sizeClass = isLinkVariant
    ? size === "sm"
      ? "text-xs"
      : "text-xs sm:text-sm"
    : sizeStyles[size];
  const variantClass = variantStyles[variant];

  const baseClasses = `group inline-flex items-center gap-1.5 cursor-pointer ${sizeClass} ${variantClass} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href) {
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
