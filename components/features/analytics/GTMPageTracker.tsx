'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';
import { buildPageViewPayload } from './analytics-utils';

function PageTrackerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    // Korte timeout (100ms) garandeert dat Next.js de <title> in de <head>
    // heeft bijgewerkt na client-side navigatie voordat het event wordt verzonden
    const timer = setTimeout(() => {
      sendGTMEvent(buildPageViewPayload(pathname, searchParams?.toString()));
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

export function GTMPageTracker() {
  return (
    <Suspense fallback={null}>
      <PageTrackerContent />
    </Suspense>
  );
}
