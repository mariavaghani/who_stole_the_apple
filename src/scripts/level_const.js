import Tool from "./tool";
import Character from "./character";
import EscapeElement from "./escape_element";
import CollectableElement from "./collectable_element";

// TOOLS -----------------------
const moveUp = new Tool("Up", (board) => {
  const moveVect = [0, -1];

  board.char.moveInDir(moveVect);
  
}, "#9C615A");

const moveDown = new Tool("Down", (board) => {
  const moveVect = [0, 1];

  board.char.moveInDir(moveVect);

}, "#CDBD87")

const moveLeft = new Tool("Left", (board) => {
  const moveVect = [-1, 0];

  board.char.moveInDir(moveVect);
}, "#BE879C")

const moveRight = new Tool("Right", (board) => {
  const moveVect = [1, 0];

  board.char.moveInDir(moveVect);
}, "#8E6A81")

const collectItem = new Tool("Collect", (board) => {
  console.log("Collecting");
}, "#576C71")

// CHARACTERS -----------------------

const fox = new Character ("Fox", [0,0]);

// ESCAPE ELEMENTS -----------------------

const hole = new EscapeElement ("Hole", [4,5]);

// COLLECTABLE ELEMENTS -----------------------

const carrot = new CollectableElement("Carrot", [3,0]);



const LEVELS = {
  1: {
    tools: [
      moveUp,
      moveDown,
      moveLeft,
      moveRight,
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

