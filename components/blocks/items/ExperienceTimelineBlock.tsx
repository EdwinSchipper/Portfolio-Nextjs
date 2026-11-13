import {
  ExperienceTimelineBlock as ExperienceTimelineBlockType,
  CSLPAttribute,
} from "@/lib/types";
import { normalizeExperienceTimeline } from "@/lib/cms";
import ResumeSection from "./ResumeSection";

interface ExperienceTimelineBlockProps {
  data?: ExperienceTimelineBlockType;
  previewAttr?: CSLPAttribute;
  className?: string;
}

/**
 * ExperienceTimelineBlock: Visual work experience timeline using project brand tokens.
 * Backward compatible wrapper delegating to ResumeSection.
 */
export default function ExperienceTimelineBlock({
  data,
  previewAttr,
  className = "",
}: ExperienceTimelineBlockProps) {
  if (!data) return null;

  return (
    <ResumeSection
      data={normalizeExperienceTimeline(data)}
      previewAttr={previewAttr}
      className={className}
    />
  );
}
