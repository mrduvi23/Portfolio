import "@/components/case-study/case-study-uci-benchmarking-logos.css";
import { uciBenchmarkingLogos } from "@/lib/case-studies/uci-benchmarking-logos";
import Image from "next/image";

export function CaseStudyUciBenchmarkingLogos() {
  return (
    <section className="uci-benchmarking-logos" aria-labelledby="uci-benchmarking-logos-title">
      <h4 id="uci-benchmarking-logos-title" className="uci-benchmarking-logos__title">
        Sites analyzed
      </h4>

      <div className="uci-benchmarking-logos__grid">
        {uciBenchmarkingLogos.map((logo) => (
          <div
            key={logo.id}
            className={`uci-benchmarking-logos__logo${
              logo.id === "sanitas" ? " uci-benchmarking-logos__logo--sanitas" : ""
            }`}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={164}
              height={98}
              className="uci-benchmarking-logos__image"
              sizes="(max-width: 763px) 50vw, 164px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
