import Link from "next/link";
import { Icon } from "@/components/ui";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  currentTitle?: string;
  currentTitleAttr?: Record<string, any>;
  className?: string;
}

/**
 * Modern Breadcrumbs component with Google Schema.org BreadcrumbList SEO support.
 * Designed in the clean Ontwerpbureau Schipper visual aesthetic.
 */
export default function Breadcrumbs({
  items,
  currentTitle,
  currentTitleAttr,
  className = "",
}: BreadcrumbsProps) {
  // Construct list of breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] =
    items && items.length > 0
      ? items
      : [
        { label: "Home", href: "/" },
        ...(currentTitle ? [{ label: currentTitle, active: true }] : []),
      ];

  // Don't render if there's only Home or empty
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  // Schema.org BreadcrumbList for rich Google Search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <nav
      aria-label="Kruimelpad"
      className={`breadcrumbs font-content pb-14 md:pb-20 lg:pb-20 w-full flex justify-start px-10 sm:px-14 md:px-20 lg:px-12 ${className}`}
    >
      {/* SEO structured microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ol className="flex items-center gap-1 flex-wrap">
        {breadcrumbItems.map((item, idx) => {
          const isLast = idx === breadcrumbItems.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1.5 sm:gap-2">
              {idx > 0 && (
                <Icon
                  name="chevron-right"
                  size="xs"
                  className="text-gray-400 stroke-2"
                />
              )}

              {isLast || !item.href ? (
                <span
                  className="text-mediumM md:text-medium font-normal text-content-100/80 dark:text-content-200/80 truncate max-w-50 select-none"
                  aria-current="page"
                  {...(isLast ? currentTitleAttr : undefined)}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-mediumM md:text-medium font-semibold dark:font-medium text-title-100 dark:text-title-200 hover:underline"
                >

                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
