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
import { useLazyMediaLoad } from "@/hooks/useLazyMediaLoad";
import "./inspiration-gallery.css";

const LOADER_VIDEO_SRC = "/loader/Header.MP4";

export function InspirationGallery({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const masterVideoRef = useRef<HTMLVideoElement>(null);
  const [layout, setLayout] = useState<GalleryLayout | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const shouldLoad = useLazyMediaLoad(rootRef);

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
    if (!shouldLoad) {
      setStream(null);
      return;
    }

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
    return () => video.removeEventListener("playing", attachStream);
  }, [shouldLoad]);

  return (
    <InspirationGalleryContext.Provider value={{ layout, stream }}>
      <div ref={rootRef} className="inspiration-gallery">
        <video
          ref={masterVideoRef}
          className="inspiration-gallery__master-video"
          src={shouldLoad ? LOADER_VIDEO_SRC : undefined}
          autoPlay={shouldLoad}
          muted
          loop
          playsInline
          preload={shouldLoad ? "metadata" : "none"}
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
