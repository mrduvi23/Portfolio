"use client";

import "@/components/case-study/case-study-zone-walkthrough.css";
import { PauseIcon24 } from "@/components/icons/PauseIcon24";
import { PlayIcon24 } from "@/components/icons/PlayIcon24";
import { ReplayIcon24 } from "@/components/icons/ReplayIcon24";
import { useAutoplayOnVisible } from "@/hooks/useAutoplayOnVisible";
import { useLazyMediaLoad } from "@/hooks/useLazyMediaLoad";
import { assets } from "@/lib/assets";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

/** Chroma key sampled from the walkthrough flat cyan (#00DBFB). */
const KEY_RGB = { r: 0, g: 219, b: 251 } as const;
const KEY_THRESHOLD = 72;
const WALKTHROUGH_CROP = { sx: 80, sy: 0, sw: 2398, sh: 1504 } as const;

function needsCanvasFallback() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isSafari = /safari/i.test(ua) && !/chrome|chromium|crios|android/i.test(ua);
  return isSafari;
}

function chromakeyFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const image = ctx.getImageData(0, 0, width, height);
  const { data } = image;
  const { r: kr, g: kg, b: kb } = KEY_RGB;

  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - kr;
    const dg = data[i + 1] - kg;
    const db = data[i + 2] - kb;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);
    if (distance < KEY_THRESHOLD) {
      data[i + 3] = 0;
    } else if (distance < KEY_THRESHOLD * 1.35) {
      data[i + 3] = Math.round(
        data[i + 3] * ((distance - KEY_THRESHOLD) / (KEY_THRESHOLD * 0.35)),
      );
    }
  }

  ctx.putImageData(image, 0, 0);
}

export function CaseStudyZoneWalkthroughMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const userPausedRef = useRef(false);
  const [useCanvas, setUseCanvas] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const shouldLoad = useLazyMediaLoad(rootRef);
  const activeSrc = useCanvas
    ? assets.zoneWalkthroughSource
    : assets.zoneWalkthrough;

  useEffect(() => {
    setUseCanvas(needsCanvasFallback());
  }, []);

  const syncPlayingState = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(!video.paused && !video.ended);
  }, []);

  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("play", syncPlayingState);
    video.addEventListener("pause", syncPlayingState);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", syncPlayingState);
      video.removeEventListener("pause", syncPlayingState);
      video.removeEventListener("ended", handleEnded);
    };
  }, [useCanvas, syncPlayingState, handleEnded]);

  useAutoplayOnVisible(rootRef, videoRef, {
    userPausedRef,
    refreshKey: `${useCanvas}-${shouldLoad}`,
    ready: shouldLoad,
  });

  useEffect(() => {
    if (!useCanvas) return;
    if (!shouldLoad) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const draw = () => {
      if (video.readyState >= 2) {
        const width = canvas.clientWidth || 640;
        const height = canvas.clientHeight || 360;
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        ctx.clearRect(0, 0, width, height);
        const { sx, sy, sw, sh } = WALKTHROUGH_CROP;
        const scale = Math.min(width / sw, height / sh);
        const dw = sw * scale;
        const dh = sh * scale;
        const dx = (width - dw) / 2;
        const dy = (height - dh) / 2;
        ctx.drawImage(video, sx, sy, sw, sh, dx, dy, dw, dh);
        chromakeyFrame(ctx, width, height);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    };

    video.addEventListener("loadeddata", start);
    if (video.readyState >= 2) start();

    return () => {
      video.removeEventListener("loadeddata", start);
      cancelAnimationFrame(rafRef.current);
    };
  }, [useCanvas, shouldLoad]);

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    userPausedRef.current = false;
    video.currentTime = 0;
    void video.play();
  };

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      userPausedRef.current = false;
      if (video.ended) video.currentTime = 0;
      void video.play();
      return;
    }

    userPausedRef.current = true;
    video.pause();
  };

  const handleFramePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("button")) return;
    setControlsVisible((visible) => !visible);
  };

  const label = "Zone app walkthrough on phone and tablet";
  const rootClass = [
    "case-study-placeholder-frame",
    "case-study-zone-walkthrough",
    controlsVisible ? "is-controls-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={rootClass}
      aria-label={label}
      data-cursor-static
      onPointerUp={handleFramePointerUp}
    >
      {useCanvas ? (
        <>
          <video
            ref={videoRef}
            className="case-study-zone-walkthrough__source"
            src={shouldLoad ? activeSrc : undefined}
            muted
            playsInline
            preload={shouldLoad ? "metadata" : "none"}
            aria-hidden
          />
          <canvas
            ref={canvasRef}
            className="case-study-zone-walkthrough__media"
            aria-label={label}
          />
        </>
      ) : (
        <video
          ref={videoRef}
          className="case-study-zone-walkthrough__media"
          src={shouldLoad ? activeSrc : undefined}
          muted
          playsInline
          preload={shouldLoad ? "metadata" : "none"}
          aria-label={label}
        />
      )}
      <div className="case-study-zone-walkthrough__controls">
        <button
          type="button"
          className="case-study-zone-walkthrough__control"
          onClick={handleReplay}
          aria-label="Replay video"
        >
          <ReplayIcon24 />
        </button>
        <button
          type="button"
          className="case-study-zone-walkthrough__control"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon24 /> : <PlayIcon24 />}
        </button>
      </div>
    </div>
  );
}
