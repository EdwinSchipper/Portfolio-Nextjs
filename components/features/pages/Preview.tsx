"use client";

import { useState, useEffect, useCallback } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getPage, getHomePage, initLivePreview } from "@/lib/cms";
import type { Page as PageData, Homepage } from "@/lib/types";
import Page from "./Page";
import HomePage from "./HomePage";

type PageProps = PageData | Homepage;

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] font-content text-content-100/60 dark:text-content-200/60">
    <p className="animate-pulse">Pagina laden...</p>
  </div>
);

/**
 * Client-side Live Preview wrapper that subscribes to Contentstack Visual Builder entry changes.
 */
export default function Preview({
  path,
  initialPage,
  isHome,
}: {
  path: string;
  initialPage?: PageProps;
  isHome?: boolean;
}) {
  const isHomePage = isHome ?? (path === "/" || path === "");
  const [page, setPage] = useState<PageProps | undefined>(initialPage);

  const getContent = useCallback(async () => {
    const data = isHomePage ? await getHomePage() : await getPage(path);
    setPage(data);
  }, [path, isHomePage]);

  useEffect(() => {
    initLivePreview();
    const uid = ContentstackLivePreview.onEntryChange(getContent, {
      skipInitialRender: true,
    });
    return () => {
      ContentstackLivePreview.unsubscribeOnEntryChange(uid);
    };
  }, [path, getContent]);

  if (!page) {
    return <LoadingState />;
  }

  return isHomePage ? (
    <HomePage page={page as Homepage} />
  ) : (
    <Page page={page as PageData} />
  );
}
