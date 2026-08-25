export type UciNamingNavBarImage = {
  id: string;
  label: string;
  src: string;
  width: number;
  height: number;
};

const NAV_BARS_DIR = "/work/uci/NavBars";

function navBar(
  id: string,
  label: string,
  filename: string,
  width: number,
  height: number,
): UciNamingNavBarImage {
  return {
    id,
    label,
    src: `${NAV_BARS_DIR}/${filename}`,
    width,
    height,
  };
}

/** [pair row][column slot 0 | 1] */
export const uciNamingNavBarStacks: UciNamingNavBarImage[][][] = [
  [
    [
      navBar("telefonica", "Telefónica", "Telefonica.png", 810, 110),
      navBar("santander", "Santander", "Santander.png", 810, 128),
      navBar("bankinter", "Bankinter", "Bankinter.png", 810, 115),
      navBar("sanitas", "Sanitas", "Sanitas.png", 810, 100),
    ],
    [
      navBar("repsol", "Repsol", "Repsol.png", 810, 114),
      navBar("ing", "ING", "ING.png", 810, 267),
      navBar("bnp", "BNP Paribas", "BNP.png", 810, 135),
    ],
  ],
  [
    [
      navBar("ferrovial", "Ferrovial", "ferrovial.png", 810, 115),
      navBar("sabadell", "Banco Sabadell", "Sabadell.png", 810, 105),
      navBar("mapfre", "MAPFRE", "Mafre.png", 810, 93),
    ],
    [navBar("endesa", "Endesa", "Endesa.png", 810, 424)],
  ],
];

export const uciAllNavBarImages = uciNamingNavBarStacks.flat(2);

/** Column width at 1440px (8/12 content grid, 2-up pair layout). */
export const UCI_NAMING_NAVBAR_DESIGN_FRAME_W = 453;
export const UCI_ACCESS_NAVBAR_DESIGN_FRAME_H = 400;
export const UCI_NAMING_NAVBAR_REF_IMAGE_W = 478;
export const UCI_NAMING_NAVBAR_REF_INSET = 32;
export const UCI_ACCESS_NAVBAR_REF_INSET_X = 24;
export const UCI_NAMING_NAVBAR_REF_GAP = 20;
