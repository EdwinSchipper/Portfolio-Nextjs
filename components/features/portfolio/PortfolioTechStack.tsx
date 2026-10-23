import { TechStackItem, CSLPAttribute } from "@/lib/types";
import { Icon } from "@/components/ui";

export interface PortfolioTechStackProps {
  items?: TechStackItem[] | null;
  cslp?: CSLPAttribute | Record<string, any>;
  className?: string;
}

/**
 * PortfolioTechStack:
 * Renders project specifications and tech stack items if provided in Contentstack.
 *
 * Contentstack configuration:
 * - Group UID: `tech_stack` (marked as Multiple)
 * - Fields per item:
 *   - `icon`: Single Line Textbox (e.g. 'calendar', 'window', 'cube', 'circle-stack', 'code-bracket')
 *   - `label`: Single Line Textbox (e.g. 'Tijdlijn', 'Omvang', 'Framework', 'Backend', 'Front-end')
 *   - `value`: Single Line Textbox (e.g. '2026', 'Full-stack', 'Next.js', 'Supabase', 'Tailwind / React')
 */
export default function PortfolioTechStack({
  items,
  cslp,
  className = "",
}: PortfolioTechStackProps) {
  // Do not render anything if no items are provided in Contentstack
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      id="portfolio-details"
      {...cslp}
      className={`mx-auto max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl px-6 md:px-12 lg:px-16 mb-20 lg:mb-24 ${className}`}
    >
      <div className="border-y border-border-100 dark:border-border-200 py-10 md:py-14 bg-background-200/30 dark:bg-background-900/30 sm:bg-transparent dark:sm:bg-transparent font-content">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row justify-around items-center gap-y-8 gap-x-6 md:gap-x-4">
          {items.map((stackItem, idx) => {
            const meta = stackItem.$;

            return (
              <div
                key={stackItem.label || idx}
                className="flex flex-col items-center text-center group cursor-default"
              >
                {/* Circular Coral Badge */}
                <div
                  {...(meta && meta.icon)}
                  className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-accent7-900 dark:bg-accent8-900 border-2 border-accent7-200/50 dark:border-accent8-300/40 ring-4 ring-accent7-900/15 dark:ring-accent8-900/25 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                >
                  <Icon
                    name={stackItem.icon || "code-bracket"}
                    className="w-5 h-5 md:w-6 md:h-6 text-title-200 dark:text-title-100 stroke-[1.75]"
                  />
                </div>

                {/* Uppercase Label */}
                <span
                  {...(meta && meta.label)}
                  className="font-semibold text-content-300 dark:text-content-300 uppercase tracking-wider text-[11px] sm:text-xs shrink-0 mt-3 md:mt-4 select-none"
                >
                  {stackItem.label}
                </span>

                {/* Specification Value */}
                <span
                  {...(meta && meta.value)}
                  className="text-smallM md:text-small font-medium text-title-100 dark:text-title-200 mt-0.5"
                >
                  {stackItem.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
