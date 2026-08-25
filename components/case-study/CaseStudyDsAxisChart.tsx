import { DsAxisArrows } from "@/components/case-study/DsAxisArrows";

/** Centro de cada marca en el plot (%). Mantiene el orden al escalar el ancho. */
const BRANDS = [
  { label: "BRAND 1", x: "86%", y: "10%" },
  { label: "BRAND 2", x: "72%", y: "24%" },
  { label: "BRAND 3", x: "56%", y: "44%" },
  { label: "BRAND 4", x: "40%", y: "48%" },
  { label: "BRAND 5", x: "32%", y: "66%" },
  { label: "BRAND 6", x: "24%", y: "84%" },
  { label: "BRAND 7", x: "12%", y: "90%" },
  { label: "BRAND 8", x: "5%", onXAxis: true },
] as const;

/** Ejes D.S. Implementation (Y) × D.S. Development (X) — placeholder case study */
export function CaseStudyDsAxisChart() {
  return (
    <>
      <div className="case-study-ds-axis">
        <div className="case-study-ds-axis__figure">
          <div className="case-study-ds-axis__plot-area">
            <DsAxisArrows />
            <div className="case-study-ds-axis__plot">
              {BRANDS.map((brand) => (
                <p
                  key={brand.label}
                  className={
                    "onXAxis" in brand && brand.onXAxis
                      ? "case-study-ds-axis__brand case-study-ds-axis__brand--on-x-axis"
                      : "case-study-ds-axis__brand"
                  }
                  style={
                    "onXAxis" in brand && brand.onXAxis
                      ? { left: brand.x }
                      : { left: brand.x, top: brand.y }
                  }
                >
                  {brand.label}
                </p>
              ))}
            </div>
            <div className="case-study-ds-axis__y-label-row">
              <span className="case-study-ds-axis__y-line-spacer" aria-hidden />
              <p className="case-study-ds-axis__label case-study-ds-axis__label--y">
                D.S. Implementation
              </p>
            </div>
          </div>
          <p className="case-study-ds-axis__label case-study-ds-axis__label--x">
            D.S. Development
          </p>
        </div>
      </div>
      <p className="case-study-ds-axis__legend text-[var(--color-primitives-grey-80)]">
        D.S. = Design System
      </p>
    </>
  );
}
