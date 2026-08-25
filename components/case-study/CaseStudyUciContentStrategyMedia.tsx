import "@/components/case-study/case-study-uci-content-strategy.css";
import { assets } from "@/lib/assets";
import Image from "next/image";

const IMAGES = {
  homepage: { width: 362, height: 820 },
  actualidad: { width: 364, height: 528 },
  detalle: { width: 946, height: 738 },
} as const;

export function CaseStudyUciContentStrategyMedia() {
  return (
    <div
      className="case-study-placeholder-frame case-study-placeholder-frame--half case-study-uci-content-strategy"
      aria-label="Press room content strategy screen compositions"
    >
      <div className="case-study-uci-content-strategy__homepage">
        <Image
          src={assets.uciHomepageV02}
          alt="UCI press room homepage concept"
          width={IMAGES.homepage.width}
          height={IMAGES.homepage.height}
          className="case-study-uci-content-strategy__image"
          sizes="(max-width:763px) 80px, 190px"
          quality={95}
          draggable={false}
        />
      </div>

      <div className="case-study-uci-content-strategy__left">
        <div className="case-study-uci-content-strategy__detalle">
          <Image
            src={assets.uciDetalleNotaPrensa}
            alt="Press release detail page concept"
            width={IMAGES.detalle.width}
            height={IMAGES.detalle.height}
            className="case-study-uci-content-strategy__image"
            sizes="(max-width:763px) 80px, 190px"
            quality={95}
            draggable={false}
          />
        </div>

        <div className="case-study-uci-content-strategy__actualidad">
          <Image
            src={assets.uciActualidadV02}
            alt="News and updates listing concept"
            width={IMAGES.actualidad.width}
            height={IMAGES.actualidad.height}
            className="case-study-uci-content-strategy__image"
            sizes="(max-width:763px) 80px, 190px"
            quality={95}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
