import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioItemByUrl, isPreview } from "@/lib/contentstack";
import { getPortfolioRouteMetadata } from "@/lib/metadata";
import {
  PortfolioDetail,
  PortfolioPreview,
  PortfolioDetailSkeleton,
} from "@/components/portfolio";

// Ensure portfolio detail page always fetches fresh content from Contentstack in production
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getPortfolioRouteMetadata(slug);
}

/**
 * Async content component wrapped by Suspense to enable instant HTTP chunked streaming.
 */
async function PortfolioContent({ path }: { path: string }) {
  const portfolioItem = await getPortfolioItemByUrl(path);

  if (!portfolioItem) {
    notFound();
  }

  if (isPreview) {
    return <PortfolioPreview path={path} initialItem={portfolioItem} />;
  }

  return <PortfolioDetail item={portfolioItem} />;
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = `/portfolio/${slug}`;

  return (
    <Suspense fallback={<PortfolioDetailSkeleton />}>
      <PortfolioContent path={path} />
    </Suspense>
  );
}
