"use client";

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { AnimatedDashedCircle } from "@/components/case-study/graphics/AnimatedDashedBorder";
import { MdsHoverFillCircle } from "@/components/case-study/graphics/MdsHoverFillCircle";
import { WhiteLabelTower } from "@/components/case-study/graphics/WhiteLabelTower";
import { useGraphicScrollMotion } from "@/hooks/useGraphicScrollMotion";
import "./animated-dashed-border.css";
import "./base-design-system.css";

const ORBIT_PERIOD_MS = 48_000;
const DRAG_DEG_PER_PX = 0.35;

const ORBIT_TOWERS = [
  { id: "top", angle: -90 },
  { id: "top-right", angle: -45 },
  { id: "right", angle: 0 },
  { id: "bottom-right", angle: 45 },
  { id: "bottom", angle: 90 },
  { id: "bottom-left", angle: 135 },
  { id: "left", angle: 180 },
  { id: "top-left", angle: -135 },
] as const;

export function BaseDesignSystemGraphic() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollLayerRef = useRef<HTMLDivElement>(null);
  const orbitRotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastPointerYRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const onActiveFrame = useCallback((dt: number) => {
    if (!isDraggingRef.current) {
      orbitRotationRef.current += (dt / ORBIT_PERIOD_MS) * 360;
    }
    rootRef.current?.style.setProperty(
      "--bds-orbit-rotation",
      `${orbitRotationRef.current}deg`,
    );
  }, []);

  const { inView, isActive } = useGraphicScrollMotion({
    rootRef,
    scrollLayerRef,
    onActiveFrame,
  });

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    lastPointerXRef.current = event.clientX;
    lastPointerYRef.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = event.clientX - lastPointerXRef.current;
    const deltaY = event.clientY - lastPointerYRef.current;
    lastPointerXRef.current = event.clientX;
    lastPointerYRef.current = event.clientY;
    orbitRotationRef.current += (deltaX + deltaY) * DRAG_DEG_PER_PX;
    rootRef.current?.style.setProperty(
      "--bds-orbit-rotation",
      `${orbitRotationRef.current}deg`,
    );
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const rootClass = [
    "base-ds-graphic",
    "base-ds-graphic--spin",
    inView ? "base-ds-graphic--in-view" : "",
    isActive ? "base-ds-graphic--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const stageClass = [
    "base-ds-graphic__stage",
    isDragging ? "base-ds-graphic__stage--dragging" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClass} aria-hidden>
      <div ref={scrollLayerRef} className="base-ds-graphic__scroll-layer">
        <div
          className={stageClass}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="base-ds-graphic__towers-orbit">
            {ORBIT_TOWERS.map(({ id, angle }) => (
              <div
                key={id}
                className="base-ds-graphic__tower-slot"
                style={{ "--bds-tower-angle": `${angle}deg` } as CSSProperties}
              >
                <div className="base-ds-graphic__patterns-ring white-label-graphic__reveal white-label-graphic__reveal--delay-800">
                  <AnimatedDashedCircle className="white-label-graphic__outer-ring-border" />
                </div>
                <div className="base-ds-graphic__tower-upright">
                  <WhiteLabelTower animated="base-ds" hideOuterRing />
                </div>
              </div>
            ))}
          </div>

          <div className="base-ds-graphic__hub">
            <div className="base-ds-graphic__ring-reveal base-ds-graphic__reveal base-ds-graphic__reveal--delay-200">
              <AnimatedDashedCircle className="base-ds-graphic__ring" />
            </div>
            <p className="base-ds-graphic__label base-ds-graphic__label-compo base-ds-graphic__reveal base-ds-graphic__reveal--delay-200">
              Compo exp.
            </p>
            <MdsHoverFillCircle className="base-ds-graphic__core base-ds-graphic__reveal base-ds-graphic__reveal--delay-0">
              <p className="base-ds-graphic__label base-ds-graphic__label-base">
                base
                <br />
                components
              </p>
            </MdsHoverFillCircle>
          </div>
        </div>
      </div>
    </div>
  );
}
