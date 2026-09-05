"use client";

import { getLenisInstance } from "@/lib/lenis-instance";
import {
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";

const AXIS_LOCK_PX = 8;
/** dy must beat dx by this factor to lock vertical; otherwise prefer X. */
const VERTICAL_LOCK_RATIO = 1.2;

type Axis = "x" | "y";

type DragState = {
  pointerId: number;
  pointerType: string;
  startX: number;
  startY: number;
  startScrollX: number;
  startScrollY: number;
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
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (Math.max(ax, ay) < AXIS_LOCK_PX) return null;
  return ay > ax * VERTICAL_LOCK_RATIO ? "y" : "x";
}

function pageScrollY() {
  const lenis = getLenisInstance();
  if (lenis && typeof lenis.scroll === "number") return lenis.scroll;
  return window.scrollY;
}

/**
 * Grab-to-pan for overflow-x media.
 *
 * Mouse/pen: pointer events, lock to X immediately.
 *
 * Touch: native touch listeners only (pointer handlers ignore touch).
 * `touch-action: none` plus preventDefault on touchmove lets JS own the
 * whole gesture so one finger-down maps 1:1 to scrollLeft until lift.
 * A clearly vertical gesture forwards 1:1 to Lenis / the page.
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

  const stopLenis = useCallback(() => {
    const lenis = getLenisInstance();
    if (!lenis || stoppedLenisRef.current) return;
    lenis.stop();
    stoppedLenisRef.current = true;
  }, []);

  const applyPanX = useCallback(
    (clientX: number) => {
      const drag = dragRef.current;
      const el = scrollerRef.current;
      if (!drag || drag.axis !== "x" || !el) return;
      el.scrollLeft = drag.startScrollX - (clientX - drag.startX);
    },
    [scrollerRef],
  );

  const applyPanY = useCallback((clientY: number) => {
    const drag = dragRef.current;
    if (!drag || drag.axis !== "y") return;
    const next = drag.startScrollY - (clientY - drag.startY);
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(next, { immediate: true, force: true });
    } else {
      window.scrollTo(0, next);
    }
  }, []);

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

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") return;
      if (event.button !== 0) return;
      const el = scrollerRef.current;
      if (!el) return;

      dragRef.current = {
        pointerId: event.pointerId,
        pointerType: event.pointerType,
        startX: event.clientX,
        startY: event.clientY,
        startScrollX: el.scrollLeft,
        startScrollY: pageScrollY(),
        axis: "x",
      };

      try {
        el.setPointerCapture(event.pointerId);
      } catch {
        /* ignore if capture unavailable */
      }
      el.classList.add("is-dragging");
    },
    [scrollerRef],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") return;
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;
      applyPanX(event.clientX);
    },
    [applyPanX],
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") return;
      endDrag(event.pointerId);
    },
    [endDrag],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      if (!touch) return;

      dragRef.current = {
        pointerId: 1,
        pointerType: "touch",
        startX: touch.clientX,
        startY: touch.clientY,
        startScrollX: el.scrollLeft,
        startScrollY: pageScrollY(),
        axis: null,
      };
    };

    const onTouchMove = (event: TouchEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerType !== "touch") return;

      const touch = event.touches[0];
      if (!touch) return;

      if (event.cancelable) event.preventDefault();

      if (drag.axis === null) {
        const axis = resolveAxis(
          touch.clientX - drag.startX,
          touch.clientY - drag.startY,
        );
        if (!axis) return;

        drag.axis = axis;
        el.classList.add("is-dragging");
        if (axis === "x") stopLenis();
      }

      if (drag.axis === "x") applyPanX(touch.clientX);
      else applyPanY(touch.clientY);
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length > 0) return;
      if (dragRef.current?.pointerType === "touch") endDrag();
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
  }, [applyPanX, applyPanY, endDrag, resumeLenis, scrollerRef, stopLenis]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
    onLostPointerCapture: onPointerUp,
  };
}
