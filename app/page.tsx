import Image from "next/image";
import { LockIcon } from "@/components/icons/LockIcon";
import { TransitionLink } from "@/components/TransitionLink";
import { assets } from "@/lib/assets";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { intro, projects } from "@/lib/content";
import {
  PageFooterShell,
  PageGrid,
  PageMain,
  pageContentTopOffset,
  span2of2_5of12,
  span2of2_7of12,
} from "@/components/PageLayout";
import {
  ProjectCardParallaxFrame,
  projectCardImageMotionClass,
} from "@/components/ProjectCardParallaxFrame";
import { SiteFooter } from "@/components/SiteFooter";

const photoSrc = {
  projectCoat: assets.projectCoat,
  projectPhones: assets.projectPhones,
  projectMitte: assets.projectMitte,
  projectUciPhoto: assets.projectUciPhoto,
} as const;

type Project = (typeof projects)[number];

function imageFrameClasses(imageKind: Project["imageKind"]) {
  const phone = "max-[763px]:h-[304px]";
  if (imageKind === "big") {
    return `${phone} min-[764px]:h-auto min-[764px]:w-full min-[764px]:aspect-[805/440]`;
  }
  return `${phone} min-[764px]:h-auto min-[764px]:w-full min-[764px]:aspect-[571/339]`;
}

function ProjectCard(project: Project) {
  const { title, meta, imageKey, gridSpan, slug } = project;
  const comingSoon = "comingSoon" in project && project.comingSoon;
  const displayTitle = comingSoon
    ? title
    : (getCaseStudyBySlug(slug)?.title ?? title);
  const colSpan = gridSpan === 7 ? span2of2_7of12 : span2of2_5of12;
  const smallCardHitArea =
    project.imageKind === "small" ? "min-[764px]:h-fit min-[764px]:self-start" : "";
  const frameClass = imageFrameClasses(project.imageKind);
  const href = `/work/${slug}`;
  const imageMotionClass = comingSoon
    ? "object-cover grayscale"
    : projectCardImageMotionClass;
  const wrapperClass = `flex min-w-0 flex-col gap-1 ${colSpan} ${smallCardHitArea}`;

  const inner = (
    <>
      <ProjectCardParallaxFrame
        frameClass={frameClass}
        photo={
          <Image
            src={photoSrc[imageKey]}
            alt=""
            fill
            className={imageMotionClass}
            sizes={
              project.imageKind === "big"
                ? "(max-width:763px) 100vw, (max-width:1440px) 60vw, 805px"
                : "(max-width:763px) 100vw, (max-width:1440px) 45vw, 571px"
            }
          />
        }
      />
      {comingSoon ? (
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 flex-col gap-0">
            <p className="type-body-medium text-[var(--color-heading)] text-pretty">
              {displayTitle}
            </p>
            <p className="type-body">{meta}</p>
          </div>
          <LockIcon className="size-4 shrink-0 text-[var(--color-body)]" />
        </div>
      ) : (
        <div className="flex flex-col gap-0">
          <p className="type-body-medium text-[var(--color-heading)] text-pretty transition-colors group-hover:text-[var(--color-body)]">
            {displayTitle}
          </p>
          <p className="type-body">{meta}</p>
        </div>
      )}
    </>
  );

  if (comingSoon) {
    return <div className={wrapperClass}>{inner}</div>;
  }

  return (
    <TransitionLink
      href={href}
      className={`group outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primitives-grey-70)] ${wrapperClass}`}
    >
      {inner}
    </TransitionLink>
  );
}

export default function HomePage() {
  return (
    <>
      <PageMain className={pageContentTopOffset}>
        <PageGrid className="gap-y-4 min-[764px]:items-start min-[764px]:gap-y-4 min-[1025px]:items-end min-[1025px]:gap-y-0">
          <h1
            className="col-span-2 min-[764px]:col-span-12 min-[1025px]:col-span-6 type-h1 text-balance text-[var(--color-heading)]"
          >
            {intro.headline}
          </h1>
          <p
            className="col-span-2 min-[764px]:col-start-1 min-[764px]:col-span-12 min-[1025px]:col-start-8 min-[1025px]:col-span-5 type-body text-balance min-[764px]:self-start min-[1025px]:self-end"
          >
            {intro.body}
          </p>
        </PageGrid>

        <PageGrid className="mt-4 gap-y-10">
          {projects.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </PageGrid>
      </PageMain>
      <PageFooterShell>
        <SiteFooter />
      </PageFooterShell>
    </>
  );
}
