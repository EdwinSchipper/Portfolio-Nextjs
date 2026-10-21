import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioItemByUrl, isPreview } from "@/lib/contentstack";
import { getPortfolioRouteMetadata } from "@/lib/metadata";
import PortfolioDetail from "@/components/portfolio/PortfolioDetail";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";

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

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = `/portfolio/${slug}`;

  const portfolioItem = await getPortfolioItemByUrl(path);

  if (!portfolioItem) {
    notFound();
  }

  if (isPreview) {
    return <PortfolioPreview path={path} initialItem={portfolioItem} />;
  }

  return <PortfolioDetail item={portfolioItem} />;
}
