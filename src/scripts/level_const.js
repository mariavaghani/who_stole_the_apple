import Tool from "./tool";
import Character from "./character";
import EscapeElement from "./escape_element";
import CollectableElement from "./collectable_element";


// TOOLS FUNCTIONS ------------------

// LEFT
const movingLeft = (board) => {
  const moveVect = [-1, 0];
  return board.char.moveInDir(moveVect, board);
}

let iconLeft = new Image();
iconLeft.src = "./src/assets/tool-left.png"; // can also be a remote URL e.g. http://


// RIGHT
const movingRight = (board) => {
  const moveVect = [1, 0];
  return board.char.moveInDir(moveVect, board);
}

let iconRight = new Image();
iconRight.src = "./src/assets/tool-right.png";


// UP
const movingUp = (board) => {
  const moveVect = [0, -1];

  return board.char.moveInDir(moveVect, board);

};

let iconUp = new Image();
iconUp.src = "./src/assets/tool-up.png";

// DOWN

const movingDown = (board) => {
  const moveVect = [0, 1];
  
  return board.char.moveInDir(moveVect, board);
  
};

let iconDown = new Image();
iconDown.src = "./src/assets/tool-down.png";

const collectingItem = (board) => {
  // console.log("Collecting");
  return board.char.addToBag(board);
}

let iconCollect = new Image();
iconCollect.src = "./src/assets/tool-collect.png";

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
      new Tool("Left", movingLeft, iconLeft),
      new Tool("Right", movingRight, iconRight),
      new Tool("Down", movingDown, iconDown),
      new Tool("Down", movingDown, iconDown),
      new Tool("Down", movingDown, iconDown),
      new Tool("Right", movingRight, iconRight),
      new Tool("Down", movingDown, iconDown),
      new Tool("Right", movingRight, iconRight),
      new Tool("Down", movingDown, iconDown),
      new Tool("Collect", collectingItem, iconCollect),
      new Tool("Right", movingRight, iconRight),
      new Tool("Left", movingLeft, iconLeft)
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
      new Tool("Down", movingDown, iconDown),
      new Tool("Right", movingRight, iconRight),
      new Tool("Left", movingLeft, iconLeft),
      new Tool("Down", movingDown, iconDown),
      new Tool("Right", movingRight, iconRight),
      new Tool("Down", movingDown, iconDown),
      new Tool("Down", movingDown, iconDown),
      new Tool("Collect", collectingItem, iconCollect),
      new Tool("Down", movingDown, iconDown),
      new Tool("Right", movingRight, iconRight),
      new Tool("Down", movingDown, iconDown),
      new Tool("Right", movingRight, iconRight),
      new Tool("Up", movingUp, iconUp),
      new Tool("Right", movingRight, iconRight),
      new Tool("Collect", collectingItem, iconCollect)
    ],
    character: new Character("Fox", [0, 1]),
    escape: new EscapeElement("Hole", [4, 5]),
    collectables: [
      new CollectableElement("Carrot", [3, 0]),
      new CollectableElement("Raddish", [4, 3])
    ],
    levelCompletion: collectAllCollectablesEscapeToHole

  }, 

  3: {
    tools: [
      new Tool("Down", movingDown, iconDown),
      new Tool("Right", movingRight, iconRight),
      new Tool("Left", movingLeft, iconLeft),
      new Tool("Down", movingDown, iconDown),
      new Tool("Left", movingLeft, iconLeft),
      new Tool("Right", movingRight, iconRight),
      new Tool("Down", movingDown, iconDown),
      new Tool("Collect", collectingItem, iconCollect),
      new Tool("Collect", collectingItem, iconCollect),
      new Tool("Right", movingRight, iconRight),
      new Tool("Up", movingUp, iconUp),
      new Tool("Right", movingRight, iconRight),
      new Tool("Up", movingUp, iconUp),
      new Tool("Up", movingUp, iconUp),
      new Tool("Right", movingRight, iconRight),
      new Tool("Up", movingUp, iconUp),
      new Tool("Collect", collectingItem, iconCollect)
    ],
    character: new Character("Tiger", [0, 2]),
    escape: new EscapeElement("Hole", [2, 0]),
    collectables: [
      new CollectableElement("Carrot", [4, 0]),
      new CollectableElement("Broccoli", [0, 4]),
      new CollectableElement("Raddish", [4, 3])
    ],
    levelCompletion: collectAllCollectablesEscapeToHole

  }
}

export default LEVELS;

