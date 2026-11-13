import { Suspense } from "react";
import type { Metadata } from "next";
import { getHomePage, isPreview } from "@/lib/cms";
import { getHomePageMetadata } from "@/lib/metadata";
import { HomePage, HomePageSkeleton } from "@/components/features/pages";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata();
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const page = await getHomePage();

  if (isPreview) {
    const { default: Preview } = await import("@/components/features/pages/Preview");
    return <Preview path="/" initialPage={page} isHome />;
  }

  return <HomePage page={page} />;
}
