import LEVELS from './level_const';
import {BTN_STYLES} from './styling';
import Board from "./board";
import GamePainter from "./game_painter";


class Game {
  constructor (level, sizeG, sizeB) {

    this.size = sizeG;
    this.sizeB = sizeB;
    // Level that this instance is rendering
    this.level = level;
    // Fill the tools with current level specific tools
    this.tools = this.resetToolBox(this.level);
    // initialize empty workspace
    this.inWorkArea = [];
    this.board = new Board(sizeB, level);
    this.showInstructions = false;
    this.buttonHoverState = {
      instructions: false,
      reset: false,
      execute: false,
    }

    
  }

  snapToGrid(origX, origY, tool) {

    let x = tool.tempX - origX;
    let y = tool.tempY - origY;

    x = Math.round(x / this.size.cellWidth); // * this.size.cellWidth;
    y = Math.round(y / this.size.cellHeight); // * this.size.cellHeight;
  
    tool.pos = [x,y];
    tool.x = x * this.size.cellWidth + origX;
    tool.y = y * this.size.cellHeight + origY;
  }

  pushOverlappingTools(toolO, origX, origY, collection) {
    collection.forEach(tool => {
      if (
        tool !== toolO &&
        tool.pos[0] === toolO.pos[0] &&
        tool.pos[1] === toolO.pos[1]
        ) {
        const toolNextPos = this.nextPos(tool.pos); //[tool.pos[0]+1, tool.pos[1]];
        tool.placeTo(toolNextPos, origX, origY);
        this.pushOverlappingTools(tool, origX, origY, collection);
      }
    });
  }

  nextPos (pos) {
    let f = pos[0] + 1;
    let s = pos[1];
    if (f >= this.size.cols) {
      f = 0;
      s++;
    }
    if (s >= this.size.rows) {
      s = 0;
      f = 0;
    }
    return [f,s];
  }

  placeToolIn(collection, tool, origX, origY) {
    tool.x = tool.tempX;
    tool.y = tool.tempY;

    this.snapToGrid(origX, origY, tool);
    this.pushOverlappingTools(tool, origX, origY, collection);
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
  
  resetToolBox (level) {
    
    let tools = [];

    LEVELS[level].tools.forEach(tool => {
      tool.size(this.size.cellWidth, this.size.cellHeight);
      
      tools.push(tool);
    });
    return tools
  }

  populateToolBox(ctxA) {

    ctxA.save();
    let dx = this.size.tOrigX; 
    let dy = this.size.tOrigY;
    
    let iRow = 0;
    let iCol = 0;
    this.tools.forEach(tool => {
      let pos = [iCol, iRow];
      tool.placeTo(pos, dx, dy);
      iCol++;
      if (iCol === this.size.cols) {
        iCol = 0;
        iRow++;
      }
      
    });
    ctxA.restore();
  }

  allTools () {
    return this.tools.concat(this.inWorkArea);
  }

  drawButton (ctxA, x, y, width, height, style, hovered) {
    ctxA.save();
    const btnFaceStyle = hovered ? style.hover : style
    this.painter.roundRect(ctxA, x+0.008*x, y+0.008*y,
                          width, height,
                          style.accent);
    this.painter.roundRect(ctxA, x, y,
                          width, height,
                          btnFaceStyle);

    ctxA.font = `${style.fontSize}px ${style.font}`;
    ctxA.fillStyle = style.textColor;
    ctxA.textAlign = "center";
    ctxA.fillText(style.txt,
      x + width / 2,
      y + (height + style.fontSize / 2) / 2);
    ctxA.restore();
  }

  drawAllButtons(ctxA) {
    this.drawButton(ctxA,
      this.size.EXEC_X, this.size.EXEC_Y,
      this.size.EXEC_DX, this.size.EXEC_DY,
      BTN_STYLES.execBtn, this.buttonHoverState.execute
      );

    this.drawButton(ctxA,
      this.size.RESET_X, this.size.RESET_Y,
      this.size.RESET_DX, this.size.RESET_DY,
      BTN_STYLES.resetBtn, this.buttonHoverState.reset
    );

    this.drawButton(ctxA,
      this.size.INST_X, this.size.INST_Y,
      this.size.INST_DX, this.size.INST_DY,
      BTN_STYLES.instBtn, this.buttonHoverState.instructions
      );
  }

  resetGame(ctxS, ctxA) {
    this.board = new Board(this.sizeB, this.level);

    // this.painter = new GamePainter(ctxS, this.size, this.board);
    this.resetStaticGameSetup(ctxS);
    this.tools = this.resetToolBox(this.level);
    this.populateToolBox(ctxA)
    this.inWorkArea = [];

  }

  executeWorkingTools () {
      
    let i = 0;
    const execution = setInterval(() => {
      const tool = this.inWorkArea[i];
      
      if (tool !== undefined && tool.execute(this.board)) {
        i++;
      } else {
        clearInterval(execution);
        this.checkVictory();
        return true;
      }
    }, 500);
    
  }

  checkVictory() {
    
    if (this.fulfilledLevel()) {

      this.board.msg = "Great Job, you thief!!";
      this.board.status = "VICTORY";
      // console.log(`this.board.msg ⬇⬇⬇ `);
      // console.log(this.board.msg);
      
    } else if (this.board.status === "OK") {
      this.board.msg = `${this.board.char.name} did not complete the challenge!`;
      this.board.status = "NOPE";
    }
  }

  fulfilledLevel() {

    return LEVELS[this.level].levelCompletion(this.board, this.level);

  }

  stateMachine(ctxS, ctxA) {

    switch (this.board.status) {
      case "VICTORY":
        this.level++;
        this.resetGame(ctxS, ctxA);

      // case "ERROR":

      //   this.board = new Board(this.sizeB, this.level);
      //   case "NOPE":
          
      //     this.board = new Board(this.sizeB, this.level);
      default:
        this.board = new Board(this.sizeB, this.level);
    }
  
  }

  resetStaticGameSetup(ctxS) {

    this.painter = new GamePainter(ctxS, this.size, this.board, this.level);

  }

  drawBoard (ctxA) {
    this.board.drawActiveElements(ctxA);
  }

  drawTools (ctxA) {
    // Drawing tools, called in the GameView#start
    this.allTools().forEach(tool => {
      if (tool.isDragging) {
        tool.drawWhileDragging(ctxA,
          tool.tempX, tool.tempY);
      } else {
        tool.draw(ctxA, tool.x, tool.y);
      }
    });
  }

  ensureWorkingOrder() {

    this.inWorkArea.sort((t1, t2) => {
      const pos1 = t1.pos[1] * this.size.cols + t1.pos[0];
      const pos2 = t2.pos[1] * this.size.cols + t2.pos[0];
      
      if (pos1 > pos2) {
        return 1;
      } else if ( pos1 === pos2 ) {
        return 0;
      } else {
        return -1;
      }
    })

  }


};

export default Game;

// TODO: Level completion requirements should show up at the title
// TODO: add obstacles class, that would be a parent class for
// different types of obstacles
// TODO: add collectibles class, that would be a parent class for
// collectible items
// TODO: add graphic icons to tools
// TODO: add different icons for other items on the board

// TODO: figure out a better strategy on how to draw and press button animation
// TODO: create a fox animation, figure out a good strategy for 