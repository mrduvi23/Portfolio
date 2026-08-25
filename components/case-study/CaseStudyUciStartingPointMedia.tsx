"use client";

import "@/components/case-study/case-study-uci-starting-point.css";
import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import { assets } from "@/lib/assets";
import Image from "next/image";
import { useRef } from "react";

const IMAGE_NATURAL = { width: 1110, height: 1180 } as const;
const PARALLAX_OVERSCAN = 0.07;

export function CaseStudyUciStartingPointMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  useCaseStudyParallaxLayer(rootRef, layerRef);

  return (
    <div
      ref={rootRef}
      className="case-study-uci-starting-point"
      aria-label="UCI press room starting point"
    >
      <div
        ref={layerRef}
        className="case-study-uci-starting-point__parallax-layer"
        style={{
          top: `${(-PARALLAX_OVERSCAN / 2) * 100}%`,
          height: `${(1 + PARALLAX_OVERSCAN) * 100}%`,
        }}
      >
        <div className="case-study-uci-starting-point__image-wrap">
          <Image
            src={assets.uciStartingPoint}
            alt="UCI press room website starting point"
            width={IMAGE_NATURAL.width}
            height={IMAGE_NATURAL.height}
            className="case-study-uci-starting-point__image"
            sizes="(max-width:763px) calc(100vw - 80px), 555px"
            quality={95}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
