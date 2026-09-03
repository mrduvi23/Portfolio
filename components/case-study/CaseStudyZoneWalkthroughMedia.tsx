"use client";

import { CaseStudyZoneVideo } from "@/components/case-study/CaseStudyZoneVideo";
import { assets } from "@/lib/assets";

export function CaseStudyZoneWalkthroughMedia() {
  return (
    <CaseStudyZoneVideo
      className="case-study-zone-video--walkthrough"
      src={assets.zoneWalkthrough}
      label="Zone app walkthrough on phone and tablet"
    />
  );
}
