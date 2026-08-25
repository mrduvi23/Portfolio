/** Paths from `public/icons/IconDownload.svg` — color via `currentColor` */
const DOWNLOAD_PATHS = {
  arrow:
    "M5.64648 7.64648C5.45122 7.84175 5.45122 8.15825 5.64648 8.35352L7.64648 10.3535C7.74025 10.4473 7.86739 10.5 8 10.5C8.13261 10.5 8.25975 10.4473 8.35352 10.3535L10.3535 8.35352C10.5488 8.15825 10.5488 7.84175 10.3535 7.64648C10.1583 7.45122 9.84175 7.45122 9.64649 7.64648L8.5 8.79297L8.5 2C8.5 1.72386 8.27614 1.5 8 1.5C7.72386 1.5 7.5 1.72386 7.5 2L7.5 8.79297L6.35352 7.64648C6.15825 7.45122 5.84175 7.45122 5.64648 7.64648Z",
  base: "M14 14.5H2C1.72386 14.5 1.5 14.2761 1.5 14C1.5 13.7239 1.72386 13.5 2 13.5H14C14.2761 13.5 14.5 13.7239 14.5 14C14.5 14.2761 14.2761 14.5 14 14.5Z",
} as const;

export function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d={DOWNLOAD_PATHS.arrow} fill="currentColor" />
      <path d={DOWNLOAD_PATHS.base} fill="currentColor" />
    </svg>
  );
}
