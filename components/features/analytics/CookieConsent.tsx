'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Toast, Button } from '@/components/ui';
import { sendGTMEvent } from '@next/third-parties/google';
import { buildPageViewPayload, updateGoogleConsent } from './analytics-utils';

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
  return 'ssr_init';
};

/**
 * Cookie Consent Manager.
 * Beheert de toestemmingsstatus, Google Consent Mode v2 updates en GTM events
 * via de universele UI primitives <Toast> en <Button>.
 */
export function CookieConsent() {
  const [hasDismissed, setHasDismissed] = useState(false);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);

  const consentStatus = useSyncExternalStore(
    subscribe,
    getClientConsent,
    getServerConsent
  );

  const isOpen =
    isManuallyOpened ||
    (!hasDismissed && consentStatus !== 'ssr_init' && consentStatus === null);

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
    } catch (error) {
      console.warn('Could not save cookie consent:', error);
    }

    updateGoogleConsent({
      analytics_storage: 'granted',
    });

    const currentPath =
      typeof window !== 'undefined'
        ? `${window.location.pathname}${window.location.search}`
        : '';
    const currentPathname =
      typeof window !== 'undefined' ? window.location.pathname : '';
    const currentSearch =
      typeof window !== 'undefined' && window.location.search
        ? window.location.search.replace(/^\?/, '')
        : undefined;
    const currentTitle = typeof document !== 'undefined' ? document.title : '';

    sendGTMEvent({
      event: 'cookie_consent_update',
      consent_status: 'accepted',
      page_path: currentPath,
      page_title: currentTitle,
    });

    sendGTMEvent(buildPageViewPayload(currentPathname, currentSearch));

    setIsManuallyOpened(false);
    setHasDismissed(true);
  };

  const declineCookies = () => {
    try {
      localStorage.setItem('cookie_consent', 'declined');
    } catch (error) {
      console.warn('Could not save cookie consent:', error);
    }

    updateGoogleConsent({
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

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
      onClose={() => {}}
      title="Cookies & Privacy"
      description="We gebruiken cookies puur om de website soepel te laten werken en het gebruiksgemak te verbeteren."
    >
      <div className="grid grid-cols-2 gap-3 mt-1">
        <Button variant="primary" size="sm" onClick={acceptCookies}>
          Accepteren
        </Button>
        <Button variant="secondary" size="sm" onClick={declineCookies}>
          Weigeren
        </Button>
      </div>
    </Toast>
  );
}
