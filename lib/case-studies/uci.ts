import { assets } from "@/lib/assets";
import type { CaseStudyContent } from "@/lib/case-studies/types";

export const uciCaseStudy: CaseStudyContent = {
  slug: "uci",
  index: "[03]",
  title: "UCI. Driving Strategy & Optimizing Product",
  heroImage: assets.projectUciPhoto,
  heroImageAlt: "UCI Communication Room project",
  heroVideo: assets.uciHeroVideo,
  meta: [
    { label: "Role", value: "Product Designer" },
    { label: "Duration", value: "Jan · Apr 2023" },
    {
      label: "Team",
      value: "Communication Team\n2 Product Designers\n3 Developers",
    },
    {
      label: "Type",
      value: "Product Design\nProduct Strategy\nResearch",
    },
  ],
  introSections: [
    {
      navId: "overview",
      eyebrow: "Overview",
      title: "Just a bit of context",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "UCI is a financial institution specializing in mortgage products. For this project, we worked as an embedded design team, focusing on supporting their internal products, improving their design system, and contributing across different product areas.\n\nThis case study covers the Communication Room project. If you want to learn more about the broader context, I've linked a post from Redbility, the company I was working for at the time.",
        },
      ],
    },
  ],
  nav: [
    { id: "overview", label: "Overview" },
    { id: "the-goal", label: "The Goal" },
    { id: "kickoff", label: "Kickoff" },
    { id: "timeline", label: "Timeline" },
    {
      id: "analysis",
      label: "Analysis",
      children: [
        { id: "current-website", label: "Current Website" },
        { id: "metrics", label: "Metrics" },
        { id: "users", label: "Users" },
        { id: "benchmarking", label: "Benchmarking" },
      ],
    },
    { id: "information-architecture", label: "Information Architecture" },
    { id: "conceptualization", label: "Conceptualization" },
    { id: "shipped-live", label: "Shipped & live" },
    { id: "challenges-learnings", label: "Challenges and Learnings" },
  ],
  contentSections: [
    {
      navId: "the-goal",
      eyebrow: "The Goal",
      title: "Improving communication between stakeholders",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "The communications team wanted to integrate a press room into uci.com, making it easy and intuitive to navigate, with the goal of fostering transparent communication between stakeholders. They came in with an initial wireframe and a list of requirements the press room should meet.",
        },
        { type: "media", variant: "layered-sketch" },
      ],
    },
    {
      navId: "kickoff",
      eyebrow: "Kickoff",
      title: "Getting everyone on the same page",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "To align on goals and clear up questions from our initial analysis, we ran a joint session between the design and communications teams. That first meeting was key: we resolved content questions, sharpened the business objectives, developed a shared understanding of our users, and laid out the first steps in our strategy.",
        },
        { type: "media", variant: "kickoff-board" },
      ],
    },
    {
      navId: "timeline",
      eyebrow: "Timeline",
      title: "Defining a realistic roadmap",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "After the alignment session, we put together a project timeline that accounted for business, design, and development needs. After a few rounds of review and factoring in that this wasn't our only active project, we landed on a plan that worked for all teams.",
        },
        { type: "media", variant: "timeline-scroll" },
      ],
    },
    {
      navId: "analysis",
      eyebrow: "Analysis",
      title: "Research to build the best possible MVP",
      titleLevel: "h2",
      group: "analysis",
      blocks: [
        {
          type: "paragraph",
          text: "With the timeline approved, we started the analysis phase. We focused on four areas: the current state of the website, site metrics, user definition, and a benchmarking study of other financial institutions.",
        },
      ],
    },
    {
      navId: "current-website",
      eyebrow: "Current website",
      title: "The starting point",
      titleLevel: "h3",
      group: "analysis",
      blocks: [
        {
          type: "paragraph",
          text: "We started by auditing the information architecture and content of the existing press room to understand where we were starting from.",
        },
        { type: "media", variant: "starting-point" },
      ],
    },
    {
      navId: "metrics",
      eyebrow: "Metrics",
      title: "What do the metrics tell us?",
      titleLevel: "h3",
      group: "analysis",
      blocks: [
        {
          type: "paragraph",
          text: "With access to analytics from the dev team, we were able to pull some useful data.",
        },
        {
          type: "mediaText",
          mediaVariant: "uci-metrics",
          metricsVariant: "metrics1",
          heading: "Most visited pages",
          text: "(relevant for prioritizing key sections in the new structure)",
          items: ["Landing page / Blog", "Press releases", "News"],
        },
        {
          type: "mediaText",
          mediaVariant: "uci-metrics",
          metricsVariant: "metrics2",
          heading: "Device breakdown",
          text: "(important for defining breakpoints)",
          items: ["56.7% desktop", "42.6% mobile", "0.7% tablet"],
        },
      ],
    },
    {
      navId: "users",
      eyebrow: "Users",
      title: "The press room serves four distinct user types",
      titleLevel: "h3",
      group: "analysis",
      blocks: [
        {
          type: "paragraph",
          text: "We created brief profiles for each to keep their needs front of mind throughout the design process.",
        },
        { type: "media", variant: "users-board" },
      ],
    },
    {
      navId: "benchmarking",
      eyebrow: "Benchmarking",
      title: "What variables did we include in our benchmark?",
      titleLevel: "h3",
      group: "analysis",
      blocks: [
        { type: "media", variant: "benchmarking-grid" },
        { type: "media", variant: "benchmarking-logos" },
      ],
    },
    {
      title: "Naming",
      titleLevel: "h4",
      group: "analysis",
      blocks: [
        { type: "media", variant: "placeholder-dark", layout: "pair", namingNavBarPair: 0 },
        {
          type: "twoColumns",
          variant: "text",
          columns: [
            "42% of the sites analyzed use the name Communication Room (Sala de Comunicación).",
            "33% of the sites analyzed use the name Press Room (Sala de prensa).",
          ],
        },
        { type: "media", variant: "placeholder-dark", layout: "pair", namingNavBarPair: 1 },
        {
          type: "twoColumns",
          variant: "text",
          columns: [
            "17% of the sites analyzed use the name Press (Prensa).",
            "The remaining 8% use Communication Space (Espacio de comunicación).",
          ],
        },
        {
          type: "pullQuote",
          text: 'We recommended adopting "Communication Room" ("Sala de Comunicación") as it signals a space for all stakeholders, not just press.',
        },
      ],
    },
    {
      title: "Access point",
      titleLevel: "h4",
      group: "analysis",
      blocks: [
        {
          type: "paragraph",
          text: "Looking at how these sections are surfaced within their respective sites:",
        },
        {
          type: "mediaText",
          mediaVariant: "uci-access-navbars",
          items: [
            "Main nav item (73%)",
            "Footer (18%)",
            "Secondary nav item (9%)",
          ],
        },
        {
          type: "pullQuote",
          text: "For a corporate website, the clear pattern is main navigation.",
        },
      ],
    },
    {
      title: "Architecture and navigation",
      titleLevel: "h4",
      group: "analysis",
      blocks: [
        {
          type: "paragraph",
          text: "We mapped out the information architecture of each site and color-coded content types to identify the most common patterns.",
        },
        { type: "media", variant: "architecture" },
        {
          type: "twoColumns",
          variant: "list",
          columns: [
            [
              "Nearly all sites have a hub page that acts as the press room homepage.",
              '50% separate press releases from general news, while the other 50% group everything under "News" and use filters.',
            ],
            [
              "60% include a dedicated social media section.",
              "70% have a dedicated press contacts page.",
              "50% group downloadable resources in a single section.",
            ],
          ],
        },
        { type: "media", variant: "navigation-collage" },
        {
          type: "paragraph",
          text: "For navigation, the sites we analyzed break down like this:",
        },
        {
          type: "twoColumns",
          variant: "list",
          columns: [
            ["40% mega menu", "40% secondary navigation or anchor menus"],
            ["10% hub page only, no additional nav", "10% main site navigation only"],
          ],
        },
        {
          type: "pullQuote",
          text: "We recommended a second navigation level, taking advantage of a component that already existed in our Design System.",
        },
      ],
    },
    {
      title: "Content types",
      titleLevel: "h4",
      group: "analysis",
      blocks: [
        {
          type: "paragraph",
          text: "Most sites are fairly aligned on content. A few things stood out for UCI specifically:",
        },
        { type: "media", variant: "content-typology" },
        {
          type: "list",
          items: [
            "Press mentions: something UCI already does well and should keep.",
            "Expert opinion pieces: build credibility and could be a differentiator.",
            "Podcast: always highlighted where it exists, which gives us a case for surfacing UCITalks more prominently.",
            "Events: worth keeping given UCI's active calendar.",
            "Language: 80% of sites offer the press room in both Spanish and English, something worth exploring for UCI down the line.",
          ],
        },
      ],
    },
    {
      title: "Hub page structure",
      titleLevel: "h4",
      group: "analysis",
      blocks: [
        {
          type: "paragraph",
          text: "Almost every site uses a hub page as the entry point to the press room. The first content users encounter is always news and press releases.",
        },
        {
          type: "mediaText",
          mediaVariant: "uci-usage-patterns",
          heading: "What usage patterns repeat the most?",
          text: "The first content users encounter on the page is always news and press releases.",
        },
        {
          type: "mediaText",
          mediaVariant: "uci-endesa-buscador",
          heading: "What best practices can we identify?",
          text: "Endesa makes strong use of a sitewide search bar across the entire Press Room. This makes sense when there's a large volume of content.",
        },
        {
          type: "mediaText",
          mediaVariant: "uci-podcast",
          heading: "What content is being highlighted the most?",
          text: "Pages tend to emphasize unusual content that stands out from competitors. (e.g. podcasts)",
        },
        {
          type: "pullQuote",
          text: "Nearly all of the sites analyzed use a hub page as the press room homepage.",
        },
      ],
    },
    {
      title: "Article detail patterns",
      titleLevel: "h4",
      group: "analysis",
      blocks: [
        {
          type: "paragraph",
          text: "Common patterns worth bringing into UCI's design:",
        },
        { type: "media", variant: "article-patterns" },
        {
          type: "featureGrid",
          items: [
            {
              title: "Cross-selling",
              description:
                "Related article suggestions at the end of each piece.",
            },
            {
              title: "Downloads",
              description:
                "Downloadable content sections (press release PDFs, images, video).",
            },
            {
              title: "Reading time",
              description: "Estimated reading time displayed on each article.",
            },
            {
              title: "Tags",
              description:
                "Content tags that link through to topic landing pages.",
            },
          ],
        },
      ],
    },
    {
      navId: "information-architecture",
      eyebrow: "Information Architecture",
      title: "Putting the research to work",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "Once the research phase wrapped up, we focused on defining the new IA, incorporating everything we'd learned. We ran a workshop with the design and communications teams and worked through four iterations before landing on the final version (v.04).",
        },
        { type: "media", variant: "ia-board" },
      ],
    },
    {
      navId: "conceptualization",
      eyebrow: "Conceptualization",
      title: "What makes it into the MVP, and what doesn't",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "Once the IA was defined, we moved into conceptualization. A big part of this phase was deciding what would actually make it into the MVP and what would have to wait. Working within real constraints, whether time, development capacity, or scope, forced us to make deliberate decisions about what mattered most. Here's how we approached the three main areas:",
        },
        {
          type: "mediaText",
          mediaVariant: "uci-content-strategy",
          heading: "Content strategy",
          text: "The architecture was designed with each user type in mind. Every key section of the press room maps back to a specific audience, so anyone who arrives finds content that's relevant to them.",
        },
        {
          type: "mediaText",
          mediaVariant: "uci-cross-selling",
          heading: "Business cross-selling",
          text: "We built in contextual cross-selling tailored by user type.\n\nFor example, links to specialist mortgage products in content aimed at individual users, or links to renovation-related tools in articles tagged with relevant topics (like the Energy Efficiency Calculator).",
        },
        {
          type: "mediaText",
          mediaVariant: "uci-design-system",
          heading: "Design system",
          text: "For the first MVP, we used almost exclusively existing components from the Design System.\n\nFor any modules that didn't exist yet, the development team estimated the effort involved, and we decided case by case whether they'd go into the MVP or a future update.",
        },
      ],
    },
    {
      navId: "shipped-live",
      eyebrow: "Shipped & live",
      title: "The project was successfully delivered and launched.",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "You can explore the final result at uci.com. Due to the nature of agency work, our contract with UCI wrapped up shortly after delivery, so I wasn't able to track longer-term metrics or iterate further. But seeing it live is, in itself, a good ending to the story.",
        },
        {
          type: "externalLink",
          label: "View live project",
          href: "https://uci.com/es/sala-de-comunicacion/",
        },
      ],
    },
    {
      navId: "challenges-learnings",
      eyebrow: "Challenges and Learnings",
      title: "Designers aren't blockers. We're an accelerator.",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "One of the things that made me reflect most on this project happened right at the start. The press room was on a push to launch quickly, without having been properly thought through or with much consideration for the people who'd actually be using it. When our team stepped in, we were initially seen as a bottleneck.\n\nThat perception shifted as soon as we started sharing research findings and data. The business and communications teams realized we were working toward the same goal. Changing that initial impression is part of the job as a designer and while it can be exhausting, it's one of the most valuable things we can do.",
        },
      ],
    },
  ],
};
