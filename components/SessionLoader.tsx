"use client";

import { getLoaderMetrics } from "@/lib/loaderMetrics";
import { notifyLayoutSettle } from "@/lib/layout-settle";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const SESSION_KEY = "darreba_intro_loader_done";

const BEZIER = "cubic-bezier(0.59, 0.25, 0.12, 1.17)";
const VIDEO_FULLSCREEN_MS = 500;
const VIDEO_SHRINK_MS = 900;
const WORD_MS = 400;
const PAUSE_MS = 1000;
const CURTAIN_MS = 400;
const SHELL_REVEAL_MS = 600;

/** Desplazamiento inicial “100px off” por debajo del contenedor */
const WORD_OFFSET_PX = 100;

const LOADER_VIDEO_SRC = "/loader/Header.MP4";
/** First frame of the loader video. Used only when playback cannot start. */
const LOADER_POSTER_SRC = "/loader/header-poster.webp";

/**
 * Longest the neutral hold may last before the sequence continues on the
 * poster (or skips, if the poster itself fails). Keeps a slow connection
 * from sitting on a blank screen.
 */
const VIDEO_READY_TIMEOUT_MS = 4500;

const LOADER_WORD_CLASS =
  "select-none whitespace-nowrap text-center font-medium uppercase text-[var(--color-primitives-black)]";

type LoaderMode = "hidden" | "holding" | "running";
type LoaderBackdrop = "video" | "poster";

function forceMutedInline(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
}

function releaseVideo(video: HTMLVideoElement) {
  video.pause();
  video.removeAttribute("src");
  video.load();
}

