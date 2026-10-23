import type { Metadata } from "next";
import { Outfit, Newsreader, Cascadia_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/ui";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageTracker } from "@/components/features/analytics";

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.edwinschipper.nl"
  ),
  title: {
    default: "Edwin Schipper",
    template: "%s | Edwin Schipper",
  },
  description: "Portfolio Website van Edwin Schipper",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="nl-NL" className={`${outfit.variable} ${newsreader.variable} ${cascadiaMono.variable}`} suppressHydrationWarning
    >
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="bg-background-100 dark:bg-background-800">
        {gtmId && <GTMPageTracker />}
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
