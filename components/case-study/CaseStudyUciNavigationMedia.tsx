"use client";

import type { CSSProperties } from "react";
import "@/components/case-study/case-study-uci-navigation.css";
import {
  uciNavigationLeftGroup,
  uciNavigationRightGroup,
  type UciNavigationImage,
} from "@/lib/case-studies/uci-navigation-layers";
import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import Image from "next/image";
import { useRef } from "react";

const PARALLAX_OVERSCAN = 0.07;

function NavigationImage({ image }: { image: UciNavigationImage }) {
  return (
    <div
      className="case-study-uci-navigation__image-wrap"
      style={{ "--nav-img-w": image.displayW } as CSSProperties}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.natural.width}
        height={image.natural.height}
        className="case-study-uci-navigation__image"
        sizes="(max-width:763px) 45vw, 496px"
        quality={95}
        draggable={false}
      />
    </div>
  );
}

export function CaseStudyUciNavigationMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  useCaseStudyParallaxLayer(rootRef, layerRef);

  return (
    <div
      ref={rootRef}
      className="case-study-placeholder-frame case-study-uci-navigation"
      aria-label="Press room navigation patterns from benchmarked sites"
    >
      <div
        ref={layerRef}
        className="case-study-uci-navigation__parallax-layer"
        style={{
          top: `${(-PARALLAX_OVERSCAN / 2) * 100}%`,
          height: `${(1 + PARALLAX_OVERSCAN) * 100}%`,
        }}
      >
        <div className="case-study-uci-navigation__composition">
          <div className="case-study-uci-navigation__group case-study-uci-navigation__group--left">
            {uciNavigationLeftGroup.map((image) => (
              <NavigationImage key={image.id} image={image} />
            ))}
          </div>
          <div className="case-study-uci-navigation__group case-study-uci-navigation__group--right">
            {uciNavigationRightGroup.map((image) => (
              <NavigationImage key={image.id} image={image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
