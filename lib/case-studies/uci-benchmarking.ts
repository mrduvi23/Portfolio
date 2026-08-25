export type UciBenchmarkingTopic = {
  id: string;
  title: string;
  description: string;
};

export const uciBenchmarkingTopics: UciBenchmarkingTopic[][] = [
  [
    {
      id: "naming",
      title: "Naming",
      description:
        "In the context of a website, naming refers to the process of choosing and creating a name for a site, product or service.",
    },
    {
      id: "access-point",
      title: "Access point",
      description:
        "The access point on a website is a specific location or entry path that serves as the main gateway to reach information.",
    },
    {
      id: "information-architecture",
      title: "Information architecture and navigation",
      description:
        "We understand information architecture as the practice of deciding how to organize the parts of something so that it can be easily understood.",
    },
  ],
  [
    {
      id: "content-types",
      title: "Content types",
      description:
        "Web content refers to any file hosted on a website that is transmitted and delivered through a web browser.",
    },
    {
      id: "hub-page",
      title: "Hub page structure",
      description:
        "This page acts as a central point from which users can access specific content or navigate to subtopics.",
    },
    {
      id: "news-press",
      title: "News and press releases",
      description:
        "This refers to how news articles and press releases are presented and structured on a website, taking into account the different user types they are aimed at.",
    },
  ],
];
