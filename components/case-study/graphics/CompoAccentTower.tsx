"use client";

import { AnimatedDashedCircle } from "@/components/case-study/graphics/AnimatedDashedBorder";
import { MdsHoverFillCircle } from "@/components/case-study/graphics/MdsHoverFillCircle";

const reveal = (animated: boolean, delay: string) =>
  animated ? `compo-only-graphic__reveal compo-only-graphic__reveal--delay-${delay}` : "";

type CompoAccentTowerProps = {
  animated?: boolean;
};

/** Torre destacada — cuarta estrategia (variante compo experience) */
export function CompoAccentTower({ animated = false }: CompoAccentTowerProps) {
  return (
    <div className="compo-only-accent">
      <div className="compo-only-accent__outer-ring">
        <div className={`compo-only-accent__outer-reveal ${reveal(animated, "400")}`}>
          <AnimatedDashedCircle className="compo-only-accent__outer-border" />
          <p className="compo-only-accent__label compo-only-accent__label-compo">Compo exp.</p>
        </div>
        <MdsHoverFillCircle className={`compo-only-accent__mid ${reveal(animated, "200")}`}>
          <p className="compo-only-accent__label compo-only-accent__label-compon">Compon.</p>
          <MdsHoverFillCircle className={`compo-only-accent__core ${reveal(animated, "0")}`}>
            <p className="compo-only-accent__label compo-only-accent__label-foundat">Foundat.</p>
          </MdsHoverFillCircle>
        </MdsHoverFillCircle>
      </div>
    </div>
  );
}
