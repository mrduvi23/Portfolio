import { LAYOUT_SETTLE_EVENT } from "@/lib/layout-settle";
import {
  subscribeParallaxFrame,
  subscribeParallaxLoop,
} from "@/lib/parallax-ticker";
import {
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const SCROLL_FOLLOW_SHIFT = 32;

const REVEAL_IO: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -8% 0px",
};

/** Margen extra para activar/desactivar el loop antes de entrar o salir del viewport */
const ACTIVE_IO: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: "160px 0px 160px 0px",
};

type UseGraphicScrollMotionOptions = {
  rootRef: RefObject<HTMLElement | null>;
  scrollLayerRef: RefObject<HTMLElement | null>;
  /** Llamado solo mientras el gráfico está cerca del viewport (p. ej. órbita JS) */
  onActiveFrame?: (dt: number) => void;
};

/**
 * Scroll-follow + visibilidad para gráficos del case study.
 * Solo suscribe al rAF compartido mientras el gráfico está activo en pantalla.
 */
export function useGraphicScrollMotion({
  rootRef,
  scrollLayerRef,
  onActiveFrame,
}: UseGraphicScrollMotionOptions) {
  const [inView, setInView] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const lastScrollYRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const onActiveFrameRef = useRef(onActiveFrame);
  onActiveFrameRef.current = onActiveFrame;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let revealed = false;
    const revealObserver = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !revealed) {
        revealed = true;
        setInView(true);
        revealObserver.disconnect();
      }
    }, REVEAL_IO);

    const activeObserver = new IntersectionObserver(([entry]) => {
      setIsActive(entry?.isIntersecting ?? false);
    }, ACTIVE_IO);

    revealObserver.observe(el);
    activeObserver.observe(el);

    return () => {
      revealObserver.disconnect();
      activeObserver.disconnect();
    };
  }, [rootRef]);

  const tickFrame = useCallback(() => {
    const root = rootRef.current;
    const scrollLayer = scrollLayerRef.current;
    if (!root) return;

    const reducedMotion = reducedMotionRef.current;

    if (onActiveFrameRef.current && !reducedMotion) {
      const now = performance.now();
      const last = lastTickTimeRef.current ?? now;
      lastTickTimeRef.current = now;
      onActiveFrameRef.current(Math.min(now - last, 48));
    }

    if (!scrollLayer) return;

    if (reducedMotion) {
      scrollLayer.style.transform = "";
      lastScrollYRef.current = null;
      return;
    }

    const frame = root.parentElement ?? root;
    const rect = frame.getBoundingClientRect();
    if (rect.height < 1) return;

    const viewportHeight = window.innerHeight || 1;
    const scrollRange = viewportHeight + rect.height;
    const scrolled = viewportHeight - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollRange));
    const moveY = (progress * 2 - 1) * SCROLL_FOLLOW_SHIFT;

    if (lastScrollYRef.current !== moveY) {
      lastScrollYRef.current = moveY;
      scrollLayer.style.transform = `translate3d(0, ${moveY.toFixed(2)}px, 0)`;
    }
  }, [rootRef, scrollLayerRef]);

  useLayoutEffect(() => {
    if (!isActive) {
      lastTickTimeRef.current = null;
      return;
    }

    tickFrame();
    if (reducedMotionRef.current) return;

    const subscribe = onActiveFrameRef.current
      ? subscribeParallaxLoop
      : subscribeParallaxFrame;

    return subscribe(tickFrame);
  }, [tickFrame, isActive]);

  useEffect(() => {
    const onLayoutChange = () => {
      lastScrollYRef.current = null;
      lastTickTimeRef.current = null;
      if (isActive) tickFrame();
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
        if (isActive) tickFrame();
      });
    }

    return () => {
      window.removeEventListener("resize", onLayoutChange);
      window.removeEventListener(LAYOUT_SETTLE_EVENT, onLayoutChange);
      ro?.disconnect();
    };
  }, [tickFrame, isActive, rootRef]);

  return { inView, isActive };
}
