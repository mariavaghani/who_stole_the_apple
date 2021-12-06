import Tool from "./tool";
import Character from "./character";
import EscapeElement from "./escape_element";
import CollectableElement from "./collectable_element";
// import gh from "../assets/fox_icon.png"

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



  let foxIcon = new Image();
  foxIcon.src = "./src/assets/fox_icon.png";
// const fox = new Character ("Fox", [0,0], foxIcon);

// ESCAPE ELEMENTS -----------------------

let holeIcon = new Image();
holeIcon.src = "./src/assets/hole_icon.png";

// const hole = new EscapeElement ("Hole", [2,1], holeIcon);

// COLLECTABLE ELEMENTS -----------------------

let carrotIcon = new Image();
carrotIcon.src = "./src/assets/carrot_icon.png";

let radishIcon = new Image();
radishIcon.src = "./src/assets/radish_icon.png";

let brokkoliIcon = new Image();
brokkoliIcon.src = "./src/assets/brokkoli_icon.png";

// const carrot = new CollectableElement("Carrot", [3,0], carrotIcon);


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
    character: new Character("Fox", [0, 0], foxIcon),
    escape: new EscapeElement("Hole", [4, 5], holeIcon),
    collectables: [
      new CollectableElement("Carrot", [1, 3], carrotIcon)
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
    character: new Character("Fox", [0, 1], foxIcon),
    escape: new EscapeElement("Hole", [4, 5], holeIcon),
    collectables: [
      new CollectableElement("Carrot", [3, 0], carrotIcon),
      new CollectableElement("Raddish", [4, 3], radishIcon)
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
    character: new Character("Fox", [0, 2], foxIcon),
    escape: new EscapeElement("Hole", [2, 0], holeIcon),
    collectables: [
      new CollectableElement("Carrot", [4, 0], carrotIcon),
      new CollectableElement("Broccoli", [0, 4], brokkoliIcon),
      new CollectableElement("Raddish", [4, 3], radishIcon)
    ],
    levelCompletion: collectAllCollectablesEscapeToHole

  }
}

export default LEVELS;

