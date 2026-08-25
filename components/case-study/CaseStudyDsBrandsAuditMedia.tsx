"use client";

import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import { assets } from "@/lib/assets";
import Image from "next/image";
import { useRef } from "react";
import "@/components/case-study/ds-brands-audit-media.css";

const TYPOGRAPHY_NATURAL = { width: 5510, height: 4337 } as const;
const COMPONENTS_NATURAL = { width: 6100, height: 3968 } as const;

/**
 * Analysis — Typography (back, left) + Components (front, right).
 * <764px: fluid 375→763. ≥764: tablet/desktop sizes from CSS.
 */
export function CaseStudyDsBrandsAuditMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  useCaseStudyParallaxLayer(rootRef, layerRef);

  return (
    <div ref={rootRef} className="ds-brands-audit-media">
      <div ref={layerRef} className="ds-brands-audit-media__layer">
        <Image
          src={assets.dsBrandsTypography}
          alt=""
          width={TYPOGRAPHY_NATURAL.width}
          height={TYPOGRAPHY_NATURAL.height}
          className="ds-brands-audit-media__typography"
          sizes="(max-width:763px) 60vw, (max-width:1279px) 464px, 560px"
          quality={95}
          priority={false}
        />
        <Image
          src={assets.dsBrandsComponents}
          alt=""
          width={COMPONENTS_NATURAL.width}
          height={COMPONENTS_NATURAL.height}
          className="ds-brands-audit-media__components"
          sizes="(max-width:763px) 55vw, (max-width:1279px) 472px, 569px"
          quality={95}
          priority={false}
        />
      </div>
    </div>
  );
}
