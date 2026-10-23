"use client";

import { useState, useEffect, useCallback } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getPortfolioItemByUrl, initLivePreview } from "@/lib/contentstack";
import type { PortfolioItem } from "@/lib/types";
import PortfolioDetail from "./PortfolioDetail";

interface PortfolioPreviewProps {
  path: string;
  initialItem?: PortfolioItem;
}

export default function PortfolioPreview({
  path,
  initialItem,
}: PortfolioPreviewProps) {
  const [item, setItem] = useState<PortfolioItem | undefined>(initialItem);

  const getContent = useCallback(async () => {
    const data = await getPortfolioItemByUrl(path);
    setItem(data);
  }, [path]);

  useEffect(() => {
    initLivePreview();
    const uid = ContentstackLivePreview.onEntryChange(getContent, {
      skipInitialRender: true,
    });
    return () => {
      ContentstackLivePreview.unsubscribeOnEntryChange(uid);
    };
  }, [path, getContent]);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] font-content text-content-100/60 dark:text-content-200/60">
        <p className="animate-pulse">Portfolio item laden...</p>
      </div>
    );
  }

  return <PortfolioDetail item={item} />;
}
