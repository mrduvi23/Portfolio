"use client";

import { caseStudyGraphics } from "@/components/case-study/graphics";
import type { CaseStudyGraphicId } from "@/lib/case-studies/types";

export function CaseStudyGraphicMedia({
  graphicId,
}: {
  graphicId: CaseStudyGraphicId;
}) {
  const Graphic = caseStudyGraphics[graphicId];
  return <Graphic />;
}
