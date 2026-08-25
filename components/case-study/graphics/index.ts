import type { CaseStudyGraphicId } from "@/lib/case-studies/types";
import type { ComponentType } from "react";
import { BaseDesignSystemGraphic } from "@/components/case-study/graphics/BaseDesignSystemGraphic";
import { CompoExperienceOnlyGraphic } from "@/components/case-study/graphics/CompoExperienceOnlyGraphic";
import { MdsEcosystemGraphic } from "@/components/case-study/graphics/MdsEcosystemGraphic";
import { WhiteLabelGraphic } from "@/components/case-study/graphics/WhiteLabelGraphic";

export const caseStudyGraphics: Record<
  CaseStudyGraphicId,
  ComponentType
> = {
  "mds-ecosystem": MdsEcosystemGraphic,
  "white-label": WhiteLabelGraphic,
  "base-design-system": BaseDesignSystemGraphic,
  "compo-experience-only": CompoExperienceOnlyGraphic,
};
