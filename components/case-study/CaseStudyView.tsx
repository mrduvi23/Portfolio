import { CaseStudyUciAccessPointNavBars } from "@/components/case-study/CaseStudyUciAccessPointNavBars";
import { CaseStudyUciUsagePatternsMedia } from "@/components/case-study/CaseStudyUciUsagePatternsMedia";
import { CaseStudyUciEndesaBuscadorMedia } from "@/components/case-study/CaseStudyUciEndesaBuscadorMedia";
import { CaseStudyUciPodcastMedia } from "@/components/case-study/CaseStudyUciPodcastMedia";
import { CaseStudyUciContentStrategyMedia } from "@/components/case-study/CaseStudyUciContentStrategyMedia";
import { CaseStudyUciCrossSellingMedia } from "@/components/case-study/CaseStudyUciCrossSellingMedia";
import { CaseStudyUciDesignSystemMedia } from "@/components/case-study/CaseStudyUciDesignSystemMedia";
import { CaseStudyUciNavigationMedia } from "@/components/case-study/CaseStudyUciNavigationMedia";
import { CaseStudyExternalLink } from "@/components/case-study/CaseStudyExternalLink";
import { CaseStudyUciArticlePatternsMedia } from "@/components/case-study/CaseStudyUciArticlePatternsMedia";
import { CaseStudyUciIaBoard } from "@/components/case-study/CaseStudyUciIaBoard";
import { CaseStudyUciNamingNavBarFrame } from "@/components/case-study/CaseStudyUciNamingNavBarFrame";
import { CaseStudyUciBenchmarkingGrid } from "@/components/case-study/CaseStudyUciBenchmarkingGrid";
import { CaseStudyUciBenchmarkingLogos } from "@/components/case-study/CaseStudyUciBenchmarkingLogos";
import { CaseStudyUciUsersMedia } from "@/components/case-study/CaseStudyUciUsersMedia";
import { CaseStudyUciMetricsMedia } from "@/components/case-study/CaseStudyUciMetricsMedia";
import { CaseStudyUciStartingPointMedia } from "@/components/case-study/CaseStudyUciStartingPointMedia";
import { CaseStudyUciArchitectureMedia } from "@/components/case-study/CaseStudyUciArchitectureMedia";
import { CaseStudyUciTimelineMedia } from "@/components/case-study/CaseStudyUciTimelineMedia";
import { CaseStudyUciContentTypologyMedia } from "@/components/case-study/CaseStudyUciContentTypologyMedia";
import { CaseStudyUciKickoffBoard } from "@/components/case-study/CaseStudyUciKickoffBoard";
import { CaseStudyUciSketchMedia } from "@/components/case-study/CaseStudyUciSketchMedia";
import { CaseStudyZoneOldDesignMedia } from "@/components/case-study/CaseStudyZoneOldDesignMedia";
import { CaseStudyZoneMoodboardMedia } from "@/components/case-study/CaseStudyZoneMoodboardMedia";
import { CaseStudyZoneWalkthroughMedia } from "@/components/case-study/CaseStudyZoneWalkthroughMedia";
import { CaseStudyZoneNewsCalendarMedia } from "@/components/case-study/CaseStudyZoneNewsCalendarMedia";
import { CaseStudyZonePhoneClip } from "@/components/case-study/CaseStudyZonePhoneClip";
import { CaseStudyHeroVideo } from "@/components/case-study/CaseStudyHeroVideo";
import { CaseStudyGraphicMedia } from "@/components/case-study/CaseStudyGraphicMedia";
import { CaseStudyDsAxisChart } from "@/components/case-study/CaseStudyDsAxisChart";
import { CaseStudyDsBrandsAuditMedia } from "@/components/case-study/CaseStudyDsBrandsAuditMedia";
import { CaseStudyNdaBanner } from "@/components/case-study/CaseStudyNdaBanner";
import { CaseStudyParallaxImage } from "@/components/case-study/CaseStudyParallaxImage";
import { FinalDecisionComboGraphic } from "@/components/case-study/graphics/FinalDecisionComboGraphic";
import "@/components/case-study/case-study-strategy.css";
import "@/components/case-study/graphics/mds-ecosystem.css";
import "@/components/case-study/graphics/base-design-system.css";
import "@/components/case-study/graphics/compo-experience-only.css";
import "@/components/case-study/graphics/white-label.css";
import Image from "next/image";
import {
  caseStudyContentSpan,
  PageGrid,
} from "@/components/PageLayout";
import { uciNamingNavBarStacks } from "@/lib/case-studies/uci-naming-navbars";
import type {
  CaseStudyBlock,
  CaseStudyContent,
  CaseStudyGraphicId,
  CaseStudySection,
} from "@/lib/case-studies/types";

