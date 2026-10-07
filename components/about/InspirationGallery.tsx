"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { InspirationGalleryCard } from "@/components/about/InspirationGalleryCard";
import {
  InspirationGalleryContext,
  type GalleryLayout,
} from "@/components/about/inspiration-gallery-context";
import "./inspiration-gallery.css";

const LOADER_VIDEO_SRC = "/loader/Header.MP4";

export function InspirationGallery({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const gridRef = useRef<HTMLDivElement>(null);
  const masterVideoRef = useRef<HTMLVideoElement>(null);
  const [layout, setLayout] = useState<GalleryLayout | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const gridRect = grid.getBoundingClientRect();
    const cardNodes = grid.querySelectorAll<HTMLElement>(
      "[data-inspiration-card]",
    );

    const cards = Array.from(cardNodes).map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        x: rect.left - gridRect.left,
        y: rect.top - gridRect.top,
        width: rect.width,
        height: rect.height,
      };
    });

    setLayout({
      width: gridRect.width,
      height: gridRect.height,
      cards,
    });
  }, []);

  useLayoutEffect(() => {
    measure();

    const grid = gridRef.current;
    if (!grid) return;

    const observer = new ResizeObserver(measure);
    observer.observe(grid);

    return () => observer.disconnect();
  }, [measure, items.length]);

  useEffect(() => {
    const video = masterVideoRef.current;
    if (!video) return;

    const attachStream = () => {
      try {
        const media = video as HTMLVideoElement & {
          captureStream(): MediaStream;
        };
        setStream(media.captureStream());
      } catch {
        setStream(null);
      }
    };

    if (!video.paused && video.readyState >= 2) {
      attachStream();
    }

    video.addEventListener("playing", attachStream);
    void video.play().catch(() => {});
    return () => video.removeEventListener("playing", attachStream);
  }, []);

  return (
    <InspirationGalleryContext.Provider value={{ layout, stream }}>
      <div className="inspiration-gallery">
        <video
          ref={masterVideoRef}
          className="inspiration-gallery__master-video"
          src={LOADER_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          draggable={false}
        />

        <div
          ref={gridRef}
          className="inspiration-gallery__grid grid grid-cols-1 gap-4 min-[764px]:grid-cols-3"
        >
          {items.map((item, index) => (
            <div key={index} data-inspiration-card className="inspiration-gallery__cell">
              {isValidElement(item)
                ? cloneElement(item as ReactElement<{ galleryIndex?: number }>, {
                    galleryIndex: index,
                  })
                : item}
            </div>
          ))}
        </div>
      </div>
    </InspirationGalleryContext.Provider>
  );
}

export { InspirationGalleryCard };
