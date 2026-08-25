"use client";

import type { ComponentProps, MouseEvent } from "react";

const HOVER_OFFSET_PX = 5;

/** Desplazamiento sutil opuesto al cursor — entra por la izquierda, el círculo se mueve a la derecha */
export function MdsHoverFillCircle({
  className,
  onMouseMove,
  onMouseLeave,
  ...rest
}: ComponentProps<"div">) {
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = Math.max(-1, Math.min(1, (event.clientX - cx) / (rect.width / 2)));
    const ny = Math.max(-1, Math.min(1, (event.clientY - cy) / (rect.height / 2)));

    el.style.setProperty("--mds-hover-x", `${(-nx * HOVER_OFFSET_PX).toFixed(2)}px`);
    el.style.setProperty("--mds-hover-y", `${(-ny * HOVER_OFFSET_PX).toFixed(2)}px`);
    onMouseMove?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--mds-hover-x", "0px");
    event.currentTarget.style.setProperty("--mds-hover-y", "0px");
    onMouseLeave?.(event);
  };

  const classes = ["mds-ecosystem__hover-fill", className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    />
  );
}
