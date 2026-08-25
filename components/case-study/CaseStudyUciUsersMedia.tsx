"use client";

import "@/components/case-study/case-study-uci-users.css";
import { uciUserPersonas } from "@/lib/case-studies/uci-users";

function UciUserCard({
  initials,
  badgeColor,
  title,
  description,
  descriptionHighlight,
  contentTypes,
}: (typeof uciUserPersonas)[number]) {
  return (
    <article className="uci-users-board__card">
      <div
        className="uci-users-board__badge"
        style={{ backgroundColor: badgeColor }}
        aria-hidden
      >
        <span className="uci-users-board__initials">{initials}</span>
      </div>

      <div className="uci-users-board__body">
        <div className="uci-users-board__intro">
          <h4 className="uci-users-board__title">{title}</h4>
          <p className="uci-users-board__description">
            {description}
            {descriptionHighlight ? (
              <strong className="uci-users-board__description-highlight">
                {descriptionHighlight}
              </strong>
            ) : null}
          </p>
        </div>

        <div className="uci-users-board__content-types">
          <p className="uci-users-board__content-types-label">Content types</p>
          <ul className="uci-users-board__content-types-list">
            {contentTypes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function CaseStudyUciUsersMedia() {
  return (
    <div className="uci-users-board" aria-label="UCI press room user types">
      {uciUserPersonas.map((persona) => (
        <UciUserCard key={persona.id} {...persona} />
      ))}
    </div>
  );
}
