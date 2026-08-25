import "@/components/case-study/case-study-uci-kickoff-board.css";
import { UciFigmaCursor } from "@/components/case-study/UciFigmaCursor";

const PERSONAS = [
  {
    key: "experienced",
    color: "red" as const,
    title: "Experienced individual user",
    subtitle: "Comes from the Newsletter",
  },
  {
    key: "inexperienced",
    color: "blue" as const,
    title: "Inexperienced individual user",
    subtitle: "Comes from the Newsletter",
  },
  {
    key: "press",
    color: "green" as const,
    title: "Press",
    subtitle: "Direct traffic",
  },
  {
    key: "professionals",
    color: "yellow" as const,
    title: "Real estate or renovation professionals",
    subtitle: "Comes from the Newsletter",
    subtitleExtra: "Not relevant",
  },
] as const;

export function CaseStudyUciKickoffBoard() {
  return (
    <div className="uci-kickoff-board" aria-label="Kickoff session FigJam board">
      <ul className="uci-kickoff-board__list">
        <li>What is the business goal of the Communication Room?</li>
        <ul>
          <li>
            <em>Foster transparent communication between stakeholders</em>
          </li>
        </ul>
        <li>Who is it aimed at?</li>
      </ul>

      <div className="uci-kickoff-board__personas">
        {PERSONAS.map((persona) => (
          <div key={persona.key} className="uci-kickoff-board__persona">
            <span
              className={`uci-kickoff-board__persona-dot uci-kickoff-board__persona-dot--${persona.color}${
                persona.color === "yellow"
                  ? " uci-kickoff-board__persona-dot--minor"
                  : ""
              }`}
              aria-hidden
            />
            <p className="uci-kickoff-board__persona-title">{persona.title}</p>
            <p className="uci-kickoff-board__persona-subtitle">{persona.subtitle}</p>
            {"subtitleExtra" in persona && persona.subtitleExtra ? (
              <p className="uci-kickoff-board__persona-subtitle">
                {persona.subtitleExtra}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <ul className="uci-kickoff-board__list uci-kickoff-board__list--spaced">
        <li>Which user matters most to the business? Weigh the users</li>
        <ul>
          <li>
            <em>Inexperienced individual user → Build trust</em>
          </li>
        </ul>
        <li>
          Do we have metrics on the current site? Can we talk to someone about
          them?
        </li>
        <ul>
          <li>
            <em>We&apos;ll check with the Marketing team (Bea Arcos)</em>
          </li>
        </ul>
      </ul>

      <div className="uci-kickoff-board__bottom" aria-hidden>
        <div className="uci-kickoff-board__titles">
          <p className="uci-kickoff-board__accent uci-kickoff-board__title">
            Review content types. Map them to users, current volume and
            publication frequency.
          </p>
          <p className="uci-kickoff-board__accent uci-kickoff-board__title">
            Other
          </p>
        </div>

        <div className="uci-kickoff-board__columns">
          <div className="uci-kickoff-board__column">
            <ul>
              <ul>
                <li>
                  <span className="uci-kickoff-board__accent">News</span>
                </li>
              <ul>
                <li>
                  Current affairs and blog merged (4/5 per month. +200 total)
                </li>
                <li>Press releases (70 per year, since 2015)</li>
                <li>THINGS TO CONSIDER</li>
                <ul>
                  <li>
                    Differentiated by tags (works if based on type, topic or
                    user: real estate, individual, press, renovation). Check
                    benchmark
                  </li>
                  <li>
                    Do we include press releases in a dedicated press section?
                    BENCHMARK
                  </li>
                </ul>
              </ul>
              <li>
                <span className="uci-kickoff-board__accent">Publications</span>
              </li>
              <ul>
                <li>
                  Barometers, reports... (4 barometers per year since 2020.
                  Reports 2/3 per year)
                </li>
                <li>Will we have a detail page?</li>
                <ul>
                  <li>Yes</li>
                </ul>
              </ul>
              <li>
                <span className="uci-kickoff-board__accent">Events</span>
              </li>
              <ul>
                <li>
                  Will we have a detail page? (Inmocionate annual. Meetups/sessions
                  3/4 per year. Rehabita annual. Webinars in the future). Users
                  should be able to sign up directly from the website via a form.
                  INFO PENDING. Current events only, not past ones, although past
                  events could be linked to their related press release)
                </li>
                <ul>
                  <li>Yes</li>
                </ul>
              </ul>
            </ul>
          </ul>
        </div>

        <div className="uci-kickoff-board__column uci-kickoff-board__column--other">
          <ul>
            <ul>
              <li>
                <span className="uci-kickoff-board__accent">Press resources </span>
                (downloadable branding assets, etc.). Broken down
              </li>
              <ul>
                <li>Idea: Basic kit? OK</li>
              </ul>
              <li>
                <span className="uci-kickoff-board__accent">UCI Social Media</span>
              </li>
              <ul>
                <ul>
                  <li>
                    Social feed (Module: latest posts and links to LinkedIn,
                    Instagram, X)
                  </li>
                </ul>
              </ul>
              <li>
                <span className="uci-kickoff-board__accent">Press contact</span>
              </li>
              <ul>
                <li>Key press contacts</li>
                <li>Newsletter subscription</li>
                <li>Phone, email...</li>
              </ul>
              <li>
                Landing pages for real estate professionals, first-timers...
              </li>
            </ul>
          </ul>
        </div>
      </div>
      </div>

      <UciFigmaCursor
        label="Communications"
        pointerFill="#FFC700"
        labelBackground="#FFC700"
        className="uci-kickoff-board__cursor uci-kickoff-board__cursor--comunicacion"
      />
      <UciFigmaCursor
        label="Redbility"
        pointerFill="#EF5533"
        labelBackground="#EF5533"
        labelColor="var(--color-primitives-white)"
        className="uci-kickoff-board__cursor uci-kickoff-board__cursor--redbility"
      />
    </div>
  );
}
