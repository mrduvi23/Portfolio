export type UciUserPersona = {
  id: string;
  initials: string;
  badgeColor: string;
  title: string;
  description: string;
  descriptionHighlight?: string;
  contentTypes: string[];
};

export const uciUserPersonas: UciUserPersona[] = [
  {
    id: "press",
    initials: "Pr",
    badgeColor: "#e4002b",
    title: "Press",
    description:
      "Individuals or organizations connected to the media and journalism space. This user visits the site looking for specific information and resources that can support their editorial work",
    contentTypes: ["Press releases", "Multimedia resources", "Publications"],
  },
  {
    id: "experienced",
    initials: "Pe",
    badgeColor: "#00635b",
    title: "Experienced individual",
    description:
      "A private user with financial knowledge, interested in news, reports and updates related to the financial sector. Their motivations can vary, from making investment decisions to understanding the financial position of a company",
    contentTypes: ["News", "Publications"],
  },
  {
    id: "inexperienced",
    initials: "Pi",
    badgeColor: "#910048",
    title: "Inexperienced individual",
    description:
      "A private user with little to no knowledge of finance or mortgages who uses the communication room as a reliable and accessible source for clear, easy-to-understand information. ",
    descriptionHighlight:
      "This is a key user type for the press room, as it represents an opportunity to build trust in the brand",
    contentTypes: ["News"],
  },
  {
    id: "professional",
    initials: "Pf",
    badgeColor: "#f6c927",
    title: "Professional",
    description:
      "A real estate professional who uses the communication room to stay up to date on relevant financial and economic information that may directly or indirectly affect their operations and decisions. This is a less critical user type",
    contentTypes: ["Events", "Publications"],
  },
];
