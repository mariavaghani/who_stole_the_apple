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

// TOOLS -----------------------
const moveUp = new Tool("Up", (board) => {
  const moveVect = [0, -1];

  return board.char.moveInDir(moveVect, board);
  
}, "#9C615A");

const moveDown = new Tool("Down", (board) => {
  const moveVect = [0, 1];

  return board.char.moveInDir(moveVect, board);

}, "#CDBD87")

const moveLeft = new Tool("Left", movingLeft, "#BE879C")
const moveLeft2 = new Tool("Left", movingLeft, "#BE879C")
const moveLeft3 = new Tool("Left", movingLeft, "#BE879C")

const moveRight = new Tool("Right", movingRight, "#8E6A81")
const moveRight2 = new Tool("Right", movingRight, "#8E6A81")
const moveRight3 = new Tool("Right", movingRight, "#8E6A81")

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
      moveLeft,
      moveRight2,
      moveDown,
      moveRight3,
      moveRight,
      collectItem
    ],
    boardElements: [
      fox,
      hole,
      carrot
    ]
  },

  2: {
    tools: [
      moveLeft,
      moveRight2,
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

