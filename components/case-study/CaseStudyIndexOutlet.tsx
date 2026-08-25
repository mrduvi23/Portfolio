"use client";

import { CaseStudyIndex } from "@/components/case-study/CaseStudyIndex";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { usePathname } from "next/navigation";

function getWorkSlug(pathname: string | null): string | null {
  if (!pathname?.startsWith("/work/")) return null;
  const slug = pathname.split("/")[2];
  return slug || null;
}

/** Renders the case study side index outside PageTransition (fixed to viewport). */
export function CaseStudyIndexOutlet() {
  const pathname = usePathname();
  const slug = getWorkSlug(pathname);
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!study?.nav) return null;

  return <CaseStudyIndex nav={study.nav} />;
}
