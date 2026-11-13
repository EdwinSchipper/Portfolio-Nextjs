"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ColorModeSelector from "./ColorModeSelector";
import Button from "./Button";

export interface NavItem {
  name: string;
  href: string;
}

export const expertiseItems: NavItem[] = [
  { name: "Grafische vormgeving", href: "/expertise/vormgeving" },
  { name: "UX & Webdesign", href: "/expertise/ux" },
  { name: "Web development", href: "/expertise/development" },
];

export const mainNavItems: NavItem[] = [
  { name: "Over mij", href: "/overmij" },
  { name: "Portfolio", href: "/portfolio" },
  // { name: "Curriculum Vitae", href: "/resume" }
];

const baseNavClass =
  "flex items-center justify-center px-4 h-11 lg:h-10 rounded-md border border-transparent transition-all duration-300 text-smallM lg:text-medium font-medium hover:bg-accent7-400/20 dark:hover:bg-accent7-400/5";

function getDesktopNavLinkClass(isActive: boolean, isOverHero: boolean) {
  const hoverTextClass = isOverHero
    ? "hover:text-title-200"
    : "hover:text-title-100 dark:hover:text-title-200";
  const textColorClass = isActive
    ? "text-accent7-900 dark:text-title-200"
    : isOverHero
      ? "text-content-200"
      : "text-content-100 dark:text-content-200";

  return `${baseNavClass} ${hoverTextClass} ${textColorClass}`;
}

function getMobileNavLinkClass(isActive: boolean) {
  return `py-1.5 rounded-md text-baseM font-normal transition-colors ${isActive
    ? "text-accent7-900 dark:text-title-200 bg-background-100 dark:bg-background-800 font-semibold"
    : "text-title-100 dark:text-title-200"
    }`;
}

/**
 * Reusable Brand component combining the theme-aware logo mark and site title.
 */
