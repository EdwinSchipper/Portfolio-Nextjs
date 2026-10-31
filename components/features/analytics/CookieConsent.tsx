'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import Button from '@/components/ui/Button';
import { sendGTMEvent } from '@next/third-parties/google';

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getClientConsent = (): string | null => {
  try {
    return localStorage.getItem('cookie_consent');
  } catch {
    return null;
  }
};

const getServerConsent = (): string | null => {
  // During SSR, return a sentinel to prevent hydration mismatches
  return 'ssr_init';
};

/**
 * Accessible Cookie Consent Toast component using @headlessui/react Dialog.
 *
 * Provides users with explicit choice:
 * - "Accepteren" (primary button): activates Google Consent Mode v2 analytics_storage.
 * - "Weigeren" (secondary button): keeps tracking denied and dismisses banner.
 *
 * Adheres to GDPR & ePrivacy requirements:
 * - Requires explicit user action (clicking outside does not silently decline or accept).
 * - Can be re-opened at any time via the 'open_cookie_preferences' window event.
 * - Synchronizes with Google Consent Mode v2 and Google Tag Manager dataLayer.
 */
export function CookieConsent() {
  const [hasDismissed, setHasDismissed] = useState(false);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);

  const consentStatus = useSyncExternalStore(
    subscribe,
    getClientConsent,
    getServerConsent
  );

  // The toast is open on client mount when no consent is stored, or when re-opened by user
  const isOpen = isManuallyOpened || (!hasDismissed && consentStatus !== 'ssr_init' && consentStatus === null);

  useEffect(() => {
    const handleReopen = () => {
      setHasDismissed(false);
      setIsManuallyOpened(true);
    };

    window.addEventListener('open_cookie_preferences', handleReopen);
    return () => window.removeEventListener('open_cookie_preferences', handleReopen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Allow background page scrolling while the toast notification is displayed in the corner
      const releaseScrollLock = () => {
        if (typeof document !== 'undefined') {
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
        }
      };

      releaseScrollLock();
      const frame = requestAnimationFrame(releaseScrollLock);
      return () => cancelAnimationFrame(frame);
    }
  }, [isOpen]);

  const acceptCookies = () => {
    try {
      localStorage.setItem('cookie_consent', 'accepted');
    } catch (e) {
      console.warn('Could not save cookie consent:', e);
    }

    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }

    const currentPath = typeof window !== 'undefined' ? `${window.location.pathname}${window.location.search}` : '';
    const currentTitle = typeof document !== 'undefined' ? document.title : '';

    sendGTMEvent({
      event: 'cookie_consent_update',
      consent_status: 'accepted',
      page_path: currentPath,
      page_title: currentTitle,
    });

    sendGTMEvent({
      event: 'page_view',
      page_path: currentPath,
      page_title: currentTitle,
    });

    setIsManuallyOpened(false);
    setHasDismissed(true);
  };

  const declineCookies = () => {
    try {
      localStorage.setItem('cookie_consent', 'declined');
    } catch (e) {
      console.warn('Could not save cookie consent:', e);
    }

    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }

    sendGTMEvent({
      event: 'cookie_consent_update',
      consent_status: 'declined',
    });

    setIsManuallyOpened(false);
    setHasDismissed(true);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        // Explicit decision required via primary or secondary button:
        // Do not silently accept or decline on accidental outside click
      }}
      className="relative z-[9999]"
    >
      <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[9999] max-w-[340px] w-[calc(100%-2rem)] pointer-events-auto">
        <DialogPanel
          transition
          className="p-6 bg-background-200/90 dark:bg-background-900/90 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] rounded-2xl flex flex-col gap-4 transform transition-all duration-500 ease-out data-closed:opacity-0 data-closed:translate-y-4 data-closed:scale-95"
        >
          <div>
            <DialogTitle
              as="h3"
              className="text-title-100 dark:text-title-200 text-title_6 font-semibold mb-2"
            >
              Cookies &amp; Privacy
            </DialogTitle>
            <Description
              as="p"
              className="text-content-100 dark:text-content-200 text-sm leading-relaxed"
            >
              We gebruiken cookies puur om de frictie uit onze gebruikerservaring te halen en performance te meten. Geen overbodige ruis.
            </Description>
          </div>
          <div className="flex gap-3 mt-1">
            <Button
              variant="primary"
              size="sm"
              className="flex-1 justify-center"
              onClick={acceptCookies}
            >
              Accepteren
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 justify-center opacity-70 hover:opacity-100 dark:bg-background-800 dark:text-title-200 dark:border-white/10"
              onClick={declineCookies}
            >
              Weigeren
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
