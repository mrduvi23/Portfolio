"use client";

import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import Image from "next/image";
import { useRef } from "react";

const OVERSCAN = 0.07;

/**
 * Imagen de muestra con parallax vertical sutil, conservando el fondo grey-10
 * y el stroke del marco.
 */
export function CaseStudyParallaxImage({
  src,
  alt = "",
  frameClass,
}: {
  src: string;
  alt?: string;
  frameClass: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  useCaseStudyParallaxLayer(rootRef, layerRef);

  return (
    <div ref={rootRef} className={frameClass}>
      <div
        ref={layerRef}
        className="absolute left-0 w-full will-change-transform"
        style={{
          top: `${(-OVERSCAN / 2) * 100}%`,
          height: `${(1 + OVERSCAN) * 100}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width:763px) 100vw, (max-width:1440px) 66vw, 922px"
          quality={95}
          priority={false}
        />
      </div>
    </div>
  );
}
