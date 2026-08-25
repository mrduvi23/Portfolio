"use client";

import { createContext, useContext } from "react";

export type CardRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GalleryLayout = {
  width: number;
  height: number;
  cards: CardRect[];
};

type InspirationGalleryContextValue = {
  layout: GalleryLayout | null;
  stream: MediaStream | null;
};

export const InspirationGalleryContext =
  createContext<InspirationGalleryContextValue>({
    layout: null,
    stream: null,
  });

export function useInspirationGallery() {
  return useContext(InspirationGalleryContext);
}
