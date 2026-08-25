"use client";

import "@/components/case-study/case-study-uci-architecture.css";
import { assets } from "@/lib/assets";
import Image from "next/image";

const IMAGE_NATURAL = { width: 1844, height: 878 } as const;

export function CaseStudyUciArchitectureMedia() {
  return (
    <div
      className="case-study-uci-architecture"
      aria-label="Press room information architecture comparison"
    >
      <Image
        src={assets.uciArchitecture}
        alt="Press room information architecture comparison across benchmarked sites"
        width={IMAGE_NATURAL.width}
        height={IMAGE_NATURAL.height}
        className="case-study-uci-architecture__image"
        sizes="(max-width:763px) 100vw, 922px"
        quality={95}
        draggable={false}
      />
    </div>
  );
}
