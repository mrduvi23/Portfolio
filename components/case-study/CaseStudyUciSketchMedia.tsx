"use client";

import "@/components/case-study/case-study-uci-sketch.css";
import { useCaseStudyParallaxLayer } from "@/hooks/useCaseStudyParallaxLayer";
import { assets } from "@/lib/assets";
import Image from "next/image";
import { useRef } from "react";

export function CaseStudyUciSketchMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  useCaseStudyParallaxLayer(rootRef, layerRef);

  return (
    <div ref={rootRef} className="case-study-uci-sketch">
      <div ref={layerRef} className="case-study-uci-sketch__parallax-layer">
        <div className="case-study-uci-sketch__layer case-study-uci-sketch__layer--back">
          <Image
            src={assets.uciSketchBack}
            alt="UCI press room wireframe — news section"
            fill
            className="case-study-uci-sketch__image"
            sizes="(max-width:763px) 61vw, 570px"
            quality={95}
          />
        </div>
        <div className="case-study-uci-sketch__layer case-study-uci-sketch__layer--front">
          <Image
            src={assets.uciSketchFront}
            alt="UCI press room wireframe — publications section"
            fill
            className="case-study-uci-sketch__image"
            sizes="(max-width:763px) 61vw, 570px"
            quality={95}
          />
        </div>
      </div>
    </div>
  );
}
