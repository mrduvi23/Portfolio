"use client";

import { CompoAccentTower } from "@/components/case-study/graphics/CompoAccentTower";
import { WhiteLabelTowerRows } from "@/components/case-study/graphics/WhiteLabelTowerRows";
import { useGraphicScrollMotion } from "@/hooks/useGraphicScrollMotion";
import { useRef } from "react";
import "./animated-dashed-border.css";
import "./compo-experience-only.css";

/** Cuarta estrategia — torre compo destacada + filas 2×4 de torres */
export function CompoExperienceOnlyGraphic() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollLayerRef = useRef<HTMLDivElement>(null);
  const { inView, isActive } = useGraphicScrollMotion({ rootRef, scrollLayerRef });

  const rootClass = [
    "compo-only-graphic",
    "compo-only-graphic--spin",
    inView ? "compo-only-graphic--in-view" : "",
    isActive ? "compo-only-graphic--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClass} aria-hidden>
      <div ref={scrollLayerRef} className="compo-only-graphic__scroll-layer">
        <CompoAccentTower animated />
        <WhiteLabelTowerRows animated="compo-only" />
      </div>
    </div>
  );
}
