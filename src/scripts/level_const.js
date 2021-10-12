import Tool from "./tool";
import Character from "./character";
import EscapeElement from "./escape_element";
import CollectableElement from "./collectable_element";


// TOOL FUNCTIONS ------------------

const movingLeft = (board) => {
  const moveVect = [-1, 0];
  return board.char.moveInDir(moveVect, board);
}

const movingRight = (board) => {
  const moveVect = [1, 0];
  return board.char.moveInDir(moveVect, board);
}

const movingUp = (board) => {
  const moveVect = [0, -1];

  return board.char.moveInDir(moveVect, board);

};

const movingDown = (board) => {
  const moveVect = [0, 1];

  return board.char.moveInDir(moveVect, board);

};

// TOOLS -----------------------

const collectItem = new Tool("Collect", (board) => {
  console.log("Collecting");
  return true;
}, "#576C71")

// CHARACTERS -----------------------

const fox = new Character ("Fox", [0,0]);

// ESCAPE ELEMENTS -----------------------

const hole = new EscapeElement ("Hole", [2,1]);

// COLLECTABLE ELEMENTS -----------------------

const carrot = new CollectableElement("Carrot", [3,0]);



const LEVELS = {
  1: {
    tools: [
      new Tool("Left", movingLeft, "#BE879C"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Right", movingRight, "#8E6A81"),
      collectItem,
      new Tool("Left", movingLeft, "#BE879C")
    ],
    boardElements: [
      fox,
      hole,
      carrot
    ]
  },

  2: {
    tools: [
      new Tool("Left", movingLeft, "#BE879C"),
      new Tool("Right", movingRight, "#8E6A81"),
      collectItem
    ],
    boardElements: [
      fox,
      hole,
      carrot
    ]
  }
}

export default LEVELS;

