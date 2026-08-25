"use client";

type MenuToggleIconProps = {
  open: boolean;
};

/** Paths from `public/icons/IconMenu.svg` — color via `currentColor` */
const MENU_PATHS = {
  top: "M12 7.5C12.2761 7.5 12.5 7.72386 12.5 8C12.5 8.27614 12.2761 8.5 12 8.5H7C6.72386 8.5 6.5 8.27614 6.5 8C6.5 7.72386 6.72386 7.5 7 7.5H12Z",
  mid: "M17 11.5C17.2761 11.5 17.5 11.7239 17.5 12C17.5 12.2761 17.2761 12.5 17 12.5H7C6.72386 12.5 6.5 12.2761 6.5 12C6.5 11.7239 6.72386 11.5 7 11.5H17Z",
  bot: "M17 15.5C17.2761 15.5 17.5 15.7239 17.5 16C17.5 16.2761 17.2761 16.5 17 16.5H12C11.7239 16.5 11.5 16.2761 11.5 16C11.5 15.7239 11.7239 15.5 12 15.5H17Z",
} as const;

/** Path from `public/icons/IconClose.svg` (16×16), centered in 24×24 */
const CLOSE_PATH =
  "M10.4753 4.81802C10.6706 4.62296 10.9871 4.62282 11.1823 4.81802C11.3774 5.01322 11.3773 5.32983 11.1823 5.52505L8.70675 7.99966L11.1823 10.4752C11.3772 10.6705 11.3775 10.9871 11.1823 11.1823C10.9872 11.3774 10.6706 11.3772 10.4753 11.1823L7.99972 8.70669L5.52511 11.1823C5.32989 11.3773 5.0133 11.3773 4.81808 11.1823C4.62287 10.9871 4.62298 10.6705 4.81808 10.4752L7.29269 7.99966L4.81808 5.52505C4.62282 5.32979 4.62282 5.01328 4.81808 4.81802C5.01334 4.62275 5.32985 4.62275 5.52511 4.81802L7.99972 7.29263L10.4753 4.81802Z";

/** Mobile menu — 24×24 hit area; swaps between IconMenu and IconClose. */
export function MenuToggleIcon({ open }: MenuToggleIconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      {open ? (
        <g transform="translate(4 4)">
          <path d={CLOSE_PATH} fill="currentColor" />
        </g>
      ) : (
        <>
          <path d={MENU_PATHS.top} fill="currentColor" />
          <path d={MENU_PATHS.mid} fill="currentColor" />
          <path d={MENU_PATHS.bot} fill="currentColor" />
        </>
      )}
    </svg>
  );
}
