export function isModifiedPointerEvent(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

/** Same-origin in-app path from an anchor, or null if not an internal route link. */
export function getInternalNavigationHref(
  anchor: HTMLAnchorElement,
): string | null {
  if (anchor.target === "_blank") return null;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }

  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

export function normalizePath(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function isSameRoute(a: string, b: string): boolean {
  return normalizePath(a) === normalizePath(b);
}
