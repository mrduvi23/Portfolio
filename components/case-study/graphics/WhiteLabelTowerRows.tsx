"use client";

import {
  WhiteLabelTower,
  type WhiteLabelTowerAnimated,
} from "@/components/case-study/graphics/WhiteLabelTower";

const TOWERS_PER_ROW = 4;

function WhiteLabelTowerRow({ animated }: { animated?: WhiteLabelTowerAnimated }) {
  return (
    <div className="white-label-graphic__row">
      {Array.from({ length: TOWERS_PER_ROW }, (_, i) => (
        <WhiteLabelTower key={i} animated={animated} />
      ))}
    </div>
  );
}

/** Cuadrícula 2×4 de torres — parte central del gráfico white label */
export function WhiteLabelTowerRows({ animated = false }: { animated?: WhiteLabelTowerAnimated }) {
  return (
    <div className="white-label-graphic__rows">
      <WhiteLabelTowerRow animated={animated} />
      <WhiteLabelTowerRow animated={animated} />
    </div>
  );
}
