import { assets } from "@/lib/assets";
import type { CaseStudyContent } from "@/lib/case-studies/types";

export const infraredCaseStudy: CaseStudyContent = {
  slug: "zone",
  index: "[02]",
  title: "Zone. Making it useful again",
  heroImage: assets.projectPhones,
  heroImageAlt: "CBRE Zone intranet redesign",
  meta: [
    { label: "Role", value: "Product Designer" },
    { label: "Duration", value: "Jan · Apr 2023" },
    {
      label: "Team",
      value:
        "A Product Manager\nA Product Designer\n2 Developers",
    },
    { label: "Type", value: "Product Design" },
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
          text: "CBRE, an American multinational with offices across Spain, realized that its internal communication channel, Zone, wasn't working as well as it should.\n\nZone is CBRE's intranet. It functions as a repository for news, files, and dashboards that employees rely on to find key documents before and during meetings. The channel was desktop-only, and over time it became clear that it was outdated and that most employees wanted to access it from their phone or tablet.",
        },
      ],
    },
  ],
  nav: [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "design-process", label: "Design Process", children: [{ id: "research", label: "Research" }] },
    { id: "design-decisions", label: "Design Decisions" },
    { id: "challenges-solutions", label: "Challenges & Solutions" },
    {
      id: "conclusions",
      label: "Conclusions",
      children: [{ id: "thoughts-and-learnings", label: "Thoughts and learnings" }],
    },
  ],
  contentSections: [
    {
      navId: "problem",
      eyebrow: "The Problem",
      title: "A poor user experience was costing the company projects",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "CBRE employees couldn't find the files they needed at critical moments during client meetings. This wasn't just a frustration, it was a business problem. Not being able to pull up the right document at the right time meant losing opportunities to make a strong impression, which translated into financial losses and internal friction between employees and the company.",
        },
        {
          type: "paragraph",
          text: "Many users had resorted to downloading files onto external hardware before meetings, but that workaround removed any possibility of searching in the moment or adapting on the fly.",
        },
        {
          type: "pullQuote",
          text: "Main problem: A poor user experience was costing the company money and projects.",
        },
        { type: "media", variant: "zone-old-design" },
        {
          type: "paragraph",
          text: "There was also a second, quieter problem: employees were losing their sense of belonging to the company. Most of them weren't keeping up with internal news or events simply because they weren't using Zone at all.\n\nAfter mapping these problems and aligning with what the business needed, we focused on two goals:",
        },
        {
          type: "pullQuote",
          text: "Reduce financial losses by helping employees perform better in client meetings.\nImprove internal communication between the company and its employees.",
        },
      ],
    },
    {
      navId: "design-process",
      eyebrow: "Design Process",
      title: "So, how do we tackle it?",
      titleLevel: "h2",
      blocks: [
        {
          type: "numberedSteps",
          steps: [
            {
              number: "01",
              text: "One advantage we had from the start was that Zone already had a defined set of functionalities. The challenge wasn't building something from scratch but understanding what was failing, what was working, and avoiding repeating past mistakes.",
            },
            {
              number: "02",
              text: "We approached this using a Design Thinking methodology. I started by auditing the current portal to identify pain points and map out which flows were causing the most friction.",
            },
            {
              number: "03",
              text: "Since this was an internal tool, we also had direct and easy access to users, which made the research phase much more straightforward than usual.",
            },
          ],
        },
      ],
    },
    {
      navId: "research",
      title: "Research",
      titleLevel: "h3",
      spacingTop: "section",
      blocks: [
        {
          type: "paragraph",
          text: "Because our users were employees of our client, running interviews and surveys was relatively simple. We launched a company-wide survey and complemented it with a round of personal interviews to get a clearer picture of who we were designing for and what they actually needed.\n\nFrom the interviews, we pulled three key insights:",
        },
        {
          type: "featureGrid",
          layout: "insights",
          items: [
            {
              title: "Users wanted a calendar",
              description:
                "Somewhere they could check upcoming company events.",
            },
            {
              title: "News wasn't a priority for users",
              description:
                "Though the company wanted to push this content.",
            },
            {
              title: "Users kept searching for the same dashboards",
              description:
                "To present them across different client meetings.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The survey results added another layer of quantitative data on top of those findings.",
        },
        { type: "media", variant: "zone-survey-charts" },
        {
          type: "paragraph",
          text: "We also ran a visual research session to build a moodboard and get an early sense of the direction we wanted the app to look and feel.",
        },
        { type: "media", variant: "zone-moodboard" },
      ],
    },
    {
      navId: "design-decisions",
      eyebrow: "Design Decisions",
      title: "Keeping the challenges in mind, here's how we moved forward",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "Based on everything we found during research, we decided to design a mobile and tablet app with five core sections. This decision came from a simple observation: most of the commercial team didn't bring laptops to meetings. They brought their phones or tablets.",
        },
        { type: "media", variant: "zone-walkthrough" },
        {
          type: "paragraph",
          text: "To address the communication gap between the company and its employees, we made the homepage surface company news and updates. We knew users weren't naturally drawn to this content, but the business saw real value in it, so we found a way to integrate it without it feeling intrusive.",
          desktopSuffix:
            " We also built a calendar with a short legend so employees could stay on top of company events at a glance.",
        },
        { type: "media", variant: "zone-news-calendar" },
      ],
    },
    {
      navId: "challenges-solutions",
      eyebrow: "Challenges and Solutions",
      title: "Halfway through, new problems surfaced",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "As the design and research progressed, we ran into a couple of issues that hadn't been fully visible at the start.\n\nThe first was scalability. Zone was a portal where CBRE planned to upload enormous amounts of data and files, organized through a folder system that could nest indefinitely. That kind of structure is hard to navigate and even harder to scale without it becoming a mess.\n\nThe second issue was that dashboards and regular files were mixed together in the same space, which confused users who were looking for one or the other.",
        },
        {
          type: "mediaText",
          mediaVariant: "zone-workspace",
          text: "We solved this by splitting the content into two distinct sections: Dashboards, for data visualizations and graphs, and Workspace, for all other work-related files.",
        },
        {
          type: "mediaText",
          mediaVariant: "zone-dashboard",
          text: "For the dashboards section, we ran a card sorting exercise with users to classify all existing files and folders, then used those results to define a set of fixed, intuitive folder categories.",
        },
        {
          type: "mediaText",
          mediaVariant: "zone-favourite",
          text: "Since users frequently needed to find the same dashboards across multiple meetings, we added a favorites folder so they could bookmark files and access them instantly.",
        },
      ],
    },
    {
      navId: "conclusions",
      eyebrow: "Conclusions",
      title: "Sometimes the simplest decisions are the ones that work best",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "Once the app launched, we gave users a couple of months to get familiar with it before going back to measure impact. After two months, we ran another internal survey and the results were encouraging.",
        },
        { type: "media", variant: "zone-survey-impact" },
        {
          type: "paragraph",
          text: "Simple design improvements like adding a calendar or letting users save dashboards to a favorites folder were the features users praised most. Usage of the app increased and so did its acceptance within the company.",
        },
        {
          type: "heading",
          id: "thoughts-and-learnings",
          level: "h3",
          spacingTop: "section",
          text: "From a seed, a strong tree can grow",
        },
        {
          type: "paragraph",
          text: "Even with those wins, plenty remained to be improved: the dashboard and workspace layout, the desktop views, and more. When you're working on a time-boxed project, you have to focus on what moves the needle most and leave the rest for later. But good work tends to compound.",
        },
        {
          type: "pullQuote",
          text: "The quality of what we delivered led the client to extend the project, bringing us back to redesign the web version and continue refining the app.",
        },
      ],
    },
  ],
};
