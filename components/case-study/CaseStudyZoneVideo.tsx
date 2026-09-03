"use client";

import "@/components/case-study/case-study-zone-video.css";
import { PauseIcon24 } from "@/components/icons/PauseIcon24";
import { PlayIcon24 } from "@/components/icons/PlayIcon24";
import { ReplayIcon24 } from "@/components/icons/ReplayIcon24";
import { useAutoplayOnVisible } from "@/hooks/useAutoplayOnVisible";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

type CaseStudyZoneVideoProps = {
  src: string;
  label: string;
  className?: string;
};

export function CaseStudyZoneVideo({
  src,
  label,
  className,
}: CaseStudyZoneVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(false);

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
  }, [syncPlayingState, handleEnded]);

  useAutoplayOnVisible(rootRef, videoRef, { userPausedRef });

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

  const frameClass = [
    "case-study-placeholder-frame",
    "case-study-zone-video",
    className,
    controlsVisible ? "is-controls-visible" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={frameClass}
      aria-label={label}
      data-cursor-static
      onPointerUp={handleFramePointerUp}
    >
      <div className="case-study-zone-video__media-wrap">
        <video
          ref={videoRef}
          className="case-study-zone-video__media"
          src={src}
          muted
          playsInline
          preload="metadata"
          aria-label={label}
        />
      </div>
      <div className="case-study-zone-video__controls">
        <button
          type="button"
          className="case-study-zone-video__control"
          onClick={handleReplay}
          aria-label="Replay video"
        >
          <ReplayIcon24 />
        </button>
        <button
          type="button"
          className="case-study-zone-video__control"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon24 /> : <PlayIcon24 />}
        </button>
      </div>
    </div>
  );
}
