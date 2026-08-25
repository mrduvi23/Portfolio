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

const LOADER_WORD_CLASS =
  "select-none whitespace-nowrap text-center font-medium uppercase text-[var(--color-primitives-black)]";

type LoaderMode = "hidden" | "running";

export function SessionLoader() {
  const [mode, setMode] = useState<LoaderMode>("hidden");
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
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
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
      return;
    }
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      return;
    }
    document.documentElement.removeAttribute("data-loader-pending");
    setMode("running");
  }, []);

  useLayoutEffect(() => {
    if (mode !== "running") return;

    const sync = () => setMetrics(getLoaderMetrics(window.innerWidth));
    sync();
    window.addEventListener("resize", sync, { passive: true });
    return () => window.removeEventListener("resize", sync);
  }, [mode]);

  useEffect(() => {
    if (mode === "running") {
      document.documentElement.removeAttribute("data-loader-pending");
      document.documentElement.setAttribute("data-loader-active", "");
    } else {
      document.documentElement.removeAttribute("data-loader-active");
      document.documentElement.removeAttribute("data-loader-pending");
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== "running") return;

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
          <video
            className="pointer-events-none h-full w-full select-none object-cover"
            src={LOADER_VIDEO_SRC}
            draggable={false}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}