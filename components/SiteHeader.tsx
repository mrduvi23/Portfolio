"use client";

import { useNavbarScrollVisibility } from "@/hooks/useNavbarScrollVisibility";
import { MenuToggleIcon } from "@/components/icons/MenuToggleIcon";
import { TransitionLink } from "@/components/TransitionLink";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { label: "WORK", href: "/" },
  { label: "ABOUT ME", href: "/about" },
] as const;

const talk = {
  label: "LET'S TALK",
  href: "mailto:davidarrebacorral@gmail.com",
} as const;

const LOGO_TEXT = "D.ARREBA";

const NAV_LINK_MOTION =
  "transition-transform duration-200 [transition-timing-function:cubic-bezier(0.2,0,0,1)]";

/** Stagger per character, left → right on hover/focus. */
const LOGO_CHAR_STAGGER_MS = 48;

type LogoCharSlideProps = {
  char: string;
  delayMs: number;
};

function LogoCharSlide({ char, delayMs }: LogoCharSlideProps) {
  return (
    <span className="inline-block h-[24px] overflow-hidden align-top">
      <span
        className={`flex flex-col gap-[10px] ${NAV_LINK_MOTION} group-hover:-translate-y-[34px] group-focus-visible:-translate-y-[34px]`}
        style={{ transitionDelay: `${delayMs}ms` }}
      >
        <span className="text-[var(--color-primitives-black)]">{char}</span>
        <span className="text-[var(--color-primitives-black)]">{char}</span>
      </span>
    </span>
  );
}

function NavLogoLink() {
  const chars = [...LOGO_TEXT];

  return (
    <TransitionLink
      href="/"
      className="type-label-caps group inline-flex items-center outline-offset-4"
      aria-label={LOGO_TEXT}
    >
      {chars.map((char, index) => (
        <LogoCharSlide
          key={`${char}-${index}`}
          char={char}
          delayMs={index * LOGO_CHAR_STAGGER_MS}
        />
      ))}
    </TransitionLink>
  );
}

type NavItemProps = {
  href: string;
  label: string;
  active?: boolean;
};

function NavAnimatedLink({ href, label, active = false }: NavItemProps) {
  return (
    <TransitionLink
      href={href}
      className="type-body uppercase group relative h-[24px] overflow-hidden outline-offset-4"
    >
      <span
        className={`flex flex-col gap-[10px] ${NAV_LINK_MOTION} ${
          active
            ? "-translate-y-[34px]"
            : "group-hover:-translate-y-[34px] group-focus-visible:-translate-y-[34px]"
        }`}
      >
        <span
          className={`text-[var(--color-body)] ${
            active
              ? "underline decoration-1 underline-offset-4"
              : "group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-4"
          }`}
        >
          {label}
        </span>
        <span className="text-[var(--color-heading)] underline decoration-1 underline-offset-4">
          {label}
        </span>
      </span>
    </TransitionLink>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  /** Mobile drawer open: keep navbar + menu fixed while scrolling */
  const scrollVisible = useNavbarScrollVisibility({ enabled: !open });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  return (
    <header
      className="site-header border-b border-[var(--color-border)] bg-[var(--color-bg)]"
      data-scroll-state={scrollVisible ? "visible" : "hidden"}
    >
      <div className="page-shell flex h-[80px] min-h-[80px] max-h-[80px] shrink-0 items-center justify-between">
        <NavLogoLink />

        <nav
          className="hidden min-[764px]:flex items-center gap-6 text-[var(--color-body)]"
          aria-label="Main"
        >
          {nav.map((item) => (
            <NavAnimatedLink
              key={item.label}
              href={item.href}
              label={item.label}
              active={isActive(item.href)}
            />
          ))}
          <NavAnimatedLink href={talk.href} label={talk.label} />
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--color-primitives-black)] outline-offset-4 transition-transform duration-150 ease-out active:scale-[0.96] min-[764px]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primitives-grey-70)]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuToggleIcon open={open} />
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--color-border)] bg-[var(--color-bg)] min-[764px]:hidden"
        >
          <div className="page-shell py-4">
            <div className="type-body flex flex-col gap-4 uppercase text-[var(--color-body)]">
              {nav.map((item) => (
                <TransitionLink
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={
                    isActive(item.href)
                      ? "text-[var(--color-heading)] underline decoration-1 underline-offset-4"
                      : ""
                  }
                >
                  {item.label}
                </TransitionLink>
              ))}
              <a href={talk.href} onClick={() => setOpen(false)}>
                {talk.label}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
