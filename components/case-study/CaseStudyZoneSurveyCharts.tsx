import "@/components/case-study/case-study-zone-survey.css";

export type ZoneSurveyWave = "research" | "impact";

type Tone = "teal" | "forest" | "pine" | "leaf" | "neon" | "mint" | "blue";

type SurveyItem = {
  label: string;
  value: number;
  tone: Tone;
};

type SurveyCopy = {
  headerKicker: string;
  sample: string;
  usageInsight: { value: string; text: string };
  findingInsight: { value: string; text: string };
  timeInsight: { value: string; text: string };
  donutCenter: { value: string; caption: string };
  frequencyNote: string;
};

type SurveyWaveData = SurveyCopy & {
  usageCurrent: SurveyItem[];
  usageFrequency: SurveyItem[];
  findingEase: SurveyItem[];
  findingDifficulties: SurveyItem[];
  timeToFind: SurveyItem[];
  timeFailure: SurveyItem[];
};

const TONE_HEX: Record<Tone, string> = {
  teal: "#012a2d",
  forest: "#003c2d",
  pine: "#28553c",
  leaf: "#50af78",
  neon: "#14e68c",
  mint: "#e6f4ec",
  blue: "#0a96fa",
};

const RESEARCH: SurveyWaveData = {
  headerKicker: " · Internal survey results",
  sample: "n = 128 employees",
  usageInsight: { value: "73%", text: "rarely or never use the app" },
  findingInsight: { value: "69%", text: "rate finding content as difficult" },
  timeInsight: { value: "61%", text: "take 5+ minutes, or never find it" },
  donutCenter: { value: "51%", caption: "do not use it" },
  frequencyNote: "Among the 63 employees who have used it",
  usageCurrent: [
    { label: "Yes, frequently", value: 9, tone: "neon" },
    { label: "Yes, occasionally", value: 18, tone: "leaf" },
    { label: "I have used it once", value: 22, tone: "pine" },
    { label: "I do not use it", value: 51, tone: "teal" },
  ],
  usageFrequency: [
    { label: "Several times a day", value: 5, tone: "neon" },
    { label: "Once a day", value: 8, tone: "leaf" },
    { label: "Several times a week", value: 16, tone: "pine" },
    { label: "Several times a month", value: 29, tone: "forest" },
    { label: "Less than once a month", value: 42, tone: "teal" },
  ],
  findingEase: [
    { label: "1 · Very difficult", value: 31, tone: "teal" },
    { label: "2 · Difficult", value: 38, tone: "pine" },
    { label: "3 · Neutral", value: 18, tone: "leaf" },
    { label: "4 · Easy", value: 9, tone: "neon" },
    { label: "5 · Very easy", value: 4, tone: "mint" },
  ],
  findingDifficulties: [
    { label: "I don’t know exactly where to look", value: 64, tone: "teal" },
    { label: "Navigation is complicated", value: 58, tone: "forest" },
    { label: "Document names aren’t clear", value: 51, tone: "pine" },
    { label: "I can’t use it comfortably on mobile/tablet", value: 47, tone: "leaf" },
    { label: "I can’t find what I need even though I know it exists", value: 42, tone: "leaf" },
    { label: "Hard to filter results", value: 31, tone: "pine" },
    { label: "Results aren’t relevant", value: 28, tone: "pine" },
    { label: "Too many results", value: 24, tone: "leaf" },
    { label: "The interface is hard to use", value: 21, tone: "leaf" },
    { label: "The app is slow", value: 14, tone: "mint" },
  ],
  timeToFind: [
    { label: "Under 1 minute", value: 6, tone: "neon" },
    { label: "1–2 minutes", value: 11, tone: "leaf" },
    { label: "3–5 minutes", value: 22, tone: "pine" },
    { label: "5–10 minutes", value: 28, tone: "forest" },
    { label: "More than 10 minutes", value: 19, tone: "teal" },
    { label: "Sometimes I can’t find it", value: 14, tone: "blue" },
  ],
  timeFailure: [
    { label: "Never", value: 4, tone: "neon" },
    { label: "Rarely", value: 12, tone: "leaf" },
    { label: "Sometimes", value: 38, tone: "pine" },
    { label: "Frequently", value: 35, tone: "teal" },
    { label: "Almost always", value: 11, tone: "blue" },
  ],
};

