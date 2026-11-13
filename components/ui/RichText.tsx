import DOMPurify from "isomorphic-dompurify";
import type { CSLPAttribute } from "@/lib/types";

const HTML_TAG_PATTERN = /<[a-z][\s\S]*>/i;

export interface RichTextProps {
  content?: string | null;
  cslp?: CSLPAttribute;
  className?: string;
  plainTextClassName?: string;
  id?: string;
  mode?: "auto" | "html";
}

/**
 * Safely renders sanitized Contentstack rich text HTML or plain text with Live Preview attributes.
 */
export default function RichText({
  content,
  cslp,
  className = "",
  plainTextClassName = "whitespace-pre-line",
  id,
  mode = "auto",
}: RichTextProps) {
  if (!content) return null;

  const shouldRenderHtml = mode === "html" || HTML_TAG_PATTERN.test(content);

  if (shouldRenderHtml) {
    return (
      <div
        id={id}
        {...cslp}
        className={className || undefined}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      />
    );
  }

  const plainClasses = [className, plainTextClassName].filter(Boolean).join(" ");

  return (
    <p id={id} {...cslp} className={plainClasses || undefined}>
      {content}
    </p>
  );
}

