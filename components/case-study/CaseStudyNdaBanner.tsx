import { WarningIcon } from "@/components/icons/WarningIcon";

const NDA_TEXT =
  "Brand names have been redacted to comply with the terms of the NDA";

/** Aviso NDA sobre placeholders de media en case studies */
export function CaseStudyNdaBanner() {
  return (
    <div
      className="case-study-nda-banner"
      role="note"
      aria-label={NDA_TEXT}
    >
      <WarningIcon className="case-study-nda-banner__icon shrink-0" />
      <p className="case-study-nda-banner__text">{NDA_TEXT}</p>
    </div>
  );
}
