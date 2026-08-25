"use client";

import "@/components/case-study/case-study-uci-cross-selling.css";
import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import { assets } from "@/lib/assets";
import Image from "next/image";
import { useRef } from "react";

const IMAGES = {
  actualidad: { width: 946, height: 1232 },
  detalle: { width: 946, height: 2342 },
} as const;

const PARALLAX_OVERSCAN = 0.07;

export function CaseStudyUciCrossSellingMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  useCaseStudyParallaxLayer(rootRef, layerRef);

  return (
    <div
      ref={rootRef}
      className="case-study-placeholder-frame case-study-placeholder-frame--half case-study-uci-cross-selling"
      aria-label="Business cross-selling screen compositions"
    >
      <div
        ref={layerRef}
        className="case-study-uci-cross-selling__parallax-layer"
        style={{
          top: `${(-PARALLAX_OVERSCAN / 2) * 100}%`,
          height: `${(1 + PARALLAX_OVERSCAN) * 100}%`,
        }}
      >
        <div className="case-study-uci-cross-selling__actualidad-wrap">
          <Image
            src={assets.uciCrossSellingActualidad}
            alt="News listing with cross-selling modules"
            width={IMAGES.actualidad.width}
            height={IMAGES.actualidad.height}
            className="case-study-uci-cross-selling__image"
            sizes="(max-width:763px) 80px, 190px"
            quality={95}
            draggable={false}
          />
        </div>
      </div>

      <div className="case-study-uci-cross-selling__detalle">
        <Image
          src={assets.uciCrossSellingDetalle}
          alt="Press release detail with contextual cross-selling"
          width={IMAGES.detalle.width}
          height={IMAGES.detalle.height}
          className="case-study-uci-cross-selling__image"
          sizes="(max-width:763px) 80px, 190px"
          quality={95}
          draggable={false}
        />
      </div>
    </div>
  );
}
