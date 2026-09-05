"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInspirationGallery } from "@/components/about/inspiration-gallery-context";
import "./inspiration-gallery-card.css";

const LOADER_VIDEO_SRC = "/loader/Header.MP4";

const COVER_MOTION_MS = 400;
const LABEL_DELAY_MS = COVER_MOTION_MS + 200;

type InspirationGalleryCardProps = {
  label: string;
  videoSrc: string;
  href: string;
  className?: string;
  galleryIndex?: number;
};

export function InspirationGalleryCard({
  label,
  videoSrc,
  href,
  className,
  galleryIndex = 0,
}: InspirationGalleryCardProps) {
  const { layout, stream } = useInspirationGallery();
  const sliceVideoRef = useRef<HTMLVideoElement>(null);
  const contentVideoRef = useRef<HTMLVideoElement>(null);
  const revealTimerRef = useRef<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [canOpen, setCanOpen] = useState(false);
  const cardRect = layout?.cards[galleryIndex];

  function scheduleReveal() {
    setIsRevealed(true);
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
    }
    revealTimerRef.current = window.setTimeout(() => {
      setCanOpen(true);
      revealTimerRef.current = null;
    }, COVER_MOTION_MS);
  }

  function resetReveal() {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    setIsRevealed(false);
    setCanOpen(false);
  }

  useEffect(() => {
    return () => {
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = sliceVideoRef.current;
    if (!video) return;

    if (stream) {
      video.srcObject = stream;
      video.removeAttribute("src");
      void video.play().catch(() => {});
      return () => {
        video.srcObject = null;
      };
    }

    video.srcObject = null;
    video.src = LOADER_VIDEO_SRC;
    video.loop = true;
    void video.play().catch(() => {});
  }, [stream, cardRect]);

  useEffect(() => {
    const video = contentVideoRef.current;
    if (!video) return;

    if (!isRevealed) {
      video.pause();
      return;
    }

    video.load();
    void video.play().catch(() => {});
  }, [isRevealed, videoSrc]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={[
        "inspiration-gallery-card",
        "aspect-[341/222] min-[764px]:aspect-[400/384]",
        isRevealed ? "inspiration-gallery-card--revealed" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--inspiration-label-delay": `${LABEL_DELAY_MS}ms`,
        } as CSSProperties
      }
      onMouseEnter={scheduleReveal}
      onMouseLeave={resetReveal}
      onFocus={scheduleReveal}
      onBlur={resetReveal}
      onClick={(event) => {
        if (!canOpen) {
          event.preventDefault();
          scheduleReveal();
        }
      }}
      onTouchEnd={(event) => {
        if (!canOpen) {
          event.preventDefault();
          scheduleReveal();
        }
      }}
    >
      <div className="inspiration-gallery-card__media">
        <video
          ref={contentVideoRef}
          className="inspiration-gallery-card__content-video"
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          draggable={false}
        />
        <p className="inspiration-gallery-card__label type-body">
          {label}
        </p>
      </div>

      <div className="inspiration-gallery-card__cover">
        <div
          className={
            layout && cardRect
              ? "inspiration-gallery-card__video-slice"
              : "inspiration-gallery-card__video-fill"
          }
          style={
            layout && cardRect
              ? {
                  width: layout.width,
                  height: layout.height,
                  left: -cardRect.x,
                  top: -cardRect.y,
                }
              : undefined
          }
        >
          <video
            ref={sliceVideoRef}
            className="inspiration-gallery-card__video"
            muted
            loop
            playsInline
            preload="auto"
            draggable={false}
          />
        </div>
        <span className="inspiration-gallery-card__mark type-h5">?</span>
      </div>
    </a>
  );
}
