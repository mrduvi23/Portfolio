"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  DS_AXIS_ARROW_CENTER_Y,
  DS_AXIS_ARROW_HEAD_PATH,
  DS_AXIS_ARROW_TIP_X,
  DS_AXIS_HEAD_INSET,
  DS_AXIS_ORIGIN_Y,
  DS_AXIS_SHAFT_HALF,
  DS_AXIS_SHAFT_WIDTH,
  DS_AXIS_STROKE,
  DS_AXIS_Y_TIP,
} from "@/components/case-study/ds-axis-arrow.constants";

/** Barras + puntas en un mismo SVG (mismas transforms que Figma) */
export function DsAxisArrows() {
  const measureRef = useRef<HTMLDivElement>(null);
  const [plotWidth, setPlotWidth] = useState(0);

  useLayoutEffect(() => {
    const node = measureRef.current;
    if (!node) return;

    const update = () => setPlotWidth(node.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const originX = DS_AXIS_SHAFT_HALF;
  const originY = DS_AXIS_ORIGIN_Y;
  const yTip = DS_AXIS_Y_TIP;
  const yShaftEnd = yTip + DS_AXIS_HEAD_INSET - DS_AXIS_SHAFT_HALF;
  const xTip = plotWidth;
  const xShaftEnd = xTip - DS_AXIS_HEAD_INSET + DS_AXIS_SHAFT_HALF;

  const headUpTransform = `translate(${originX}, ${yTip}) rotate(-90) translate(${-DS_AXIS_ARROW_TIP_X}, ${-DS_AXIS_ARROW_CENTER_Y})`;
  const headRightTransform = `translate(${xTip}, ${originY}) translate(${-DS_AXIS_ARROW_TIP_X}, ${-DS_AXIS_ARROW_CENTER_Y})`;

  return (
    <div ref={measureRef} className="case-study-ds-axis__arrows-measure">
      {plotWidth > 0 ? (
        <svg
          className="case-study-ds-axis__arrows-svg"
          width={plotWidth}
          height={DS_AXIS_ORIGIN_Y}
          fill="none"
          aria-hidden
        >
          <line
            x1={originX}
            y1={originY}
            x2={originX}
            y2={yShaftEnd}
            stroke={DS_AXIS_STROKE}
            strokeWidth={DS_AXIS_SHAFT_WIDTH}
            strokeLinecap="butt"
          />
          <line
            x1={originX}
            y1={originY}
            x2={xShaftEnd}
            y2={originY}
            stroke={DS_AXIS_STROKE}
            strokeWidth={DS_AXIS_SHAFT_WIDTH}
            strokeLinecap="butt"
          />
          <g fill={DS_AXIS_STROKE} transform={headUpTransform}>
            <path d={DS_AXIS_ARROW_HEAD_PATH} />
          </g>
          <g fill={DS_AXIS_STROKE} transform={headRightTransform}>
            <path d={DS_AXIS_ARROW_HEAD_PATH} />
          </g>
        </svg>
      ) : null}
    </div>
  );
}
