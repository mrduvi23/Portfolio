"use client";

import { WhiteLabelTowerRows } from "@/components/case-study/graphics/WhiteLabelTowerRows";
import { AnimatedDashedCircle, AnimatedDashedRect } from "@/components/case-study/graphics/AnimatedDashedBorder";
import { useGraphicScrollMotion } from "@/hooks/useGraphicScrollMotion";
import { useRef } from "react";
import "./white-label.css";
import "./animated-dashed-border.css";

export function WhiteLabelGraphic() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollLayerRef = useRef<HTMLDivElement>(null);
  const { inView, isActive } = useGraphicScrollMotion({ rootRef, scrollLayerRef });

  const rootClass = [
    "white-label-graphic",
    "white-label-graphic--spin",
    inView ? "white-label-graphic--in-view" : "",
    isActive ? "white-label-graphic--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClass} aria-hidden>
      <div ref={scrollLayerRef} className="white-label-graphic__scroll-layer">
        <div className="white-label-graphic__accent white-label-graphic__reveal white-label-graphic__reveal--delay-600">
          <div className="white-label-graphic__accent-ring">
            <AnimatedDashedCircle className="white-label-graphic__accent-ring-border" />
            <p className="white-label-graphic__accent-text">Compo experience</p>
          </div>
        </div>

        <WhiteLabelTowerRows animated="white-label" />

        <div className="white-label-graphic__banner white-label-graphic__reveal white-label-graphic__reveal--delay-800">
          <AnimatedDashedRect className="white-label-graphic__banner-border" />
          <p className="white-label-graphic__banner-text">
            Component naming standardization
          </p>
        </div>
      </div>
    </div>
  );
}
