import LEVELS from './level_const';
import COLOR_PALETTE from './styling';
import Board from "./board";


class Game {
  constructor (level, sizeG, sizeB) {

    this.size = sizeG;
    // Level that this instance is rendering
    this.level = level;
    // Fill the tools with current level specific tools
    this.tools = this.resetToolBox(this.level);
    // initialize empty workspace
    this.inWorkArea = [];
    this.board = new Board(sizeB, level);

    
  }

  ensureToolInTools(tool) {
    // Checks if the tool was not yet added to the tools and adds it
    if (!this.tools.includes(tool)) {
      this.tools.push(tool);
    }
  }

  ensureToolOutOfWorkArea(tool) {
    // Checks if the tool is still in the work area and removes it from work area
    const idx = this.inWorkArea.indexOf(tool);
    if (idx > -1) {
      this.inWorkArea.splice(idx, 1);
    }
  }

  ensureToolInWorkArea (tool) {
    // Checks if the tool was not yet added to the work area and adds it
    if (!this.inWorkArea.includes(tool)) {
      this.inWorkArea.push(tool);
    }
  }

  ensureWorkToolOutOfTools (tool) {
    // Checks if the tool is still in the tools and removes it from tools
    const idx = this.tools.indexOf(tool);
    if (idx > -1) {
      this.tools.splice(idx, 1);
    }
  }
  
  drawToolBoxContainer(ctxS) {
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.size.TOOL_X, this.size.TOOL_Y, this.size.TOOL_DX, this.size.TOOL_DY);
  }

  drawGridOnGameArea(ctxS) {
    for (let i = 0; i < this.size.gridBase; i++) {
      // X dir
      ctxS.beginPath();
      ctxS.moveTo(i * (this.size.DIM_X / this.size.gridBase), 0);
      ctxS.lineTo(i * (this.size.DIM_X / this.size.gridBase), this.size.DIM_Y);
      ctxS.lineWidth = "0.5";
      ctxS.strokeStyle = "#C0CBA8"; 
      ctxS.stroke();

      // Y dir
      ctxS.beginPath();
      ctxS.moveTo(0, i * (this.size.DIM_Y / this.size.gridBase));
      ctxS.lineTo(this.size.DIM_X, i * (this.size.DIM_Y / this.size.gridBase));
      ctxS.lineWidth = "0.5";
      ctxS.strokeStyle = "#C0CBA8"; 
      ctxS.stroke();
    }
  }

  resetToolBox (level) {
    
    let tools = [];

    LEVELS[level].tools.forEach(tool => {
      tool.size(this.size.toolSideX, this.size.toolSideY);
      tools.push(tool);
    });
    return tools
  }

  populateToolBox(ctxA) {
    ctxA.save();
    let dx = this.size.TOOL_X + this.size.gapX;
    let dy = this.size.TOOL_Y + this.size.gapY;
    
    
    this.tools.forEach(tool => {
      tool.draw(ctxA, dx, dy);
      dx += tool.sideX + this.size.gapX;
    });
    ctxA.restore();
  }

  allTools () {
    return this.tools.concat(this.inWorkArea);
  }

  drawResetButton(ctxA) {
    // console.log("Hi!");
    ctxA.fillStyle = COLOR_PALETTE.resetButtonColor;
    ctxA.fillRect(this.size.RESET_X, this.size.RESET_Y,
                  this.size.RESET_DX, this.size.RESET_DY);

    ctxA.font = "16px Arial";
    ctxA.fillStyle = COLOR_PALETTE.containerColor;
    ctxA.fillText("Reset", this.size.RESET_X, this.size.RESET_Y + 16);
  }

  drawExecuteButton(ctxA) {
    // console.log("Hi!");
    ctxA.fillStyle = COLOR_PALETTE.execButtonColor;
    ctxA.fillRect(this.size.EXEC_X, this.size.EXEC_Y,
                  this.size.EXEC_DX, this.size.EXEC_DY);

    ctxA.font = "16px Arial";
    ctxA.fillStyle = COLOR_PALETTE.containerColor;
    ctxA.fillText("Execute", this.size.EXEC_X, this.size.EXEC_Y + 16);

  }

  resetGame(ctxS, ctxA) {
    this.resetStaticGameSetup(ctxS);
    this.tools = this.resetToolBox(this.level);
    this.populateToolBox(ctxA)
    this.inWorkArea = [];

  }

  executeWorkingTools () {
    this.inWorkArea.forEach(tool => {
      tool.execute();
    });
  }

  createBoard (level) {

  }

  resetStaticGameSetup(ctxS) {

    // Creates non-level-specific elements on the screen
    // Clear the game area
    ctxS.clearRect(0, 0, this.size.DIM_X, this.size.DIM_Y);
    ctxS.save();

    // Draw the background
    ctxS.fillStyle = COLOR_PALETTE.backgroundColor;
    ctxS.fillRect(0, 0, this.size.DIM_X, this.size.DIM_Y);

    // Draw the Name of the game container
    this.drawNameContainer(ctxS);
    

    // Draw the toolbox container
    this.drawToolBoxContainer(ctxS);

    // TODO: refactor the following into their own methods
    // TODO: figure out internal grid that the tools could snap to
    // Draw the Work Area container
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.size.WORK_X, this.size.WORK_Y,
                  this.size.WORK_DX, this.size.WORK_DY);

    // Draw the Board container
    this.board.drawStatic(ctxS);

    // Draw grid on top
    // this.drawGridOnGameArea(ctxS);

    ctxS.restore();

  }

  drawBoard (ctxA) {
    this.board.drawActiveElements(ctxA);
  }

  drawNameContainer(ctxS) {
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.size.TITLE_X, this.size.TITLE_Y,
      this.size.TITLE_DX, this.size.TITLE_DY);
    ctxS.fillStyle = COLOR_PALETTE.backgroundColor;

    const that = this.size;
    
    printText("Who Stole/nThe Apple", 30);
    printText("the game where/nyou could steal/nsome apples and/npractice your algorithmic/nthinking along the way", 14, 70);
    
    
    function printText(titleTxt, lh, offset = 0) {
      let lines = titleTxt.split("/n");
      ctxS.font = `${lh}px Arial`;
      for (let i = 1; i <= lines.length; i++) {
        const line = lines[i - 1];
        ctxS.fillText(line,
          that.TITLE_X + 5,
          that.TITLE_Y + i * lh + offset);

      }
    }
  }
};

export default Game;

// TODO: make tools to snap to the grid inside workarea
// TODO: make tools to snap to the grid inside tool box
// TODO: add the ability to reshuffle the tools by dragging them in between 
// other tools. so other tools whould snap to the next grid line.
// the tools sohould also change they posiiton in respective arrays on the 
// backend
// TODO: add links to github, linkedin
// TODO: add obstacles class, that would be a parent class for
// different types of obstacles
// TODO: add collectibles class, that would be a parent class for
// collectible items
// TODO: add a character class
// TODO: add a class that would handle the escape
// TODO: populate the board with with character
// TODO: populate the board with collectibles
// TODO: draw a grid of cells on the board, these cells would reflect 
// the pos of characters and other items on the board
// TODO: add graphic icons to tools
// TODO: add different icons for other items on the board