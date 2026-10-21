import { Suspense } from "react";
import type { Metadata } from "next";
// Importing function to fetch homepage data and preview mode checker from Contentstack utilities
import { getHomePage, isPreview } from "@/lib/contentstack";
import { getHomePageMetadata } from "@/lib/metadata";
// Importing the HomePage component to render homepage content
import HomePage from "@/components/HomePage";
// Importing the Preview component to render live preview content
import Preview from "@/components/Preview";
import HomePageSkeleton from "@/components/HomePageSkeleton";

// Ensure the page always fetches fresh content from Contentstack on production requests
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata();
}

/**
 * Async content component wrapped in Suspense for instant HTTP chunked streaming.
 */
async function HomeContent() {
  const page = await getHomePage();

  // In preview mode, hand the entry to the client component so it can keep
  // syncing with the Visual Builder via the live-preview listener.
  if (isPreview) {
    return <Preview path="/" initialPage={page} isHome />;
  }

  return <HomePage page={page} />;
}

// Home page component - serves as the main entry point for the application
// Renders the outer shell immediately and streams HomeContent within Suspense
export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
