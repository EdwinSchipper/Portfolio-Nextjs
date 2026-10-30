"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, Label } from "@/components/ui";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log application / API error for diagnostic monitoring
    console.error("[App Error Boundary caught error]:", error);
  }, [error]);

  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 sm:px-14 lg:px-20 py-20 lg:py-32 font-content text-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center border border-border-100 dark:border-border-200 rounded-md bg-background-200 dark:bg-background-900 p-8 sm:p-12 lg:p-16 shadow-2xs">
        <Label variant="pill" className="mb-6 text-accent7-900 dark:text-accent8-900">
          500 — Onverwachte fout
        </Label>

        <h1 className="font-bold text-title_2M sm:text-title_2 lg:text-title_1 tracking-tight text-title-100 dark:text-title-200 mb-4">
          Er ging iets mis
        </h1>

        <p className="text-mediumM sm:text-medium text-content-100 dark:text-content-200 mb-6 max-w-lg leading-relaxed">
          Tijdens het laden van de pagina of het ophalen van data is er een onverwachte fout opgetreden. Probeer het opnieuw of keer terug naar de homepagina.
        </p>

        {error.digest && (
          <p className="font-playfull text-noteM text-content-300 dark:text-content-200 mb-8 bg-background-100 dark:bg-background-800 px-3 py-1.5 rounded border border-border-100 dark:border-border-200">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button onClick={() => reset()} variant="primary">
            Opnieuw proberen
          </Button>
          <Link
            href="/"
            className="font-medium text-noteM sm:text-note text-title-100 dark:text-title-200 hover:text-accent7-900 dark:hover:text-accent8-900 transition-colors px-4 py-2"
          >
            Naar homepagina →
          </Link>
        </div>
      </div>
    </section>
  );
}

