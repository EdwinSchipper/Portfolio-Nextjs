import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDynamicRouteStaticParams, getPage, isPreview } from "@/lib/cms";
import { getDynamicRouteMetadata } from "@/lib/metadata";
import { Page, PageSkeleton, Preview } from "@/components/features/pages";

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return getDynamicRouteStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getDynamicRouteMetadata(`/${slug.join("/")}`);
}

/**
 * Async content component wrapped by Suspense to enable instant HTTP chunked streaming.
 */
async function PageContent({ path }: { path: string }) {
  const page = await getPage(path);

  if (!page) {
    notFound();
  }

  if (isPreview) {
    return <Preview path={path} initialPage={page} />;
  }

  return <Page page={page} />;
}

export default async function DynamicRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;

  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageContent path={path} />
    </Suspense>
  );
}

