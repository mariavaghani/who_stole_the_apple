// if styling related constants are not generated based on user window,
// these numbers go in this file

export const COLOR_PALETTE = {

  backgroundColor: "#969F78",

  containerColor: "#E3D4BA",
  containerOutlineColor: "#C5AE80",

  boardColor: "#C0CBA8",
  boardOutlineColor: "#888E72",

  execButtonColor: "#B28568",
  resetButtonColor: "#BE9979",
  // instructionsButtonColor: "#BE9979",
  msgColor: "#B37C7C",

  nameContainer: "#CDBD87"
};

export const STYLES = {
  btnRad: 20,
  btnRadSm: 7,
  h2FontSize: 18,
  h2Font: "Arial"
}

export const BTN_STYLES = {
  execBtn:{
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.execButtonColor,
    txt: "Execute",
    fontSize: STYLES.h2FontSize,
    font: STYLES.h2Font,
    textColor: COLOR_PALETTE.containerColor
  },

  resetBtn: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.resetButtonColor,
    txt: "Reset",
    fontSize: STYLES.h2FontSize,
    font: STYLES.h2Font,
    textColor: COLOR_PALETTE.containerColor
  },

  instBtn: {
    rad: STYLES.btnRadSm,
    fillColor: COLOR_PALETTE.resetButtonColor,
    txt: "Instructions",
    fontSize: STYLES.h2FontSize,
    font: STYLES.h2Font,
    textColor: COLOR_PALETTE.containerColor
  }

}

export const GAME_ELE = {
  workArea: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.containerColor,
    outline: {
      color: COLOR_PALETTE.containerOutlineColor,
      thickness: 5
    }
  },

  name: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.containerColor,
    outline: {
      color: COLOR_PALETTE.nameContainer,
      thickness: 5
    }
  },

  board: {
    rad: STYLES.btnRad,
    fillColor: COLOR_PALETTE.boardColor,
    outline: {
      color: COLOR_PALETTE.boardOutlineColor,
      thickness: 7
    }
  }
}

