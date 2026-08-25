export type UciIaChipTone =
  | "gradient"
  | "yellow"
  | "pink"
  | "purple"
  | "cyan"
  | "coral"
  | "blue"
  | "green"
  | "white";

export type UciIaChip = {
  label: string;
  tone: UciIaChipTone;
  /** Explicit lines for multi-line chips. */
  lines?: string[];
  children?: string[];
};

export type UciIaVersion = {
  id: string;
  title: string;
  featured?: boolean;
  hub?: UciIaChip;
  items: UciIaChip[];
  contextual: string[];
};

export const uciIaVersions: UciIaVersion[] = [
  {
    id: "v01",
    title: "UCI_v01_Starting point",
    items: [
      {
        label: "News & Updates",
        tone: "gradient",
        lines: ["News &", "Updates"],
        children: ["News", "Blog", "Press releases"],
      },
      { label: "Publications", tone: "pink" },
      { label: "Press resources", tone: "purple" },
      { label: "Social media", tone: "cyan" },
      { label: "Spokespersons", tone: "white" },
      { label: "Events", tone: "white" },
    ],
    contextual: ["Contact"],
  },
  {
    id: "v02",
    title: "UCI_v02",
    hub: { label: "Press room", tone: "yellow" },
    items: [
      {
        label: "News",
        tone: "blue",
        children: ["News", "Blog"],
      },
      { label: "Press releases", tone: "green" },
      { label: "Publications", tone: "pink" },
      { label: "Events", tone: "white" },
      { label: "Press resources", tone: "purple" },
      { label: "Social media", tone: "cyan" },
      { label: "Contact", tone: "coral" },
    ],
    contextual: ["Spokespersons"],
  },
  {
    id: "v03",
    title: "UCI_v03",
    hub: { label: "Press room", tone: "yellow" },
    items: [
      {
        label: "Updates",
        tone: "gradient",
        children: ["News", "Blog", "Press releases"],
      },
      { label: "Events for professionals", tone: "white" },
      { label: "Press resources", tone: "purple" },
      { label: "Contact", tone: "coral" },
    ],
    contextual: ["Publications", "Social media"],
  },
  {
    id: "v04",
    title: "IA_v04",
    featured: true,
    hub: { label: "Press room", tone: "yellow" },
    items: [
      {
        label: "Updates",
        tone: "gradient",
        children: ["News", "Press releases"],
      },
      { label: "Events for professionals", tone: "white" },
      { label: "Publications", tone: "pink" },
      { label: "Resources", tone: "purple" },
      { label: "Contact", tone: "coral" },
    ],
    contextual: ["Social media"],
  },
];

export const uciIaEarlyVersions = uciIaVersions.filter((v) => !v.featured);
export const uciIaFeaturedVersion = uciIaVersions.find((v) => v.featured)!;
