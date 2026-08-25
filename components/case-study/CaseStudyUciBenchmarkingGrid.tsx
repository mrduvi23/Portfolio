import "@/components/case-study/case-study-uci-benchmarking.css";
import { uciBenchmarkingTopics } from "@/lib/case-studies/uci-benchmarking";

const topics = uciBenchmarkingTopics.flat();

export function CaseStudyUciBenchmarkingGrid() {
  return (
    <div
      className="uci-benchmarking-grid"
      aria-label="Benchmark study variables"
    >
      {topics.map((topic) => (
        <article key={topic.id} className="uci-benchmarking-grid__item">
          <h4 className="uci-benchmarking-grid__title">{topic.title}</h4>
          <p className="uci-benchmarking-grid__description">{topic.description}</p>
        </article>
      ))}
    </div>
  );
}
