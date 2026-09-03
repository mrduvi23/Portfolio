"use client";

import { CaseStudyZoneVideo } from "@/components/case-study/CaseStudyZoneVideo";
import { assets } from "@/lib/assets";

const CALENDAR_COPY =
  "We also built a calendar with a short legend so employees could stay on top of company events at a glance.";

export function CaseStudyZoneNewsCalendarMedia() {
  return (
    <div className="case-study-zone-video-pair">
      <CaseStudyZoneVideo
        className="case-study-zone-video--square case-study-zone-video--news"
        src={assets.zoneNews}
        label="Zone app news feed on mobile"
      />
      <p className="case-study-zone-video-pair__mobile-caption type-body text-pretty">
        {CALENDAR_COPY}
      </p>
      <CaseStudyZoneVideo
        className="case-study-zone-video--square"
        src={assets.zoneCalendar}
        label="Zone app calendar and events on mobile"
      />
    </div>
  );
}
