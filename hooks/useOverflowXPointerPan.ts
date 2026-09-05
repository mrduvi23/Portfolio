"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useRef,
} from "react";

type DragState = {
  pointerId: number;
  startX: number;
  startScrollX: number;
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
 * Desktop grab-to-pan for overflow-x media.
 * Touch is native overflow-x (`touch-action: pan-x` on the scroller) so iOS
 * can compositor-scroll 1:1 with the finger. Pointer handlers ignore touch.
 */
export function useOverflowXPointerPan(
  scrollerRef: RefObject<HTMLDivElement | null>,
) {
  const dragRef = useRef<DragState | null>(null);

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") return;
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;

      const el = scrollerRef.current;
      dragRef.current = null;
      releaseCapture(el, event.pointerId);
      el?.classList.remove("is-dragging");
    },
    [scrollerRef],
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") return;
      if (event.button !== 0) return;
      const el = scrollerRef.current;
      if (!el) return;

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startScrollX: el.scrollLeft,
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
      const el = scrollerRef.current;
      if (!drag || !el || event.pointerId !== drag.pointerId) return;
      el.scrollLeft = drag.startScrollX - (event.clientX - drag.startX);
    },
    [scrollerRef],
  );

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onLostPointerCapture: endDrag,
  };
}
