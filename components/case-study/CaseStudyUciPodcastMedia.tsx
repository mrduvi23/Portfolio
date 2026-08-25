"use client";

import "@/components/case-study/case-study-uci-podcast.css";
import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import { assets } from "@/lib/assets";
import Image from "next/image";
import { useRef } from "react";

const IMAGE_NATURAL = { width: 1680, height: 818 } as const;
const PARALLAX_OVERSCAN = 0.07;

export function CaseStudyUciPodcastMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  useCaseStudyParallaxLayer(rootRef, layerRef);

  return (
    <div
      ref={rootRef}
      className="case-study-placeholder-frame case-study-placeholder-frame--half case-study-uci-podcast"
      aria-label="Podcast content highlighted on press room hubs"
    >
      <div
        ref={layerRef}
        className="case-study-uci-podcast__parallax-layer"
        style={{
          top: `${(-PARALLAX_OVERSCAN / 2) * 100}%`,
          height: `${(1 + PARALLAX_OVERSCAN) * 100}%`,
        }}
      >
        <div className="case-study-uci-podcast__image-wrap">
          <Image
            src={assets.uciPodcast}
            alt="Podcast section highlighted on a press room hub page"
            width={IMAGE_NATURAL.width}
            height={IMAGE_NATURAL.height}
            className="case-study-uci-podcast__image"
            sizes="(max-width:763px) 89vw, 405px"
            quality={95}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
