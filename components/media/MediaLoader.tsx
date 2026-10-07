"use client";

import { OrbitingDot } from "@/components/amicro/orbiting-dot";
import Image, { type ImageProps } from "next/image";
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import "./media-loader.css";

const SHOW_DELAY_MS = 150;
const FADE_MS = 200;
const MIN_BOX = 8;

type Phase = "idle" | "visible" | "fading";
type MediaElement = HTMLImageElement | HTMLVideoElement;

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
  scale: number;
};

type BootWindow = Window & {
  __stopMediaLoaderBoot?: () => void;
};

type LoaderNode = HTMLDivElement & { __reactOwned?: boolean };
type BootMedia = MediaElement & { __mediaLoaderBoot?: number };

function isSettled(media: MediaElement) {
  if (media instanceof HTMLImageElement) return media.complete;
  if (media.error) return true;
  return media.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
}

function clips(value: string) {
  return value === "hidden" || value === "clip" || value === "auto" || value === "scroll";
}

function visibleBox(media: HTMLElement) {
  let rect = media.getBoundingClientRect();
  let node = media.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    const clipX = clips(style.overflowX);
    const clipY = clips(style.overflowY);
    if (clipX || clipY) {
      const clip = node.getBoundingClientRect();
      const left = clipX ? Math.max(rect.left, clip.left) : rect.left;
      const right = clipX ? Math.min(rect.right, clip.right) : rect.right;
      const top = clipY ? Math.max(rect.top, clip.top) : rect.top;
      const bottom = clipY ? Math.min(rect.bottom, clip.bottom) : rect.bottom;
      rect = new DOMRect(left, top, Math.max(0, right - left), Math.max(0, bottom - top));
    }
    node = node.parentElement;
  }

  const view = new DOMRect(0, 0, window.innerWidth, window.innerHeight);
  const left = Math.max(rect.left, view.left);
  const right = Math.min(rect.right, view.right);
  const top = Math.max(rect.top, view.top);
  const bottom = Math.min(rect.bottom, view.bottom);
  const onScreen = new DOMRect(left, top, Math.max(0, right - left), Math.max(0, bottom - top));
  if (onScreen.width >= MIN_BOX && onScreen.height >= MIN_BOX) return onScreen;
  if (rect.width >= MIN_BOX && rect.height >= MIN_BOX) return rect;
  return null;
}

function measure(media: HTMLElement, loader: HTMLElement): Box | null {
  const box = visibleBox(media);
  if (!box) return null;
  const host = (loader.offsetParent as HTMLElement | null) ?? document.body;
  const hostRect = host.getBoundingClientRect();
  const style = getComputedStyle(host);
  const borderLeft = Number.parseFloat(style.borderLeftWidth) || 0;
  const borderTop = Number.parseFloat(style.borderTopWidth) || 0;
  return {
    left: box.left - hostRect.left - borderLeft + host.scrollLeft,
    top: box.top - hostRect.top - borderTop + host.scrollTop,
    width: box.width,
    height: box.height,
    scale: Math.min(1, box.width / 48, box.height / 48),
  };
}

function sameBox(a: Box, b: Box) {
  return (
    Math.abs(a.left - b.left) < 0.5 &&
    Math.abs(a.top - b.top) < 0.5 &&
    Math.abs(a.width - b.width) < 0.5 &&
    Math.abs(a.height - b.height) < 0.5
  );
}

const trackers = new Set<() => void>();
let rafId = 0;

function loop() {
  trackers.forEach((tick) => tick());
  rafId = trackers.size > 0 ? window.requestAnimationFrame(loop) : 0;
}

