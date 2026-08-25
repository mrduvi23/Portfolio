"use client";

import { animate } from "animejs";
import { getLenisInstance } from "@/lib/lenis-instance";
import { notifyLayoutSettle } from "@/lib/layout-settle";
import { isSameRoute } from "@/lib/navigation";
import {
  registerPageTransition,
  unregisterPageTransition,
} from "@/lib/page-transition";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const EASE = "inOutExpo";
const TRANSITION_MS = 500;
const CONTENT_ENTER_DELAY_MS = 180;

const MASK_Y_BELOW = "100%";
const MASK_Y_COVER = "0%";
const MASK_Y_ABOVE = "-100%";

type AnimeParams = NonNullable<Parameters<typeof animate>[1]>;

async function tween(target: HTMLElement, params: AnimeParams): Promise<void> {
  await animate(target, params);
}

function setMaskY(mask: HTMLElement, y: string) {
  mask.style.transform = `translateY(${y})`;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [displayed, setDisplayed] = useState(children);
  const displayedPathname = useRef(pathname);
  const pendingChildren = useRef(children);
  const pendingPathname = useRef(pathname);
  const maskRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const isTransitioning = useRef(false);
  const exitBeforeNavRef = useRef(false);
  const transitionGenRef = useRef(0);

  pendingChildren.current = children;
  pendingPathname.current = pathname;

  useEffect(() => {
    if (isTransitioning.current) return;
    if (!isSameRoute(pathname, displayedPathname.current)) return;
    setDisplayed(children);
  }, [children, pathname]);

  const runExitPhase = useCallback(async () => {
    const mask = maskRef.current;
    const content = contentRef.current;
    if (!mask || !content) return;

    setMaskY(mask, MASK_Y_BELOW);

    await Promise.all([
      tween(mask, {
        translateY: [MASK_Y_BELOW, MASK_Y_COVER],
        duration: TRANSITION_MS,
        ease: EASE,
      }),
      tween(content, {
        translateY: ["0%", "-30%"],
        opacity: [1, 0],
        duration: TRANSITION_MS,
        ease: EASE,
      }),
    ]);
  }, []);

  const runEnterPhase = useCallback(async () => {
    const mask = maskRef.current;
    const content = contentRef.current;
    if (!mask || !content) return;

    await tween(content, {
      translateY: "30%",
      opacity: 0,
      duration: 0,
      ease: EASE,
    });

    await Promise.all([
      tween(mask, {
        translateY: [MASK_Y_COVER, MASK_Y_ABOVE],
        duration: TRANSITION_MS,
        delay: 0,
        ease: EASE,
      }),
      tween(content, {
        translateY: ["30%", "0%"],
        opacity: [0, 1],
        duration: TRANSITION_MS,
        delay: CONTENT_ENTER_DELAY_MS,
        ease: EASE,
      }),
    ]);

    setMaskY(mask, MASK_Y_BELOW);
  }, []);

  const finishTransition = useCallback(() => {
    document.documentElement.removeAttribute("data-route-transition");
    isTransitioning.current = false;
    exitBeforeNavRef.current = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => notifyLayoutSettle());
    });
  }, []);

  const navigate = useCallback(
    async (href: string) => {
      if (isTransitioning.current) return;
      if (isSameRoute(href, pathname)) {
        router.push(href);
        return;
      }

      const gen = ++transitionGenRef.current;
      isTransitioning.current = true;
      exitBeforeNavRef.current = true;
      document.documentElement.setAttribute("data-route-transition", "true");

      try {
        await runExitPhase();
        if (gen !== transitionGenRef.current) return;
        router.push(href);
      } catch {
        if (gen === transitionGenRef.current) finishTransition();
        router.push(href);
      }
    },
    [pathname, router, runExitPhase, finishTransition],
  );

  useEffect(() => {
    registerPageTransition(navigate);
    return () => unregisterPageTransition();
  }, [navigate]);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      displayedPathname.current = pathname;
      setDisplayed(children);
      if (maskRef.current) setMaskY(maskRef.current, MASK_Y_BELOW);
      return;
    }

    if (isSameRoute(pathname, displayedPathname.current)) return;

    const gen = ++transitionGenRef.current;

    const completeNavigation = async () => {
      const mask = maskRef.current;
      const content = contentRef.current;
      if (!mask || !content) {
        finishTransition();
        return;
      }

      try {
        if (!exitBeforeNavRef.current) {
          isTransitioning.current = true;
          document.documentElement.setAttribute("data-route-transition", "true");
          await runExitPhase();
          if (gen !== transitionGenRef.current) return;
        }
        exitBeforeNavRef.current = false;

        displayedPathname.current = pendingPathname.current;
        setDisplayed(pendingChildren.current);

        const lenis = getLenisInstance();
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);

        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });
        if (gen !== transitionGenRef.current) return;

        await runEnterPhase();
        if (gen !== transitionGenRef.current) return;
      } finally {
        if (gen === transitionGenRef.current) finishTransition();
      }
    };

    void completeNavigation();
  }, [pathname, runExitPhase, runEnterPhase, finishTransition]);

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col">
      <div
        ref={contentRef}
        className="page-transition-content flex min-h-0 flex-1 flex-col"
      >
        {displayed}
      </div>

      <div
        ref={maskRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[3000] bg-[var(--color-primitives-black)] will-change-transform"
      />
    </div>
  );
}
