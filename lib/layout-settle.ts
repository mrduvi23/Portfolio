/** Fired when scroll shell, loader, or route transition has finished affecting layout. */
export const LAYOUT_SETTLE_EVENT = "darreba:layout-settle";

export function notifyLayoutSettle() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LAYOUT_SETTLE_EVENT));
}
