/**
 * Session loader — responsive video inset + welcome typography.
 * LOCKED: do not change values unless explicitly requested by the product owner.
 */
export type LoaderMetrics = {
  videoInsetPx: number;
  fontSizePx: number;
  letterSpacing: string;
  lineHeightPx: number;
};

export function getLoaderLineHeightPx(fontSizePx: number): number {
  return fontSizePx * 1.2;
}

export function getLoaderMetrics(viewportWidth: number): LoaderMetrics {
  if (viewportWidth >= 1920) {
    return {
      videoInsetPx: 64,
      fontSizePx: 64,
      letterSpacing: "-0.04em",
      lineHeightPx: getLoaderLineHeightPx(64),
    };
  }
  if (viewportWidth >= 1440) {
    return {
      videoInsetPx: 48,
      fontSizePx: 64,
      letterSpacing: "-0.04em",
      lineHeightPx: getLoaderLineHeightPx(64),
    };
  }
  if (viewportWidth >= 1280) {
    return {
      videoInsetPx: 40,
      fontSizePx: 52,
      letterSpacing: "-0.04em",
      lineHeightPx: getLoaderLineHeightPx(52),
    };
  }
  if (viewportWidth >= 764) {
    return {
      videoInsetPx: 32,
      fontSizePx: 40,
      letterSpacing: "-0.02em",
      lineHeightPx: getLoaderLineHeightPx(40),
    };
  }
  return {
    videoInsetPx: 20,
    fontSizePx: 40,
    letterSpacing: "-0.02em",
    lineHeightPx: getLoaderLineHeightPx(40),
  };
}
