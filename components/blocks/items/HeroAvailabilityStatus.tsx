import type { CSLPAttribute } from "@/lib/types";

export interface HeroAvailabilityStatusProps {
  isAvailable?: boolean;
  availableLabel?: string;
  unavailableLabel?: string;
  className?: string;
  cslp?: CSLPAttribute;
}

/**
 * Displays the current availability status indicator with a pulsing green dot
 * when available or a static coral-red dot when unavailable.
 */
export default function HeroAvailabilityStatus({
  isAvailable = true,
  availableLabel = "Beschikbaar",
  unavailableLabel = "Niet beschikbaar",
  className = "",
  cslp,
}: HeroAvailabilityStatusProps) {
  const statusLabel = isAvailable ? availableLabel : unavailableLabel;
  const dotColorClass = isAvailable ? "bg-accent8-900" : "bg-accent7-900";

  return (
    <span
      {...cslp}
      className={`inline-flex items-center gap-2 ${className}`.trim()}
    >
      <span aria-hidden="true">[</span>
      <span className="relative inline-flex size-2.5" aria-hidden="true">
        {isAvailable && (
          <span
            className={`motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full ${dotColorClass} opacity-75`}
          />
        )}
        <span
          className={`relative inline-flex size-2.5 rounded-full ${dotColorClass}`}
        />
      </span>
      <span>
        {statusLabel}
        <span aria-hidden="true">]</span>
      </span>
    </span>
  );
}

