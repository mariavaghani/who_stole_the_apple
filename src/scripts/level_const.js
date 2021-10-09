import Tool from "./tool";


const moveUp = new Tool("Up", () => {
  console.log("Up")
}, "#9C615A");

const moveDown = new Tool("Down", () => {
  console.log("Down");
}, "#CDBD87")


const LEVELS = {
  1: {
    tools: [
      moveUp,
      moveDown
    ]
  }
}

export default LEVELS;

