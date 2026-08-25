"use client";

import { getLenisInstance } from "@/lib/lenis-instance";
import { LAYOUT_SETTLE_EVENT } from "@/lib/layout-settle";
import { flattenCaseStudyNavIds } from "@/lib/case-studies/nav-utils";
import type { CaseStudyNavItem } from "@/lib/case-studies/types";
import { useCallback, useEffect, useRef, useState } from "react";

/** Matches Lenis scrollTo offset and section scroll-mt (navbar clearance). */
const SCROLL_OFFSET = -112;
const ACTIVATION_LINE_OFFSET = 112;
/** Safety net if Lenis onComplete never fires. */
const SCROLL_LOCK_MAX_MS = 2000;
/** Scroll beyond this → treat as restored / intentional position, not fresh top entry. */
const SCROLL_RESTORED_THRESHOLD = 24;

const SPY_IO: IntersectionObserverInit = {
  rootMargin: "-112px 0px -55% 0px",
  threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1],
};

function getScrollY(): number {
  if (typeof window === "undefined") return 0;
  const lenis = getLenisInstance();
  if (lenis && typeof lenis.scroll === "number") return lenis.scroll;
  return window.scrollY;
}

function hasMeaningfulScroll(): boolean {
  return getScrollY() > SCROLL_RESTORED_THRESHOLD;
}

function pickActiveByScrollPosition(ids: string[]): string | null {
  if (ids.length === 0) return null;

  const activationLine = getScrollY() + ACTIVATION_LINE_OFFSET;
  const positioned = ids
    .map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      return {
        id,
        top: element.getBoundingClientRect().top + getScrollY(),
      };
    })
    .filter((item): item is { id: string; top: number } => item !== null)
    .sort((a, b) => a.top - b.top);

  if (positioned.length === 0) return ids[0] ?? null;

  let activeId = positioned[0].id;
  for (const { id, top } of positioned) {
    if (top <= activationLine + 1) {
      activeId = id;
    }
  }

  return activeId;
}

export function useCaseStudyIndexSpy(nav: CaseStudyNavItem[]) {
  const [activeId, setActiveId] = useState<string | null>(nav[0]?.id ?? null);
  const [hovering, setHovering] = useState(false);
  const scrollLockRef = useRef<string | null>(null);
  const selectedIdRef = useRef<string | null>(null);
  const pinFirstSectionRef = useRef(true);
  const ratiosRef = useRef(new Map<string, number>());
  const unlockTimerRef = useRef<number | null>(null);
  const lockFallbackRef = useRef<number | null>(null);

  const enableSpy = useCallback(() => {
    pinFirstSectionRef.current = false;
  }, []);

  const clearScrollLock = useCallback(() => {
    scrollLockRef.current = null;
    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
    if (lockFallbackRef.current !== null) {
      window.clearTimeout(lockFallbackRef.current);
      lockFallbackRef.current = null;
    }
  }, []);

  const pickActiveFromRatios = useCallback(() => {
    const ids = flattenCaseStudyNavIds(nav);
    let bestId: string | null = null;
    let bestRatio = 0;

    for (const id of ids) {
      const ratio = ratiosRef.current.get(id) ?? 0;
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    }

    if (bestRatio > 0 && bestId) {
      return bestId;
    }

    return pickActiveByScrollPosition(ids);
  }, [nav]);

  const applyActiveState = useCallback(() => {
    if (scrollLockRef.current) {
      setActiveId(scrollLockRef.current);
      return;
    }

    if (selectedIdRef.current) {
      setActiveId(selectedIdRef.current);
      return;
    }

    if (hasMeaningfulScroll()) {
      pinFirstSectionRef.current = false;
    }

    if (pinFirstSectionRef.current) {
      setActiveId(nav[0]?.id ?? null);
      return;
    }

    const current = pickActiveFromRatios();
    if (current) setActiveId(current);
  }, [nav, pickActiveFromRatios]);

  const releaseScrollLock = useCallback(() => {
    clearScrollLock();
    applyActiveState();
  }, [clearScrollLock, applyActiveState]);

  const clearSelectedId = useCallback(() => {
    if (!selectedIdRef.current) return;
    selectedIdRef.current = null;
    applyActiveState();
  }, [applyActiveState]);

  const scrollToId = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      clearScrollLock();
      enableSpy();
      scrollLockRef.current = id;
      selectedIdRef.current = id;
      setActiveId(id);

      const scheduleRelease = () => {
        unlockTimerRef.current = window.setTimeout(() => {
          unlockTimerRef.current = null;
          releaseScrollLock();
        }, 80);
      };

      lockFallbackRef.current = window.setTimeout(() => {
        lockFallbackRef.current = null;
        releaseScrollLock();
      }, SCROLL_LOCK_MAX_MS);

      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(target, {
          offset: SCROLL_OFFSET,
          onComplete: scheduleRelease,
        });
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      unlockTimerRef.current = window.setTimeout(() => {
        unlockTimerRef.current = null;
        releaseScrollLock();
      }, 900);
    },
    [clearScrollLock, releaseScrollLock, enableSpy],
  );

  useEffect(() => {
    pinFirstSectionRef.current = !hasMeaningfulScroll();
    applyActiveState();

    const ids = flattenCaseStudyNavIds(nav);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (!id) continue;
        ratiosRef.current.set(
          id,
          entry.isIntersecting ? entry.intersectionRatio : 0,
        );
      }
      applyActiveState();
    }, SPY_IO);

    for (const el of elements) observer.observe(el);

    const onUserNavigate = () => {
      enableSpy();
      clearSelectedId();
    };

    const onLayoutSettle = () => {
      if (hasMeaningfulScroll()) enableSpy();
      applyActiveState();
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      enableSpy();
      requestAnimationFrame(() => applyActiveState());
    };

    window.addEventListener("resize", applyActiveState, { passive: true });
    window.addEventListener("wheel", onUserNavigate, { passive: true });
    window.addEventListener("touchstart", onUserNavigate, { passive: true });
    window.addEventListener("mousedown", onUserNavigate);
    window.addEventListener("keydown", onUserNavigate);
    window.addEventListener(LAYOUT_SETTLE_EVENT, onLayoutSettle);
    window.addEventListener("pageshow", onPageShow);

    const restorePoll = window.setInterval(() => {
      if (hasMeaningfulScroll()) {
        enableSpy();
        applyActiveState();
        window.clearInterval(restorePoll);
      }
    }, 50);
    const stopRestorePoll = window.setTimeout(() => {
      window.clearInterval(restorePoll);
    }, 600);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", applyActiveState);
      window.removeEventListener("wheel", onUserNavigate);
      window.removeEventListener("touchstart", onUserNavigate);
      window.removeEventListener("mousedown", onUserNavigate);
      window.removeEventListener("keydown", onUserNavigate);
      window.removeEventListener(LAYOUT_SETTLE_EVENT, onLayoutSettle);
      window.removeEventListener("pageshow", onPageShow);
      window.clearInterval(restorePoll);
      window.clearTimeout(stopRestorePoll);
      clearScrollLock();
    };
  }, [nav, applyActiveState, clearScrollLock, clearSelectedId, enableSpy]);

  return {
    activeId,
    hovering,
    setHovering,
    scrollToId,
  };
}
