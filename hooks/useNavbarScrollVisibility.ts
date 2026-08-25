"use client";

import { getLenisInstance } from "@/lib/lenis-instance";
import { useEffect, useRef, useState } from "react";

const TOP_REVEAL_PX = 24;

type Options = {
  /** When false, the bar stays visible (e.g. mobile menu open). */
  enabled?: boolean;
};

/**
 * Hide on scroll down, show on scroll up. Uses Lenis when available (smooth scroll).
 */
export function useNavbarScrollVisibility(options: Options = {}) {
  const { enabled = true } = options;
  const [visible, setVisible] = useState(true);
  const visibleRef = useRef(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      visibleRef.current = true;
      setVisible(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const setBarVisible = (next: boolean) => {
      if (visibleRef.current === next) return;
      visibleRef.current = next;
      setVisible(next);
    };

    let unsubscribeLenis: (() => void) | undefined;
    let pollId = 0;
    let usingLenis = false;

    const bindLenis = () => {
      const lenis = getLenisInstance();
      if (!lenis) return false;

      unsubscribeLenis = lenis.on("scroll", (instance) => {
        const y = instance.animatedScroll;

        if (y <= TOP_REVEAL_PX) {
          setBarVisible(true);
          return;
        }

        if (instance.direction === 1) {
          setBarVisible(false);
        } else if (instance.direction === -1) {
          setBarVisible(true);
        }
      });

      usingLenis = true;
      return true;
    };

    if (!bindLenis()) {
      pollId = window.setInterval(() => {
        if (bindLenis()) window.clearInterval(pollId);
      }, 50);
    }

    lastYRef.current = window.scrollY;
    const onWindowScroll = () => {
      if (usingLenis) return;

      const y = window.scrollY;
      const delta = y - lastYRef.current;
      lastYRef.current = y;

      if (y <= TOP_REVEAL_PX) {
        setBarVisible(true);
        return;
      }
      if (delta > 4) setBarVisible(false);
      else if (delta < -4) setBarVisible(true);
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });

    return () => {
      window.clearInterval(pollId);
      unsubscribeLenis?.();
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, [enabled]);

  return visible;
}
