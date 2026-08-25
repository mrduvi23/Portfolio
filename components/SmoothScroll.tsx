"use client";

import { setLenisInstance } from "@/lib/lenis-instance";
import { useEffect, useRef } from "react";

/**
 * Site-wide smooth scroll (wheel / touch) via Lenis.
 * Lenis is loaded only on the client via dynamic `import()` so the server bundle
 * does not reference missing vendor chunks (fixes ENOENT on lenis.js).
 */
export function SmoothScroll() {
  const instanceRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;

    void import("lenis").then((mod) => {
      if (cancelled) return;
      const Lenis = mod.default;
      const lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        anchors: true,
        lerp: 0.12,
      });
      if (cancelled) {
        lenis.destroy();
        return;
      }
      instanceRef.current = lenis;
      setLenisInstance(lenis);
    });

    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return null;
}
