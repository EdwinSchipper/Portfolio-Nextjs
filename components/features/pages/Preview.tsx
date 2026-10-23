// Client-side component directive for Next.js
"use client";

// Importing React hooks for state management and side effects
import { useState, useEffect, useCallback } from "react";
// Importing Contentstack Live Preview utilities for real-time content updates
import ContentstackLivePreview from "@contentstack/live-preview-utils";
// Importing functions to fetch page data and initialize live preview
import { getPage, getHomePage, initLivePreview } from "@/lib/contentstack";
// Importing Page and Homepage type definitions
import type { Page as PageData, Homepage } from "@/lib/types";
type PageProps = PageData | Homepage;
// Importing the Page component to render the content
import Page from "./Page";
import HomePage from "./HomePage";

// Loading state component displayed while content is being fetched
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] font-content text-content-100/60 dark:text-content-200/60">
    <p className="animate-pulse">Pagina laden...</p>
  </div>
);

// Preview component that handles live preview functionality for Contentstack
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

  // Seed state with the server-fetched entry so the SSR'd HTML contains the
  // real content and back/forward navigation restores a populated page.
  const [page, setPage] = useState<PageProps | undefined>(initialPage);

  // Memoized function to fetch content data based on the current path
  // useCallback prevents unnecessary re-renders when path doesn't change
  const getContent = useCallback(async () => {
    const data = isHomePage ? await getHomePage() : await getPage(path); // Fetch page data from Contentstack
    setPage(data); // Update state with fetched data
  }, [path, isHomePage]); // Dependency array - function recreated only when path changes

  // Effect hook to initialize live preview and set up content change listener
  useEffect(() => {
    initLivePreview(); // Initialize Contentstack Live Preview functionality
    // Subscribe to Visual Builder edits. skipInitialRender prevents a redundant
    // fetch on mount — the initial entry already came from the server.
    const uid = ContentstackLivePreview.onEntryChange(getContent, {
      skipInitialRender: true,
    });
    return () => {
      ContentstackLivePreview.unsubscribeOnEntryChange(uid);
    };
  }, [path, getContent]);

  // Defensive fallback for when the entry isn't available (e.g. no matching URL).
  if (!page) {
    return <LoadingState />;
  }

  return isHomePage ? (
    <HomePage page={page as Homepage} />
  ) : (
    <Page page={page as PageData} />
  );
}