export function SessionLoader() {
  const [mode, setMode] = useState<LoaderMode>("hidden");
  const [backdrop, setBackdrop] = useState<LoaderBackdrop>("video");
  const [metrics, setMetrics] = useState(() =>
    getLoaderMetrics(
      typeof window !== "undefined" ? window.innerWidth : 1920,
    ),
  );
  const [videoInset, setVideoInset] = useState(false);
  const [showTextShell, setShowTextShell] = useState(false);
  const [trackY, setTrackY] = useState(WORD_OFFSET_PX);
  const [shellOpen, setShellOpen] = useState(false);
  const [curtainUp, setCurtainUp] = useState(false);

  const timersRef = useRef<number[]>([]);
  const metricsRef = useRef(metrics);
  const videoRef = useRef<HTMLVideoElement>(null);
  /** True once the sequence has committed to video or poster. */
  const committedRef = useRef(false);
  /** True while the full-screen loader is on screen (hold or sequence). */
  const introActiveRef = useRef(false);
  const startedRef = useRef(false);

  metricsRef.current = metrics;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode */
    }
    const root = document.documentElement;
    root.style.overflow = "";
    document.body.style.overflow = "";
    root.removeAttribute("data-loader-active");
    root.removeAttribute("data-loader-pending");
    introActiveRef.current = false;
    setMode("hidden");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => notifyLayoutSettle());
    });
  }, [clearTimers]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      document.documentElement.removeAttribute("data-loader-pending");
      return;
    }
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        document.documentElement.removeAttribute("data-loader-pending");
        return;
      }
    } catch {
      document.documentElement.removeAttribute("data-loader-pending");
      return;
    }
    setMode("holding");
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (mode === "hidden") {
      if (!introActiveRef.current) return;
      introActiveRef.current = false;
      root.removeAttribute("data-loader-active");
      root.removeAttribute("data-loader-pending");
      root.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }
    introActiveRef.current = true;
    root.removeAttribute("data-loader-pending");
    root.setAttribute("data-loader-active", "");
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }, [mode]);

  useLayoutEffect(() => {
    if (mode === "hidden") return;
    const sync = () => setMetrics(getLoaderMetrics(window.innerWidth));
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, [mode]);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || mode !== "holding" || committedRef.current) return;
    forceMutedInline(video);
    video.pause();
  }, [mode]);

  useEffect(() => {
    if (mode !== "holding") return;
    const video = videoRef.current;
    if (!video) return;

    let active = true;
    let enough = false;
    let playbackOk = false;
    let playRequested = false;

    forceMutedInline(video);

    const maybeStart = () => {
      if (!active || startedRef.current || !enough || !playbackOk) return;
      startedRef.current = true;
      committedRef.current = true;
      setBackdrop("video");
      setMode("running");
    };

    const startPoster = () => {
      if (!active || startedRef.current) return;
      startedRef.current = true;
      releaseVideo(video);

      const img = new Image();
      let opened = false;
      const go = () => {
        if (opened || !active) return;
        opened = true;
        committedRef.current = true;
        setBackdrop("poster");
        setMode("running");
      };
      img.onload = go;
      img.onerror = () => {
        if (!active) return;
        committedRef.current = true;
        finish();
      };
      img.src = LOADER_POSTER_SRC;
      if (img.complete && img.naturalWidth > 0) go();
    };

    const requestPlay = () => {
      if (!active || startedRef.current || playRequested) return;
      playRequested = true;
      forceMutedInline(video);
      try {
        if (video.currentTime !== 0) video.currentTime = 0;
      } catch {
        /* not seekable yet */
      }
      const pending = video.play();
      if (pending && typeof pending.then === "function") {
        pending.then(
          () => {
            playbackOk = true;
            maybeStart();
          },
          (error: unknown) => {
            if (!active || startedRef.current) return;
            const name = error instanceof DOMException ? error.name : "";
            if (name === "AbortError") {
              playRequested = false;
              return;
            }
            startPoster();
          },
        );
        return;
      }
      playbackOk = true;
      maybeStart();
    };

    const onEnough = () => {
      if (video.readyState < HTMLMediaElement.HAVE_ENOUGH_DATA) return;
      enough = true;
      if (!playbackOk) requestPlay();
      maybeStart();
    };

    const onPlaying = () => {
      if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) enough = true;
      if (!enough) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }
        return;
      }
      playbackOk = true;
      maybeStart();
    };

    video.addEventListener("canplaythrough", onEnough);
    video.addEventListener("playing", onPlaying);

    if (
      !video.paused &&
      video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA
    ) {
      enough = true;
      playbackOk = true;
      maybeStart();
    } else if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      onEnough();
    }

    const timeoutId = window.setTimeout(startPoster, VIDEO_READY_TIMEOUT_MS);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      video.removeEventListener("canplaythrough", onEnough);
      video.removeEventListener("playing", onPlaying);
      if (!committedRef.current) {
        startedRef.current = false;
        video.pause();
      }
    };
  }, [mode, finish]);

  useEffect(() => {
    if (mode !== "running") return;

    document.documentElement.setAttribute("data-loader-active", "");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const { lineHeightPx: linePx } = metricsRef.current;

    schedule(() => setVideoInset(true), VIDEO_FULLSCREEN_MS);

    const afterShrink = VIDEO_FULLSCREEN_MS + VIDEO_SHRINK_MS;
    schedule(() => {
      setShowTextShell(true);
      setTrackY(WORD_OFFSET_PX);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShellOpen(true));
      });
    }, afterShrink);

    const bienvenidoEnterAt = afterShrink + PAUSE_MS;
    schedule(() => setTrackY(0), bienvenidoEnterAt);

    const swapAt = bienvenidoEnterAt + WORD_MS + PAUSE_MS;
    schedule(() => setTrackY(-linePx), swapAt);

    const welcomeExitAt = swapAt + WORD_MS + PAUSE_MS;
    /** WELCOME slides up and loader curtain rise together */
    schedule(() => {
      setTrackY(-2 * linePx);
      setCurtainUp(true);
    }, welcomeExitAt);

    schedule(() => finish(), welcomeExitAt + CURTAIN_MS + 80);

    return () => {
      clearTimers();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-loader-active");
    };
  }, [mode, schedule, clearTimers, finish]);

  if (mode === "hidden") return null;

  const { videoInsetPx, fontSizePx, letterSpacing, lineHeightPx } = metrics;

  const trackMotion = `transform ${WORD_MS}ms ${BEZIER}`;
  const curtainMotion = `transform ${CURTAIN_MS}ms ${BEZIER}`;
  const shellMotion = `max-height ${SHELL_REVEAL_MS}ms ${BEZIER}, opacity ${SHELL_REVEAL_MS}ms ${BEZIER}`;

  const wordStyle = {
    fontSize: `${fontSizePx}px`,
    lineHeight: 1.2,
    letterSpacing,
  } as const;

  const videoInsetValue = videoInset ? `${videoInsetPx}px` : "0px";

  return (
    <div
      className="session-loader fixed inset-0 z-[2147483000] flex flex-col bg-[var(--color-bg)]"
      style={{
        transform: curtainUp ? "translateY(-100%)" : "translateY(0)",
        transition: curtainMotion,
        willChange: curtainUp ? "transform" : undefined,
      }}
      data-loader-phase={mode}
      data-loader-backdrop={backdrop}
      aria-hidden
    >
      {showTextShell ? (
        <div className="absolute inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="w-full max-w-[min(92vw,1200px)] overflow-hidden"
            style={{
              maxHeight: shellOpen ? lineHeightPx : 0,
              opacity: shellOpen ? 1 : 0,
              transition: shellMotion,
            }}
          >
            <div className="overflow-hidden" style={{ height: lineHeightPx }}>
              <div
                className="flex flex-col"
                style={{
                  transform: `translateY(${trackY}px)`,
                  transition: trackMotion,
                  willChange: "transform",
                }}
              >
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{ height: lineHeightPx }}
                >
                  <span className={LOADER_WORD_CLASS} style={wordStyle}>
                    BIENVENIDO
                  </span>
                </div>
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{ height: lineHeightPx }}
                >
                  <span className={LOADER_WORD_CLASS} style={wordStyle}>
                    WELCOME
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative z-0 min-h-0 flex-1">
        <div
          className="absolute overflow-hidden shadow-[inset_0_0_0_1px_var(--color-card-inset-border)]"
          style={{
            inset: videoInsetValue,
            transition: `inset ${VIDEO_SHRINK_MS}ms ${BEZIER}`,
          }}
        >
          {backdrop === "poster" ? (
            // Same object-cover box as the video. next/image would insert its own loader.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={LOADER_POSTER_SRC}
              alt=""
              width={1920}
              height={1080}
              draggable={false}
              className="pointer-events-none h-full w-full select-none object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              className="pointer-events-none h-full w-full select-none object-cover"
              src={LOADER_VIDEO_SRC}
              poster={LOADER_POSTER_SRC}
              draggable={false}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          )}
        </div>
      </div>

      {mode === "holding" ? (
        <div className="absolute inset-0 z-[70] bg-[var(--color-bg)]" />
      ) : null}
    </div>
  );
}
