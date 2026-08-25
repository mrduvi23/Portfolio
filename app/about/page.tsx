import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";
import {
  PageFooterShell,
  PageMain,
  pageContentTopOffset,
} from "@/components/PageLayout";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About me",
  description: `${site.name} — product designer based in Dublin.`,
};

export default function AboutPage() {
  return (
    <>
      <PageMain className={pageContentTopOffset}>
        <AboutView />
      </PageMain>
      <PageFooterShell>
        <SiteFooter />
      </PageFooterShell>
    </>
  );
}
