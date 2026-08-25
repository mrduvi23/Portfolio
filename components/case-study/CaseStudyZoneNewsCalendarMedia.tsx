"use client";

import { CaseStudyZoneKeyedVideo } from "@/components/case-study/CaseStudyZoneKeyedVideo";
import { assets } from "@/lib/assets";

const NEWS_CROP = { sx: 0, sy: 0, sw: 1080, sh: 1080 } as const;
const CALENDAR_CROP = { sx: 0, sy: 0, sw: 1504, sh: 1504 } as const;

const CALENDAR_COPY =
  "We also built a calendar with a short legend so employees could stay on top of company events at a glance.";

export function CaseStudyZoneNewsCalendarMedia() {
  return (
    <div className="case-study-zone-keyed-pair">
      <CaseStudyZoneKeyedVideo
        className="case-study-zone-keyed--square"
        webmSrc={assets.zoneNews}
        sourceSrc={assets.zoneNewsSource}
        crop={NEWS_CROP}
        label="Zone app news feed on mobile"
      />
      <p className="case-study-zone-keyed-pair__mobile-caption type-body text-pretty">
        {CALENDAR_COPY}
      </p>
      <CaseStudyZoneKeyedVideo
        className="case-study-zone-keyed--square"
        webmSrc={assets.zoneCalendar}
        sourceSrc={assets.zoneCalendarSource}
        crop={CALENDAR_CROP}
        label="Zone app calendar and events on mobile"
      />
    </div>
  );
}
