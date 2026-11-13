'use client';

import Button from '@/components/ui/Button';

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
      type="button"
      variant="link-dark"
      size="md"
      onClick={handleClick}
      className={className}
    >
      Cookie-instellingen
    </Button>
  );
}
