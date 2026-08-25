"use client";

import { LAYOUT_SETTLE_EVENT } from "@/lib/layout-settle";
import { subscribeParallaxFrame } from "@/lib/parallax-ticker";
import type { ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/** Inset 1px stroke on top of media — #000 at 5% (see --color-card-inset-border in globals). */
export const projectCardInsetStrokeClass =
  "pointer-events-none absolute inset-0 z-[3] shadow-[inset_0_0_0_1px_var(--color-card-inset-border)]";

/** Zoom in slow on hover/focus (ease-out); zoom out fast (300ms) when leaving. */
export const projectCardImageMotionClass =
  "object-cover transition-transform duration-300 ease-out group-hover:duration-[1.5s] group-hover:scale-[1.1] group-focus-visible:duration-[1.5s] group-focus-visible:scale-[1.1]";

const DEFAULT_INTENSITY = 20;
const INTENSITY_MIN = 5;
const INTENSITY_MAX = 100;
/** Image follows scroll-linked target at 90% gain → ~10% slower than full Framer coupling. */
const IMAGE_VS_SCROLL = 0.9;
/** Extra vertical image area to avoid exposing empty background during parallax. */
const IMAGE_OVERSCAN = 1.3;

const ACTIVE_IO: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: "160px 0px 160px 0px",
};

type ProjectCardParallaxFrameProps = {
  frameClass: string;
  isolate?: boolean;
  photo: ReactNode;
  overlay?: ReactNode;
  /**
   * Same role as Framer `ParallaxImage` intensity (property control 5–100, default 20).
   * `moveY = (rect.top / viewportHeight) * intensity * -5 * 0.9` (image ~10% slower than scroll).
   */
  intensity?: number;
};

/**
 * Project card media: Framer ParallaxImage-style scroll on the photo layer
 * (progress = rect.top / innerHeight, translateY in px, image height 105%).
 */
export function ProjectCardParallaxFrame({
  frameClass,
  isolate = false,
  photo,
  overlay,
  intensity = DEFAULT_INTENSITY,
}: ProjectCardParallaxFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const lastMoveYRef = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsActive(entry?.isIntersecting ?? false);
    }, ACTIVE_IO);

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const applyParallax = useCallback(() => {
    const container = containerRef.current;
    const imageLayer = imageLayerRef.current;
    if (!container || !imageLayer) return;

    const rect = container.getBoundingClientRect();
    if (rect.height < 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      imageLayer.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const clamped = Math.min(
      INTENSITY_MAX,
      Math.max(INTENSITY_MIN, intensity ?? DEFAULT_INTENSITY),
    );

    const viewportHeight = window.innerHeight || 1;
    const progress = rect.top / viewportHeight;
    const rawMoveY = progress * clamped * -5 * IMAGE_VS_SCROLL;
    const maxSafeOffset = (rect.height * (IMAGE_OVERSCAN - 1)) / 2;
    const moveY = Math.max(-maxSafeOffset, Math.min(maxSafeOffset, rawMoveY));

    if (lastMoveYRef.current === moveY) return;
    lastMoveYRef.current = moveY;

    imageLayer.style.transform = `translate3d(0, ${moveY}px, 0)`;
  }, [intensity]);

  useLayoutEffect(() => {
    if (!isActive) {
      lastMoveYRef.current = null;
      return;
    }

    applyParallax();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    return subscribeParallaxFrame(applyParallax);
  }, [applyParallax, isActive]);

  useEffect(() => {
    const onLayoutChange = () => {
      lastMoveYRef.current = null;
      if (isActive) applyParallax();
    };

    window.addEventListener("resize", onLayoutChange, { passive: true });
    window.addEventListener(LAYOUT_SETTLE_EVENT, onLayoutChange);

    const node = containerRef.current;
    let ro: ResizeObserver | undefined;
    if (node && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(onLayoutChange);
      ro.observe(node);
    }

    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (isActive) applyParallax();
      });
    }

    return () => {
      window.removeEventListener("resize", onLayoutChange);
      window.removeEventListener(LAYOUT_SETTLE_EVENT, onLayoutChange);
      ro?.disconnect();
    };
  }, [applyParallax, isActive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden transition-opacity duration-200 group-hover:opacity-90 ${isolate ? "isolate " : ""}${frameClass}`}
    >
      <div
        ref={imageLayerRef}
        className="absolute left-0 w-full will-change-transform"
        style={{
          top: `${((1 - IMAGE_OVERSCAN) / 2) * 100}%`,
          height: `${IMAGE_OVERSCAN * 100}%`,
        }}
      >
        <div className="absolute inset-0">{photo}</div>
      </div>
      {overlay ?? null}
      <div className={projectCardInsetStrokeClass} aria-hidden />
    </div>
  );
}
