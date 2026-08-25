"use client";

import { useEffect, useState, type RefObject } from "react";

type UseLazyMediaLoadOptions = {
  /** How far ahead of the viewport to start loading. */
  rootMargin?: string;
  threshold?: number | number[];
  /** When false, never arms the loader (keeps media unloaded). */
  enabled?: boolean;
};

/**
 * Arms once when `rootRef` nears the viewport, then stays true.
 * Use to defer setting `<video src>` / heavy media until needed.
 */
export function useLazyMediaLoad(
  rootRef: RefObject<HTMLElement | null>,
  {
    rootMargin = "600px 0px",
    threshold = 0,
    enabled = true,
  }: UseLazyMediaLoadOptions = {},
): boolean {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!enabled || shouldLoad) return;

    const root = rootRef.current;
    if (!root) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef, rootMargin, threshold, enabled, shouldLoad]);

  return shouldLoad;
}
