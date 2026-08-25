import "@/components/case-study/case-study-uci-ia-board.css";
import {
  type UciIaChip,
  type UciIaVersion,
  uciIaEarlyVersions,
  uciIaFeaturedVersion,
} from "@/lib/case-studies/uci-ia-versions";

function IaChip({ chip, tall }: { chip: UciIaChip; tall?: boolean }) {
  const lines = chip.lines?.length ? chip.lines : [chip.label];
  const isTall =
    tall ||
    Boolean(chip.lines && chip.lines.length > 1) ||
    (chip.children && chip.children.length > 2);

  return (
    <span
      className={`uci-ia-board__chip uci-ia-board__chip--${chip.tone}${
        isTall ? " uci-ia-board__chip--tall" : ""
      }`}
    >
      {lines.map((line) => (
        <span key={line} className="uci-ia-board__chip-line">
          {line}
        </span>
      ))}
    </span>
  );
}

function IaItemRow({ chip }: { chip: UciIaChip }) {
  const tall =
    Boolean(chip.lines && chip.lines.length > 1) ||
    (chip.tone === "gradient" && (chip.children?.length ?? 0) >= 2);

  return (
    <div className="uci-ia-board__item">
      <IaChip chip={chip} tall={tall} />
      {chip.children?.length ? (
        <div className="uci-ia-board__children">
          {chip.children.map((child) => (
            <span key={child} className="uci-ia-board__child">
              {child}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function IaVersionColumn({ version }: { version: UciIaVersion }) {
  return (
    <article
      className={`uci-ia-board__version${
        version.featured ? " uci-ia-board__version--featured" : ""
      }`}
    >
      <div className="uci-ia-board__version-main">
        <h4 className="uci-ia-board__version-title">{version.title}</h4>

        {version.hub ? (
          <div className="uci-ia-board__hub">
            <IaChip chip={version.hub} />
          </div>
        ) : null}

        <div
          className={`uci-ia-board__items${
            version.hub ? " uci-ia-board__items--indented" : ""
          }`}
        >
          {version.items.map((item) => (
            <IaItemRow key={`${version.id}-${item.label}`} chip={item} />
          ))}
        </div>
      </div>

      <div className="uci-ia-board__contextual">
        <p className="uci-ia-board__contextual-label">CONTEXTUAL ACCESS:</p>
        <ul className="uci-ia-board__contextual-list">
          {version.contextual.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function CaseStudyUciIaBoard() {
  return (
    <div
      className="uci-ia-board"
      aria-label="Information architecture iterations from workshop"
    >
      <div className="uci-ia-board__grid">
        <div className="uci-ia-board__early">
          {uciIaEarlyVersions.map((version) => (
            <IaVersionColumn key={version.id} version={version} />
          ))}
        </div>
        <IaVersionColumn version={uciIaFeaturedVersion} />
      </div>
    </div>
  );
}
