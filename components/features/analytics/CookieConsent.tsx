'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Toast, Button } from '@/components/ui';
import { sendGTMEvent } from '@next/third-parties/google';

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => { };
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
 * Cookie Consent Manager.
 * Handles state, Consent Mode v2 updates, and GTM event firing.
 * Renders via universal UI components: <Toast> and <Button>.
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
    <Toast
      open={isOpen}
      onClose={() => {
        // Explicit decision required via primary or secondary button:
        // Do not silently accept or decline on accidental outside click
      }}
      title="Cookies & Privacy"
      description="We gebruiken cookies puur om de website soepel te laten werken en het gebruiksgemak te verbeteren."
    >
      <div className="grid grid-cols-2 gap-3 mt-1">
        <Button
          variant="primary"
          size="sm"
          onClick={acceptCookies}
        >
          Accepteren
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={declineCookies}
        >
          Weigeren
        </Button>
      </div>
    </Toast>
  );
}
