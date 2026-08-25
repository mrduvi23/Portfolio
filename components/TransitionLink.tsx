"use client";

import {
  getInternalNavigationHref,
  isModifiedPointerEvent,
  isSameRoute,
} from "@/lib/navigation";
import { navigateWithPageTransition } from "@/lib/page-transition";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

/** Runs page exit before navigation so the destination never flashes early. */
export function TransitionLink({
  prefetch = false,
  onClick,
  ...props
}: TransitionLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (isModifiedPointerEvent(event)) return;

    const targetHref = getInternalNavigationHref(event.currentTarget);
    if (!targetHref) return;
    if (isSameRoute(targetHref, pathname)) return;

    event.preventDefault();
    void navigateWithPageTransition(targetHref);
  };

  return <Link prefetch={prefetch} onClick={handleClick} {...props} />;
}
