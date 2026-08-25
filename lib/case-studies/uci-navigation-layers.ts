import { assets } from "@/lib/assets";

export type UciNavigationImage = {
  id: string;
  src: string;
  alt: string;
  natural: { width: number; height: number };
  /** Display width at the 922px reference frame. */
  displayW: number;
};

/** Left group — aligned to the right edge of the column. */
export const uciNavigationLeftGroup: UciNavigationImage[] = [
  {
    id: "megamenu-02",
    src: assets.uciNavMegamenu02,
    alt: "Endesa press room mega menu navigation",
    natural: { width: 1978, height: 1030 },
    displayW: 446,
  },
  {
    id: "anchor-menus-02",
    src: assets.uciNavAnchorMenus02,
    alt: "Bankinter press room anchor menu navigation",
    natural: { width: 2200, height: 367 },
    displayW: 496,
  },
  {
    id: "anchor-menus-03",
    src: assets.uciNavAnchorMenus03,
    alt: "Press room anchor menu on article page",
    natural: { width: 2200, height: 528 },
    displayW: 496,
  },
];

/** Right group — aligned to the left edge of the column. */
export const uciNavigationRightGroup: UciNavigationImage[] = [
  {
    id: "megamenu-01",
    src: assets.uciNavMegamenu01,
    alt: "Telefónica press room mega menu navigation",
    natural: { width: 1978, height: 999 },
    displayW: 446,
  },
  {
    id: "anchor-menus-01",
    src: assets.uciNavAnchorMenus01,
    alt: "MAPFRE press room anchor menu navigation",
    natural: { width: 2200, height: 592 },
    displayW: 496,
  },
];
