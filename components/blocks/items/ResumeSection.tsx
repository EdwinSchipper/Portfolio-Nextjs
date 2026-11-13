import {
  ResumeSectionBlock,
  ExperienceCompany,
  ExperienceRole,
  CertificationItem,
  CSLPAttribute,
  CSLPContainer,
} from "@/lib/types";
import { normalizeResumeSection } from "@/lib/cms";
import { Label, Button, RichText } from "@/components/ui";
import { getContainerClass, getColorModeClass, colSpans } from "@/lib/layout";

/**
 * Returns the first letter of a company name to render as an avatar monogram.
 */
function getInitial(name?: string): string {
  if (!name) return "•";
  return name.trim().charAt(0).toUpperCase();
}

export interface ResumeSectionProps {
  data?: ResumeSectionBlock;
  previewAttr?: CSLPAttribute;
  width?: "small" | "default" | "large" | "wide" | string;
  colorMode?: "default" | "alt" | string;
  leftColSpan?: number | string;
  rightColSpan?: number | string;
  timelinePosition?: "left" | "right" | "full" | string;
  className?: string;
}

export interface ResumeStackBlockProps {
  tags?: string[];
  label?: string;
  title?: string;
  labelCslp?: CSLPAttribute;
  titleCslp?: CSLPAttribute;
  meta?: CSLPContainer;
  className?: string;
}

/**
 * Renders individual pill badge tags with Cascadia Mono styling and micro-interactions.
 */
export function ResumeStackTags({
  tags = [],
  meta,
  className = "",
}: {
  tags: string[];
  meta?: CSLPContainer;
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;

  return (
    <div
      {...(meta && (meta.stack || meta.Stack))}
      className={`flex flex-wrap gap-2 sm:gap-2 ${className}`}
    >
      {tags.map((tag, idx) => (
        <Label key={`${tag}-${idx}`} variant="pill">
          {tag}
        </Label>
      ))}
    </div>
  );
}

/**
 * Consolidated Stack Block pairing a section divider, optional overline label,
 * optional title, and the tag pill cloud.
 */
export function ResumeStackBlock({
  tags = [],
  label,
  title,
  labelCslp,
  titleCslp,
  meta,
  className = "",
}: ResumeStackBlockProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div
      className={`flex flex-col gap-6 lg:gap-5 font-content ${className}`}
    >
      {label && (
        <div>
          <Label variant="brand" cslp={labelCslp}>
            {label}
          </Label>
        </div>
      )}
      {title && (
        <h3
          className="text-title_3M sm:text-title_3 text-title-100 dark:text-title-200 font-bold"
          {...titleCslp}
        >
          {title}
        </h3>
      )}
      <ResumeStackTags tags={tags} meta={meta} />
    </div>
  );
}

/**
 * Renders the list of companies, roles, and dates in the timeline format.
 */
