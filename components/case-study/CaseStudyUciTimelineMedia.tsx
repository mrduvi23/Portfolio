"use client";

import "@/components/case-study/case-study-uci-timeline.css";
import { useOverflowXPointerPan } from "@/hooks/useOverflowXPointerPan";
import { assets } from "@/lib/assets";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const TIMELINE_NATURAL = { width: 6528, height: 1710 } as const;

type ScrollbarThumb = {
  width: number;
  left: number;
  visible: boolean;
  atStart: boolean;
  atEnd: boolean;
};

function TimelineScrollArrow({ direction }: { direction: "left" | "right" }) {
  const path =
    direction === "left"
      ? "M2.5 8L13.5 3.85V12.15L2.5 8Z"
      : "M13.5 8L2.5 3.85V12.15L13.5 8Z";

  return (
    <svg
      width={7}
      height={8}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="uci-timeline-media__scrollbar-arrow-icon"
    >
      <path
        d={path}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={5.25}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CaseStudyUciTimelineMedia() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollbarDragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
  });
  const [thumb, setThumb] = useState<ScrollbarThumb>({
    width: 0,
    left: 0,
    visible: false,
    atStart: true,
    atEnd: false,
  });

  const updateThumb = useCallback(() => {
    const el = scrollerRef.current;
    const track = trackRef.current;
    if (!el) return;

    const { scrollWidth, clientWidth, scrollLeft } = el;
    const overflow = scrollWidth - clientWidth;

    if (overflow <= 1) {
      setThumb({
        width: 0,
        left: 0,
        visible: false,
        atStart: true,
        atEnd: true,
      });
      return;
    }

    const trackWidth = track?.clientWidth ?? clientWidth;
    const width = (clientWidth / scrollWidth) * trackWidth;
    const maxLeft = trackWidth - width;
    const left = maxLeft * (scrollLeft / overflow);

    setThumb({
      width,
      left,
      visible: true,
      atStart: scrollLeft <= 1,
      atEnd: scrollLeft >= overflow - 1,
    });
  }, []);

  const setScrollLeftFromThumbLeft = useCallback(
    (thumbLeft: number, trackWidth: number, thumbWidth: number) => {
      const el = scrollerRef.current;
      if (!el) return;

      const overflow = el.scrollWidth - el.clientWidth;
      const maxThumbLeft = trackWidth - thumbWidth;
      const ratio = maxThumbLeft > 0 ? thumbLeft / maxThumbLeft : 0;

      el.scrollLeft = ratio * overflow;
    },
    [],
  );

  const scrollByStep = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;

    const step = Math.max(el.clientWidth * 0.2, 96);
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      const horizontal =
        event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY);
      if (horizontal) {
        event.stopPropagation();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", updateThumb, { passive: true });

    const observer = new ResizeObserver(updateThumb);
    observer.observe(el);
    if (trackRef.current) observer.observe(trackRef.current);

    updateThumb();

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", updateThumb);
      observer.disconnect();
    };
  }, [updateThumb]);

  const imagePan = useOverflowXPointerPan(scrollerRef);

  const handleScrollbarPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (event.button !== 0 || !thumb.visible) return;
    if ((event.target as HTMLElement).closest("button")) return;

    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    event.preventDefault();
    event.stopPropagation();

    const trackRect = track.getBoundingClientRect();
    const isThumb = (event.target as HTMLElement).classList.contains(
      "uci-timeline-media__scrollbar-thumb",
    );

    if (!isThumb) {
      const clickX = event.clientX - trackRect.left;
      const maxThumbLeft = trackRect.width - thumb.width;
      const nextLeft = Math.max(
        0,
        Math.min(maxThumbLeft, clickX - thumb.width / 2),
      );
      setScrollLeftFromThumbLeft(nextLeft, trackRect.width, thumb.width);
    }

    scrollbarDragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: scroller.scrollLeft,
    };

    try {
      track.setPointerCapture(event.pointerId);
    } catch {
      /* ignore if capture unavailable */
    }
    track.classList.add("is-dragging");
    railRef.current?.classList.add("is-dragging");
  };

  const handleScrollbarPointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      !scrollbarDragRef.current.active ||
      event.pointerId !== scrollbarDragRef.current.pointerId
    ) {
      return;
    }

    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const overflow = scroller.scrollWidth - scroller.clientWidth;
    const trackWidth = track.clientWidth;
    const thumbWidth =
      (scroller.clientWidth / scroller.scrollWidth) * trackWidth;
    const maxThumbLeft = trackWidth - thumbWidth;
    const scrollPerPx = maxThumbLeft > 0 ? overflow / maxThumbLeft : 0;
    const deltaX = event.clientX - scrollbarDragRef.current.startX;

    scroller.scrollLeft =
      scrollbarDragRef.current.startScroll + deltaX * scrollPerPx;
  };

  const endScrollbarDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !scrollbarDragRef.current.active ||
      event.pointerId !== scrollbarDragRef.current.pointerId
    ) {
      return;
    }

    const track = trackRef.current;
    scrollbarDragRef.current.active = false;

    if (track?.hasPointerCapture(event.pointerId)) {
      try {
        track.releasePointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    }

    track?.classList.remove("is-dragging");
    railRef.current?.classList.remove("is-dragging");
  };

  return (
    <div className="uci-timeline-media" aria-label="UCI project timeline">
      <div
        ref={scrollerRef}
        className="uci-timeline-media__scroller"
        data-lenis-prevent-horizontal
        {...imagePan}
      >
        <div className="uci-timeline-media__track">
          <Image
            src={assets.uciTimeline}
            alt="UCI MVP planification timeline"
            width={TIMELINE_NATURAL.width}
            height={TIMELINE_NATURAL.height}
            className="uci-timeline-media__image"
            sizes="(max-width:763px) 1436px, 1657px"
            quality={95}
            draggable={false}
            onLoad={updateThumb}
          />
        </div>
      </div>

      <div
        className="uci-timeline-media__scrollbar"
        aria-hidden={!thumb.visible}
        data-visible={thumb.visible ? "true" : "false"}
      >
        <div ref={railRef} className="uci-timeline-media__scrollbar-rail">
          <button
            type="button"
            className="uci-timeline-media__scrollbar-arrow uci-timeline-media__scrollbar-arrow--prev"
            aria-label="Scroll timeline left"
            disabled={thumb.atStart}
            onClick={() => scrollByStep(-1)}
          >
            <TimelineScrollArrow direction="left" />
          </button>

          <div
            ref={trackRef}
            className="uci-timeline-media__scrollbar-track"
            onPointerDown={handleScrollbarPointerDown}
            onPointerMove={handleScrollbarPointerMove}
            onPointerUp={endScrollbarDrag}
            onPointerCancel={endScrollbarDrag}
          >
            <div
              className="uci-timeline-media__scrollbar-thumb"
              style={{
                width: thumb.visible ? `${thumb.width}px` : undefined,
                transform: thumb.visible
                  ? `translateX(${thumb.left}px)`
                  : undefined,
              }}
            />
          </div>

          <button
            type="button"
            className="uci-timeline-media__scrollbar-arrow uci-timeline-media__scrollbar-arrow--next"
            aria-label="Scroll timeline right"
            disabled={thumb.atEnd}
            onClick={() => scrollByStep(1)}
          >
            <TimelineScrollArrow direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}
