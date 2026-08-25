const POINTER_PATH =
  "M6.90088 16.9893L4.40088 3.98926L15.4009 10.4893L9.90088 11.9893L6.90088 16.9893Z";
const POINTER_STROKE_PATH =
  "M4.65479 3.55859L15.6548 10.0586L16.6733 10.6602L15.5327 10.9717L10.2251 12.4189L7.32959 17.2461L6.65674 18.3682L6.40967 17.084L3.90967 4.08398L3.70068 2.99414L4.65479 3.55859Z";

type UciFigmaPointerProps = {
  fill?: string;
  className?: string;
};

/** Paths from `public/work/uci/Pointer.svg` */
export function UciFigmaPointer({
  fill = "#FFC700",
  className,
}: UciFigmaPointerProps) {
  return (
    <svg
      width={21}
      height={24}
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      style={{ filter: "drop-shadow(0 1px 3px rgb(0 0 0 / 35%))" }}
    >
      <path d={POINTER_PATH} fill={fill} />
      <path d={POINTER_STROKE_PATH} stroke="white" strokeLinecap="square" />
    </svg>
  );
}

type UciFigmaCursorProps = {
  label: string;
  pointerFill: string;
  labelBackground: string;
  labelColor?: string;
  className?: string;
};

export function UciFigmaCursor({
  label,
  pointerFill,
  labelBackground,
  labelColor = "var(--color-heading)",
  className,
}: UciFigmaCursorProps) {
  return (
    <div className={`uci-kickoff-board__cursor ${className ?? ""}`.trim()}>
      <UciFigmaPointer fill={pointerFill} className="uci-kickoff-board__pointer" />
      <span
        className="uci-kickoff-board__cursor-label"
        style={{
          backgroundColor: labelBackground,
          color: labelColor,
        }}
      >
        {label}
      </span>
    </div>
  );
}
