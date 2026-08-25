import { dsBrandsCaseStudy } from "@/lib/case-studies/ds-brands";
import { infraredCaseStudy } from "@/lib/case-studies/infrared";
import { uciCaseStudy } from "@/lib/case-studies/uci";
import type { CaseStudyContent } from "@/lib/case-studies/types";

const caseStudies: Record<string, CaseStudyContent> = {
  [dsBrandsCaseStudy.slug]: dsBrandsCaseStudy,
  [infraredCaseStudy.slug]: infraredCaseStudy,
  [uciCaseStudy.slug]: uciCaseStudy,
};

export function getCaseStudyBySlug(slug: string): CaseStudyContent | undefined {
  return caseStudies[slug];
}

export function hasCaseStudyPage(slug: string): boolean {
  return slug in caseStudies;
}
