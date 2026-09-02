"use client";

import { getLenisInstance } from "@/lib/lenis-instance";
import {
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";

const AXIS_LOCK_PX = 6;

type Axis = "x" | "y";

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  startScroll: number;
  axis: Axis | null;
};

function releaseCapture(el: HTMLDivElement | null, pointerId: number) {
  if (!el?.hasPointerCapture(pointerId)) return;
  try {
    el.releasePointerCapture(pointerId);
  } catch {
    /* ignore if the pointer was already released */
  }
}

/**
 * Grab-to-pan for overflow-x media.
 * Mouse/pen lock to X immediately. Touch waits for axis: horizontal pans the
 * scroller; vertical is left to native scroll (touch-action: pan-y on the scroller).
 */
export function useOverflowXPointerPan(
  scrollerRef: RefObject<HTMLDivElement | null>,
) {
  const dragRef = useRef<DragState | null>(null);
  const stoppedLenisRef = useRef(false);

  const resumeLenis = useCallback(() => {
    if (!stoppedLenisRef.current) return;
    stoppedLenisRef.current = false;
    getLenisInstance()?.start();
  }, []);

  const lockToX = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, drag: DragState) => {
      const el = scrollerRef.current;
      if (!el) return;

      drag.axis = "x";
      try {
        el.setPointerCapture(event.pointerId);
      } catch {
        /* ignore if capture unavailable */
      }
      el.classList.add("is-dragging");

      const lenis = getLenisInstance();
      if (lenis && event.pointerType === "touch") {
        lenis.stop();
        stoppedLenisRef.current = true;
      }
    },
    [scrollerRef],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;

      const el = scrollerRef.current;
      dragRef.current = null;
      releaseCapture(el, event.pointerId);
      el?.classList.remove("is-dragging");
      resumeLenis();
    },
    [resumeLenis, scrollerRef],
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      const el = scrollerRef.current;
      if (!el) return;

      const drag: DragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startScroll: el.scrollLeft,
        axis: event.pointerType === "touch" ? null : "x",
      };
      dragRef.current = drag;

      if (drag.axis === "x") {
        lockToX(event, drag);
      }
    },
    [lockToX, scrollerRef],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;

      const el = scrollerRef.current;
      if (!el) return;

      if (drag.axis === null) {
        const dx = event.clientX - drag.startX;
        const dy = event.clientY - drag.startY;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < AXIS_LOCK_PX) return;

        if (Math.abs(dx) >= Math.abs(dy)) {
          lockToX(event, drag);
        } else {
          // Vertical intent: release so native pan-y / Lenis can scroll the page.
          dragRef.current = null;
          return;
        }
      }

      if (drag.axis === "x") {
        el.scrollLeft = drag.startScroll - (event.clientX - drag.startX);
      }
    },
    [lockToX, scrollerRef],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onTouchMove = (event: TouchEvent) => {
      if (dragRef.current?.axis !== "x" || !event.cancelable) return;
      event.preventDefault();
    };

    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("touchmove", onTouchMove);
      resumeLenis();
    };
  }, [resumeLenis, scrollerRef]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onLostPointerCapture: endDrag,
  };
}
