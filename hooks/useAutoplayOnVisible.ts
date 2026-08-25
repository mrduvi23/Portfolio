"use client";

import { useEffect, type RefObject } from "react";

type UseAutoplayOnVisibleOptions = {
  /** When true, visibility changes will not call play(). */
  userPausedRef: RefObject<boolean>;
  rootMargin?: string;
  threshold?: number | number[];
  /** Re-bind the observer when the underlying video element remounts. */
  refreshKey?: unknown;
  /**
   * When false, skip observing (e.g. video `src` not set yet).
   * Defaults to true.
   */
  ready?: boolean;
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
    ready = true,
  }: UseAutoplayOnVisibleOptions,
) {
  useEffect(() => {
    if (!ready) return;

    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const sync = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        if (userPausedRef.current) return;
        void video.play().catch(() => {});
        return;
      }

      video.pause();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        sync(entry);
      },
      { root: null, rootMargin, threshold },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [rootRef, videoRef, userPausedRef, rootMargin, threshold, refreshKey, ready]);
}
