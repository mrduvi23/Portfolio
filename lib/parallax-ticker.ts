import { getLenisInstance } from "@/lib/lenis-instance";

type ParallaxTick = () => void;

const scrollSubscribers = new Set<ParallaxTick>();
const loopSubscribers = new Set<ParallaxTick>();

let rafId: number | null = null;
let scrollFrameId: number | null = null;
let scrollListenersBound = false;
let lenisUnsub: (() => void) | undefined;
let lenisPollId: number | null = null;

function runLoopFrame() {
  loopSubscribers.forEach((tick) => tick());
  if (loopSubscribers.size > 0) {
    rafId = requestAnimationFrame(runLoopFrame);
  } else {
    rafId = null;
  }
}

function ensureLoopRunning() {
  if (loopSubscribers.size > 0 && rafId === null) {
    rafId = requestAnimationFrame(runLoopFrame);
  }
}

function runScrollTicks() {
  scrollSubscribers.forEach((tick) => tick());
}

function scheduleScrollFrame() {
  if (scrollFrameId !== null) return;
  scrollFrameId = requestAnimationFrame(() => {
    scrollFrameId = null;
    runScrollTicks();
  });
}

function bindScrollListeners() {
  if (scrollListenersBound) return;
  scrollListenersBound = true;

  window.addEventListener("scroll", scheduleScrollFrame, { passive: true });

  const bindLenis = () => {
    const lenis = getLenisInstance();
    if (!lenis) return false;
    lenisUnsub = lenis.on("scroll", scheduleScrollFrame);
    return true;
  };

  if (!bindLenis()) {
    lenisPollId = window.setInterval(() => {
      if (bindLenis() && lenisPollId !== null) {
        window.clearInterval(lenisPollId);
        lenisPollId = null;
      }
    }, 100);
    window.setTimeout(() => {
      if (lenisPollId !== null) {
        window.clearInterval(lenisPollId);
        lenisPollId = null;
      }
    }, 8000);
  }
}

function unbindScrollListenersIfEmpty() {
  if (scrollSubscribers.size > 0 || loopSubscribers.size > 0) return;

  scrollListenersBound = false;
  window.removeEventListener("scroll", scheduleScrollFrame);
  lenisUnsub?.();
  lenisUnsub = undefined;

  if (scrollFrameId !== null) {
    cancelAnimationFrame(scrollFrameId);
    scrollFrameId = null;
  }
}

/** Scroll-driven updates — runs on scroll, not every frame. */
export function subscribeParallaxFrame(tick: ParallaxTick): () => void {
  scrollSubscribers.add(tick);
  bindScrollListeners();
  tick();

  return () => {
    scrollSubscribers.delete(tick);
    unbindScrollListenersIfEmpty();
  };
}

/** Continuous rAF — for orbit / time-based motion while in viewport. */
export function subscribeParallaxLoop(tick: ParallaxTick): () => void {
  loopSubscribers.add(tick);
  bindScrollListeners();
  tick();
  ensureLoopRunning();

  return () => {
    loopSubscribers.delete(tick);
    if (loopSubscribers.size === 0 && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    unbindScrollListenersIfEmpty();
  };
}
