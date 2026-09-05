export type CaseStudyNavItem = {
  id: string;
  label: string;
  children?: CaseStudyNavItem[];
};

export type CaseStudyMetaItem = {
  label: string;
  value: string;
};

export type CaseStudyGraphicId =
  | "mds-ecosystem"
  | "white-label"
  | "base-design-system"
  | "compo-experience-only";

export type CaseStudyMediaHeights = {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  wide?: number;
  xl?: number;
};

export type CaseStudyMediaBlock = {
  type: "media";
  variant: "image" | "placeholder-light" | "placeholder-dark" | "graphic" | "layered-sketch" | "kickoff-board" | "timeline-scroll" | "content-typology" | "starting-point" | "architecture" | "article-patterns" | "ia-board" | "navigation-collage" | "zone-old-design" | "zone-moodboard" | "zone-survey-charts" | "zone-walkthrough" | "zone-news-calendar" | "users-board" | "benchmarking-grid" | "benchmarking-logos";
  src?: string;
  alt?: string;
  graphicId?: CaseStudyGraphicId;
  heights?: CaseStudyMediaHeights;
  /** Two placeholders side by side (e.g. benchmark comparisons). */
  layout?: "single" | "pair" | "typography-components";
  /** UCI naming benchmark nav screenshots (pair row 0 or 1). */
  namingNavBarPair?: 0 | 1;
  /** Aviso NDA en la parte superior del placeholder */
  ndaBanner?: boolean;
  /** Gráfico de ejes D.S. bajo el aviso NDA */
  dsAxisChart?: boolean;
  /** Composición reducida de dos gráficos de estrategia unidos por un "+". */
  combo?: "first-fourth";
};

export type CaseStudyMediaTextBlock = {
  type: "mediaText";
  mediaVariant: "placeholder-light" | "placeholder-dark" | "uci-metrics" | "uci-access-navbars" | "uci-usage-patterns" | "uci-endesa-buscador" | "uci-podcast" | "uci-content-strategy" | "uci-cross-selling" | "uci-design-system" | "zone-workspace" | "zone-dashboard" | "zone-favourite";
  metricsVariant?: "metrics1" | "metrics2";
  heading?: string;
  text?: string;
  items?: string[];
};

export type CaseStudyTwoColumnsBlock = {
  type: "twoColumns";
  variant?: "text" | "list";
  columns: string[] | string[][];
};

export type CaseStudyFeatureGridBlock = {
  type: "featureGrid";
  items: { title: string; description: string }[];
  /** 1 col mobile, 2 cols tablet, 3 cols desktop. Default is 1 col mobile, 2 cols from tablet. */
  layout?: "default" | "insights";
};

export type CaseStudyHeadingBlock = {
  type: "heading";
  /** Optional anchor id for index subsections. */
  id?: string;
  text: string;
  level: "h3" | "h4";
  /** Extra top spacing before this heading (64px total with section block gap). */
  spacingTop?: "section";
};

export type CaseStudyParagraphBlock = {
  type: "paragraph";
  text: string;
  /** Shown after `text` from 764px up; hide on small screens when media shows it instead. */
  desktopSuffix?: string;
};

export type CaseStudyListBlock = {
  type: "list";
  items: string[];
};

export type CaseStudyNumberedStepsBlock = {
  type: "numberedSteps";
  steps: { number: string; text: string }[];
};

export type CaseStudyPullQuoteBlock = {
  type: "pullQuote";
  text: string;
};

export type CaseStudyProsConsBlock = {
  type: "prosCons";
  advantages: string[];
  disadvantages: string[];
};

export type CaseStudyImpactQuotesBlock = {
  type: "impactQuotes";
  items: string[];
};

export type CaseStudyDividerBlock = {
  type: "divider";
};

export type CaseStudyExternalLinkBlock = {
  type: "externalLink";
  label: string;
  href: string;
};

export type CaseStudyBlock =
  | CaseStudyMediaBlock
  | CaseStudyMediaTextBlock
  | CaseStudyTwoColumnsBlock
  | CaseStudyFeatureGridBlock
  | CaseStudyHeadingBlock
  | CaseStudyParagraphBlock
  | CaseStudyListBlock
  | CaseStudyNumberedStepsBlock
  | CaseStudyPullQuoteBlock
  | CaseStudyProsConsBlock
  | CaseStudyImpactQuotesBlock
  | CaseStudyDividerBlock
  | CaseStudyExternalLinkBlock;

export type CaseStudySection = {
  /** Anchor id for in-page nav / scroll spy */
  navId?: string;
  eyebrow?: string;
  title?: string;
  titleLevel?: "h2" | "h3" | "h4";
  /** 64px from the previous section (reduces default 80px section gap). */
  spacingTop?: "section";
  /** Tighter spacing (64px) when consecutive sections share the same group. */
  group?: "strategies" | "analysis";
  blocks: CaseStudyBlock[];
};

export type CaseStudyContent = {
  slug: string;
  index: string;
  title: string;
  heroImage: string;
  heroImageAlt: string;
  /** When set, replaces the hero image with a muted autoplay video (plays once). */
  heroVideo?: string;
  meta: CaseStudyMetaItem[];
  introSections: CaseStudySection[];
  contentSections: CaseStudySection[];
  /** Side index (≥1024px). Omit on projects without nav yet. */
  nav?: CaseStudyNavItem[];
};
