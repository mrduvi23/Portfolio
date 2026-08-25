"use client";

import "@/components/case-study/case-study-uci-naming-navbars.css";
import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import {
  UCI_NAMING_NAVBAR_DESIGN_FRAME_W,
  UCI_NAMING_NAVBAR_REF_GAP,
  UCI_NAMING_NAVBAR_REF_IMAGE_W,
  UCI_NAMING_NAVBAR_REF_INSET,
  type UciNamingNavBarImage,
} from "@/lib/case-studies/uci-naming-navbars";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

export function CaseStudyUciNamingNavBarFrame({
  images,
}: {
  images: UciNamingNavBarImage[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useCaseStudyParallaxLayer(rootRef, layerRef);

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
    "--uci-naming-nav-inset": `${UCI_NAMING_NAVBAR_REF_INSET * scale}px`,
    "--uci-naming-nav-gap": `${UCI_NAMING_NAVBAR_REF_GAP * scale}px`,
    "--uci-naming-nav-image-w": `${UCI_NAMING_NAVBAR_REF_IMAGE_W * scale}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="case-study-placeholder-frame case-study-media-pair-captions__frame case-study-uci-naming-navbars__frame"
      aria-label="Benchmark navigation examples"
    >
      <div ref={layerRef} className="case-study-uci-naming-navbars__parallax-layer">
        <div className="case-study-uci-naming-navbars__stack" style={stackStyle}>
          {images.map((image) => (
            <Image
              key={image.id}
              src={image.src}
              alt={image.label}
              width={image.width}
              height={image.height}
              className="case-study-uci-naming-navbars__image"
              sizes="(max-width:763px) calc(100vw - 80px), 478px"
              quality={95}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