function track(tick: () => void) {
  trackers.add(tick);
  if (!rafId) rafId = window.requestAnimationFrame(loop);
  return () => {
    trackers.delete(tick);
  };
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Server-rendered loader slot. Hidden until media is still in flight after
 * 150ms, including the window before hydration (see MediaLoaderBoot).
 */
export function MediaLoadingPortal({
  mediaRef,
}: {
  mediaRef: RefObject<MediaElement | null>;
}) {
  const slotRef = useRef<LoaderNode>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useLayoutEffect(() => {
    const media = mediaRef.current;
    const loader = slotRef.current;
    if (!media || !loader) return;

    (window as BootWindow).__stopMediaLoaderBoot?.();
    loader.__reactOwned = true;

    let cancelled = false;
    let attempts = 0;
    let showTimer = 0;
    let fadeTimer = 0;
    let stopTrack = () => {};
    const phaseRef: { current: Phase } = { current: "idle" };
    const boxRef: { current: Box | null } = { current: null };
    const bootShown = Boolean((media as BootMedia).__mediaLoaderBoot);

    const publish = (next: Box) => {
      const prev = boxRef.current;
      if (prev && sameBox(prev, next)) return;
      boxRef.current = next;
      setBox(next);
    };

    const hideNow = () => {
      phaseRef.current = "idle";
      setPhase("idle");
      stopTrack();
    };

    const beginHide = () => {
      window.clearTimeout(showTimer);
      if (phaseRef.current === "visible") {
        phaseRef.current = "fading";
        setPhase("fading");
        fadeTimer = window.setTimeout(hideNow, reducedMotion() ? 0 : FADE_MS);
      }
    };

    const reveal = () => {
      if (cancelled || isSettled(media)) {
        beginHide();
        return;
      }
      const next = measure(media, loader);
      if (!next) {
        attempts += 1;
        if (attempts < 12) showTimer = window.setTimeout(reveal, 50);
        return;
      }
      attempts = 0;
      phaseRef.current = "visible";
      publish(next);
      setPhase("visible");
      stopTrack = track(() => {
        if (phaseRef.current === "idle") return;
        const moved = measure(media, loader);
        if (moved) publish(moved);
      });
    };

    const arm = (immediate: boolean) => {
      window.clearTimeout(showTimer);
      window.clearTimeout(fadeTimer);
      if (isSettled(media)) {
        beginHide();
        return;
      }
      if (phaseRef.current === "visible") return;
      if (immediate) {
        reveal();
        return;
      }
      showTimer = window.setTimeout(reveal, SHOW_DELAY_MS);
    };

    arm(bootShown);

    const onSettled = () => beginHide();
    const onRestart = () => {
      if (cancelled || isSettled(media)) return;
      arm(false);
    };

    media.addEventListener("load", onSettled);
    media.addEventListener("error", onSettled);
    media.addEventListener("loadeddata", onSettled);
    media.addEventListener("canplay", onSettled);
    media.addEventListener("loadstart", onRestart);

    return () => {
      cancelled = true;
      window.clearTimeout(showTimer);
      window.clearTimeout(fadeTimer);
      stopTrack();
      media.removeEventListener("load", onSettled);
      media.removeEventListener("error", onSettled);
      media.removeEventListener("loadeddata", onSettled);
      media.removeEventListener("canplay", onSettled);
      media.removeEventListener("loadstart", onRestart);
    };
  }, [mediaRef]);

  const style: CSSProperties | undefined = box
    ? {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        ["--media-loader-scale" as string]: String(box.scale),
      }
    : undefined;

  return (
    <div
      ref={slotRef}
      className="media-loader"
      data-media-loader=""
      data-state={phase === "idle" ? undefined : phase}
      style={style}
      suppressHydrationWarning
      aria-hidden
    >
      <div className="media-loader__dot">
        <OrbitingDot />
      </div>
    </div>
  );
}

/** Drop-in for `next/image` that shows the shared media loader while decoding. */
export function LoadingImage({ alt, ...props }: ImageProps) {
  const mediaRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <Image {...props} alt={alt} ref={mediaRef} />
      <MediaLoadingPortal mediaRef={mediaRef} />
    </>
  );
}
