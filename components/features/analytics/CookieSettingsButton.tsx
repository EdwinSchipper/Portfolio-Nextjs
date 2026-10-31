'use client';

import React from 'react';
import { Button } from '@/components/ui';

/**
 * Client button allowing users to re-open the Cookie Consent banner
 * at any time to update their preferences (GDPR compliance requirement).
 * Uses the official UI Button component with variant="link-dark".
 */
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open_cookie_preferences'));
    }
  };

  return (
    <Button
      variant="link-dark"
      size="sm"
      onClick={handleClick}
      className={`font-semibold hover:underline ${className}`}
    >
      Cookie-instellingen
    </Button>
  );
}
