import Tool from "./tool";


const moveUp = new Tool("Up", () => {
  console.log("Up")
});

const moveDown = new Tool("Down", () => {
  console.log("Down");
})


const LEVELS = {
  1: {
    tools: [
      moveUp,
      moveDown
    ]
  }
}

export default LEVELS;

