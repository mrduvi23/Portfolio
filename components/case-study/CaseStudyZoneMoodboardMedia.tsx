"use client";

import "@/components/case-study/case-study-zone-moodboard.css";
import { assets } from "@/lib/assets";
import Image from "next/image";

const IMAGE_NATURAL = { width: 1844, height: 792 } as const;

export function CaseStudyZoneMoodboardMedia() {
  return (
    <div
      className="case-study-placeholder-frame case-study-zone-moodboard"
      aria-label="Visual research moodboard for Zone app direction"
    >
      <div className="case-study-zone-moodboard__image-wrap">
        <Image
          src={assets.zoneMoodboard}
          alt="Visual research moodboard exploring Zone app look and feel"
          width={IMAGE_NATURAL.width}
          height={IMAGE_NATURAL.height}
          className="case-study-zone-moodboard__image"
          sizes="(max-width:763px) 100vw, 922px"
          quality={95}
          draggable={false}
        />
      </div>
    </div>
  );
}
