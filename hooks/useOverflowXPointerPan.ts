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
  pointerType: string;
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

function resolveAxis(dx: number, dy: number): Axis | null {
  if (Math.max(Math.abs(dx), Math.abs(dy)) < AXIS_LOCK_PX) return null;
  return Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
}

/**
 * Grab-to-pan for overflow-x media.
 *
 * Mouse/pen lock to X immediately via pointer events.
 *
 * Touch keeps `touch-action: pan-y` so vertical page scroll stays native.
 * Horizontal pan is driven from non-passive `touchmove` after axis lock —
 * not from `pointermove`. With `pan-y`, the browser fires `pointercancel`
 * as soon as it considers native scroll; pointer events then stop, but
 * touch events continue. Treating cancel as "end drag" is what made
 * horizontal swipe feel broken.
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
    (pointerId: number, pointerType: string) => {
      const el = scrollerRef.current;
      const drag = dragRef.current;
      if (!el || !drag) return;

      drag.axis = "x";

      // Capture only for mouse/pen so the drag can leave the element.
      // Touch capture plus pan-y triggers pointercancel; touch events
      // already stay targeted to the touchstart element for the gesture.
      if (pointerType !== "touch") {
        try {
          el.setPointerCapture(pointerId);
        } catch {
          /* ignore if capture unavailable */
        }
      }

      el.classList.add("is-dragging");

      if (pointerType === "touch") {
        const lenis = getLenisInstance();
        if (lenis) {
          lenis.stop();
          stoppedLenisRef.current = true;
        }
      }
    },
    [scrollerRef],
  );

  const applyPanX = useCallback(
    (clientX: number) => {
      const drag = dragRef.current;
      const el = scrollerRef.current;
      if (!drag || drag.axis !== "x" || !el) return;
      el.scrollLeft = drag.startScroll - (clientX - drag.startX);
    },
    [scrollerRef],
  );

  const endDrag = useCallback(
    (pointerId?: number) => {
      const drag = dragRef.current;
      if (!drag) return;
      if (pointerId !== undefined && pointerId !== drag.pointerId) return;

      const el = scrollerRef.current;
      dragRef.current = null;
      releaseCapture(el, drag.pointerId);
      el?.classList.remove("is-dragging");
      resumeLenis();
    },
    [resumeLenis, scrollerRef],
  );

  const abandonIfVertical = useCallback((dx: number, dy: number) => {
    const axis = resolveAxis(dx, dy);
    if (axis === "y") {
      dragRef.current = null;
      return true;
    }
    return false;
  }, []);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      const el = scrollerRef.current;
      if (!el) return;

      const drag: DragState = {
        pointerId: event.pointerId,
        pointerType: event.pointerType,
        startX: event.clientX,
        startY: event.clientY,
        startScroll: el.scrollLeft,
        axis: event.pointerType === "touch" ? null : "x",
      };
      dragRef.current = drag;

      if (drag.axis === "x") {
        lockToX(event.pointerId, event.pointerType);
      }
    },
    [lockToX, scrollerRef],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;

      if (drag.axis === null) {
        const dx = event.clientX - drag.startX;
        const dy = event.clientY - drag.startY;
        if (abandonIfVertical(dx, dy)) return;
        if (resolveAxis(dx, dy) !== "x") return;
        lockToX(event.pointerId, event.pointerType);
      }

      applyPanX(event.clientX);
    },
    [abandonIfVertical, applyPanX, lockToX],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      if (!touch) return;

      dragRef.current = {
        pointerId: dragRef.current?.pointerId ?? 1,
        pointerType: "touch",
        startX: touch.clientX,
        startY: touch.clientY,
        startScroll: el.scrollLeft,
        axis: null,
      };
    };

    const onTouchMove = (event: TouchEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerType !== "touch") return;

      const touch = event.touches[0];
      if (!touch) return;

      if (drag.axis === null) {
        const dx = touch.clientX - drag.startX;
        const dy = touch.clientY - drag.startY;
        if (abandonIfVertical(dx, dy)) return;
        if (resolveAxis(dx, dy) !== "x") return;
        lockToX(drag.pointerId, "touch");
      }

      if (drag.axis === "x") {
        if (event.cancelable) event.preventDefault();
        applyPanX(touch.clientX);
      }
    };

    const onTouchEnd = () => {
      if (dragRef.current?.pointerType === "touch") {
        endDrag();
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      resumeLenis();
    };
  }, [abandonIfVertical, applyPanX, endDrag, lockToX, resumeLenis, scrollerRef]);

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") return;
      endDrag(event.pointerId);
    },
    [endDrag],
  );

  const onPointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      // Touch + pan-y: the UA cancels pointers when it considers native
      // scroll. Keep the drag; touchmove continues and owns the pan.
      if (event.pointerType === "touch") {
        releaseCapture(scrollerRef.current, event.pointerId);
        return;
      }
      endDrag(event.pointerId);
    },
    [endDrag, scrollerRef],
  );

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onLostPointerCapture: onPointerUp,
  };
}
