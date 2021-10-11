import Tool from "./tool";
import Character from "./character";

// TOOLS -----------------------
const moveUp = new Tool("Up", () => {
  console.log("Up")
  
}, "#9C615A");

const moveDown = new Tool("Down", () => {
  console.log("Down");
}, "#CDBD87")

const moveLeft = new Tool("Left", () => {
  console.log("Left");
}, "#BE879C")

const moveRight = new Tool("Right", () => {
  console.log("Right");
}, "#8E6A81")

const collectItem = new Tool("Collect", () => {
  console.log("Collecting");
}, "#576C71")

// CHARACTERS -----------------------

const fox = new Character ("Fox", [0,0]);


const LEVELS = {
  1: {
    tools: [
      moveUp,
      moveDown,
      moveLeft,
      moveRight,
      collectItem
    ],
    character: fox
  }
}

export default LEVELS;

