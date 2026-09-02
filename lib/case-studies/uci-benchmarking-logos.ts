const LOGOS_DIR = "/work/uci/Logos";

function logoPath(filename: string) {
  return `${LOGOS_DIR}/${encodeURIComponent(filename)}`;
}

export type UciBenchmarkingLogo = {
  id: string;
  name: string;
  src: string;
};

export const uciBenchmarkingLogoRows: UciBenchmarkingLogo[][] = [
  [
    { id: "repsol", name: "Repsol", src: logoPath("Logo Repsol 1.webp") },
    { id: "mapfre", name: "MAPFRE", src: logoPath("MAPFRE 1.webp") },
    { id: "endesa", name: "Endesa", src: logoPath("endesa 1.webp") },
    { id: "santander", name: "Santander", src: logoPath("Footer.webp") },
  ],
  [
    {
      id: "telefonica",
      name: "Telefónica",
      src: logoPath("Telefo\u0301nica_2021_logo 1.webp"),
    },
    {
      id: "bnp-paribas",
      name: "BNP Paribas",
      src: logoPath("BNP Paribas logo 1.webp"),
    },
    { id: "sanitas", name: "Sanitas", src: logoPath("Frame 21.webp") },
    {
      id: "sabadell",
      name: "Banco Sabadell",
      src: logoPath("Logo de Banc Sabadell en color negro 1.webp"),
    },
  ],
  [
    {
      id: "ferrovial",
      name: "Ferrovial",
      src: logoPath("Ferrovial Sala de prensa 1.webp"),
    },
    { id: "ing", name: "ING", src: logoPath("ing_leon-01 1.webp") },
    {
      id: "caixabank",
      name: "CaixaBank",
      src: logoPath("5a270de06c723e0970203eae 1.webp"),
    },
    {
      id: "bankinter",
      name: "Bankinter",
      src: logoPath("svgexport-1 (3) 1.webp"),
    },
  ],
];

export const uciBenchmarkingLogos = uciBenchmarkingLogoRows.flat();