function HeaderLogo({
  highPriority = false,
  isOverHero = false,
  onClick,
}: {
  highPriority?: boolean;
  isOverHero?: boolean;
  onClick?: () => void;
}) {
  const fetchPriority = highPriority ? "high" : undefined;

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Edwin Schipper Home"
      className="inline-flex items-center gap-3 font-content shrink-0 group"
    >
      <Image
        className="hidden h-10 lg:h-8.5 w-auto dark:block shrink-0"
        src="/img/logo-black.svg"
        alt=""
        width={44}
        height={44}
        fetchPriority={fetchPriority}
      />
      <Image
        className="block h-10 lg:h-8.5 w-auto dark:hidden shrink-0"
        src="/img/logo-white.svg"
        alt=""
        width={44}
        height={44}
        fetchPriority={fetchPriority}
      />
      <span
        className={`text-smallM lg:text-medium font-semibold tracking-tight whitespace-nowrap transition-colors duration-300 hidden md:block ${isOverHero
          ? "text-title-200"
          : "text-title-100 dark:text-title-200"
          }`}
      >
        Edwin Schipper
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname() || "/";
  const headerRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const [isOverHero, setIsOverHero] = useState(pathname === "/");
  const [isOpen, setIsOpen] = useState(false);
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);
  const expertiseRef = useRef<HTMLLIElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setIsExpertiseOpen(false);
    setIsOverHero(pathname === "/");
  }

  useEffect(() => {
    const syncHeroOverlap = () => {
      const header = headerRef.current;
      const heroSection = document.getElementById("hero-section");
      heroSectionRef.current = heroSection;

      if (!header || !heroSection) {
        setIsOverHero(false);
        return;
      }

      const headerRect = header.getBoundingClientRect();
      const heroRect = heroSection.getBoundingClientRect();
      setIsOverHero(
        heroRect.top <= headerRect.bottom && heroRect.bottom > headerRect.bottom
      );
    };

    const rafId = window.requestAnimationFrame(syncHeroOverlap);
    window.addEventListener("scroll", syncHeroOverlap, { passive: true });
    window.addEventListener("resize", syncHeroOverlap, { passive: true });

    const observerRoot = document.querySelector("main") ?? document.body;
    const mutationObserver = new MutationObserver(() => {
      const nextHero = document.getElementById("hero-section");
      if (nextHero !== heroSectionRef.current) {
        syncHeroOverlap();
      }
    });
    mutationObserver.observe(observerRoot, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", syncHeroOverlap);
      window.removeEventListener("resize", syncHeroOverlap);
      mutationObserver.disconnect();
      heroSectionRef.current = null;
    };
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        expertiseRef.current &&
        !expertiseRef.current.contains(event.target as Node)
      ) {
        setIsExpertiseOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsExpertiseOpen(false);
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isExpertiseActive = pathname.startsWith("/expertise");

  return (
    <>
      <header
        ref={headerRef}
        className={`z-50 sticky top-0 transition-colors duration-300 ${isOverHero
          ? "bg-transparent"
          : "bg-background-100/90 dark:bg-background-800/90 backdrop-blur-md"
          }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between md:py-8 md:px-8 p-6 md:p-0"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <HeaderLogo highPriority isOverHero={isOverHero} />
          </div>

          <div className="flex lg:hidden gap-3 lg:gap-1.5 items-center">
            <ColorModeSelector isOverHero={isOverHero} />

            <Button
              type="button"
              variant={isOverHero ? "icon-inverted" : "icon"}
              size="icon"
              aria-label="Open hoofdmenu"
              onClick={() => setIsOpen(true)}
            >
              <Bars3BottomRightIcon className="w-4 h-4" />
            </Button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12 font-content">
            <ul className="flex items-center gap-x-2 lg:gap-x-0.5">
              <li className="relative" ref={expertiseRef}>
                <button
                  type="button"
                  onClick={() => setIsExpertiseOpen((prev) => !prev)}
                  className={`group cursor-pointer ${getDesktopNavLinkClass(
                    isExpertiseOpen || isExpertiseActive,
                    isOverHero
                  )}`}
                  aria-expanded={isExpertiseOpen}
                  aria-haspopup="true"
                >
                  <span>Expertise</span>
                  <ChevronDownIcon
                    className={`size-5 flex-none text-content-300 dark:text-content-300 group-hover:translate-y-px transition-transform duration-300 -mr-1 ml-0.5 ${isExpertiseOpen ? "rotate-180" : ""
                      }`}
                    aria-hidden="true"
                  />
                </button>

                {isExpertiseOpen && (
                  <div className="absolute left-1/2 z-10 mt-1 w-56 -translate-x-1/2 rounded-md bg-background-100 dark:bg-background-800 backdrop-blur-xl p-2 shadow-lg outline outline-border-100/50 dark:shadow-none dark:-outline-offset-1 dark:outline-border-200/50">
                    {expertiseItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                        className="block rounded-lg px-2 py-1.5 text-smallM lg:text-small font-normal hover:bg-background-200 dark:hover:bg-background-900 text-title-100 dark:text-title-200 hover:text-accent7-700 dark:hover:text-accent8-700 transition-all duration-100"
                        onClick={() => setIsExpertiseOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {mainNavItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={getDesktopNavLinkClass(isActive, isOverHero)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-6 items-center">
            <ColorModeSelector isOverHero={isOverHero} />

            <Button
              href="/contact"
              variant={isOverHero ? "inverted" : "primary"}
              size="sm"
            >
              Plan een kennismaking
            </Button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-background-900/40 dark:bg-background-200/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-h-[95vh] focus:outline-none p-3 mt-auto">
            <div className="bg-background-200 dark:bg-background-900 rounded-2xl overflow-y-auto ring-1 ring-border-100/50 dark:ring-border-200/50 p-8 flex flex-col gap-16 shadow-2xl">
              <div className="flex items-center justify-between">
                <HeaderLogo onClick={() => setIsOpen(false)} />
                <Button
                  type="button"
                  variant="icon"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Sluit menu"
                >
                  <XMarkIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-8 font-content">
                <div>
                  <span className="block text-accent7-900 dark:text-accent8-900 text-xs font-semibold uppercase tracking-wider mb-3">
                    Expertise
                  </span>
                  <div className="flex flex-col gap-1">
                    {expertiseItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={getMobileNavLinkClass(pathname === item.href)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="block text-accent7-900 dark:text-accent8-900 text-xs font-semibold uppercase tracking-wider mb-3">
                    Menu
                  </span>
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={getMobileNavLinkClass(pathname.startsWith(item.href))}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mt-8">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact opnemen
                  </Button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}