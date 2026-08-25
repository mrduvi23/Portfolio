import { LAYOUT_SETTLE_EVENT } from "@/lib/layout-settle";
import { subscribeParallaxFrame } from "@/lib/parallax-ticker";
import { type RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const DEFAULT_OVERSCAN = 0.07;
const DEFAULT_MAX_SHIFT = 16;

export type CaseStudyParallaxOptions = {
  /** Max vertical travel in px (default 16). */
  maxShift?: number;
  /** Extra layer height as a fraction of the frame (default 0.07). */
  overscan?: number;
};

const ACTIVE_IO: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: "160px 0px 160px 0px",
};

/** Scroll-follow vertical suave para capas de media en case studies. */
export function useCaseStudyParallaxLayer(
  rootRef: RefObject<HTMLElement | null>,
  layerRef: RefObject<HTMLElement | null>,
  options?: CaseStudyParallaxOptions,
) {
  const maxShift = options?.maxShift ?? DEFAULT_MAX_SHIFT;
  const overscan = options?.overscan ?? DEFAULT_OVERSCAN;
  const [isActive, setIsActive] = useState(false);
  const lastMoveYRef = useRef<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsActive(entry?.isIntersecting ?? false);
    }, ACTIVE_IO);

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootRef]);

  const applyParallax = useCallback(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      layer.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const rect = root.getBoundingClientRect();
    if (rect.height < 1) return;

    const viewportHeight = window.innerHeight || 1;
    const scrollRange = viewportHeight + rect.height;
    const scrolled = viewportHeight - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

    const maxSafeOffset = (rect.height * overscan) / 2;
    const shift = Math.min(maxShift, maxSafeOffset);
    const moveY = (progress * 2 - 1) * shift;

    if (lastMoveYRef.current === moveY) return;
    lastMoveYRef.current = moveY;
    layer.style.transform = `translate3d(0, ${moveY.toFixed(2)}px, 0)`;
  }, [rootRef, layerRef, maxShift, overscan]);

  useLayoutEffect(() => {
    if (!isActive) {
      lastMoveYRef.current = null;
      return;
    }

    applyParallax();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return subscribeParallaxFrame(applyParallax);
  }, [applyParallax, isActive]);

  useEffect(() => {
    const onLayoutChange = () => {
      lastMoveYRef.current = null;
      if (isActive) applyParallax();
    };

    window.addEventListener("resize", onLayoutChange, { passive: true });
    window.addEventListener(LAYOUT_SETTLE_EVENT, onLayoutChange);

    const node = rootRef.current;
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
  }, [applyParallax, isActive, rootRef]);
}
