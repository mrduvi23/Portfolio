import type { Metadata } from "next";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { TransitionLink } from "@/components/TransitionLink";
import {
  PageFooterShell,
  PageGrid,
  PageMain,
  pageContentTopOffset,
  span2of2_12of12,
} from "@/components/PageLayout";
import { SiteFooter } from "@/components/SiteFooter";
import { getCaseStudyBySlug, hasCaseStudyPage } from "@/lib/case-studies";
import { getProjectBySlug, projects } from "@/lib/content";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Case study" };
  const study = hasCaseStudyPage(slug) ? getCaseStudyBySlug(slug) : undefined;
  const pageTitle = study?.title ?? project.title;

  return {
    title: pageTitle,
    description: `${project.meta} — case study`,
  };
}

function CaseStudyPlaceholder({
  title,
  meta,
}: {
  title: string;
  meta: string;
}) {
  return (
    <PageGrid className="gap-y-tight">
      <p
        className={`${span2of2_12of12} type-caption text-[var(--color-text-muted)]`}
      >
        <TransitionLink href="/" className="underline underline-offset-4">
          Work
        </TransitionLink>
        <span aria-hidden> · </span>
        <span className="text-[var(--color-body)]">{title}</span>
      </p>
      <h1
        className={`${span2of2_12of12} type-h1 text-balance text-[var(--color-heading)]`}
      >
        {title}
      </h1>
      <p className={`${span2of2_12of12} type-body text-pretty`}>
        {meta} — full case study content will go here.
      </p>
    </PageGrid>
  );
}

export default async function WorkCasePage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const study = hasCaseStudyPage(slug) ? getCaseStudyBySlug(slug) : undefined;

  return (
    <>
      <PageMain className={pageContentTopOffset}>
        {study ? (
          <CaseStudyView study={study} />
        ) : (
          <CaseStudyPlaceholder title={project.title} meta={project.meta} />
        )}
      </PageMain>
      <PageFooterShell>
        <SiteFooter />
      </PageFooterShell>
    </>
  );
}
