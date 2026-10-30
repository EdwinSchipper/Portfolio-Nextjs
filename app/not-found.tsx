import type { Metadata } from "next";
import Link from "next/link";
import { Button, Label } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  description: "De opgevraagde pagina bestaat niet of is verplaatst.",
};

export default function NotFound() {
  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-center px-6 sm:px-14 lg:px-20 py-20 lg:py-32 font-content text-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center border border-border-100 dark:border-border-200 rounded-md bg-background-200 dark:bg-background-900 p-8 sm:p-12 lg:p-16 shadow-2xs">
        <Label variant="pill" className="mb-6">
          404 — Niet Gevonden
        </Label>

        <h1 className="font-bold text-title_2M sm:text-title_2 lg:text-title_1 tracking-tight text-title-100 dark:text-title-200 mb-4">
          Pagina niet gevonden
        </h1>

        <p className="text-mediumM sm:text-medium text-content-100 dark:text-content-200 mb-8 max-w-lg leading-relaxed">
          De pagina die je zoekt bestaat niet (meer), is hernoemd of is tijdelijk niet beschikbaar in het CMS.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button href="/" variant="primary" arrow>
            Terug naar home
          </Button>
          <Link
            href="/portfolio"
            className="font-medium text-noteM sm:text-note text-title-100 dark:text-title-200 hover:text-accent7-900 dark:hover:text-accent8-900 transition-colors px-4 py-2"
          >
            Bekijk portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}

