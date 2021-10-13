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

const collectingItem = (board) => {
  console.log("Collecting");
  return board.char.addToBag(board);
}

// WIN REQUIREMENT

const collectAllCollectablesEscapeToHole = (board, level) => {
  return (board.char.pos[0] === board.escape.pos[0] &&
            board.char.pos[1] === board.escape.pos[1] &&
            board.char.bag.length === LEVELS[level].collectables.length
            )
}




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
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Collect", collectingItem, "#576C71"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Left", movingLeft, "#BE879C")
    ],
    character: new Character("Fox", [0, 0]),
    escape: new EscapeElement("Hole", [4, 5]),
    collectables: [
      new CollectableElement("Carrot", [1, 3])
    ],
    levelCompletion: collectAllCollectablesEscapeToHole
  },

  2: {
    tools: [
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Left", movingLeft, "#BE879C"),
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Collect", collectingItem, "#576C71"),
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Down", movingDown, "#CDBD87"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Up", movingUp, "#A56D73"),
      new Tool("Right", movingRight, "#8E6A81"),
      new Tool("Collect", collectingItem, "#576C71")
    ],
    character: new Character("Fox", [0, 1]),
    escape: new EscapeElement("Hole", [4, 5]),
    collectables: [
      new CollectableElement("Carrot", [3, 0]),
      new CollectableElement("Raddish", [4, 3])
    ],
    levelCompletion: collectAllCollectablesEscapeToHole

  }
}

export default LEVELS;

