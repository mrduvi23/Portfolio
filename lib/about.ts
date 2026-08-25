export const about = {
  headline:
    "I'm a spanish product designer who loves to take on new challenges and is always eager to keep learning",
  bio: "Thanks to my experiences working at several technology consultancies, I've had the opportunity to work with major brands, helping them build design systems and experiences that inspire, engage, and leave a lasting impression.",
  employment: [
    {
      period: "Aug 2025 - Now",
      company: "Freelance",
      role: "Product Designer",
    },
    {
      period: "Nov 2023 - Aug 2025",
      company: "Redbility",
      role: "Ux Consultant",
    },
    {
      period: "Jan 2023 - Nov 2023",
      company: "Accenture",
      role: "Product Designer",
    },
    {
      period: "Feb 2022 - Dec 2022",
      company: "Aluxion",
      role: "UX/UI Designer",
    },
  ],
  cvHref: "/about/David%20Arreba%20-%20CV.pdf",
  clients: [
    { name: "Inditex", category: "(Design Sistems)" },
    { name: "Acciona", category: "(Design Sistems)" },
    { name: "UCI", category: "(Design Sistems / Porduct Design)" },
    { name: "AENA", category: "(Design Sistems / Porduct Design)" },
    { name: "HLA Group", category: "(Product Design)" },
    { name: "CBRE", category: "(Product Design)" },
    { name: "Mitte", category: "(UI Design)" },
  ],
  inspiration: {
    quote:
      "I draw inspiration from the world by focusing on those seemingly imperceptible details that often go unnoticed, letting them spark fresh ideas and new perspectives.",
    galleryLabel: "Where my inspiration comes from",
    galleryItems: [
      {
        label: "Check my Steam",
        videoSrc: "/about/VideoSteam.mp4",
        href: "https://steamcommunity.com/id/Mrduvi/",
      },
      {
        label: "Check my Spotify",
        videoSrc: "/about/VideoSpoty.mp4",
        href: "https://open.spotify.com/user/3q3dxephr3st6p8740sfav2jx?si=4f597a05516f4c2b",
      },
      {
        label: "Check my Letterboxd",
        videoSrc: "/about/VideoLetterboxd.mp4",
        href: "https://letterboxd.com/mrduvi/",
      },
    ],
  },
  contact: {
    headline:
      "See something that stood out? Don't hesitate to get in touch! I'd love to talk and explore new opportunities together.",
    location: "Dublin 8, Dublin",
    phone: "+353 89 216 2281",
    email: "davidarrebacorral@gmail.com",
  },
} as const;
