"use client";

import "@/components/case-study/case-study-hero-video.css";
import { PauseIcon24 } from "@/components/icons/PauseIcon24";
import { PlayIcon24 } from "@/components/icons/PlayIcon24";
import { ReplayIcon24 } from "@/components/icons/ReplayIcon24";
import { useLazyMediaLoad } from "@/hooks/useLazyMediaLoad";
import { useCallback, useEffect, useRef, useState } from "react";

type CaseStudyHeroVideoProps = {
  src: string;
  poster?: string;
  alt: string;
};

export function CaseStudyHeroVideo({ src, poster, alt }: CaseStudyHeroVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const shouldLoad = useLazyMediaLoad(rootRef);

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
    if (!shouldLoad) return;

    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {
      setIsPlaying(false);
    });

    video.addEventListener("play", syncPlayingState);
    video.addEventListener("pause", syncPlayingState);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", syncPlayingState);
      video.removeEventListener("pause", syncPlayingState);
      video.removeEventListener("ended", handleEnded);
    };
  }, [shouldLoad, syncPlayingState, handleEnded]);

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play();
  };

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      if (video.ended) video.currentTime = 0;
      void video.play();
      return;
    }

    video.pause();
  };

  return (
    <div ref={rootRef} className="case-study-hero-video" data-cursor-static>
      <video
        ref={videoRef}
        className="case-study-hero-video__media"
        src={shouldLoad ? src : undefined}
        poster={poster}
        muted
        playsInline
        preload={shouldLoad ? "metadata" : "none"}
        aria-label={alt}
      />
      <div className="case-study-hero-video__controls">
        <button
          type="button"
          className="case-study-hero-video__control"
          onClick={handleReplay}
          aria-label="Replay video"
        >
          <ReplayIcon24 />
        </button>
        <button
          type="button"
          className="case-study-hero-video__control"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon24 /> : <PlayIcon24 />}
        </button>
      </div>
    </div>
  );
}
