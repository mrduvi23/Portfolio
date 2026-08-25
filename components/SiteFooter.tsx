"use client";

import { TransitionLink } from "@/components/TransitionLink";
import { useEffect, useState } from "react";
import { contact } from "@/lib/content";

function formatDublinParts(now: Date) {
  const dateFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Dublin",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeFmt = new Intl.DateTimeFormat("en-IE", {
    timeZone: "Europe/Dublin",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return { dateLine: dateFmt.format(now), timeLine: timeFmt.format(now) };
}

export function SiteFooter() {
  /** Avoid hydration mismatch: SSR and first client paint must match; clock starts after mount. */
  const [parts, setParts] = useState<ReturnType<typeof formatDublinParts> | null>(
    null,
  );

  useEffect(() => {
    const tick = () => setParts(formatDublinParts(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="page-shell pb-10 pt-0">
      <div className="w-full border-t border-[var(--color-border)]" aria-hidden />

      <div className="type-body mt-10 flex flex-col gap-1 text-[var(--color-body)] max-[763px]:gap-4 min-[764px]:flex-row min-[764px]:items-start min-[764px]:justify-between">
        <div className="order-2 flex flex-col gap-1 min-[764px]:order-1">
          <p>{contact.location}</p>
          <p className="tabular-nums">
            {parts?.dateLine ?? "\u00a0"}
          </p>
          <p className="tabular-nums">
            {parts?.timeLine ?? "\u00a0"}
          </p>
        </div>
        <div className="order-1 flex flex-col gap-1 min-[764px]:order-2 min-[764px]:items-end min-[764px]:text-right">
          <a
            className="transition-opacity duration-200 hover:opacity-70"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          <TransitionLink
            className="transition-opacity duration-200 hover:opacity-70"
            href={contact.linkedInHref}
            target="_blank"
            rel="noreferrer"
          >
            {contact.linkedInLabel}
          </TransitionLink>
          <TransitionLink
            className="transition-opacity duration-200 hover:opacity-70"
            href={contact.githubHref}
            target="_blank"
            rel="noreferrer"
          >
            {contact.githubLabel}
          </TransitionLink>
          <TransitionLink
            className="transition-opacity duration-200 hover:opacity-70"
            href="/privacy"
          >
            Privacy & cookies
          </TransitionLink>
        </div>
      </div>
    </footer>
  );
}
