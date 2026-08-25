"use client";

import { MdsHoverFillCircle } from "@/components/case-study/graphics/MdsHoverFillCircle";
import { useGraphicScrollMotion } from "@/hooks/useGraphicScrollMotion";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import "./mds-ecosystem.css";

const ORBIT_PERIOD_MS = 48_000;
const DRAG_DEG_PER_PX = 0.35;

const PATTERN_UNITS = [
  { id: "top", angle: -90 },
  { id: "top-right", angle: -45 },
  { id: "right", angle: 0 },
  { id: "bottom-right", angle: 45 },
  { id: "bottom", angle: 90 },
  { id: "bottom-left", angle: 135 },
  { id: "left", angle: 180 },
  { id: "top-left", angle: -135 },
] as const;

function PatternsBrandUnit({ angle }: { angle: number }) {
  return (
    <div
      className="mds-ecosystem__patterns-unit"
      style={{ "--mds-unit-angle": `${angle}deg` } as CSSProperties}
    >
      <div className="mds-ecosystem__patterns-reveal mds-ecosystem__reveal mds-ecosystem__reveal--delay-600">
        <div className="mds-ecosystem__patterns-rotate">
          <div className="mds-ecosystem__ring mds-ecosystem__ring--dashed mds-ecosystem__patterns" />
        </div>
      </div>
      <MdsHoverFillCircle
        className="mds-ecosystem__ring mds-ecosystem__ring--solid mds-ecosystem__brand-comp mds-ecosystem__reveal mds-ecosystem__reveal--delay-400"
      />
      <div className="mds-ecosystem__unit-labels">
        <p className="mds-ecosystem__unit-label mds-ecosystem__label-brand mds-ecosystem__reveal mds-ecosystem__reveal--delay-400">
          brand
          <br />
          components
        </p>
        <p className="mds-ecosystem__unit-label mds-ecosystem__label-patterns mds-ecosystem__reveal mds-ecosystem__reveal--delay-600">
          Patterns
        </p>
      </div>
    </div>
  );
}

/** MDS ecosystem graphic — primera estrategia. */
export function MdsEcosystemGraphic() {
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
      "--mds-orbit-rotation",
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
      "--mds-orbit-rotation",
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
    "mds-ecosystem",
    "mds-ecosystem-orbit-spin",
    inView ? "mds-ecosystem--in-view" : "",
    isActive ? "mds-ecosystem--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const stageClass = [
    "mds-ecosystem__stage",
    isDragging ? "mds-ecosystem__stage--dragging" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={rootRef} className={rootClass} aria-hidden>
      <div
        className={stageClass}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={scrollLayerRef} className="mds-ecosystem__scroll-layer">
          <div
            className="mds-ecosystem__ring mds-ecosystem__ring--solid mds-ecosystem__compo-exp-externo mds-ecosystem__reveal mds-ecosystem__reveal--delay-1000"
          />
          <div
            className="mds-ecosystem__compo-interno-wrap mds-ecosystem__reveal mds-ecosystem__reveal--delay-800"
          >
            <div
              className="mds-ecosystem__ring mds-ecosystem__ring--dashed mds-ecosystem__compo-exp-interno"
            />
          </div>

          <p className="mds-ecosystem__compo-experience mds-ecosystem__reveal mds-ecosystem__reveal--delay-1000">
            Compo Experience
          </p>

          <div className="mds-ecosystem__hub">
            <div className="mds-ecosystem__core-comp mds-ecosystem__reveal mds-ecosystem__reveal--delay-200" />

            <div className="mds-ecosystem__patterns-orbit">
              {PATTERN_UNITS.map(({ id, angle }) => (
                <PatternsBrandUnit key={id} angle={angle} />
              ))}
            </div>

            <MdsHoverFillCircle className="mds-ecosystem__foundation mds-ecosystem__reveal mds-ecosystem__reveal--delay-0" />

            <p className="mds-ecosystem__hub-label mds-ecosystem__label-foundations mds-ecosystem__reveal mds-ecosystem__reveal--delay-0">
              Foundations
            </p>
            <p className="mds-ecosystem__hub-label mds-ecosystem__label-core mds-ecosystem__reveal mds-ecosystem__reveal--delay-200">
              <span className="mds-ecosystem__label-core-full">core components</span>
              <span className="mds-ecosystem__label-core-short">core compon.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
