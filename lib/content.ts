export const site = {
  name: "David Arreba",
  titleTemplate: "%s — David Arreba",
  defaultTitle: "David Arreba — Product designer",
  description:
    "Product designer focused on design systems and digital product craft.",
  url: "https://darreba.tech",
} as const;

export const intro = {
  headline: "Hi, I am David, a product designer starting to code",
  body: "With four years of experience, specialized in design systems, I keep studying and training to stay up to date in this field.",
} as const;

export const projects = [
  {
    id: "ds-brands",
    slug: "ds-brands",
    title: "One design system, eight unique brands",
    meta: "Design systems · Strategy",
    imageKey: "projectCoat" as const,
    variant: "photo" as const,
    gridSpan: 7 as const,
    imageKind: "big" as const,
  },
  {
    id: "infrared",
    slug: "zone",
    title: "Redesigning an Intranet",
    meta: "Product design",
    imageKey: "projectPhones" as const,
    variant: "photo" as const,
    gridSpan: 5 as const,
    imageKind: "small" as const,
  },
  {
    id: "infrared-wind",
    slug: "mitte",
    title: "Mitte. Parking management",
    meta: "Coming soon",
    imageKey: "projectMitte" as const,
    variant: "photo" as const,
    gridSpan: 5 as const,
    imageKind: "small" as const,
    comingSoon: true as const,
  },
  {
    id: "uci",
    slug: "uci",
    title: "UCI. Driving Strategy & Optimizing Product",
    meta: "Product design · Strategy",
    imageKey: "projectUciPhoto" as const,
    variant: "photo" as const,
    gridSpan: 7 as const,
    imageKind: "big" as const,
  },
] as const;

export const contact = {
  email: "davidarrebacorral@gmail.com",
  location: "Dublin, Ireland",
  linkedInLabel: "LinkedIn",
  githubLabel: "GitHub",
  linkedInHref: "https://www.linkedin.com/",
  githubHref: "https://github.com/",
} as const;

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
