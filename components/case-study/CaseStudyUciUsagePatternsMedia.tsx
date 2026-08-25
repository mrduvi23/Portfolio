import "@/components/case-study/case-study-uci-usage-patterns.css";
import { assets } from "@/lib/assets";
import Image from "next/image";

const USAGE_PATTERN_LOGOS = [
  {
    src: assets.uciUsageEndesa,
    alt: "Endesa press room hub page",
    className: "case-study-uci-usage-patterns__image--endesa",
    natural: { width: 290, height: 595 },
  },
  {
    src: assets.uciUsageSantander,
    alt: "Santander press room hub page",
    className: "case-study-uci-usage-patterns__image--santander",
    natural: { width: 290, height: 647 },
  },
  {
    src: assets.uciUsageMafre,
    alt: "MAPFRE press room hub page",
    className: "case-study-uci-usage-patterns__image--mafre",
    natural: { width: 290, height: 595 },
  },
] as const;

export function CaseStudyUciUsagePatternsMedia() {
  return (
    <div
      className="case-study-placeholder-frame case-study-placeholder-frame--half case-study-uci-usage-patterns"
      aria-label="Press room hub page usage patterns"
    >
      <div className="case-study-uci-usage-patterns__row">
        {USAGE_PATTERN_LOGOS.map((logo) => (
          <Image
            key={logo.className}
            src={logo.src}
            alt={logo.alt}
            width={logo.natural.width}
            height={logo.natural.height}
            className={`case-study-uci-usage-patterns__image ${logo.className}`}
            sizes="(max-width:763px) 119px, 159px"
            quality={95}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
