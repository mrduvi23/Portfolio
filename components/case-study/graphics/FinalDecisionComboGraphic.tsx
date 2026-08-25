"use client";

import { CompoExperienceOnlyGraphic } from "@/components/case-study/graphics/CompoExperienceOnlyGraphic";
import { MdsEcosystemGraphic } from "@/components/case-study/graphics/MdsEcosystemGraphic";
import { useGraphicScrollMotion } from "@/hooks/useGraphicScrollMotion";
import { useRef } from "react";
import "@/components/case-study/graphics/final-decision-combo.css";

/**
 * Decisión final: primera estrategia (MDS ecosystem) + cuarta (compo experience only),
 * reducidas y sin etiquetas, unidas por un "+".
 * Fila en ≥764px (centradas verticalmente), columna por debajo.
 * El "+" sigue el mismo scroll-follow que los gráficos.
 */
export function FinalDecisionComboGraphic() {
  const plusRootRef = useRef<HTMLDivElement>(null);
  const plusLayerRef = useRef<HTMLSpanElement>(null);
  useGraphicScrollMotion({ rootRef: plusRootRef, scrollLayerRef: plusLayerRef });

  return (
    <div className="final-decision-combo" aria-hidden>
      <div className="final-decision-combo__item final-decision-combo__item--mds">
        <MdsEcosystemGraphic />
      </div>
      <div ref={plusRootRef} className="final-decision-combo__plus-wrap">
        <span ref={plusLayerRef} className="final-decision-combo__plus">
          +
        </span>
      </div>
      <div className="final-decision-combo__item final-decision-combo__item--compo">
        <CompoExperienceOnlyGraphic />
      </div>
    </div>
  );
}
