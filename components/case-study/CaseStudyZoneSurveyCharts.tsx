import localFont from "next/font/local";
import "@/components/case-study/case-study-zone-survey.css";

const zoneCalibre = localFont({
  src: [
    {
      path: "../../public/fonts/zone/Calibre-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/zone/Calibre-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-zs-calibre",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const zoneFinancier = localFont({
  src: "../../public/fonts/zone/TestFinancierDisplay-Regular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-zs-financier",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

export type ZoneSurveyWave = "research" | "impact";

type Tone = "teal" | "forest" | "pine" | "leaf" | "neon" | "wheat" | "mint";

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

const RESEARCH: SurveyWaveData = {
  headerKicker: "Internal surveys",
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
    { label: "Several times a day", value: 5, tone: "wheat" },
    { label: "Once a day", value: 8, tone: "neon" },
    { label: "Several times a week", value: 16, tone: "leaf" },
    { label: "Several times a month", value: 29, tone: "pine" },
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
    { label: "Sometimes I can’t find it", value: 14, tone: "wheat" },
  ],
  timeFailure: [
    { label: "Never", value: 4, tone: "neon" },
    { label: "Rarely", value: 12, tone: "leaf" },
    { label: "Sometimes", value: 38, tone: "pine" },
    { label: "Frequently", value: 35, tone: "teal" },
    { label: "Almost always", value: 11, tone: "wheat" },
  ],
};

const IMPACT: SurveyWaveData = {
  headerKicker: "Follow-up survey results",
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
    { label: "Several times a day", value: 18, tone: "wheat" },
    { label: "Once a day", value: 24, tone: "neon" },
    { label: "Several times a week", value: 31, tone: "leaf" },
    { label: "Several times a month", value: 19, tone: "pine" },
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
    { label: "Sometimes I can’t find it", value: 3, tone: "wheat" },
  ],
  timeFailure: [
    { label: "Never", value: 28, tone: "neon" },
    { label: "Rarely", value: 41, tone: "leaf" },
    { label: "Sometimes", value: 22, tone: "pine" },
    { label: "Frequently", value: 7, tone: "teal" },
    { label: "Almost always", value: 2, tone: "wheat" },
  ],
};

const WAVES: Record<ZoneSurveyWave, SurveyWaveData> = {
  research: RESEARCH,
  impact: IMPACT,
};

const DONUT_SIZE = 132;
const DONUT_STROKE = 14;
const DONUT_R = (DONUT_SIZE - DONUT_STROKE) / 2;
const DONUT_C = 2 * Math.PI * DONUT_R;

function toneClass(tone: Tone, kind: "fill" | "swatch") {
  return kind === "fill"
    ? `zone-survey__bar-fill zone-survey__bar-fill--${tone}`
    : `zone-survey__swatch zone-survey__tone-${tone}`;
}

function ZoneWordmark() {
  return (
    <svg
      className="zone-survey__logo"
      width="61"
      height="16"
      viewBox="0 0 61 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12.6157 15.6413V10.0807H11.8736C11.7322 13.9193 11.0961 14.7444 7.66834 14.7444H3.78116L12.545 0.502242V0.358744H4.34657C2.82704 0.358744 1.62555 0.32287 0.70676 0.215247L0.35338 5.48879H1.06014C1.44886 2.43946 2.26163 1.25561 5.19468 1.25561H8.76382L0 15.4978V15.6413H12.6157ZM28.9786 8C28.9786 3.26457 25.4094 0 21.6636 0C17.9178 0 14.3486 3.26457 14.3486 8C14.3486 12.6996 17.9178 16 21.6636 16C25.4094 16 28.9786 12.6996 28.9786 8ZM25.7275 8C25.7275 12.6637 24.0666 15.0673 21.6636 15.0673C19.2606 15.0673 17.5997 12.6637 17.5997 8C17.5997 3.30045 19.2606 0.896861 21.6636 0.896861C24.0666 0.896861 25.7275 3.30045 25.7275 8ZM37.7108 14.8879C36.0499 14.8879 35.5903 14.7444 35.5903 12.9865V4.05381C36.1206 2.86996 37.3221 1.8296 38.7706 1.8296C40.8205 1.8296 41.916 3.2287 41.916 5.84753V12.9865C41.916 14.7444 41.492 14.8879 39.8311 14.8879V15.6413H47.1107V14.8879C45.4498 14.8879 45.0258 14.7444 45.0258 12.9865V5.23767C45.0258 2.36771 43.5769 0 40.4318 0C38.0288 0 36.2619 1.93722 35.5903 3.33632V0.358744H30.3956V1.11211C32.0565 1.11211 32.4806 1.21973 32.4806 2.97758V12.9865C32.4806 14.7444 32.0565 14.8879 30.3956 14.8879V15.6413H37.7108V14.8879ZM54.8512 0.932735C56.8301 0.932735 57.7489 2.76233 57.8549 5.30942H51.0347C51.4234 2.47534 52.9076 0.932735 54.8512 0.932735ZM61 12.8072L60.6113 12.4126C59.6572 13.6323 58.4557 14.2063 56.9008 14.2063C53.3317 14.2063 50.9287 11.0135 50.9287 6.81614C50.9287 6.6009 50.9287 6.38565 50.9287 6.1704H60.7526C60.7526 3.19283 58.9504 0 54.8865 0C51.4234 0 47.9956 3.44395 47.9956 8.1435C47.9956 12.7713 51.3881 16 55.4519 16C57.5722 16 59.6572 14.9238 61 12.8072Z"
        fill="white"
      />
    </svg>
  );
}

function PercentReadout({ value }: { value: string }) {
  const match = value.match(/^(\d+)(%)$/);
  if (!match) {
    return <span className="zone-survey__figure">{value}</span>;
  }

  return (
    <span className="zone-survey__figure">
      <span className="zone-survey__figure-num">{match[1]}</span>
      <span className="zone-survey__figure-unit">{match[2]}</span>
    </span>
  );
}

function HorizontalBars({
  items,
  labelledBy,
}: {
  items: SurveyItem[];
  labelledBy: string;
}) {
  return (
    <ul className="zone-survey__bars" aria-labelledby={labelledBy}>
      {items.map((item) => (
        <li key={item.label} className="zone-survey__bar-row">
          <span className="zone-survey__bar-label">{item.label}</span>
          <span className="zone-survey__bar-value">{item.value}%</span>
          <div className="zone-survey__bar-track" aria-hidden>
            <div
              className={toneClass(item.tone, "fill")}
              style={{ width: `${item.value}%` }}
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
    <div className="zone-survey__stack-block">
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
        <svg
          className="zone-survey__donut"
          viewBox={`0 0 ${DONUT_SIZE} ${DONUT_SIZE}`}
          aria-hidden
        >
          {segments.map((segment) => (
            <circle
              key={segment.label}
              className={`zone-survey__donut-seg zone-survey__tone-${segment.tone}`}
              cx={DONUT_SIZE / 2}
              cy={DONUT_SIZE / 2}
              r={DONUT_R}
              strokeDasharray={segment.dasharray}
              strokeDashoffset={segment.dashoffset}
            />
          ))}
        </svg>
        <div className="zone-survey__donut-center">
          <p className="zone-survey__donut-caption">{center.caption}</p>
          <PercentReadout value={center.value} />
        </div>
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

function ChartBlock({
  questionId,
  question,
  note,
  children,
}: {
  questionId: string;
  question: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="zone-survey__chart">
      <div className="zone-survey__chart-head">
        <p id={questionId} className="zone-survey__question">
          {question}
        </p>
        {note ? <p className="zone-survey__note">{note}</p> : null}
      </div>
      {children}
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
      className={`case-study-placeholder-frame case-study-zone-survey ${zoneCalibre.variable} ${zoneFinancier.variable}`}
      aria-labelledby={`${id}-title`}
    >
      <figcaption id={`${id}-title`} className="zone-survey__header">
        <p className="zone-survey__brand">
          <ZoneWordmark />
          <span className="zone-survey__kicker">{data.headerKicker}</span>
        </p>
        <p className="zone-survey__sample">{data.sample}</p>
      </figcaption>

      <div className="zone-survey__grid">
        <section className="zone-survey__section" aria-labelledby={`${id}-usage`}>
          <h3 id={`${id}-usage`} className="zone-survey__section-title">
            1. Usage profile
          </h3>
          <div className="zone-survey__insight">
            <PercentReadout value={data.usageInsight.value} />
            <p className="zone-survey__insight-text">{data.usageInsight.text}</p>
          </div>
          <div className="zone-survey__charts">
            <ChartBlock
              questionId={`${id}-q-use`}
              question="Do you currently use this app?"
            >
              <UsageDonut
                items={data.usageCurrent}
                center={data.donutCenter}
                labelledBy={`${id}-q-use`}
              />
            </ChartBlock>
            <ChartBlock
              questionId={`${id}-q-freq`}
              question="How often do you use it?"
              note={data.frequencyNote}
            >
              <HorizontalBars
                items={data.usageFrequency}
                labelledBy={`${id}-q-freq`}
              />
            </ChartBlock>
          </div>
        </section>

        <div className="zone-survey__rule" aria-hidden />

        <section className="zone-survey__section" aria-labelledby={`${id}-finding`}>
          <h3 id={`${id}-finding`} className="zone-survey__section-title">
            2. Finding content
          </h3>
          <div className="zone-survey__insight">
            <PercentReadout value={data.findingInsight.value} />
            <p className="zone-survey__insight-text">{data.findingInsight.text}</p>
          </div>
          <div className="zone-survey__charts">
            <ChartBlock
              questionId={`${id}-q-ease`}
              question="How easy is it to find content?"
            >
              <StackedBar items={data.findingEase} labelledBy={`${id}-q-ease`} />
            </ChartBlock>
            <ChartBlock
              questionId={`${id}-q-hard`}
              question="What makes finding content hard?"
              note="Multi-select · share of respondents"
            >
              <HorizontalBars
                items={data.findingDifficulties}
                labelledBy={`${id}-q-hard`}
              />
            </ChartBlock>
          </div>
        </section>

        <div className="zone-survey__rule" aria-hidden />

        <section className="zone-survey__section" aria-labelledby={`${id}-time`}>
          <h3 id={`${id}-time`} className="zone-survey__section-title">
            3. Time wasted
          </h3>
          <div className="zone-survey__insight">
            <PercentReadout value={data.timeInsight.value} />
            <p className="zone-survey__insight-text">{data.timeInsight.text}</p>
          </div>
          <div className="zone-survey__charts">
            <ChartBlock
              questionId={`${id}-q-duration`}
              question="When looking for a document or chart, how long does it usually take?"
            >
              <HorizontalBars
                items={data.timeToFind}
                labelledBy={`${id}-q-duration`}
              />
            </ChartBlock>
            <ChartBlock
              questionId={`${id}-q-fail`}
              question="How often can’t you find what you’re looking for?"
            >
              <StackedBar items={data.timeFailure} labelledBy={`${id}-q-fail`} />
            </ChartBlock>
          </div>
        </section>
      </div>
    </figure>
  );
}
