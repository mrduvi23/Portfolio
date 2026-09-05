import { AboutDownloadCv, ContactForm } from "@/components/about/ContactForm";
import {
  InspirationGallery,
  InspirationGalleryCard,
} from "@/components/about/InspirationGallery";
import { InspirationQuote } from "@/components/about/InspirationQuote";
import { PageGrid } from "@/components/PageLayout";
import { ScrambleAppear } from "@/components/ScrambleAppear";
import { assets } from "@/lib/assets";
import { about } from "@/lib/about";
import Image from "next/image";
import { Fragment } from "react";

export function AboutView() {
  return (
    <div className="flex flex-col gap-page">
      <div className="flex flex-col gap-page max-[763px]:gap-chapter">
        <PageGrid className="gap-y-tight min-[764px]:items-center min-[764px]:gap-y-0">
        <div className="col-span-2 w-full min-[764px]:col-span-5 min-[764px]:col-start-1">
          <div className="relative aspect-[341/433] w-full min-[764px]:aspect-[571/723]">
            <Image
              src={assets.aboutPortrait}
              alt="David Arreba"
              fill
              className="object-cover"
              sizes="(max-width:763px) calc(100vw - 32px), (max-width:1279px) 42vw, 571px"
              priority
            />
          </div>
        </div>

        <div
          className="hidden min-[764px]:col-span-1 min-[764px]:col-start-6"
          aria-hidden
        />

        <div className="col-span-2 flex w-full flex-col gap-16 min-[764px]:col-span-6 min-[764px]:col-start-7 min-[764px]:self-center min-[764px]:grid min-[764px]:grid-cols-6 min-[764px]:gap-y-16">
          <h1 className="type-h1 w-full min-w-0 text-[var(--color-heading)] min-[764px]:col-span-6">
            {about.headline}
          </h1>

          <p className="type-body min-w-0 w-[80%] self-end text-pretty min-[764px]:w-auto min-[764px]:self-auto min-[764px]:col-span-4 min-[764px]:col-start-2">
            {about.bio}
          </p>
        </div>
      </PageGrid>

      <PageGrid className="gap-y-tight min-[764px]:items-baseline min-[764px]:gap-y-0">
        <div className="col-span-2 min-[764px]:col-span-5">
          <h2 className="type-h2 text-pretty text-[var(--color-heading)]">
            Employment history
          </h2>
        </div>
        <div className="col-span-2 min-[764px]:col-span-7 min-[764px]:col-start-6">
          <div className="grid grid-cols-[max-content_1fr] items-baseline gap-x-10 gap-y-10 min-[764px]:hidden">
            {about.employment.map((job, index) => (
              <Fragment key={`${job.period}-${job.company}-mobile`}>
                <ScrambleAppear
                  text={job.period}
                  delay={index * 120}
                  className="type-caption shrink-0 tabular-nums"
                />
                <div className="flex min-w-0 flex-col gap-2">
                  <p className="type-h4 text-[var(--color-heading)]">{job.company}</p>
                  <p className="type-body">{job.role}</p>
                </div>
              </Fragment>
            ))}
            <AboutDownloadCv href={about.cvHref} />
          </div>

          <div className="hidden min-[764px]:flex min-[764px]:flex-col min-[764px]:gap-10">
            {about.employment.map((job, index) => (
              <div
                key={`${job.period}-${job.company}`}
                className="flex flex-row items-baseline gap-8 min-[1025px]:grid min-[1025px]:grid-cols-7 min-[1025px]:items-baseline min-[1025px]:gap-x-0"
              >
                <ScrambleAppear
                  text={job.period}
                  delay={index * 120}
                  className="type-caption shrink-0 tabular-nums min-[764px]:min-w-[178px] min-[1025px]:col-span-2 min-[1025px]:min-w-0"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2 min-[1025px]:col-span-5">
                  <p className="type-h4 text-[var(--color-heading)]">{job.company}</p>
                  <p className="type-body">{job.role}</p>
                </div>
              </div>
            ))}
            <AboutDownloadCv href={about.cvHref} />
          </div>
        </div>
      </PageGrid>
      </div>

      <section className="relative left-1/2 flex w-screen max-w-[100vw] -translate-x-1/2 flex-col bg-[oklch(0.252_0_0)] pt-page pb-page">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-page px-[var(--page-pad-x-sm)] min-[764px]:px-[var(--page-pad-x)]">
          <PageGrid>
            <InspirationQuote>{about.inspiration.quote}</InspirationQuote>
          </PageGrid>
          <PageGrid>
            <div className="col-span-2 flex flex-col gap-4 min-[764px]:col-span-12">
              <p className="type-label text-[var(--color-primitives-white)]">
                {about.inspiration.galleryLabel}
              </p>
              <InspirationGallery>
                {about.inspiration.galleryItems.map((item) => (
                  <InspirationGalleryCard
                    key={item.label}
                    label={item.label}
                    videoSrc={item.videoSrc}
                    href={item.href}
                  />
                ))}
              </InspirationGallery>
            </div>
          </PageGrid>
        </div>
      </section>

      <section className="flex flex-col gap-section">
        <PageGrid>
          <h2 className="col-span-2 type-h2 w-full text-pretty text-[var(--color-heading)] min-[764px]:col-span-7 min-[764px]:col-start-5">
            {about.contact.headline}
          </h2>
        </PageGrid>

        <PageGrid className="gap-y-section min-[764px]:items-start min-[764px]:gap-y-0">
          <div className="col-span-2 order-2 flex flex-col gap-4 min-[764px]:order-1 min-[764px]:col-span-4 min-[764px]:col-start-1">
            <p className="type-label text-[var(--color-heading)]">
              {about.contact.location}
            </p>
            <a
              href={`tel:${about.contact.phone.replace(/\s/g, "")}`}
              className="type-label text-[var(--color-heading)] transition-opacity duration-200 hover:opacity-70"
            >
              {about.contact.phone}
            </a>
            <a
              href={`mailto:${about.contact.email}`}
              className="type-label text-[var(--color-heading)] transition-opacity duration-200 hover:opacity-70"
            >
              {about.contact.email}
            </a>
          </div>

          <div className="col-span-2 order-1 min-[764px]:order-2 min-[764px]:col-span-7 min-[764px]:col-start-5">
            <ContactForm />
          </div>
        </PageGrid>
      </section>
    </div>
  );
}
