/**
 * Amicro orbiting-dot, restyled with the portfolio semantic colors.
 * The spin is CSS so the mark can appear in server HTML, before hydration,
 * and so `prefers-reduced-motion` leaves a static indicator.
 * Ring: body text. Center: muted text. Traveling dot: heading.
 */
export function OrbitingDot() {
  return (
    <div className="media-loader__mark relative flex h-10 w-10 items-center justify-center">
      <div className="h-2 w-2 rounded-full bg-[var(--color-text-muted)]" />
      <div className="media-loader__spin absolute h-full w-full rounded-full border border-[var(--color-body)]">
        <div className="absolute top-0 left-1/2 -mt-1.5 -ml-1.5 h-3 w-3 rounded-full bg-[var(--color-heading)]" />
      </div>
    </div>
  );
}
