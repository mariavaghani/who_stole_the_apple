// if styling related constants are not generated based on user window,
// if styling related constants are not generated based on user window,
// these numbers go in this file

function LightenDarkenColor(col,amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

export const COLOR_PALETTE = {

  backgroundColor: "#969F78",

  containerColor: "#E3D4BA",
  containerOutlineColor: "#C5AE80",

  boardColor: "#C0CBA8",
  boardOutlineColor: "#888E72",

  execButtonColor: "#576C65",
  resetButtonColor: "#B76969",
  instructionsButtonColor: "#BE9979",
  errorsColor: "#A56D73",
  msgColor: "#B37C7C",
  aboutBGColor: "#B5BAA0",

  nameContainer: "#CDBD87"
};

export const STYLES = {
  btnRad: 20,
  btnRadSm: 7,
  h2FontSize: 18,
  h2Font: "Arial",
  h3FontSize: 14,
  h3Font: "Arial"
}

export const BTN_STYLES = {
  execBtn:{
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.execButtonColor,
    txt: "Execute",
    fontSize: STYLES.h2FontSize,
    font: STYLES.h2Font,
    textColor: COLOR_PALETTE.containerColor,
    accent: {
      rad: STYLES.btnRad,
      fillColor: LightenDarkenColor(COLOR_PALETTE.execButtonColor, -20),
    },
    hover: {
      rad: STYLES.btnRad,
      fillColor: LightenDarkenColor(COLOR_PALETTE.execButtonColor, 20),
    }
  },

  resetBtn: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.resetButtonColor,
    txt: "Reset",
    fontSize: STYLES.h2FontSize,
    font: STYLES.h2Font,
    textColor: COLOR_PALETTE.containerColor,
    accent: {
      rad: STYLES.btnRad,
      fillColor: LightenDarkenColor(COLOR_PALETTE.resetButtonColor, -20),
    },
    hover: {
      rad: STYLES.btnRad,
      fillColor: LightenDarkenColor(COLOR_PALETTE.resetButtonColor, 20),
    },
  },

  instBtn: {
    rad: STYLES.btnRadSm,
    fillColor: COLOR_PALETTE.instructionsButtonColor,
    txt: "Instructions",
    fontSize: STYLES.h3FontSize,
    font: STYLES.h3Font,
    textColor: COLOR_PALETTE.containerColor,
    accent: {
      rad: STYLES.btnRadSm,
      fillColor: LightenDarkenColor(COLOR_PALETTE.instructionsButtonColor, -20),
    },
    hover: {
      rad: STYLES.btnRadSm,
      fillColor: LightenDarkenColor(COLOR_PALETTE.instructionsButtonColor, 20),
    },
  },
  aboutBtn: {
    rad: STYLES.btnRadSm,
    fillColor: COLOR_PALETTE.instructionsButtonColor,
    txt: "About",
    fontSize: STYLES.h3FontSize,
    font: STYLES.h3Font,
    textColor: COLOR_PALETTE.containerColor,
    accent: {
      rad: STYLES.btnRadSm,
      fillColor: LightenDarkenColor(COLOR_PALETTE.instructionsButtonColor, -20),
    },
    hover: {
      rad: STYLES.btnRadSm,
      fillColor: LightenDarkenColor(COLOR_PALETTE.instructionsButtonColor, 20),
    },
  },
  closeAboutBtn: {
    // rad: STYLES.btnRadSm,
    fillColor: COLOR_PALETTE.backgroundColor,
    // txt: "About",
    // fontSize: STYLES.h3FontSize,
    // font: STYLES.h3Font,
    // textColor: COLOR_PALETTE.containerColor,
    accent: {
      rad: STYLES.btnRadSm,
      fillColor: LightenDarkenColor(COLOR_PALETTE.instructionsButtonColor, -20),
    },
    hover: {
      // rad: STYLES.btnRadSm,
      fillColor: LightenDarkenColor(COLOR_PALETTE.backgroundColor, -20),
    },
  },

}

export const GAME_ELE = {
  workArea: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.containerColor,
    outline: {
      color: COLOR_PALETTE.containerOutlineColor,
      thickness: 5
    },
    shadow: {
      offsetX: 0,
      offsetY: 0,
      color: "#6B6B6B",
      blur: 50
    }
  },

  name: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.containerColor,
    outline: {
      color: COLOR_PALETTE.nameContainer,
      thickness: 5
    },
    shadow: {
      offsetX: 0,
      offsetY: 0,
      color: "#6B6B6B",
      blur: 50
    },
  
  },

  board: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.boardColor,
    outline: {
      color: COLOR_PALETTE.boardOutlineColor,
      thickness: 7
    },
    shadow: {
      offsetX: 0,
      offsetY: 0,
      color: "#6B6B6B",
      blur: 50
    }
  },

  aboutDialog: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.aboutBGColor,
    outline: {
      color: COLOR_PALETTE.boardOutlineColor,
      thickness: 7
    },
    shadow: {
      offsetX: 40,
      offsetY: 40,
      color: "#6B6B6B",
      blur: 50
    }
  },

  errorsDialog: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.errorsColor,
    outline: {
      color: LightenDarkenColor(COLOR_PALETTE.errorsColor, 20),
      thickness: 7
    },
    shadow: {
      offsetX: 40,
      offsetY: 40,
      color: "#6B6B6B",
      blur: 50
    }
  },
}

