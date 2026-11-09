import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDynamicRouteStaticParams, getPage, isPreview } from "@/lib/cms";
import { getDynamicRouteMetadata } from "@/lib/metadata";
import { Page, Preview } from "@/components/features/pages";

export const revalidate = 60;

interface DynamicRouteProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return getDynamicRouteStaticParams();
}

export async function generateMetadata({ params }: DynamicRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return getDynamicRouteMetadata(`/${slug.join("/")}`);
}

export default async function DynamicRoute({ params }: DynamicRouteProps) {
  const { slug } = await params;
  const path = `/${slug.join("/")}`;
  const page = await getPage(path);

  if (!page) {
    notFound();
  }

  return isPreview ? <Preview path={path} initialPage={page} /> : <Page page={page} />;
}
