import "@/components/case-study/case-study-zone-survey.css";

const SURVEY_N = 128;
const USER_N = 63;

type Tone = "teal" | "forest" | "pine" | "leaf" | "neon" | "mint" | "blue";

type SurveyItem = {
  label: string;
  value: number;
  tone: Tone;
};

const USAGE_CURRENT: SurveyItem[] = [
  { label: "Yes, frequently", value: 9, tone: "neon" },
  { label: "Yes, occasionally", value: 18, tone: "leaf" },
  { label: "I have used it once", value: 22, tone: "pine" },
  { label: "I do not use it", value: 51, tone: "teal" },
];

const USAGE_FREQUENCY: SurveyItem[] = [
  { label: "Several times a day", value: 5, tone: "neon" },
  { label: "Once a day", value: 8, tone: "leaf" },
  { label: "Several times a week", value: 16, tone: "pine" },
  { label: "Several times a month", value: 29, tone: "forest" },
  { label: "Less than once a month", value: 42, tone: "teal" },
];

const FINDING_EASE: SurveyItem[] = [
  { label: "1 · Very difficult", value: 31, tone: "teal" },
  { label: "2 · Difficult", value: 38, tone: "pine" },
  { label: "3 · Neutral", value: 18, tone: "leaf" },
  { label: "4 · Easy", value: 9, tone: "neon" },
  { label: "5 · Very easy", value: 4, tone: "mint" },
];

const FINDING_DIFFICULTIES: SurveyItem[] = [
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
];

const TIME_TO_FIND: SurveyItem[] = [
  { label: "Under 1 minute", value: 6, tone: "neon" },
  { label: "1–2 minutes", value: 11, tone: "leaf" },
  { label: "3–5 minutes", value: 22, tone: "pine" },
  { label: "5–10 minutes", value: 28, tone: "forest" },
  { label: "More than 10 minutes", value: 19, tone: "teal" },
  { label: "Sometimes I can’t find it", value: 14, tone: "blue" },
];

const TIME_FAILURE: SurveyItem[] = [
  { label: "Never", value: 4, tone: "mint" },
  { label: "Rarely", value: 12, tone: "neon" },
  { label: "Sometimes", value: 38, tone: "leaf" },
  { label: "Frequently", value: 35, tone: "teal" },
  { label: "Almost always", value: 11, tone: "blue" },
];

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
            title={`${item.label}: ${item.value}%`}
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

function UsageDonut() {
  let offset = 0;
  const segments = USAGE_CURRENT.map((item) => {
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
        <svg
          className="zone-survey__donut"
          viewBox="0 0 120 120"
          aria-hidden
        >
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
              stroke={
                segment.tone === "neon"
                  ? "#14e68c"
                  : segment.tone === "leaf"
                    ? "#50af78"
                    : segment.tone === "pine"
                      ? "#28553c"
                      : "#012a2d"
              }
              strokeWidth="14"
              strokeDasharray={segment.dasharray}
              strokeDashoffset={segment.dashoffset}
            />
          ))}
        </svg>
        <p className="zone-survey__donut-center">
          <span className="zone-survey__donut-value">51%</span>
          <span className="zone-survey__donut-caption">do not use it</span>
        </p>
      </div>
      <ul className="zone-survey__legend" aria-labelledby="zone-survey-q-use">
        {USAGE_CURRENT.map((item) => (
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

export function CaseStudyZoneSurveyCharts() {
  return (
    <figure
      className="case-study-placeholder-frame case-study-zone-survey"
      aria-labelledby="zone-survey-title"
    >
      <figcaption id="zone-survey-title" className="zone-survey__header">
        <p className="zone-survey__brand">
          <span className="zone-survey__brand-name">zone</span>
          {" · Internal survey results"}
        </p>
        <p className="zone-survey__sample">{`n = ${SURVEY_N} employees`}</p>
      </figcaption>

      <div className="zone-survey__grid">
        <section className="zone-survey__section" aria-labelledby="zone-survey-usage">
          <h3 id="zone-survey-usage" className="zone-survey__section-title">
            1. Usage profile
          </h3>
          <div className="zone-survey__insight">
            <span className="zone-survey__insight-value">73%</span>
            <p className="zone-survey__insight-text">
              rarely or never use the app
            </p>
          </div>
          <div className="zone-survey__charts">
            <div className="zone-survey__chart">
              <p id="zone-survey-q-use" className="zone-survey__question">
                Do you currently use this app?
              </p>
              <UsageDonut />
            </div>
            <div className="zone-survey__chart">
              <p id="zone-survey-q-freq" className="zone-survey__question">
                How often do you use it?
              </p>
              <p className="zone-survey__note">
                {`Among the ${USER_N} employees who have used it`}
              </p>
              <HorizontalBars
                items={USAGE_FREQUENCY}
                labelledBy="zone-survey-q-freq"
              />
            </div>
          </div>
        </section>

        <section className="zone-survey__section" aria-labelledby="zone-survey-finding">
          <h3 id="zone-survey-finding" className="zone-survey__section-title">
            2. Finding content
          </h3>
          <div className="zone-survey__insight">
            <span className="zone-survey__insight-value">69%</span>
            <p className="zone-survey__insight-text">
              rate finding content as difficult
            </p>
          </div>
          <div className="zone-survey__charts">
            <div className="zone-survey__chart">
              <p id="zone-survey-q-ease" className="zone-survey__question">
                How easy is it to find content?
              </p>
              <StackedBar items={FINDING_EASE} labelledBy="zone-survey-q-ease" />
            </div>
            <div className="zone-survey__chart">
              <p id="zone-survey-q-hard" className="zone-survey__question">
                What makes finding content hard?
              </p>
              <p className="zone-survey__note">Multi-select · share of respondents</p>
              <HorizontalBars
                items={FINDING_DIFFICULTIES}
                labelledBy="zone-survey-q-hard"
              />
            </div>
          </div>
        </section>

        <section className="zone-survey__section" aria-labelledby="zone-survey-time">
          <h3 id="zone-survey-time" className="zone-survey__section-title">
            3. Time wasted
          </h3>
          <div className="zone-survey__insight">
            <span className="zone-survey__insight-value">61%</span>
            <p className="zone-survey__insight-text">
              take 5+ minutes, or never find it
            </p>
          </div>
          <div className="zone-survey__charts">
            <div className="zone-survey__chart">
              <p id="zone-survey-q-duration" className="zone-survey__question">
                When looking for a document or chart, how long does it usually take?
              </p>
              <HorizontalBars
                items={TIME_TO_FIND}
                labelledBy="zone-survey-q-duration"
                scale="percent"
              />
            </div>
            <div className="zone-survey__chart">
              <p id="zone-survey-q-fail" className="zone-survey__question">
                How often can’t you find what you’re looking for?
              </p>
              <StackedBar items={TIME_FAILURE} labelledBy="zone-survey-q-fail" />
            </div>
          </div>
        </section>
      </div>
    </figure>
  );
}
