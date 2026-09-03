"use client";

import { CaseStudyZoneVideo } from "@/components/case-study/CaseStudyZoneVideo";
import { assets } from "@/lib/assets";

const ZONE_PHONE_CLIPS = {
  "zone-workspace": {
    src: assets.zoneWorkspace,
    label: "Zone app workspace on mobile",
  },
  "zone-dashboard": {
    src: assets.zoneDashboard,
    label: "Zone app dashboards on mobile",
  },
  "zone-favourite": {
    src: assets.zoneFavourite,
    label: "Zone app favorites folder on mobile",
  },
} as const;

type ZonePhoneClipVariant = keyof typeof ZONE_PHONE_CLIPS;

export function CaseStudyZonePhoneClip({
  variant,
}: {
  variant: ZonePhoneClipVariant;
}) {
  const clip = ZONE_PHONE_CLIPS[variant];

  return (
    <CaseStudyZoneVideo
      className="case-study-zone-video--square"
      src={clip.src}
      label={clip.label}
    />
  );
}
