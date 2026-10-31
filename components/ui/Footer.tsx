import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Button, Label } from "@/components/ui";
import ColorModeSelector from "./ColorModeSelector";

export interface FooterLink {
  label: string;
  href: string;
  ariaLabel?: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Expertise",
    links: [
      { label: "Web Development", href: "/expertise/development" },
      { label: "Grafische vormgeving", href: "/expertise/vormgeving" },
      { label: "UX & Webdesign", href: "/expertise/ux" },
    ],
  },
  {
    title: "Pagina's",
    links: [
      { label: "Over mij", href: "/overmij" },
      { label: "Curriculum Vitae", href: "/resume" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "edwin.schipper@gmail.com",
        href: "mailto:edwin.schipper@gmail.com",
        ariaLabel: "Stuur een e-mail naar edwin.schipper@gmail.com",
      },
      {
        label: "+31 (0)6 - 17165391",
        href: "tel:+31617165391",
        ariaLabel: "Bel +31 6 17165391",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/edwin-schipper/",
        ariaLabel: "Bekijk LinkedIn profiel",
        external: true,
      },
    ],
  },
];

// Backwards-compatible exports
export const expertiseLinks = footerSections[0].links;
export const pageLinks = footerSections[1].links;
export const contactLinks = footerSections[2].links;

const legalLinks: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Algemene Voorwaarden", href: "/algemene-voorwaarden" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-content relative z-10" aria-label="Site footer">
      <div className="md:px-20 lg:px-12 pb-0 lg:pb-12">
        <div className="bg-background-200 dark:bg-background-900 md:rounded-md border border-border-100/50 dark:border-border-200/50 py-14 md:py-20 px-10 md:px-20 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* CTA Header Row */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-14 md:pb-20">
              <div>
                <Label variant="brand">Laten we kennismaken</Label>
                <h2 className="text-title_1M md:text-title_1 font-content text-title-100 dark:text-title-200 font-bold max-w-3xl mt-8 md:mt-10">
                  Benieuwd wat ik{" "}
                  <span className="font-serif italic text-accent7-900 dark:text-accent8-900 font-medium">
                    voor jouw project
                  </span>{" "}
                  kan betekenen?
                </h2>
              </div>
              <div className="shrink-0 mt-8 md:mt-14 lg:mt-0">
                <Button
                  href="/contact"
                  variant="primary"
                  aria-label="Contact opnemen"
                  className="w-full sm:w-fit"
                >
                  Plan een kennismaking
                </Button>
              </div>
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-border-100 dark:bg-border-200 mb-14 md:mb-20" />

            {/* Navigation Columns */}
            <nav aria-label="Footer navigatie" className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <span className="block font-content text-accent7-900 dark:text-accent8-900 text-label_smallM md:text-label_small font-semibold tracking-wider uppercase mb-4 lg:mb-5">
                    {section.title}
                  </span>
                  <ul className="space-y-2 text-mediumM lg:text-medium font-normal text-content-100 dark:text-content-200">
                    {section.links.map((item) => (
                      <li key={item.label}>
                        {item.external || item.href.startsWith("mailto:") || item.href.startsWith("tel:") ? (
                          <a
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-title-100 dark:hover:text-title-200 hover:underline"
                            aria-label={item.ariaLabel}
                          >
                            <span>{item.label}</span>
                            {item.external && (
                              <ArrowUpRightIcon className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-200" />
                            )}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-title-100 dark:hover:text-title-200 hover:underline"
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Bottom Bar */}
            <div className="border-t border-border-100 dark:border-border-200 pt-6 lg:pt-10 flex flex-col lg:flex-row items-start lg:items-center justify-start gap-3 lg:gap-6 mt-14 md:mt-20 text-noteM md:text-note text-content-100/70 dark:text-content-200/50 font-normal">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span>© {currentYear} Edwin Schipper</span>
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}

                <span className="text-balance">
                  Ontworpen in{" "}
                  <a
                    href="https://www.figma.com/nl-nl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline"
                  >
                    Figma
                  </a>
                  , gebouwd met{" "}
                  <a
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline"
                  >
                    Next.js
                  </a>{" "}
                  &amp;{" "}
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline"
                  >
                    Tailwind
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-4 shrink-0 lg:ml-auto mt-4 lg:mt-0">
                <a
                  href="https://github.com/EdwinSchipper"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profiel"
                  className="text-content-100/70 dark:text-content-200/50 hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                <ColorModeSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}