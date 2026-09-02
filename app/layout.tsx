import type { Metadata } from "next";
import { CaseStudyIndexOutlet } from "@/components/case-study/CaseStudyIndexOutlet";
import { CustomCursor } from "@/components/CustomCursor";
import { LoaderGateScript } from "@/components/LoaderGateScript";
import { PageTransition } from "@/components/PageTransition";
import { SessionLoader } from "@/components/SessionLoader";
import { SiteHeader } from "@/components/SiteHeader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/content";
import { satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.defaultTitle,
    template: site.titleTemplate,
  },
  description: site.description,
  icons: {
    icon: [
      { url: "/favicon.webp", type: "image/webp" },
      { url: "/favicon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} antialiased`}>
      <head>
        <LoaderGateScript />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <SessionLoader />
        <SmoothScroll />
        <SiteHeader />
        <PageTransition>
          <div className="site-main flex min-h-0 flex-1 flex-col pt-16 min-[764px]:pt-20">{children}</div>
        </PageTransition>
        <CaseStudyIndexOutlet />
        <CustomCursor />
      </body>
    </html>
  );
}
