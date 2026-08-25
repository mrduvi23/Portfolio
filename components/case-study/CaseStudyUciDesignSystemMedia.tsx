import "@/components/case-study/case-study-uci-design-system.css";
import { assets } from "@/lib/assets";
import Image from "next/image";

const IMAGE_NATURAL = { width: 1895, height: 2479 } as const;

export function CaseStudyUciDesignSystemMedia() {
  return (
    <div
      className="case-study-placeholder-frame case-study-placeholder-frame--half case-study-uci-design-system"
      aria-label="UCI press room design system components"
    >
      <div className="case-study-uci-design-system__image-wrap">
        <Image
          src={assets.uciDesignSystem}
          alt="UCI press room built with existing design system components"
          width={IMAGE_NATURAL.width}
          height={IMAGE_NATURAL.height}
          className="case-study-uci-design-system__image"
          sizes="(max-width:763px) 89vw, 405px"
          quality={95}
          draggable={false}
        />
      </div>
    </div>
  );
}
