import { Suspense } from "react";
import type { Metadata } from "next";
import { getHomePage, isPreview } from "@/lib/cms";
import { getHomePageMetadata } from "@/lib/metadata";
import {
  HomePage,
  Preview,
  HomePageSkeleton,
} from "@/components/features/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata();
}

/**
 * Async content component wrapped in Suspense for instant HTTP chunked streaming.
 */
async function HomeContent() {
  const page = await getHomePage();

  if (isPreview) {
    return <Preview path="/" initialPage={page} isHome />;
  }

  return <HomePage page={page} />;
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