export function ExperienceTimelineList({
  companies = [],
  sectionTitle,
  meta,
}: {
  companies: ExperienceCompany[];
  sectionTitle?: string;
  meta?: CSLPContainer;
}) {
  return (
    <div className="w-full">
      {sectionTitle && (
        <div className="mb-10">
          <h3
            className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 tracking-tight font-content"
            {...(meta && meta.section_title)}
          >
            {sectionTitle}
          </h3>
        </div>
      )}

      <div className="space-y-12 font-content">
        {companies.map((company, cIdx) => {
          const rawRoles = company.roles || company.Roles;
          const roles: ExperienceRole[] = Array.isArray(rawRoles)
            ? rawRoles
            : rawRoles
              ? [rawRoles]
              : [];
          const coreRoles = roles.filter(
            (r) => (r.role_type || r.roleType || "").toLowerCase() !== "secondary"
          );
          const secondaryRoles = roles.filter(
            (r) => (r.role_type || r.roleType || "").toLowerCase() === "secondary"
          );

          const displayCoreRoles =
            coreRoles.length > 0
              ? coreRoles
              : secondaryRoles.length === 0
                ? roles
                : [];
          const displaySecondaryRoles =
            coreRoles.length > 0 ? secondaryRoles : [];

          return (
            <div
              key={company._metadata?.uid || `company-${cIdx}`}
              className="relative pl-16 md:pl-20 pb-8 last:pb-0 -ml-4 sm:ml-0 "
            >
              {roles.length > 0 && (
                <div
                  aria-hidden="true"
                  className="absolute left-6 md:left-8 top-14 md:top-18 bottom-4 w-0.5 bg-accent7-200 dark:bg-accent8-300 -translate-x-1/2 pointer-events-none"
                />
              )}

              <div
                aria-hidden="true"
                className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-background-200 dark:bg-background-900 border border-border-100 dark:border-border-200 flex items-center justify-center font-playfull font-black text-2xl md:text-3xl text-title-100 dark:text-title-200 select-none z-10"
              >
                {getInitial(company.company_name)}
              </div>

              <div className="mb-6 pt-1 md:pt-2">
                {company.company_name && (
                  <h4
                    className="text-title_3M sm:text-title_3 font-bold text-title-100 dark:text-title-200 tracking-tight"
                    {...(company?.$ && company?.$.company_name)}
                  >
                    {company.company_name}
                  </h4>
                )}
                {company.company_period && (
                  <p
                    className="text-smallM md:text-small font-medium text-accent7-900 dark:text-accent8-900 font-playfull"
                    {...(company?.$ && company?.$.company_period)}
                  >
                    {company.company_period}
                  </p>
                )}
              </div>

              <div className="space-y-14">
                {displayCoreRoles.map((role, rIdx) => {
                  const hasSecondary = displaySecondaryRoles.length > 0;
                  const isCard = Boolean(role.badge) || hasSecondary;

                  return (
                    <div
                      key={role._metadata?.uid || `core-role-${rIdx}`}
                      className="relative"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-10 md:-left-12 top-2.5 w-3.5 h-3.5 rounded-full border-2 border-accent7-900 dark:border-accent8-900 bg-background-100 dark:bg-background-800 -translate-x-1/2 z-10"
                      />

                      {isCard ? (
                        <div className="bg-background-200 dark:bg-background-900 rounded-md border border-border-100 dark:border-border-200 p-6 md:p-8">
                          <div className="flex flex-wrap items-center justify-between gap-5 sm:gap-3">
                            {role.title && (
                              <h5
                                className="order-2 md:order-1 text-title_5M sm:text-title_5 font-bold text-title-100 dark:text-title-200"
                                {...(role?.$ && role?.$.title)}
                              >
                                {role.title}
                              </h5>
                            )}
                            {role.badge && (
                              <Label
                                variant="pill"
                                className="order-1 md:order-2"
                                cslp={role?.$ && role?.$.badge}
                              >
                                {role.badge}
                              </Label>
                            )}
                          </div>

                          {role.period && (
                            <p
                              className="text-smallM md:text-small font-medium text-accent7-900 dark:text-accent8-900 font-playfull mb-6"
                              {...(role?.$ && role?.$.period)}
                            >
                              {role.period}
                            </p>
                          )}

                          {role.description && (
                            <p
                              className="text-mediumM sm:text-small text-content-100 dark:text-content-200"
                              {...(role?.$ && role?.$.description)}
                            >
                              {role.description}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="max-w-3xl flex flex-col">
                          {role.title && (
                            <h5
                              className="text-title_6M sm:text-title_6 font-bold text-title-100 dark:text-title-200"
                              {...(role?.$ && role?.$.title)}
                            >
                              {role.title}
                            </h5>
                          )}
                          {role.period && (
                            <p
                              className="text-smallM md:text-small font-semibold text-accent7-900 dark:text-accent8-900 font-playfull mb-4"
                              {...(role?.$ && role?.$.period)}
                            >
                              {role.period}
                            </p>
                          )}
                          {role.description && (
                            <p
                              className="text-mediumM sm:text-small text-content-100 dark:text-content-200 leading-relaxed whitespace-pre-line"
                              {...(role?.$ && role?.$.description)}
                            >
                              {role.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {displaySecondaryRoles.length > 0 && (
                  <div className="relative pt-4">
                    <span
                      aria-hidden="true"
                      className="absolute -left-6 md:-left-12 top-6 w-3.5 h-3.5 rounded-full border-2 border-accent7-900 dark:border-accent8-900 bg-background-100 dark:bg-background-800 -translate-x-1/2 z-10"
                    />

                    <h5 className="text-noteM md:text-note font-bold tracking-wider text-content-300 dark:text-content-300 uppercase mb-4">
                      Aanvullende Disciplines
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {displaySecondaryRoles.map((secRole, sIdx) => (
                        <div
                          key={secRole._metadata?.uid || `sec-role-${sIdx}`}
                          className="bg-background-200 dark:bg-background-900 rounded-md border border-border-100 dark:border-border-200 p-5 md:p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col"
                        >
                          {secRole.title && (
                            <h6
                              className="text-title_5M sm:text-title_5 font-bold text-title-100 dark:text-title-200 mb-1 w-full"
                              {...(secRole?.$ && secRole?.$.title)}
                            >
                              {secRole.title}
                            </h6>
                          )}

                          {secRole.period && (
                            <p
                              className="text-smallM md:text-small font-semibold text-accent7-900 dark:text-accent8-900 font-playfull mb-3"
                              {...(secRole?.$ && secRole?.$.period)}
                            >
                              {secRole.period}
                            </p>
                          )}

                          {secRole.description && (
                            <p
                              className="text-smallM md:text-small text-content-100 dark:text-content-200 leading-relaxed whitespace-pre-line"
                              {...(secRole?.$ && secRole?.$.description)}
                            >
                              {secRole.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface ResumeCertificationsProps {
  label?: string;
  title?: string;
  certifications?: CertificationItem[];
  meta?: CSLPContainer;
  className?: string;
}

/**
 * Renders education and certifications list in a structured 2x2 grid format per entry.
 */
export function ResumeCertifications({
  label = "02 — Opleiding",
  title = "Opleiding & Certificeringen",
  certifications = [],
  meta,
  className = "",
}: ResumeCertificationsProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <div className={`flex flex-col font-content ${className}`}>
      <div className="flex flex-col mb-7 md:mb-12">
        {label && (
          <div>
            <Label
              variant="brand"
              cslp={meta && (meta.education_label || meta.certifications_label)}
            >
              {label}
            </Label>
          </div>
        )}
        {title && (
          <h2
            className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 max-w-sm md:max-w-xl lg:max-w-xl text-balance mt-2"
            {...(meta && (meta.education_title || meta.certifications_title))}
          >
            {title}
          </h2>
        )}
      </div>

      <div className="mb-32 md:mb-24">
        <div className="flex flex-col w-full">
          {certifications.map((cert, idx) => {
            const certMeta = cert.$;
            return (
              <div
                key={cert._metadata?.uid || cert.title || `cert-${idx}`}
                className="flex justify-between items-start py-2 lg:py-4 gap-4 border-b border-border-100 dark:border-border-200"
              >
                <div className="grid grid-cols-[1fr_auto] gap-x-10 w-full">
                  <div
                    className="font-semibold text-mediumM sm:text-medium text-title-100 dark:text-title-200"
                    {...(certMeta && certMeta.title)}
                  >
                    {cert.title}
                  </div>
                  <div
                    className="font-normal text-smallM sm:text-small text-content-300 dark:text-content-300 text-right font-playfull"
                    {...(certMeta && (certMeta.year || certMeta.date))}
                  >
                    {cert.year || cert.date}
                  </div>
                  <div
                    className="font-normal text-smallM sm:text-small text-content-100 dark:text-content-200"
                    {...(certMeta && (certMeta.platform || certMeta.institution))}
                  >
                    {cert.platform || cert.institution}
                  </div>
                  <div
                    className="font-normal text-smallM sm:text-small text-content-300 dark:text-content-300 text-right"
                    {...(certMeta && certMeta.location)}
                  >
                    {cert.location}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * ResumeSection: 2-column modular grid section pairing an intro sidebar with an interactive timeline or stack tags.
 * Supports flexible timeline placement ("right", "left", or "full"), container widths, color modes, and sticky scrolling.
 */
export default function ResumeSection({
  data,
  previewAttr,
  width,
  colorMode,
  leftColSpan,
  rightColSpan,
  timelinePosition,
  className = "",
}: ResumeSectionProps) {
  const normalized = normalizeResumeSection(data, {
    width,
    colorMode,
    leftColSpan,
    rightColSpan,
    timelinePosition,
  });

  if (!normalized) return null;

  const {
    rawWidth,
    colorModeKey,
    isTimelineLeft,
    isFullWidth,
    leftColSpan: resolvedLeftCol,
    rightColSpan: resolvedRightCol,
    label,
    title,
    description,
    buttonHref,
    buttonTitle,
    timelineSubtitle,
    companies,
    tags,
    hasStack,
    stackLabel,
    stackLabelCslp,
    stackTitle,
    stackTitleCslp,
    certifications,
    hasCertifications,
    educationLabel,
    educationTitle,
    meta,
  } = normalized;

  const containerClass = getContainerClass(rawWidth, "large");
  const colorModeClass = getColorModeClass(colorModeKey);

  if (isFullWidth) {
    return (
      <section
        {...previewAttr}
        data-color-mode={colorModeKey}
        className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass} ${className}`}
      >
        <div className={`mx-auto px-10 sm:px-14 lg:px-12 md:px-20 ${containerClass}`}>
          <div className="w-full">
            {label && (
              <div className="mb-3">
                <Label variant="brand" cslp={meta && meta.label}>
                  {label}
                </Label>
              </div>
            )}
            {title && (
              <h2
                className="text-title_2M sm:text-title_2 font-bold text-title-100 dark:text-title-200 tracking-tight font-content mb-8 sm:mb-10"
                {...(meta && meta.title)}
              >
                {title}
              </h2>
            )}
            {description && (
              <RichText
                content={description}
                cslp={meta && (meta.description || meta.text)}
                className="text-baseM sm:text-base text-content-100 dark:text-content-200 mb-8 font-content max-w-3xl"
              />
            )}
            {buttonHref && buttonTitle && (
              <div className="mb-8">
                <Button
                  href={buttonHref}
                  variant="primary"
                  cslp={meta && meta.button}
                >
                  {buttonTitle}
                </Button>
              </div>
            )}
            {hasStack && (
              <ResumeStackBlock
                tags={tags}
                label={stackLabel}
                title={stackTitle}
                labelCslp={stackLabelCslp}
                titleCslp={stackTitleCslp}
                meta={meta}
                className={companies.length > 0 ? "mb-12" : ""}
              />
            )}
            {companies.length > 0 && (
              <ExperienceTimelineList
                companies={companies}
                sectionTitle={timelineSubtitle}
                meta={meta}
              />
            )}
            {hasCertifications && (
              <ResumeCertifications
                label={educationLabel}
                title={educationTitle}
                certifications={certifications}
                meta={meta}
                className={companies.length > 0 ? "mt-16 md:mt-24" : ""}
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  const defaultLeft = isTimelineLeft ? "8" : "4";
  const defaultRight = isTimelineLeft ? "4" : "8";

  const leftSpanClass =
    colSpans[String(resolvedLeftCol || defaultLeft)] ||
    colSpans[defaultLeft] ||
    "col-span-12 lg:col-span-4";
  const rightSpanClass =
    colSpans[String(resolvedRightCol || defaultRight)] ||
    colSpans[defaultRight] ||
    "col-span-12 lg:col-span-8";

  const introColClass = isTimelineLeft
    ? `${rightSpanClass} order-1 lg:order-2`
    : `${leftSpanClass} order-1`;

  const timelineColClass = isTimelineLeft
    ? `${leftSpanClass} order-2 lg:order-1`
    : `${rightSpanClass} order-2`;

  return (
    <section
      {...previewAttr}
      data-color-mode={colorModeKey}
      className={`col-span-full w-full mb-20 md:mb-32 ${colorModeClass} ${className}`}
    >
      <div className={`mx-auto px-10 sm:px-14 lg:px-12 md:px-20 ${containerClass}`}>
        <div className="sm:grid grid-cols-1 lg:grid-cols-12 gap-12 items-start sm:space-x-24 space-y-24 sm:space-y-0">
          <div className={introColClass}>
            <div className="lg:sticky lg:top-28 space-y-14">
              <div className="flex flex-col gap-3 lg:gap-3 font-content">
                {label && (
                  <div>
                    <Label variant="brand" cslp={meta && meta.label}>
                      {label}
                    </Label>
                  </div>
                )}

                {title && (
                  <h1
                    className="text-title_3M sm:text-title_3 text-title-100 dark:text-title-200 font-bold"
                    {...(meta && meta.title)}
                  >
                    {title}
                  </h1>
                )}

                {description && (
                  <RichText
                    content={description}
                    cslp={meta && (meta.description || meta.text)}
                    className="text-content-100 dark:text-content-200 text-mediumM sm:text-medium"
                  />
                )}

                {buttonHref && buttonTitle && (
                  <div className="pt-2">
                    <Button
                      href={buttonHref}
                      variant="primary"
                      cslp={meta && meta.button}
                    >
                      {buttonTitle}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 lg:gap-3 font-content">
                {hasStack && (
                  <ResumeStackBlock
                    tags={tags}
                    label={stackLabel}
                    title={stackTitle}
                    labelCslp={stackLabelCslp}
                    titleCslp={stackTitleCslp}
                    meta={meta}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={timelineColClass}>
            {companies.length > 0 && (
              <ExperienceTimelineList
                companies={companies}
                sectionTitle={timelineSubtitle}
                meta={meta}
              />
            )}
            {hasCertifications && (
              <ResumeCertifications
                label={educationLabel}
                title={educationTitle}
                certifications={certifications}
                meta={meta}
                className={companies.length > 0 ? "mt-16 md:mt-24" : ""}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

ResumeSection.Timeline = ExperienceTimelineList;
ResumeSection.Certifications = ResumeCertifications;
ResumeSection.StackBlock = ResumeStackBlock;
ResumeSection.StackTags = ResumeStackTags;
