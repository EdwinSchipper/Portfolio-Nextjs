"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  PhoneIcon,
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
];

// Backwards-compatible aliases
export const company = expertiseItems;
export const menuItems = mainNavItems;

const baseNavClass =
  "flex items-center justify-center px-4 h-11 lg:h-10 rounded-md border border-transparent transition-all duration-300 text-smallM lg:text-medium font-medium hover:bg-accent7-400/20 dark:hover:bg-accent7-400/5 hover:text-title-100 dark:hover:text-title-200";

function getDesktopNavLinkClass(isActive: boolean) {
  return `${baseNavClass} ${isActive
    ? "text-accent7-900 dark:text-title-200"
    : "text-content-100 dark:text-content-200"
    }`;
}

function getMobileNavLinkClass(isActive: boolean) {
  return `py-2 px-3 rounded-md text-small font-medium transition-colors ${isActive
    ? "text-accent7-900 dark:text-title-200 bg-background-100 dark:bg-background-800 font-semibold"
    : "text-content-100 dark:text-content-200 hover:text-title-100 dark:hover:text-title-200 hover:bg-background-100 dark:hover:bg-background-800"
    }`;
}

/**
 * Reusable Logo component with dark mode switching and correct intrinsic aspect ratio.
 */
function HeaderLogo({
  priority = false,
  onClick,
}: {
  priority?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link href="/" onClick={onClick} className="inline-block" aria-label="Edwin Schipper Home">
      <div className="flex gap-2 items-center">
        <span className="sr-only">Edwin Schipper</span>
        <Image
          className="hidden h-10 lg:h-9 w-auto dark:block"
          src="/img/logo-white.svg"
          alt="Edwin Schipper"
          width={39}
          height={36}
          priority={priority}
        />
        <Image
          className="block h-10 lg:h-9 w-auto dark:hidden"
          src="/img/logo-black.svg"
          alt="Edwin Schipper"
          width={39}
          height={36}
          priority={priority}
        />
      </div>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);
  const expertiseRef = useRef<HTMLLIElement>(null);

  // Close menus on route change without triggering effect cascades
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    setIsExpertiseOpen(false);
  }

  // Close dropdown on outside click or ESC key
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isExpertiseActive = pathname.startsWith("/expertise");

  return (
    <>
      <header className="z-50 sticky top-0 bg-background-100/90 dark:bg-background-800/90 backdrop-blur-md transition-colors">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between md:py-8 md:px-8 p-6 md:p-0"
          aria-label="Global"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <HeaderLogo priority />
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden gap-3 lg:gap-1.5 items-center">
            <ColorModeSelector />

            <button
              type="button"
              aria-label="Open hoofdmenu"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-content-100 dark:text-content-200 hover:text-title-100 dark:hover:text-title-200 hover:bg-background-200 dark:hover:bg-background-900 transition-colors cursor-pointer"
            >
              <Bars3BottomRightIcon className="h-7 w-7" />
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex lg:gap-x-12 font-content">
            <ul className="flex items-center gap-x-2 lg:gap-x-0.5">
              {/* Expertise Popover */}
              <li className="relative" ref={expertiseRef}>
                <button
                  type="button"
                  onClick={() => setIsExpertiseOpen((prev) => !prev)}
                  className={`group cursor-pointer ${getDesktopNavLinkClass(
                    isExpertiseOpen || isExpertiseActive
                  )}`}
                  aria-expanded={isExpertiseOpen}
                  aria-haspopup="true"
                >
                  <span>Expertise</span>
                  <ChevronDownIcon
                    className={`size-5 flex-none text-accent7-800 dark:text-accent8-800 group-hover:translate-y-px transition-transform duration-300 -mr-1 ml-0.5 ${isExpertiseOpen ? "rotate-180" : ""
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
                        className="block rounded-lg px-2 py-1.5 text-smallM lg:text-small font-normal hover:bg-background-200 dark:hover:bg-background-900 text-content-100 dark:text-content-200 hover:text-accent7-700 dark:hover:text-accent8-700 transition-all duration-100"
                        onClick={() => setIsExpertiseOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Main Menu Links */}
              {mainNavItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={getDesktopNavLinkClass(isActive)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-2.5 items-center">
            <ColorModeSelector />
            <div className="h-11 w-0.5 bg-border-100 dark:bg-border-200/60 mx-2.5" />
            <Button href="/contact" variant="primary" size="sm">
              Contact
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-Over Menu (Bottom Sheet) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background-900/40 dark:bg-background-200/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Slideover panel */}
          <div className="relative z-10 w-full max-h-[95vh] focus:outline-none p-3 mt-auto">
            <div className="bg-background-200 dark:bg-background-900 rounded-2xl overflow-y-auto ring-1 ring-border-100/50 dark:ring-border-200/50 p-6 flex flex-col gap-6 shadow-2xl">
              {/* Header inside slideover */}
              <div className="flex items-center justify-between pb-4 border-b border-border-100 dark:border-border-200">
                <HeaderLogo onClick={() => setIsOpen(false)} />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-content-100 dark:text-content-200 hover:text-title-100 dark:hover:text-title-200 hover:bg-background-100 dark:hover:bg-background-800 transition-colors cursor-pointer"
                  aria-label="Sluit menu"
                >
                  <XMarkIcon className="h-7 w-7" />
                </button>
              </div>

              {/* Navigation Links inside slideover */}
              <div className="flex flex-col gap-5 font-content">
                <div>
                  <span className="block text-accent7-900 dark:text-accent8-900 text-xs font-semibold uppercase tracking-wider mb-2">
                    Expertise
                  </span>
                  <div className="flex flex-col gap-1 pl-2 border-l-2 border-border-100 dark:border-border-200">
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
                  <span className="block text-accent7-900 dark:text-accent8-900 text-xs font-semibold uppercase tracking-wider mb-2">
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

                {/* Contact CTA */}
                <div className="pt-4 border-t border-border-100 dark:border-border-200 flex flex-col gap-3">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact opnemen
                  </Button>
                  <a
                    href="tel:+31617165391"
                    className="inline-flex items-center justify-center gap-2 py-2 text-small font-medium text-content-100 dark:text-content-200 hover:text-title-100 dark:hover:text-title-200 transition-colors"
                  >
                    <PhoneIcon className="h-5 w-5 text-accent7-900 dark:text-accent8-900" />
                    <span>+31 (0)6 - 17165391</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}