const IMPACT: SurveyWaveData = {
  headerKicker: " · Follow-up survey results",
  sample: "n = 121 employees · 2 months after launch",
  usageInsight: { value: "72%", text: "use the app at least occasionally" },
  findingInsight: { value: "65%", text: "say finding content is now easy" },
  timeInsight: { value: "62%", text: "find what they need in under 2 minutes" },
  donutCenter: { value: "34%", caption: "use it frequently" },
  frequencyNote: "Among the 104 employees who have used it",
  usageCurrent: [
    { label: "Yes, frequently", value: 34, tone: "neon" },
    { label: "Yes, occasionally", value: 38, tone: "leaf" },
    { label: "I have used it once", value: 14, tone: "pine" },
    { label: "I do not use it", value: 14, tone: "teal" },
  ],
  usageFrequency: [
    { label: "Several times a day", value: 18, tone: "neon" },
    { label: "Once a day", value: 24, tone: "leaf" },
    { label: "Several times a week", value: 31, tone: "pine" },
    { label: "Several times a month", value: 19, tone: "forest" },
    { label: "Less than once a month", value: 8, tone: "teal" },
  ],
  findingEase: [
    { label: "1 · Very difficult", value: 6, tone: "teal" },
    { label: "2 · Difficult", value: 11, tone: "pine" },
    { label: "3 · Neutral", value: 18, tone: "leaf" },
    { label: "4 · Easy", value: 38, tone: "neon" },
    { label: "5 · Very easy", value: 27, tone: "mint" },
  ],
  findingDifficulties: [
    { label: "Document names aren’t clear", value: 24, tone: "pine" },
    { label: "I don’t know exactly where to look", value: 22, tone: "forest" },
    { label: "Hard to filter results", value: 19, tone: "leaf" },
    { label: "Navigation is complicated", value: 18, tone: "leaf" },
    { label: "Results aren’t relevant", value: 16, tone: "leaf" },
    { label: "Too many results", value: 15, tone: "leaf" },
    { label: "I can’t find what I need even though I know it exists", value: 14, tone: "mint" },
    { label: "The interface is hard to use", value: 11, tone: "mint" },
    { label: "I can’t use it comfortably on mobile/tablet", value: 9, tone: "mint" },
    { label: "The app is slow", value: 8, tone: "mint" },
  ],
  timeToFind: [
    { label: "Under 1 minute", value: 28, tone: "neon" },
    { label: "1–2 minutes", value: 34, tone: "leaf" },
    { label: "3–5 minutes", value: 22, tone: "pine" },
    { label: "5–10 minutes", value: 9, tone: "forest" },
    { label: "More than 10 minutes", value: 4, tone: "teal" },
    { label: "Sometimes I can’t find it", value: 3, tone: "blue" },
  ],
  timeFailure: [
    { label: "Never", value: 28, tone: "neon" },
    { label: "Rarely", value: 41, tone: "leaf" },
    { label: "Sometimes", value: 22, tone: "pine" },
    { label: "Frequently", value: 7, tone: "teal" },
    { label: "Almost always", value: 2, tone: "blue" },
  ],
};

const WAVES: Record<ZoneSurveyWave, SurveyWaveData> = {
  research: RESEARCH,
  impact: IMPACT,
};

const DONUT_R = 42;
const DONUT_C = 2 * Math.PI * DONUT_R;

function toneClass(tone: Tone, kind: "fill" | "swatch") {
  return kind === "fill"
    ? `zone-survey__bar-fill zone-survey__bar-fill--${tone}`
    : `zone-survey__swatch zone-survey__tone-${tone}${tone === "mint" ? " zone-survey__swatch--outline" : ""}`;
}

