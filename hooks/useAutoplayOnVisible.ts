"use client";

import { useEffect, type RefObject } from "react";

type UseAutoplayOnVisibleOptions = {
  /** When true, visibility changes will not call play(). */
  userPausedRef: RefObject<boolean>;
  rootMargin?: string;
  threshold?: number | number[];
  /** Re-bind the observer when the underlying video element remounts. */
  refreshKey?: unknown;
};

/**
 * Plays the video when it enters the viewport; pauses when it leaves.
 * Respects an explicit user pause so scrolling back in does not override it.
 */
export function useAutoplayOnVisible(
  rootRef: RefObject<HTMLElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  {
    userPausedRef,
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.35,
    refreshKey,
  }: UseAutoplayOnVisibleOptions,
) {
  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          if (userPausedRef.current) return;
          void video.play().catch(() => {});
          return;
        }

        video.pause();
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef, videoRef, userPausedRef, rootMargin, threshold, refreshKey]);
}