const STRATEGY_MEDIA_BORDER =
  "overflow-hidden border border-[var(--color-card-inset-border)]";

const GRAPHIC_FRAME_CLASS: Record<CaseStudyGraphicId, string> = {
  "mds-ecosystem": `mds-ecosystem-frame case-study-strategy-media ${STRATEGY_MEDIA_BORDER}`,
  "white-label": `white-label-frame case-study-strategy-media ${STRATEGY_MEDIA_BORDER}`,
  "base-design-system": `base-ds-frame case-study-strategy-media ${STRATEGY_MEDIA_BORDER}`,
  "compo-experience-only": `compo-only-frame case-study-strategy-media ${STRATEGY_MEDIA_BORDER}`,
};

function CaseStudySectionHeader({
  eyebrow,
  title,
  titleLevel = "h2",
}: {
  eyebrow?: string;
  title?: string;
  titleLevel?: "h2" | "h3" | "h4";
}) {
  if (!eyebrow && !title) return null;

  const TitleTag =
    titleLevel === "h4" ? "h4" : titleLevel === "h3" ? "h3" : "h2";
  const titleClass =
    titleLevel === "h4"
      ? "type-h4 text-pretty text-[var(--color-heading)]"
      : titleLevel === "h3"
        ? "type-h3 text-pretty text-[var(--color-heading)]"
        : "type-h2 text-pretty text-[var(--color-heading)]";

  return (
    <header className="flex flex-col gap-3">
      {eyebrow ? (
        <p className="type-section-label text-[var(--color-body)]">{eyebrow}</p>
      ) : null}
      {title ? <TitleTag className={titleClass}>{title}</TitleTag> : null}
    </header>
  );
}

function CaseStudyPlaceholderBox({
  layout = "full",
}: {
  variant?: "placeholder-light" | "placeholder-dark";
  layout?: "full" | "half";
}) {
  const layoutClass =
    layout === "half"
      ? "case-study-placeholder-frame case-study-placeholder-frame--half"
      : "case-study-placeholder-frame";

  return <div className={layoutClass} aria-hidden />;
}