function HorizontalBars({
  items,
  labelledBy,
  scale = "relative",
}: {
  items: SurveyItem[];
  labelledBy: string;
  scale?: "relative" | "percent";
}) {
  const peak =
    scale === "percent" ? 100 : Math.max(...items.map((item) => item.value), 1);

  return (
    <ul className="zone-survey__bars" aria-labelledby={labelledBy}>
      {items.map((item) => (
        <li key={item.label} className="zone-survey__bar-row">
          <span className="zone-survey__bar-label">{item.label}</span>
          <span className="zone-survey__bar-value">{item.value}%</span>
          <div className="zone-survey__bar-track" aria-hidden>
            <div
              className={toneClass(item.tone, "fill")}
              style={{ width: `${(item.value / peak) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function StackedBar({
  items,
  labelledBy,
}: {
  items: SurveyItem[];
  labelledBy: string;
}) {
  const summary = items.map((item) => `${item.label} ${item.value}%`).join(", ");

  return (
    <div>
      <div
        className="zone-survey__stack"
        role="img"
        aria-labelledby={labelledBy}
        aria-label={summary}
      >
        {items.map((item) => (
          <div
            key={item.label}
            className={`zone-survey__stack-seg zone-survey__tone-${item.tone}`}
            style={{ width: `${item.value}%` }}
          />
        ))}
      </div>
      <ul className="zone-survey__legend">
        {items.map((item) => (
          <li key={item.label} className="zone-survey__legend-item">
            <span className={toneClass(item.tone, "swatch")} aria-hidden />
            <span className="zone-survey__legend-label">{item.label}</span>
            <span className="zone-survey__legend-value">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UsageDonut({
  items,
  center,
  labelledBy,
}: {
  items: SurveyItem[];
  center: { value: string; caption: string };
  labelledBy: string;
}) {
  let offset = 0;
  const segments = items.map((item) => {
    const length = (item.value / 100) * DONUT_C;
    const segment = {
      ...item,
      dasharray: `${length} ${DONUT_C - length}`,
      dashoffset: -offset + DONUT_C / 4,
    };
    offset += length;
    return segment;
  });

  return (
    <div className="zone-survey__donut-block">
      <div className="zone-survey__donut-wrap">
        <svg className="zone-survey__donut" viewBox="0 0 120 120" aria-hidden>
          <circle
            cx="60"
            cy="60"
            r={DONUT_R}
            fill="none"
            stroke="#e6f4ec"
            strokeWidth="14"
          />
          {segments.map((segment) => (
            <circle
              key={segment.label}
              cx="60"
              cy="60"
              r={DONUT_R}
              fill="none"
              stroke={TONE_HEX[segment.tone]}
              strokeWidth="14"
              strokeDasharray={segment.dasharray}
              strokeDashoffset={segment.dashoffset}
            />
          ))}
        </svg>
        <p className="zone-survey__donut-center">
          <span className="zone-survey__donut-value">{center.value}</span>
          <span className="zone-survey__donut-caption">{center.caption}</span>
        </p>
      </div>
      <ul className="zone-survey__legend" aria-labelledby={labelledBy}>
        {items.map((item) => (
          <li key={item.label} className="zone-survey__legend-item">
            <span className={toneClass(item.tone, "swatch")} aria-hidden />
            <span className="zone-survey__legend-label">{item.label}</span>
            <span className="zone-survey__legend-value">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudyZoneSurveyCharts({
  wave = "research",
}: {
  wave?: ZoneSurveyWave;
}) {
  const data = WAVES[wave];
  const id = `zone-survey-${wave}`;

  return (
    <figure
      className="case-study-placeholder-frame case-study-zone-survey"
      aria-labelledby={`${id}-title`}
    >
      <figcaption id={`${id}-title`} className="zone-survey__header">
        <p className="zone-survey__brand">
          <span className="zone-survey__brand-name">zone</span>
          {data.headerKicker}
        </p>
        <p className="zone-survey__sample">{data.sample}</p>
      </figcaption>

      <div className="zone-survey__grid">
        <section className="zone-survey__section" aria-labelledby={`${id}-usage`}>
          <h3 id={`${id}-usage`} className="zone-survey__section-title">
            1. Usage profile
          </h3>
          <div className="zone-survey__insight">
            <span className="zone-survey__insight-value">
              {data.usageInsight.value}
            </span>
            <p className="zone-survey__insight-text">{data.usageInsight.text}</p>
          </div>
          <div className="zone-survey__charts">
            <div className="zone-survey__chart">
              <p id={`${id}-q-use`} className="zone-survey__question">
                Do you currently use this app?
              </p>
              <UsageDonut
                items={data.usageCurrent}
                center={data.donutCenter}
                labelledBy={`${id}-q-use`}
              />
            </div>
            <div className="zone-survey__chart">
              <p id={`${id}-q-freq`} className="zone-survey__question">
                How often do you use it?
              </p>
              <p className="zone-survey__note">{data.frequencyNote}</p>
              <HorizontalBars
                items={data.usageFrequency}
                labelledBy={`${id}-q-freq`}
              />
            </div>
          </div>
        </section>

        <section className="zone-survey__section" aria-labelledby={`${id}-finding`}>
          <h3 id={`${id}-finding`} className="zone-survey__section-title">
            2. Finding content
          </h3>
          <div className="zone-survey__insight">
            <span className="zone-survey__insight-value">
              {data.findingInsight.value}
            </span>
            <p className="zone-survey__insight-text">{data.findingInsight.text}</p>
          </div>
          <div className="zone-survey__charts">
            <div className="zone-survey__chart">
              <p id={`${id}-q-ease`} className="zone-survey__question">
                How easy is it to find content?
              </p>
              <StackedBar items={data.findingEase} labelledBy={`${id}-q-ease`} />
            </div>
            <div className="zone-survey__chart">
              <p id={`${id}-q-hard`} className="zone-survey__question">
                What makes finding content hard?
              </p>
              <p className="zone-survey__note">Multi-select · share of respondents</p>
              <HorizontalBars
                items={data.findingDifficulties}
                labelledBy={`${id}-q-hard`}
              />
            </div>
          </div>
        </section>

        <section className="zone-survey__section" aria-labelledby={`${id}-time`}>
          <h3 id={`${id}-time`} className="zone-survey__section-title">
            3. Time wasted
          </h3>
          <div className="zone-survey__insight">
            <span className="zone-survey__insight-value">
              {data.timeInsight.value}
            </span>
            <p className="zone-survey__insight-text">{data.timeInsight.text}</p>
          </div>
          <div className="zone-survey__charts">
            <div className="zone-survey__chart">
              <p id={`${id}-q-duration`} className="zone-survey__question">
                When looking for a document or chart, how long does it usually take?
              </p>
              <HorizontalBars
                items={data.timeToFind}
                labelledBy={`${id}-q-duration`}
                scale="percent"
              />
            </div>
            <div className="zone-survey__chart">
              <p id={`${id}-q-fail`} className="zone-survey__question">
                How often can’t you find what you’re looking for?
              </p>
              <StackedBar items={data.timeFailure} labelledBy={`${id}-q-fail`} />
            </div>
          </div>
        </section>
      </div>
    </figure>
  );
}
