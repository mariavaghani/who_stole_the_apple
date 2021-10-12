import LEVELS from './level_const';
import COLOR_PALETTE from './styling';
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
    this.inExecution = false;

    
  }

  snapToGrid(x, y, origX, origY, tool) {

    x = x - origX;
    y = y - origY;

    x = Math.round(x / this.size.cellWidth); // * this.size.cellWidth;
    y = Math.round(y / this.size.cellHeight); // * this.size.cellHeight;
  
    tool.pos = [x,y];
    tool.x = x * this.size.cellWidth + origX;
    tool.y = y * this.size.cellHeight + origY;
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
    this.board = new Board(this.sizeB, this.level);

    
    this.resetStaticGameSetup(ctxS);
    this.tools = this.resetToolBox(this.level);
    this.populateToolBox(ctxA)
    this.inWorkArea = [];

  }

  executeWorkingTools (ctxS, ctxA) {
    
    if (this.inExecution) {
      
      let i = 0;
      const execution = setInterval(() => {
        const tool = this.inWorkArea[i];
        
        if (tool !== undefined && tool.execute(this.board)) {
          i++;
        } else {
          clearInterval(execution);
          this.checkVictory();
        }
      }, 500);
      this.inExecution = false;

    }
  }

  checkVictory() {
    
    if (this.fulfilledLevel()) {
      console.log("here");

      this.board.msg = "Great Job, you thief!!";
      this.board.status = "VICTORY";
      console.log(`this.board.msg ⬇⬇⬇ `);
      console.log(this.board.msg);
      
    } else if (this.board.status === "OK") {
      this.board.msg = `${this.board.char.name} did not complete the challenge!`;
      this.board.status = "NOPE";
    }
  }

  fulfilledLevel() {
    return (this.board.char.pos[0] === this.board.escape.pos[0] &&
            this.board.char.pos[1] === this.board.escape.pos[1] &&
            this.board.char.bag.length === 1
            )

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

    this.painter = new GamePainter(ctxS, this.size, this.board);

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

// TODO: Create a method that would determine if there is a win for the level
// TODO: add design of level 2
// TODO: add design of level 3
// TODO: add instructions. popup? welcome screen? 
// TODO: Level completion requirements should show up at the title
// TODO: add obstacles class, that would be a parent class for
// different types of obstacles
// TODO: add collectibles class, that would be a parent class for
// collectible items
// TODO: populate the board with collectibles
// TODO: add graphic icons to tools
// TODO: add different icons for other items on the board
// TODO: add links to github, linkedin
// TODO: add the ability to reshuffle the tools by dragging them in between 
// other tools. so other tools whould snap to the next grid line.
// the tools should also change they posiiton in respective arrays on the 
// backend