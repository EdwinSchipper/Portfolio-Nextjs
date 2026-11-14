import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioItemByUrl, getPortfolioRouteStaticParams, isPreview } from "@/lib/cms";
import { getPortfolioRouteMetadata } from "@/lib/metadata";
import { PortfolioDetail, PortfolioDetailSkeleton } from "@/components/features/portfolio";

export const revalidate = 3600;

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPortfolioRouteStaticParams();
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return getPortfolioRouteMetadata(slug);
}

export default function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  return (
    <Suspense fallback={<PortfolioDetailSkeleton />}>
      <PortfolioDetailContent params={params} />
    </Suspense>
  );
}

async function PortfolioDetailContent({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const path = `/portfolio/${slug}`;
  const portfolioItem = await getPortfolioItemByUrl(path);

  if (!portfolioItem) {
    notFound();
  }

  if (isPreview) {
    const { default: PortfolioPreview } = await import(
      "@/components/features/portfolio/PortfolioPreview"
    );
    return <PortfolioPreview path={path} initialItem={portfolioItem} />;
  }

  return <PortfolioDetail item={portfolioItem} />;
}
