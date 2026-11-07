import type { Metadata } from "next";
import { Outfit, Newsreader, Cascadia_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/ui";
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
        <GTMPageTracker />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
