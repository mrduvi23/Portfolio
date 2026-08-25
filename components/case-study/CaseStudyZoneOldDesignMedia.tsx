"use client";

import "@/components/case-study/case-study-zone-old-design.css";
import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import { assets } from "@/lib/assets";
import Image from "next/image";
import { useRef } from "react";

const IMAGE_NATURAL = { width: 2674, height: 1304 } as const;
const PARALLAX_OVERSCAN = 0.07;

export function CaseStudyZoneOldDesignMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  useCaseStudyParallaxLayer(rootRef, layerRef);

  return (
    <div
      ref={rootRef}
      className="case-study-placeholder-frame case-study-zone-old-design"
      aria-label="Previous Zone intranet design"
    >
      <div
        ref={layerRef}
        className="case-study-zone-old-design__parallax-layer"
        style={{
          top: `${(-PARALLAX_OVERSCAN / 2) * 100}%`,
          height: `${(1 + PARALLAX_OVERSCAN) * 100}%`,
        }}
      >
        <div className="case-study-zone-old-design__image-wrap">
          <Image
            src={assets.zoneOldDesign}
            alt="Legacy Zone intranet design before redesign"
            width={IMAGE_NATURAL.width}
            height={IMAGE_NATURAL.height}
            className="case-study-zone-old-design__image"
            sizes="(max-width:763px) 100vw, 922px"
            quality={95}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
