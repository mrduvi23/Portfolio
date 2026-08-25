"use client";

import "@/components/case-study/case-study-uci-access-navbars.css";
import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import {
  UCI_ACCESS_NAVBAR_REF_INSET_X,
  UCI_NAMING_NAVBAR_DESIGN_FRAME_W,
  UCI_NAMING_NAVBAR_REF_GAP,
  uciAllNavBarImages,
} from "@/lib/case-studies/uci-naming-navbars";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const ACCESS_POINT_PARALLAX = {
  maxShift: 56,
  overscan: 0.28,
} as const;

const ACCESS_POINT_PARALLAX_OVERSCAN = 0.28;

export function CaseStudyUciAccessPointNavBars() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useCaseStudyParallaxLayer(rootRef, layerRef, ACCESS_POINT_PARALLAX);

  useLayoutEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const updateScale = () => {
      setScale(element.clientWidth / UCI_NAMING_NAVBAR_DESIGN_FRAME_W);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stackStyle = {
    "--uci-access-nav-inset-x": `${UCI_ACCESS_NAVBAR_REF_INSET_X * scale}px`,
    "--uci-access-nav-gap": `${UCI_NAMING_NAVBAR_REF_GAP * scale}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="case-study-placeholder-frame case-study-placeholder-frame--access-navbars"
      aria-label="Benchmark access point navigation examples"
    >
      <div
        ref={layerRef}
        className="case-study-uci-access-navbars__parallax-layer"
        style={{
          top: `${(-ACCESS_POINT_PARALLAX_OVERSCAN / 2) * 100}%`,
          height: `${(1 + ACCESS_POINT_PARALLAX_OVERSCAN) * 100}%`,
        }}
      >
        <div className="case-study-uci-access-navbars__stack" style={stackStyle}>
          {uciAllNavBarImages.map((image) => (
            <Image
              key={image.id}
              src={image.src}
              alt={image.label}
              width={image.width}
              height={image.height}
              className="case-study-uci-access-navbars__image"
              sizes="(max-width:763px) calc(100vw - 80px), 405px"
              quality={95}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
