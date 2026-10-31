'use client';

import React from 'react';

/**
 * Client button allowing users to re-open the Cookie Consent banner
 * at any time to update their preferences (GDPR compliance requirement).
 */
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open_cookie_preferences'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`font-semibold hover:text-title-100 dark:hover:text-title-200 transition-colors duration-200 hover:underline cursor-pointer ${className}`}
    >
      Cookie-instellingen
    </button>
  );
}

