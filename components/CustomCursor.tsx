"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DOT_SIZE = 12;
const DOT_SIZE_HOVER = 24;
const RING_SIZE = 32;
const RING_LERP = 0.14;

const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input:not([type="hidden"]), select, textarea, summary, label[for], [data-cursor-hover]';

function isClickableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (target.closest("[data-cursor-static]")) return false;
  return Boolean(target.closest(CLICKABLE_SELECTOR));
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncEnabled = () => {
      const on = finePointer.matches && !reducedMotion.matches;
      setEnabled(on);
      document.documentElement.classList.toggle("has-custom-cursor", on);
    };

    syncEnabled();
    finePointer.addEventListener("change", syncEnabled);
    reducedMotion.addEventListener("change", syncEnabled);

    return () => {
      finePointer.removeEventListener("change", syncEnabled);
      reducedMotion.removeEventListener("change", syncEnabled);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const setDotPosition = (x: number, y: number) => {
      const dot = dotRef.current;
      if (!dot) return;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
    };

    const setRingPosition = (x: number, y: number) => {
      const el = ringRef.current;
      if (!el) return;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };

    const tick = () => {
      ring.current.x += (pointer.current.x - ring.current.x) * RING_LERP;
      ring.current.y += (pointer.current.y - ring.current.y) * RING_LERP;
      setRingPosition(ring.current.x, ring.current.y);
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      setDotPosition(e.clientX, e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      setHovering(isClickableTarget(e.target));
    };

    const onLeave = () => setVisible(false);

    ring.current.x = pointer.current.x;
    ring.current.y = pointer.current.y;
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled || !mounted) return null;

  const dotSize = hovering ? DOT_SIZE_HOVER : DOT_SIZE;

  return createPortal(
    <div
      aria-hidden
      className="custom-cursor pointer-events-none fixed inset-0 z-[2147483001]"
      data-visible={visible ? "true" : "false"}
    >
      <div
        ref={ringRef}
        className="custom-cursor__ring absolute"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      />
      <div
        ref={dotRef}
        className="custom-cursor__dot absolute"
        style={{
          width: dotSize,
          height: dotSize,
          transition:
            "width 0.25s cubic-bezier(0.44, 0, 0.56, 1), height 0.25s cubic-bezier(0.44, 0, 0.56, 1)",
        }}
      />
    </div>,
    document.body,
  );
}
