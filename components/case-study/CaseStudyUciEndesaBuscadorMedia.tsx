import "@/components/case-study/case-study-uci-endesa-buscador.css";
import { assets } from "@/lib/assets";
import Image from "next/image";

const IMAGE_NATURAL = { width: 810, height: 704 } as const;

export function CaseStudyUciEndesaBuscadorMedia() {
  return (
    <div
      className="case-study-placeholder-frame case-study-placeholder-frame--half case-study-uci-endesa-buscador"
      aria-label="Endesa press room search bar"
    >
      <div className="case-study-uci-endesa-buscador__image-wrap">
        <Image
          src={assets.uciEndesaBuscador}
          alt="Endesa press room sitewide search bar"
          width={IMAGE_NATURAL.width}
          height={IMAGE_NATURAL.height}
          className="case-study-uci-endesa-buscador__image"
          sizes="(max-width:763px) 89vw, 405px"
          quality={95}
          draggable={false}
        />
      </div>
    </div>
  );
}
