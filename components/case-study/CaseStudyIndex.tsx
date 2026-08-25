"use client";

import "@/components/case-study/case-study-index.css";
import { useCaseStudyIndexSpy } from "@/hooks/useCaseStudyIndexSpy";
import {
  getExpandedNavParentId,
} from "@/lib/case-studies/nav-utils";
import type { CaseStudyNavItem } from "@/lib/case-studies/types";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

const SUBSECTION_COLLAPSE_MS = 420;

function GapTick({
  variant,
}: {
  variant: "main" | "sub";
}) {
  return (
    <span
      className={[
        "case-study-index__tick case-study-index__tick--gap",
        variant === "main"
          ? "case-study-index__tick--gap-main"
          : "case-study-index__tick--gap-sub",
      ].join(" ")}
      aria-hidden
    />
  );
}

function IndexEntry({
  item,
  variant,
  isActive,
  showLabel,
  isHovered,
  onHover,
  onSelect,
}: {
  item: CaseStudyNavItem;
  variant: "main" | "sub";
  isActive: boolean;
  showLabel: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className="case-study-index__entry"
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(item.id)}
      onBlur={() => onHover(null)}
      aria-current={isActive ? "true" : undefined}
    >
      <span
        className={[
          "case-study-index__tick case-study-index__tick--section",
          variant === "main"
            ? "case-study-index__tick--section-main"
            : "case-study-index__tick--section-sub",
          isActive ? "case-study-index__tick--active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden
      />
      <span
        className={[
          "case-study-index__label",
          showLabel ? "case-study-index__label--visible" : "",
          isActive ? "case-study-index__label--active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {item.label}
        {isHovered ? (
          <span className="case-study-index__marker" aria-hidden>
            ·
          </span>
        ) : null}
      </span>
    </button>
  );
}

export function CaseStudyIndex({ nav }: { nav: CaseStudyNavItem[] }) {
  const [mounted, setMounted] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mountedParentId, setMountedParentId] = useState<string | null>(null);
  const [openParentId, setOpenParentId] = useState<string | null>(null);
  const [anchorTop, setAnchorTop] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pinnedTopRef = useRef<number | null>(null);
  const { activeId, hovering, setHovering, scrollToId } =
    useCaseStudyIndexSpy(nav);

  const expandedParentId = getExpandedNavParentId(nav, activeId);
  const isSubsAnimating = openParentId !== null || mountedParentId !== null;

  const measureCollapsedTop = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return null;
    const height = nav.getBoundingClientRect().height;
    return window.innerHeight / 2 - height / 2;
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    if (expandedParentId && pinnedTopRef.current === null) {
      const nav = navRef.current;
      pinnedTopRef.current =
        nav?.getBoundingClientRect().top ?? measureCollapsedTop();
      if (pinnedTopRef.current !== null) {
        setAnchorTop(pinnedTopRef.current);
      }
      return;
    }

    if (!expandedParentId && !mountedParentId) {
      pinnedTopRef.current = null;
      const top = measureCollapsedTop();
      if (top !== null) setAnchorTop(top);
    }
  }, [mounted, expandedParentId, mountedParentId, measureCollapsedTop]);

  useEffect(() => {
    if (!mounted || isSubsAnimating) return;

    const onResize = () => {
      const top = measureCollapsedTop();
      if (top !== null) setAnchorTop(top);
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [mounted, isSubsAnimating, measureCollapsedTop]);

  useEffect(() => {
    if (expandedParentId) {
      setMountedParentId(expandedParentId);
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setOpenParentId(expandedParentId);
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }

    setOpenParentId(null);
    const timer = window.setTimeout(() => {
      setMountedParentId(null);
    }, SUBSECTION_COLLAPSE_MS);

    return () => window.clearTimeout(timer);
  }, [expandedParentId]);

  const showAllLabels = hovering;
  const subsExpanded = openParentId !== null || mountedParentId !== null;

  const indexNav = (
    <div
      className="case-study-index-anchor"
      data-cursor-static
      style={
        anchorTop !== null
          ? ({ "--case-study-index-top": `${anchorTop}px` } as CSSProperties)
          : undefined
      }
    >
      <nav
        ref={navRef}
        className={[
          "case-study-index",
          subsExpanded ? "case-study-index--subs-expanded" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="Case study sections"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setHoveredId(null);
        }}
      >
        {nav.map((item, navIndex) => {
          const isActive = activeId === item.id;
          const isParentOfActive =
            item.children?.some((child) => child.id === activeId) ?? false;
          const hasChildren = Boolean(item.children?.length);
          const isGroupOpen = openParentId === item.id;
          const isGroupMounted = mountedParentId === item.id;
          const childCount = item.children?.length ?? 0;

          return (
            <div
              key={item.id}
              className={[
                "case-study-index__group",
                isGroupOpen ? "case-study-index__group--open" : "",
                isGroupMounted && !isGroupOpen
                  ? "case-study-index__group--closing"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {navIndex > 0 ? <GapTick variant="main" /> : null}
              <IndexEntry
                item={item}
                variant="main"
                isActive={isActive}
                showLabel={showAllLabels || isActive || isParentOfActive}
                isHovered={hoveredId === item.id}
                onHover={setHoveredId}
                onSelect={scrollToId}
              />
              {hasChildren && isGroupMounted ? (
                <div className="case-study-index__children">
                  <div
                    className="case-study-index__children-inner"
                    style={
                      {
                        "--sub-count": childCount,
                      } as CSSProperties
                    }
                  >
                    {item.children!.map((child, childIndex) => (
                      <div
                        key={child.id}
                        className="case-study-index__sub-item"
                        style={
                          {
                            "--sub-index": childIndex,
                          } as CSSProperties
                        }
                      >
                        <GapTick variant="sub" />
                        <IndexEntry
                          item={child}
                          variant="sub"
                          isActive={activeId === child.id}
                          showLabel={
                            showAllLabels || activeId === child.id
                          }
                          isHovered={hoveredId === child.id}
                          onHover={setHoveredId}
                          onSelect={scrollToId}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </div>
  );

  if (!mounted) return null;

  return createPortal(indexNav, document.body);
}
