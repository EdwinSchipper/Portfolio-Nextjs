import type { Metadata } from "next";
import { Outfit, Newsreader, Cascadia_Mono } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/ui";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageTracker, CookieConsent } from "@/components/features/analytics";

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
  alternates: {
    canonical: "/",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="nl-NL" className={`${outfit.variable} ${newsreader.variable} ${cascadiaMono.variable}`} suppressHydrationWarning
    >
      <head>
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" />
        <script
          id="google-consent-mode"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;

              var savedConsent = null;
              try {
                savedConsent = localStorage.getItem('cookie_consent');
              } catch (e) {}

              if (savedConsent === 'accepted') {
                gtag('consent', 'default', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'wait_for_update': 500
                });
              } else {
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'wait_for_update': 500
                });
              }
            `,
          }}
        />
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
      </head>
      <body className="bg-background-100 dark:bg-background-800">
        {gtmId && <GTMPageTracker />}
        <Header />
        <main className="">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
