import type { Metadata } from "next";
import { TransitionLink } from "@/components/TransitionLink";
import {
  PageFooterShell,
  PageGrid,
  PageMain,
  pageContentTopOffset,
  span2of2_12of12,
} from "@/components/PageLayout";
import { SiteFooter } from "@/components/SiteFooter";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy & cookies",
  description: "Privacy policy and cookie information for darreba.space",
};

export default function PrivacyPage() {
  return (
    <>
      <PageMain className={pageContentTopOffset}>
        <PageGrid className="gap-y-tight">
          <p
            className={`${span2of2_12of12} type-caption text-[var(--color-text-muted)]`}
          >
            <TransitionLink href="/" className="underline underline-offset-4">
              Work
            </TransitionLink>
            <span aria-hidden> · </span>
            Privacy & cookies
          </p>
          <h1
            className={`${span2of2_12of12} type-h1 text-balance text-[var(--color-heading)]`}
          >
            Privacy & cookies
          </h1>
          <div
            className={`${span2of2_12of12} type-body max-w-prose flex flex-col gap-tight text-[var(--color-body)]`}
          >
            <p>
              This site is operated by {site.name}. This page is a placeholder
              legal summary until your final policy is ready. You should replace
              it with text that matches how you process data, analytics, and
              cookies in production.
            </p>
            <p>
              For now, the portfolio does not load third-party analytics. If you
              add analytics or embedded media later, update this page and your
              cookie banner accordingly.
            </p>
            <p>
              Contact:{" "}
              <a
                className="underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
              .
            </p>
          </div>
        </PageGrid>
      </PageMain>
      <PageFooterShell>
        <SiteFooter />
      </PageFooterShell>
    </>
  );
}
