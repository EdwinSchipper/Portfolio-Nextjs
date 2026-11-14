import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDynamicRouteStaticParams, getPage, isPreview, resolveCmsPath } from "@/lib/cms";
import { getDynamicRouteMetadata } from "@/lib/metadata";
import { Page, PageSkeleton } from "@/components/features/pages";

export const revalidate = 3600;

interface DynamicRouteProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return getDynamicRouteStaticParams();
}

export async function generateMetadata({ params }: DynamicRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return getDynamicRouteMetadata(slug);
}

export default function DynamicRoute({ params }: DynamicRouteProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <DynamicRouteContent params={params} />
    </Suspense>
  );
}

async function DynamicRouteContent({ params }: DynamicRouteProps) {
  const { slug } = await params;
  const path = resolveCmsPath(slug);
  const page = await getPage(path);

  if (!page) {
    notFound();
  }

  if (isPreview) {
    const { default: Preview } = await import("@/components/features/pages/Preview");
    return <Preview path={path} initialPage={page} />;
  }

  return <Page page={page} />;
}
