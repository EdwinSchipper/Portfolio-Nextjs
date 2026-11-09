import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPortfolioItemByUrl, getPortfolioRouteStaticParams, isPreview } from "@/lib/cms";
import { getPortfolioRouteMetadata } from "@/lib/metadata";
import { PortfolioDetail, PortfolioPreview } from "@/components/features/portfolio";

export const revalidate = 60;

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
