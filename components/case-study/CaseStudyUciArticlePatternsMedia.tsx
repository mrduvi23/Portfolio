import "@/components/case-study/case-study-uci-article-patterns.css";
import { assets } from "@/lib/assets";
import Image from "next/image";

const ARTICLE_PATTERN_IMAGES = [
  {
    src: assets.uciArticleRepsol,
    alt: "Repsol article detail page pattern",
    className: "case-study-uci-article-patterns__image--repsol",
    natural: { width: 452, height: 1028 },
  },
  {
    src: assets.uciArticleEndesa,
    alt: "Endesa article detail page pattern",
    className: "case-study-uci-article-patterns__image--endesa",
    natural: { width: 450, height: 1092 },
  },
  {
    src: assets.uciArticleSantander,
    alt: "Santander article detail page pattern",
    className: "case-study-uci-article-patterns__image--santander",
    natural: { width: 452, height: 1156 },
  },
] as const;

export function CaseStudyUciArticlePatternsMedia() {
  return (
    <div
      className="case-study-uci-article-patterns"
      aria-label="Article detail page patterns from benchmarked sites"
    >
      <div className="case-study-uci-article-patterns__row">
        {ARTICLE_PATTERN_IMAGES.map((image) => (
          <Image
            key={image.className}
            src={image.src}
            alt={image.alt}
            width={image.natural.width}
            height={image.natural.height}
            className={`case-study-uci-article-patterns__image ${image.className}`}
            sizes="(max-width:763px) 94px, 226px"
            quality={95}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
