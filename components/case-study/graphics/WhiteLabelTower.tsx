"use client";

import { AnimatedDashedCircle } from "@/components/case-study/graphics/AnimatedDashedBorder";
import { MdsHoverFillCircle } from "@/components/case-study/graphics/MdsHoverFillCircle";

export type WhiteLabelTowerAnimated = false | "white-label" | "base-ds" | "compo-only";

const STAGGER_DELAYS: Record<
  Exclude<WhiteLabelTowerAnimated, false>,
  { white: string; grey: string; outer: string }
> = {
  "white-label": { white: "0", grey: "200", outer: "400" },
  "base-ds": { white: "400", grey: "600", outer: "800" },
  "compo-only": { white: "400", grey: "600", outer: "800" },
};

const reveal = (animated: WhiteLabelTowerAnimated, delay: string) =>
  animated ? `white-label-graphic__reveal white-label-graphic__reveal--delay-${delay}` : "";

type WhiteLabelTowerProps = {
  animated?: WhiteLabelTowerAnimated;
  /** Sin anillo Patterns exterior — lo renderiza el padre (p. ej. órbita base-ds) */
  hideOuterRing?: boolean;
};

/** Torre patterns / compon. / foundat. — segunda y tercera estrategia */
export function WhiteLabelTower({ animated = false, hideOuterRing = false }: WhiteLabelTowerProps) {
  const delays = animated ? STAGGER_DELAYS[animated] : null;

  return (
    <div className="white-label-graphic__tower">
      <div className="white-label-graphic__outer-ring">
        {!hideOuterRing && (
          <div
            className={`white-label-graphic__outer-ring-reveal ${delays ? reveal(animated, delays.outer) : ""}`}
          >
            <AnimatedDashedCircle className="white-label-graphic__outer-ring-border" />
          </div>
        )}

        <MdsHoverFillCircle
          className={`white-label-graphic__grey ${delays ? reveal(animated, delays.grey) : ""}`}
        >
          <p
            className={`white-label-graphic__label white-label-graphic__label-patterns ${delays ? reveal(animated, delays.outer) : ""}`}
          >
            Patterns
          </p>
          <p
            className={`white-label-graphic__label white-label-graphic__label-compon ${delays ? reveal(animated, delays.grey) : ""}`}
          >
            Compon.
          </p>
          <MdsHoverFillCircle
            className={`white-label-graphic__white ${delays ? reveal(animated, delays.white) : ""}`}
          >
            <p
              className={`white-label-graphic__label white-label-graphic__label-foundat ${delays ? reveal(animated, delays.white) : ""}`}
            >
              Foundat.
            </p>
          </MdsHoverFillCircle>
        </MdsHoverFillCircle>
      </div>
    </div>
  );
}
