/**
 * Shared layout: .page-shell + .page-grid-12 (see globals.css).
 * Spans: phone = 2-col grid, ≥764px = 12-col grid.
 */

export const span2of2_12of12 =
  "col-span-2 min-[764px]:col-span-12" as const;

export const span2of2_7of12 =
  "col-span-2 min-[764px]:col-span-7" as const;

export const span2of2_5of12 =
  "col-span-2 min-[764px]:col-span-5" as const;

/** One column on the 2-col phone grid (half width); adjust desktop span as needed. */
export const span1of2_6of12 =
  "col-span-1 min-[764px]:col-span-6" as const;

/** Case study body: full width on phone; 10 central cols (764–1023px); 8 central cols (≥1024px). */
export const caseStudyContentSpan =
  "col-span-2 min-[764px]:col-start-2 min-[764px]:col-span-10 min-[1024px]:col-start-3 min-[1024px]:col-span-8" as const;

/** Nav bottom → first page content: 64px below 1280px, 128px from 1280px. */
export const pageContentTopOffset = "pt-16 min-[1280px]:pt-32";

/** Last page content → footer: 80px below 1280px, 128px from 1280px. */
export const pageFooterGap = "pt-20 min-[1280px]:pt-32";

export function PageFooterShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={["mt-auto", pageFooterGap].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export function PageMain({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={["page-shell flex-1", className].filter(Boolean).join(" ")}
    >
      {children}
    </main>
  );
}

export function PageGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={["page-grid-12", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
