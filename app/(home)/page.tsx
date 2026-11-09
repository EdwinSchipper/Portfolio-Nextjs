import type { Metadata } from "next";
import { getHomePage, isPreview } from "@/lib/cms";
import { getHomePageMetadata } from "@/lib/metadata";
import { HomePage, Preview } from "@/components/features/pages";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata();
}

export default async function Home() {
  const page = await getHomePage();

  return isPreview ? <Preview path="/" initialPage={page} isHome /> : <HomePage page={page} />;
}
