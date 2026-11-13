import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Button } from "@/components/ui";
import ColorModeSelector from "./ColorModeSelector";

export interface FooterLink {
  label: string;
  href: string;
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
      { label: "Curriculum Vitae", href: "/resume" },
      { label: "Over mij", href: "/overmij" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: "Algemene Voorwaarden", href: "/algemene-voorwaarden" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="font-content relative z-10 -mt-28 md:mt-20" aria-label="Site footer">
      <div className="md:px-20 lg:px-12 pb-0 sm:pb-8 lg:pb-12">
        <div className="bg-background-200 dark:bg-background-900 md:rounded-md border border-border-100/50 dark:border-border-200/50 pt-16 md:pt-36 pb-16 md:pb-10 px-10 md:px-20 lg:px-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-start gap-y-24 md:gap-y-14 lg:gap-y-0 lg:gap-x-8 pb-14 md:pb-20">


              <div className="lg:col-span-7 flex flex-col space-y-10 md:space-y-12">

                <div className="pr-20">
                  <h2 className="text-title_heroM lg:text-title_hero font-content text-title-100 dark:text-title-200 font-light max-w-3xl text-pretty">
                    Benieuwd wat ik{" "}
                    <span className="italic font-semibold">
                      voor jouw
                    </span>{" "}
                    project kan betekenen?
                  </h2>
                </div>
                <div>
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

              <div className="lg:col-span-5 lg:flex lg:justify-end lg:items-start">
                <nav aria-label="Footer navigatie" className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 xl:gap-32">
                  {footerSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="font-content text-accent7-900 dark:text-accent8-900 text-label_smallM md:text-label_small font-semibold tracking-wider uppercase mb-4 lg:mb-5">
                        {section.title}
                      </h3>
                      <ul className="space-y-2 md:space-y-1 text-mediumM lg:text-base font-normal text-content-100 dark:text-content-200">
                        {section.links.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-title-100 dark:hover:text-title-200 hover:underline"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </div>

            </div>

            <div className="w-full h-px bg-border-100 dark:bg-border-200 mb-6 hidden md:block" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-8 md:gap-y-2 justify-between text-smallM sm:text-small text-content-100/80 dark:text-content-200/75 font-normal">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 md:gap-y-0">
                <span className="w-full sm:w-auto">© {currentYear} Edwin Schipper</span>
                {legalLinks.map((link) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    variant="link-dark"
                  >
                    {link.label}
                  </Button>
                ))}
              </div>

              <div>
                <span className="text-balance">
                  Ontworpen in{" "}
                  <Button
                    href="https://www.figma.com/nl-nl/"
                    variant="link-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Figma
                  </Button>
                  , gebouwd met{" "}
                  <Button
                    href="https://nextjs.org/"
                    variant="link-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Next.js
                  </Button>
                  ,{" "}
                  <Button
                    href="https://www.contentstack.com/"
                    variant="link-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contentstack
                  </Button>{" "}
                  &amp;{" "}
                  <Button
                    href="https://tailwindcss.com/"
                    variant="link-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TailwindCSS
                  </Button>
                </span>
              </div>
            </div>




            <div className="md:border-t border-border-100 dark:border-border-200 mt-6 pt-6 lg:pt-10 flex items-center justify-start md:justify-center text-noteM md:text-note text-content-100/80 dark:text-content-200/75 font-normal">
              <div className="flex items-center gap-4">
                <Button
                  href="https://github.com/EdwinSchipper"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="icon"
                  size="icon"
                  aria-label="GitHub profiel"
                >
                  <FaGithub size={16} aria-hidden="true" />
                </Button>

                <Button
                  href="https://www.linkedin.com/in/edwin-schipper/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="icon"
                  size="icon"
                  aria-label="LinkedIn profiel"
                >
                  <FaLinkedinIn size={16} aria-hidden="true" />
                </Button>

                <ColorModeSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}