import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioItemByUrl, getPortfolioRouteStaticParams, isPreview } from "@/lib/cms";
import { getPortfolioRouteMetadata } from "@/lib/metadata";
import { PortfolioDetail, PortfolioDetailSkeleton, PortfolioPreview } from "@/components/features/portfolio";

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

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const path = `/portfolio/${slug}`;

  return (
    <Suspense key={path} fallback={<PortfolioDetailSkeleton />}>
      <PortfolioDetailContent path={path} />
    </Suspense>
  );
}

async function PortfolioDetailContent({ path }: { path: string }) {
  const portfolioItem = await getPortfolioItemByUrl(path);

  if (!portfolioItem) {
    notFound();
  }

  return isPreview ? (
    <PortfolioPreview path={path} initialItem={portfolioItem} />
  ) : (
    <PortfolioDetail item={portfolioItem} />
  );
}
