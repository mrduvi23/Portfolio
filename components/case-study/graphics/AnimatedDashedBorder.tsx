"use client";

import { type CSSProperties, useLayoutEffect, useRef, useState } from "react";
import "./animated-dashed-border.css";

type AnimatedDashedCircleProps = {
  className?: string;
};

/** Anillo circular: la forma fija, los dashes avanzan por el perímetro */
export function AnimatedDashedCircle({ className }: AnimatedDashedCircleProps) {
  return (
    <svg
      className={`animated-dashed-border ${className ?? ""}`.trim()}
      viewBox="0 0 100 100"
      aria-hidden
    >
      <circle className="animated-dashed-border__path" cx="50" cy="50" r="49" pathLength={1} />
    </svg>
  );
}

type AnimatedDashedRectProps = {
  className?: string;
};

/** Rectángulo: perímetro medido en px para dashes uniformes */
export function AnimatedDashedRect({ className }: AnimatedDashedRectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState({ w: 100, h: 40 });

  useLayoutEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;

    const update = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setBox({ w: width, h: height });
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  const inset = 0.5;
  const d = `M ${inset} ${inset} H ${box.w - inset} V ${box.h - inset} H ${inset} Z`;
  const perimeter = 2 * (box.w + box.h);

  return (
    <svg
      ref={svgRef}
      className={`animated-dashed-border ${className ?? ""}`.trim()}
      viewBox={`0 0 ${box.w} ${box.h}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ "--dash-perimeter": `${perimeter}px` } as CSSProperties}
      aria-hidden
    >
      <path className="animated-dashed-border__path animated-dashed-border__path--rect" d={d} />
    </svg>
  );
}
