'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GoogleTagManager, sendGTMEvent } from '@next/third-parties/google';
import { env } from '@/lib/env';
import { buildPageViewPayload, getConsentDefaultScript } from './analytics-utils';

function PageTrackerContent() {
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    sendGTMEvent(buildPageViewPayload(pathname, urlSearchParams?.toString()));
  }, [pathname, urlSearchParams]);

  return null;
}

/**
 * Zelfvoorzienend Analytics & GTM feature-component.
 * Initialiseert synchroon Google Consent Mode v2, laadt de GTM container
 * via @next/third-parties/google en verrijkt page_view events bij navigatie.
 */
export function GTMPageTracker() {
  const { gtmId } = env;

  return (
    <>
      <script
        id="google-consent-mode"
        dangerouslySetInnerHTML={{
          __html: getConsentDefaultScript(),
        }}
      />
      {gtmId && (
        <>
          <GoogleTagManager gtmId={gtmId} />
          <Suspense fallback={null}>
            <PageTrackerContent />
          </Suspense>
        </>
      )}
    </>
  );
}
