import { assets } from "@/lib/assets";
import type { CaseStudyContent } from "@/lib/case-studies/types";

export const dsBrandsCaseStudy: CaseStudyContent = {
  slug: "ds-brands",
  index: "[01]",
  title: "One design system, eight unique brands",
  heroImage: assets.projectCoat,
  heroImageAlt: "",
  meta: [
    { label: "Role", value: "Product Designer" },
    { label: "Duration", value: "May · Aug 2025" },
    {
      label: "Team",
      value:
        "A Product Manager\nLots of developers\nA Product Designer (Me)",
    },
    { label: "Type", value: "Design Systems\nD.S. Strategy" },
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
          text: "A large textile company manages eight different brands, each with a strong and distinct visual identity, while sharing several digital experiences. To support these shared experiences, a new internal department called Compo Experience was created with one clear goal: build common digital products across all brands and maximize savings in design and development costs through standardization.",
        },
      ],
    },
  ],
  nav: [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "analysis", label: "Analysis" },
    {
      id: "strategies",
      label: "Strategies",
      children: [
        { id: "first-strategy", label: "First" },
        { id: "second-strategy", label: "Second" },
        { id: "third-strategy", label: "Third" },
        { id: "fourth-strategy", label: "Fourth" },
        { id: "final-decision", label: "Final" },
      ],
    },
    { id: "achievement", label: "Achievement" },
    { id: "conclusions", label: "Conclusions" },
  ],
  contentSections: [
    {
      navId: "problem",
      eyebrow: "The Problem",
      title: "Eight brands, eight very different starting points",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "The challenge was to create a Multitenant Design System (MDS) that covered all eight brands in a very uneven context. Some brands already had mature, well-structured design systems. Others didn't even have a basic UI kit. And all of them wanted to preserve their own visual identity without losing the work they'd already put in.",
        },
        { type: "media", variant: "placeholder-light", ndaBanner: true, dsAxisChart: true },
        {
          type: "paragraph",
          text: "Things got more complicated when the brands with the most advanced systems, usually the most influential ones within the company, weren't willing to make concessions, even when the benefit would have been clear for everyone else.",
        },
      ],
    },
    {
      navId: "analysis",
      eyebrow: "Analysis",
      title: "First things first",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "Before proposing anything, we audited each brand individually to understand where they stood in terms of design system maturity and workflow.",
        },
        { type: "media", variant: "placeholder-light", layout: "typography-components" },
        {
          type: "paragraph",
          text: "The picture that emerged was clear: two brands were significantly ahead, with structured and well-documented systems, while several others had nothing formal in place at all. That gap became one of the most important factors in shaping our strategy.",
        },
      ],
    },
    {
      navId: "strategies",
      eyebrow: "Strategies",
      title: "Finding the right approach",
      titleLevel: "h2",
      group: "strategies",
      blocks: [
        {
          type: "paragraph",
          text: "Based on the audit and taking into account Figma's limitations at the time, we organized working sessions with designers from all brand teams to explore possible strategies together.",
        },
      ],
    },
    {
      navId: "first-strategy",
      eyebrow: "First strategy",
      title: "Unify everything into one design system",
      titleLevel: "h3",
      group: "strategies",
      blocks: [
        {
          type: "paragraph",
          text: "The most ambitious option was to build a single, brand-new design system for all eight brands. The problem was governance. Each brand wanted to retain control over its own design decisions and move at its own pace. With shared tokens, any change in the system could ripple across all brands at once.",
        },
        {
          type: "media",
          variant: "graphic",
          graphicId: "mds-ecosystem",
        },
        {
          type: "prosCons",
          advantages: [
            "Same components and development for all brands",
            "Brand switching through theming in Figma",
            "Changes propagate automatically across all brands",
          ],
          disadvantages: [
            "Fully centralized token structure dependent on the MDS",
            "Every change requires heavy coordination between teams",
          ],
        },
      ],
    },
    {
      navId: "second-strategy",
      eyebrow: "Second strategy",
      title: "White label and library swap",
      titleLevel: "h3",
      group: "strategies",
      blocks: [
        {
          type: "paragraph",
          text: "Another option was to create a white-label library and use Figma's library swap feature. This required all components and instances to share exactly the same naming structure across brands, which gave each brand a lot of freedom but introduced risks of inconsistency. Each brand would also manage its own token structure, leading to duplicated development work.",
        },
        { type: "media", variant: "graphic", graphicId: "white-label" },
        {
          type: "prosCons",
          advantages: [
            "Library swapping based on a 1:1 component naming convention",
            "Full freedom in token structure and foundations per brand",
            "Clean components without unnecessary variables",
          ],
          disadvantages: [
            "Duplicated development effort",
            "Not all brands had an existing design system to swap from",
          ],
        },
      ],
    },
    {
      navId: "third-strategy",
      eyebrow: "Third strategy",
      title: "A base design system",
      titleLevel: "h3",
      group: "strategies",
      blocks: [
        {
          type: "paragraph",
          text: "A lighter option: create a minimal base design system with only the essential components and styles. This base would support all shared Compo Experience needs, and each brand could extend it with their own layer on top.",
        },
        { type: "media", variant: "graphic", graphicId: "base-design-system" },
        {
          type: "prosCons",
          advantages: [
            "Shared base development",
            "Brand-specific tokens can override the base",
          ],
          disadvantages: [
            "All brands would still need to build their own systems on top of it",
          ],
        },
      ],
    },
    {
      navId: "fourth-strategy",
      eyebrow: "Fourth strategy",
      title: "A design system only for Compo Experience",
      titleLevel: "h3",
      group: "strategies",
      blocks: [
        {
          type: "paragraph",
          text: "The most contained option was to build a system exclusively for Compo Experience, leaving each brand to manage its own. The downside was that brands without an existing system would remain unsupported for their other digital products.",
        },
        { type: "media", variant: "graphic", graphicId: "compo-experience-only" },
        {
          type: "prosCons",
          advantages: [
            "MDS only serves Compo Experience",
            "Full token and style freedom per brand",
          ],
          disadvantages: [
            "Duplicated development across non-Compo Experience products",
            "Existing brand systems remain isolated",
          ],
        },
      ],
    },
    {
      navId: "final-decision",
      eyebrow: "Final decision",
      title: "So, what did we decide?",
      titleLevel: "h3",
      group: "strategies",
      blocks: [
        {
          type: "paragraph",
          text: "After several workshops and a lot of honest conversations about what was actually feasible, we combined the first and fourth strategies. We built a lightweight design system that supports Compo Experience and also serves as a foundation for brands that didn't have one yet.",
        },
        { type: "media", variant: "placeholder-dark", combo: "first-fourth" },
        {
          type: "paragraph",
          text: "Brands with more mature systems can progressively adopt and integrate with it in the future, once the tooling allows for more advanced multitenant setups. This let us move forward without blocking the teams that were already ahead, while giving real support to those that were starting from zero.",
        },
      ],
    },
    {
      navId: "achievement",
      eyebrow: "Achievements and Impact",
      title: "Delivering value despite real constraints",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "Despite Figma's limitations and the number of alignment sessions needed with development, the project moved forward steadily. We delivered a lightweight but solid design system, supported by an online framework where designers and developers could browse existing components and their specifications.\n\nEven though the system was intentionally small in scope, it already exceeded the maturity level of several brands within the group and established a shared foundation to grow from.",
        },
        {
          type: "media",
          variant: "placeholder-light",
          src: assets.dsBrandsSample,
          alt: "Design system audit sample: semantic color, sizing and component specs.",
        },
        {
          type: "impactQuotes",
          items: [
            "Designers working on Compo Experience reduced their working time by a third thanks to Figma's automatic theme switching.",
            "For developers, the impact was even greater, cutting their time by a fifth.",
          ],
        },
      ],
    },
    {
      navId: "conclusions",
      eyebrow: "Conclusions",
      title: "A design system that unifies, but not entirely",
      titleLevel: "h2",
      blocks: [
        {
          type: "paragraph",
          text: "Even though we built something that could work for all eight brands, not all of them chose to adopt it. And honestly, that's understandable. If a brand already has a well-developed design system, asking them to take two steps back for the sake of company-wide alignment is a hard sell, even when the long-term benefit is clear.\n\nA good design system has to work for the people who use it, both designers and developers. If it disrupts anyone's workflow, something is wrong. For the most advanced brands, joining a more unified system would have slowed them down. And given that one of the brands refreshes its visual identity every year, tying their system too tightly to a shared structure would have created real problems for everyone else.\n\nThat said, I'm proud of what we built. Something real and tangible that gave Compo Experience a solid foundation and finally gave some brands a proper design system to work with.",
        },
      ],
    },
  ],
};
