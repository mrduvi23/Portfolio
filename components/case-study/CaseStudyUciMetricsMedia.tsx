"use client";

import "@/components/case-study/case-study-uci-metrics.css";
import { assets } from "@/lib/assets";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

const DESIGN_COL_W = 453;
const FRAME_H = 376;
const INSET = 40;

const METRICS_SPECS = {
  metrics1: {
    src: assets.uciMetrics1,
    alt: "UCI press room most visited pages metrics",
    natural: { width: 986, height: 676 },
    imageHeight: 338,
  },
  metrics2: {
    src: assets.uciMetrics2,
    alt: "UCI press room device breakdown metrics",
    natural: { width: 1200, height: 678 },
    imageHeight: 339,
  },
} as const;

export type UciMetricsVariant = keyof typeof METRICS_SPECS;

export function CaseStudyUciMetricsMedia({
  variant,
}: {
  variant: UciMetricsVariant;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const spec = METRICS_SPECS[variant];

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const updateScale = () => {
      setScale(Math.min(1, el.clientWidth / DESIGN_COL_W));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const frameStyle = {
    "--uci-metrics-image-h": spec.imageHeight,
    "--uci-metrics-inset": `${INSET * scale}px`,
    height: `${FRAME_H * scale}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`case-study-uci-metrics case-study-uci-metrics--${variant}`}
      style={frameStyle}
      aria-label={spec.alt}
    >
      <div className="case-study-uci-metrics__image-wrap">
        <Image
          src={spec.src}
          alt={spec.alt}
          width={spec.natural.width}
          height={spec.natural.height}
          className="case-study-uci-metrics__image"
          style={{ height: spec.imageHeight * scale }}
          sizes="(max-width:763px) calc(100vw - 80px), 456px"
          quality={95}
          draggable={false}
        />
      </div>
    </div>
  );
}
