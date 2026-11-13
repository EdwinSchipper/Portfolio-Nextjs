import type { Metadata } from "next";
import { Outfit, Newsreader, Cascadia_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer, NavigationProgress } from "@/components/ui";
import { GTMPageTracker, CookieConsent } from "@/components/features/analytics";
import { env } from "@/lib/env";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["serif"],
});

const cascadiaMono = Cascadia_Mono({
  subsets: ["latin"],
  variable: "--font-cascadia",
  display: "swap",
  fallback: ["monospace"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Edwin Schipper",
    template: "%s | Edwin Schipper",
  },
  description: "Portfolio Website van Edwin Schipper",
  alternates: {
    canonical: "/",
  },
  icons: {
    other: [
      {
        rel: "ai-catalog",
        url: "/.well-known/ai-catalog.json",
      },
    ],
  },
  openGraph: {
    siteName: "Edwin Schipper",
    locale: "nl_NL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl-NL"
      className={`${outfit.variable} ${newsreader.variable} ${cascadiaMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background-100 dark:bg-background-800">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background-900 focus:px-4 focus:py-2.5 focus:text-small focus:font-semibold focus:text-title-200 focus:shadow-lg dark:focus:bg-background-200 dark:focus:text-title-100"
        >
          Ga naar hoofdinhoud
        </a>
        <NavigationProgress />
        <GTMPageTracker />
        <Header />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
