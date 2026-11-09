import React from "react";
import {
  ExperienceTimelineBlock as ExperienceTimelineBlockType,
  ResumeSectionBlock,
  CSLPAttribute,
} from "@/lib/types";
import ResumeSection from "./ResumeSection";

interface ExperienceTimelineBlockProps {
  data: ExperienceTimelineBlockType;
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
  const nestedTimeline = data.experience_timeline;
  const timelineData: ResumeSectionBlock =
    data.companies || data.section_title
      ? data
      : Array.isArray(nestedTimeline)
        ? { companies: nestedTimeline, $: data.$ }
        : nestedTimeline || data;

  return (
    <ResumeSection
      data={timelineData}
      previewAttr={previewAttr}
      className={className}
    />
  );
}