function CaseStudyMediaPairWithCaptions({
  media,
  captions,
}: {
  media: Extract<CaseStudyBlock, { type: "media" }>;
  captions: Extract<CaseStudyBlock, { type: "twoColumns" }>;
}) {
  const isList = captions.variant === "list";
  const columns = captions.columns;
  const navBarPair = media.namingNavBarPair;
  const navBarStacks =
    navBarPair !== undefined ? uciNamingNavBarStacks[navBarPair] : null;

  return (
    <div className="case-study-media-pair-captions">
      {[0, 1].map((index) => (
        <div key={index} className="case-study-media-pair-captions__item">
          {navBarStacks?.[index] ? (
            <CaseStudyUciNamingNavBarFrame images={navBarStacks[index]} />
          ) : (
            <div className="case-study-placeholder-frame case-study-placeholder-frame--half" aria-hidden />
          )}
          {isList ? (
            <ul className="type-body list-disc space-y-0 pl-6 text-[var(--color-body)]">
              {((columns as string[][])[index] ?? []).map((item) => (
                <li key={item} className="text-pretty">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="type-body text-pretty text-[var(--color-body)]">
              {(columns as string[])[index]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function CaseStudySectionBlocks({ blocks }: { blocks: CaseStudyBlock[] }) {
  const rendered: React.ReactNode[] = [];

  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const next = blocks[index + 1];

    if (
      block.type === "media" &&
      block.layout === "pair" &&
      next?.type === "twoColumns"
    ) {
      rendered.push(
        <CaseStudyMediaPairWithCaptions
          key={`media-pair-captions-${index}`}
          media={block}
          captions={next}
        />,
      );
      index++;
      continue;
    }

    if (block.type === "paragraph" && next?.type === "externalLink") {
      rendered.push(
        <div key={`paragraph-link-${index}`} className="flex flex-col gap-6">
          <CaseStudyParagraph text={block.text} desktopSuffix={block.desktopSuffix} />
          <CaseStudyExternalLink href={next.href} label={next.label} />
        </div>,
      );
      index++;
      continue;
    }

    rendered.push(<CaseStudyBlockView key={`${block.type}-${index}`} block={block} />);
  }

  return rendered;
}

function CaseStudyMedia({ block }: { block: Extract<CaseStudyBlock, { type: "media" }> }) {
  if (block.combo === "first-fourth") {
    return (
      <div
        className={`relative w-full ${STRATEGY_MEDIA_BORDER} case-study-strategy-media`}
      >
        <FinalDecisionComboGraphic />
      </div>
    );
  }

  if (block.layout === "typography-components") {
    return <CaseStudyDsBrandsAuditMedia />;
  }

  if (block.variant === "graphic" && block.graphicId) {
    return (
      <div className={`relative w-full ${GRAPHIC_FRAME_CLASS[block.graphicId]}`}>
        <CaseStudyGraphicMedia graphicId={block.graphicId} />
      </div>
    );
  }

  if (block.variant === "benchmarking-logos") {
    return <CaseStudyUciBenchmarkingLogos />;
  }

  if (block.variant === "benchmarking-grid") {
    return <CaseStudyUciBenchmarkingGrid />;
  }

  if (block.variant === "users-board") {
    return <CaseStudyUciUsersMedia />;
  }

  if (block.variant === "starting-point") {
    return <CaseStudyUciStartingPointMedia />;
  }

  if (block.variant === "architecture") {
    return <CaseStudyUciArchitectureMedia />;
  }

  if (block.variant === "article-patterns") {
    return <CaseStudyUciArticlePatternsMedia />;
  }

  if (block.variant === "ia-board") {
    return <CaseStudyUciIaBoard />;
  }

  if (block.variant === "navigation-collage") {
    return <CaseStudyUciNavigationMedia />;
  }

  if (block.variant === "zone-old-design") {
    return <CaseStudyZoneOldDesignMedia />;
  }

  if (block.variant === "zone-moodboard") {
    return <CaseStudyZoneMoodboardMedia />;
  }

  if (block.variant === "zone-walkthrough") {
    return <CaseStudyZoneWalkthroughMedia />;
  }

  if (block.variant === "zone-news-calendar") {
    return <CaseStudyZoneNewsCalendarMedia />;
  }

  if (block.variant === "timeline-scroll") {
    return <CaseStudyUciTimelineMedia />;
  }

  if (block.variant === "content-typology") {
    return <CaseStudyUciContentTypologyMedia />;
  }

  if (block.variant === "kickoff-board") {
    return <CaseStudyUciKickoffBoard />;
  }

  if (block.variant === "layered-sketch") {
    return <CaseStudyUciSketchMedia />;
  }

  if (block.variant === "placeholder-light" && block.src) {
    return (
      <CaseStudyParallaxImage
        src={block.src}
        alt={block.alt}
        frameClass={`relative w-full ${STRATEGY_MEDIA_BORDER} bg-[var(--color-primitives-grey-10)] h-[400px]`}
      />
    );
  }

  if (block.variant === "image" && block.src) {
    return (
      <div
        className={`relative h-[400px] w-full ${STRATEGY_MEDIA_BORDER}`}
      >
        <Image
          src={block.src}
          alt={block.alt ?? ""}
          fill
          className="object-cover"
          sizes="(max-width:763px) 100vw, 922px"
          priority={false}
        />
      </div>
    );
  }

  if (block.layout === "pair") {
    return (
      <div className="grid grid-cols-1 gap-4 min-[764px]:grid-cols-2">
        <CaseStudyPlaceholderBox layout="half" />
        <CaseStudyPlaceholderBox layout="half" />
      </div>
    );
  }

  const placeholderContent = block.ndaBanner || block.dsAxisChart;

  return (
    <div
      className={`relative w-full ${
        placeholderContent
          ? `${STRATEGY_MEDIA_BORDER} case-study-placeholder`
          : "case-study-placeholder-frame"
      }`}
      aria-hidden={placeholderContent ? undefined : true}
    >
      {placeholderContent ? (
        <div className="case-study-placeholder__inner">
          {block.ndaBanner ? <CaseStudyNdaBanner /> : null}
          {block.dsAxisChart ? <CaseStudyDsAxisChart /> : null}
        </div>
      ) : null}
    </div>
  );
}

function CaseStudyPullQuote({
  text,
}: {
  text: string;
}) {
  return (
    <figure className="flex gap-4">
      <div
        className="w-px shrink-0 self-stretch bg-[var(--color-heading)]"
        aria-hidden
      />
      <blockquote className="type-quote whitespace-pre-line text-pretty text-[var(--color-heading)]">
        {text}
      </blockquote>
    </figure>
  );
}

function CaseStudyProsCons({
  advantages,
  disadvantages,
}: {
  advantages: string[];
  disadvantages: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-8 min-[764px]:grid-cols-2 min-[764px]:gap-4">
      <div className="flex flex-col gap-2">
        <p className="type-h5 text-[var(--color-heading)]">Advantages</p>
        <ul className="type-body list-disc space-y-0 pl-6 text-[var(--color-body)]">
          {advantages.map((item) => (
            <li key={item} className="text-pretty">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p className="type-h5 text-[var(--color-heading)]">Disadvantages</p>
        <ul className="type-body list-disc space-y-0 pl-6 text-[var(--color-body)]">
          {disadvantages.map((item) => (
            <li key={item} className="text-pretty">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CaseStudyImpactQuotes({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((text) => (
        <figure key={text} className="flex gap-4">
          <div
            className="w-px shrink-0 self-stretch bg-[var(--color-heading)]"
            aria-hidden
          />
          <blockquote className="type-quote text-pretty text-[var(--color-heading)]">
            {text}
          </blockquote>
        </figure>
      ))}
    </div>
  );
}

function CaseStudyHeading({
  id,
  text,
  level,
  spacingTop,
}: {
  id?: string;
  text: string;
  level: "h3" | "h4";
  spacingTop?: "section";
}) {
  const Tag = level === "h4" ? "h4" : "h3";
  const className =
    level === "h4"
      ? "type-h4 text-pretty text-[var(--color-heading)]"
      : "type-h3 text-pretty text-[var(--color-heading)]";
  const spacingClass = spacingTop === "section" ? "mt-11" : "";

  return (
    <Tag id={id} className={`${className} ${spacingClass} ${id ? "scroll-mt-28" : ""}`.trim()}>
      {text}
    </Tag>
  );
}

function CaseStudyParagraph({
  text,
  desktopSuffix,
}: {
  text: string;
  desktopSuffix?: string;
}) {
  const paragraphs = text.split("\n\n");

  return (
    <div className="flex flex-col gap-6">
      {paragraphs.map((paragraph, index) => {
        const isLast = index === paragraphs.length - 1;
        return (
          <p key={paragraph} className="type-body text-pretty">
            {paragraph}
            {isLast && desktopSuffix ? (
              <span className="max-[763px]:hidden">{desktopSuffix}</span>
            ) : null}
          </p>
        );
      })}
    </div>
  );
}

function CaseStudyMediaText({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "mediaText" }>;
}) {
  const media =
    block.mediaVariant === "uci-metrics" && block.metricsVariant ? (
      <CaseStudyUciMetricsMedia variant={block.metricsVariant} />
    ) : block.mediaVariant === "uci-access-navbars" ? (
      <CaseStudyUciAccessPointNavBars />
    ) : block.mediaVariant === "uci-usage-patterns" ? (
      <CaseStudyUciUsagePatternsMedia />
    ) : block.mediaVariant === "uci-endesa-buscador" ? (
      <CaseStudyUciEndesaBuscadorMedia />
    ) : block.mediaVariant === "uci-podcast" ? (
      <CaseStudyUciPodcastMedia />
    ) : block.mediaVariant === "uci-content-strategy" ? (
      <CaseStudyUciContentStrategyMedia />
    ) : block.mediaVariant === "uci-cross-selling" ? (
      <CaseStudyUciCrossSellingMedia />
    ) : block.mediaVariant === "uci-design-system" ? (
      <CaseStudyUciDesignSystemMedia />
    ) : block.mediaVariant === "zone-workspace" ||
      block.mediaVariant === "zone-dashboard" ||
      block.mediaVariant === "zone-favourite" ? (
      <CaseStudyZonePhoneClip variant={block.mediaVariant} />
    ) : (
      <CaseStudyPlaceholderBox layout="half" />
    );

  return (
    <div className="grid grid-cols-1 items-center gap-4 min-[764px]:grid-cols-2">
      {media}
      <div className="flex flex-col gap-2">
        {block.heading ? (
          <p className="type-h5 text-[var(--color-heading)]">{block.heading}</p>
        ) : null}
        {block.text ? (
          <div className="flex flex-col gap-6">
            {block.text.split("\n\n").map((paragraph) => (
              <p
                key={paragraph}
                className="type-body text-pretty text-[var(--color-body)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
        {block.items?.length ? (
          <ul className="type-body list-disc space-y-0 pl-6 text-[var(--color-body)]">
            {block.items.map((item) => (
              <li key={item} className="text-pretty">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function CaseStudyTwoColumns({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "twoColumns" }>;
}) {
  const isList = block.variant === "list";
  const columns = block.columns;

  return (
    <div className={isList ? "case-study-two-columns-list" : "grid grid-cols-1 gap-4 min-[764px]:grid-cols-2"}>
      {isList
        ? (columns as string[][]).map((items) => (
            <ul
              key={items.join("|")}
              className="type-body min-w-0 list-disc space-y-0 pl-6 text-[var(--color-body)]"
            >
              {items.map((item) => (
                <li key={item} className="text-pretty">
                  {item}
                </li>
              ))}
            </ul>
          ))
        : (columns as string[]).map((column) => (
            <p
              key={column}
              className="type-body text-pretty text-[var(--color-body)]"
            >
              {column}
            </p>
          ))}
    </div>
  );
}

function CaseStudyFeatureGrid({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "featureGrid" }>;
}) {
  const gridClass =
    block.layout === "insights"
      ? "grid grid-cols-1 gap-4 min-[764px]:grid-cols-2 min-[1280px]:grid-cols-3"
      : "grid grid-cols-1 gap-4 min-[764px]:grid-cols-2";

  return (
    <div className={gridClass}>
      {block.items.map((item) => (
        <div key={item.title} className="flex flex-col gap-2">
          <p className="type-h5 text-[var(--color-heading)]">{item.title}</p>
          <p className="type-body text-pretty text-[var(--color-body)]">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function CaseStudyList({ items }: { items: string[] }) {
  return (
    <ul className="type-body list-disc space-y-0 pl-6 text-[var(--color-body)]">
      {items.map((item) => (
        <li key={item} className="text-pretty">
          {item}
        </li>
      ))}
    </ul>
  );
}

function CaseStudyNumberedStep({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="type-h5 shrink-0 text-[var(--color-primitives-grey-60)]">
          {number}
        </span>
        <div
          className="h-px min-w-0 flex-1 bg-[var(--color-border)]"
          aria-hidden
        />
      </div>
      <p className="type-body text-pretty">{text}</p>
    </div>
  );
}

function CaseStudyNumberedSteps({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "numberedSteps" }>;
}) {
  const [firstStep, ...restSteps] = block.steps;

  if (!firstStep) return null;

  return (
    <div className="flex flex-col gap-8">
      <CaseStudyNumberedStep number={firstStep.number} text={firstStep.text} />
      {restSteps.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 min-[764px]:grid-cols-2 min-[764px]:gap-4">
          {restSteps.map((step) => (
            <CaseStudyNumberedStep
              key={step.number}
              number={step.number}
              text={step.text}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CaseStudyBlockView({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "media":
      return <CaseStudyMedia block={block} />;
    case "mediaText":
      return <CaseStudyMediaText block={block} />;
    case "twoColumns":
      return <CaseStudyTwoColumns block={block} />;
    case "featureGrid":
      return <CaseStudyFeatureGrid block={block} />;
    case "heading":
      return (
        <CaseStudyHeading
          id={block.id}
          text={block.text}
          level={block.level}
          spacingTop={block.spacingTop}
        />
      );
    case "list":
      return <CaseStudyList items={block.items} />;
    case "numberedSteps":
      return <CaseStudyNumberedSteps block={block} />;
    case "paragraph":
      return (
        <CaseStudyParagraph
          text={block.text}
          desktopSuffix={block.desktopSuffix}
        />
      );
    case "externalLink":
      return <CaseStudyExternalLink href={block.href} label={block.label} />;
    case "pullQuote":
      return <CaseStudyPullQuote text={block.text} />;
    case "prosCons":
      return (
        <CaseStudyProsCons
          advantages={block.advantages}
          disadvantages={block.disadvantages}
        />
      );
    case "impactQuotes":
      return <CaseStudyImpactQuotes items={block.items} />;
    case "divider":
      return (
        <hr className="border-0 border-t border-[var(--color-border)]" />
      );
    default:
      return null;
  }
}

function CaseStudySectionView({ section }: { section: CaseStudySection }) {
  const sectionSpacingClass =
    section.spacingTop === "section" ? "-mt-4" : "";

  return (
    <section
      id={section.navId}
      className={`flex scroll-mt-28 flex-col gap-5 ${sectionSpacingClass}`.trim()}
    >
      <CaseStudySectionHeader
        eyebrow={section.eyebrow}
        title={section.title}
        titleLevel={section.titleLevel}
      />
      <div className="flex flex-col gap-5">
        <CaseStudySectionBlocks blocks={section.blocks} />
      </div>
    </section>
  );
}

function groupCaseStudySections(sections: CaseStudySection[]) {
  type Block =
    | { kind: "section"; section: CaseStudySection }
    | { kind: "group"; sections: CaseStudySection[] };

  const blocks: Block[] = [];
  let index = 0;

  while (index < sections.length) {
    const section = sections[index];
    if (section.group) {
      const groupId = section.group;
      const group: CaseStudySection[] = [];
      while (index < sections.length && sections[index].group === groupId) {
        group.push(sections[index]);
        index++;
      }
      blocks.push({ kind: "group", sections: group });
    } else {
      blocks.push({ kind: "section", section });
      index++;
    }
  }

  return blocks;
}

function CaseStudyContentBlocks({
  introSections,
  contentSections,
}: {
  introSections: CaseStudySection[];
  contentSections: CaseStudySection[];
}) {
  const blocks = [
    ...introSections.map(
      (section) => ({ kind: "section", section }) as const,
    ),
    ...groupCaseStudySections(contentSections),
  ];

  return (
    <div className="flex flex-col gap-20">
      {blocks.map((block) => {
        if (block.kind === "group") {
          return (
            <div
              key={block.sections[0]?.title ?? block.sections[0]?.eyebrow}
              className="flex flex-col gap-16"
            >
              {block.sections.map((section) => (
                <CaseStudySectionView
                  key={`${section.eyebrow}-${section.title}`}
                  section={section}
                />
              ))}
            </div>
          );
        }

        return (
          <CaseStudySectionView
            key={block.section.title ?? block.section.eyebrow}
            section={block.section}
          />
        );
      })}
    </div>
  );
}

function MetaValue({ value }: { value: string }) {
  const lines = value.split("\n");

  return (
    <p className="text-base leading-6 font-normal whitespace-pre-line text-[var(--color-heading)]">
      {lines.map((line, i) => (
        <span key={line}>
          {line}
          {i < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </p>
  );
}

export function CaseStudyView({ study }: { study: CaseStudyContent }) {
  return (
    <div className="flex flex-col gap-10 min-[764px]:gap-10">
      <PageGrid className="gap-y-4">
        <div className={`${caseStudyContentSpan} flex flex-col gap-4`}>
          <header className="flex flex-col gap-2">
            <p className="type-label-caps text-[var(--color-body)]">
              {study.index}
            </p>
            <h1 className="type-h1 text-balance text-[var(--color-heading)]">
              {study.title}
            </h1>
          </header>

          {study.heroVideo ? (
            <CaseStudyHeroVideo
              src={study.heroVideo}
              poster={study.heroImage}
              alt={study.heroImageAlt}
            />
          ) : (
            <CaseStudyMedia
              block={{
                type: "media",
                variant: "image",
                src: study.heroImage,
                alt: study.heroImageAlt,
              }}
            />
          )}

          <div className="grid grid-cols-2 gap-4 min-[764px]:grid-cols-4 min-[764px]:gap-4">
            {study.meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <p className="type-body text-[var(--color-body)]">{item.label}</p>
                <MetaValue value={item.value} />
              </div>
            ))}
          </div>
        </div>
      </PageGrid>

      <PageGrid>
        <hr
          className={`${caseStudyContentSpan} border-0 border-t border-[var(--color-border)]`}
        />
      </PageGrid>

      <PageGrid>
        <div className={`${caseStudyContentSpan} flex flex-col`}>
          <CaseStudyContentBlocks
            introSections={study.introSections}
            contentSections={study.contentSections}
          />
        </div>
      </PageGrid>
    </div>
  );
}
