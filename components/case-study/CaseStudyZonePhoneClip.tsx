"use client";

import { CaseStudyZoneKeyedVideo } from "@/components/case-study/CaseStudyZoneKeyedVideo";
import { assets } from "@/lib/assets";

const PHONE_CROP = { sx: 0, sy: 0, sw: 1080, sh: 1080 } as const;

const ZONE_PHONE_CLIPS = {
  "zone-workspace": {
    webm: assets.zoneWorkspace,
    source: assets.zoneWorkspaceSource,
    label: "Zone app workspace on mobile",
  },
  "zone-dashboard": {
    webm: assets.zoneDashboard,
    source: assets.zoneDashboardSource,
    label: "Zone app dashboards on mobile",
  },
  "zone-favourite": {
    webm: assets.zoneFavourite,
    source: assets.zoneFavouriteSource,
    label: "Zone app favorites folder on mobile",
    keyRgb: { r: 245, g: 157, b: 7 },
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
    <CaseStudyZoneKeyedVideo
      className="case-study-zone-keyed--square"
      webmSrc={clip.webm}
      sourceSrc={clip.source}
      crop={PHONE_CROP}
      label={clip.label}
      keyRgb={"keyRgb" in clip ? clip.keyRgb : undefined}
    />
  );
}
