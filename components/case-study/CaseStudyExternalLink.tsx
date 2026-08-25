import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import "@/components/about/contact-form.css";

const LINK_MOTION =
  "transition-transform duration-200 [transition-timing-function:cubic-bezier(0.2,0,0,1)]";

export function CaseStudyExternalLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="about-download-cv about-download-cv--icon-center group inline-flex gap-2 type-label uppercase outline-offset-4"
    >
      <span className="h-[24px] overflow-hidden">
        <span
          className={`flex flex-col gap-[10px] ${LINK_MOTION} group-hover:-translate-y-[34px] group-focus-visible:-translate-y-[34px]`}
        >
          <span className="text-[var(--color-heading)] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 group-focus-visible:underline group-focus-visible:decoration-1 group-focus-visible:underline-offset-4">
            {label}
          </span>
          <span className="text-[var(--color-primitives-grey-90)] underline decoration-1 underline-offset-4">
            {label}
          </span>
        </span>
      </span>
      <ExternalLinkIcon className="about-download-cv__icon shrink-0 text-[var(--color-heading)] transition-colors duration-200 group-hover:text-[var(--color-primitives-grey-90)] group-focus-visible:text-[var(--color-primitives-grey-90)]" />
    </a>
  );
}
