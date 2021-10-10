import LEVELS from './level_const';
import COLOR_PALETTE from './styling';
import GameSizes from "./game_sizes";

class Game {
  constructor (canvasS, canvasA, level) {

    this.size = new GameSizes(canvasS);

    // Level that this instance is rendering
    this.level = level;

    // Fill the tools with current level specific tools
    this.tools = this.resetToolBox(this.level);

    // initialize empty workspace
    this.inWorkArea = [];

    // Make tools draggable
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseClickHandler = this.mouseClickHandler.bind(this);
    this.bindEvents(canvasA)
    
  }

  bindEvents(canvasA) {
    canvasA.addEventListener("mousedown", this.mouseDownHandler);
    canvasA.addEventListener("mousemove", this.mouseMoveHandler);
    canvasA.addEventListener("mouseup", this.mouseUpHandler);
    canvasA.addEventListener("click", this.mouseClickHandler);
  }

  mouseClickHandler (e) {
    // Save current mouse position
    this.mouseX = e.x - this.size.origX;
    this.mouseY = e.y - this.size.origY;
    
    if (this.size.resetButtonClicked(this.mouseX, this.mouseY)) {
      console.log("Reset!!")
      this.resetGame()
    }

    if (this.size.execButtonClicked(this.mouseX, this.mouseY)) {
      console.log("Execute!!")
    }
  }

  mouseDownHandler (e) {
    // Save current mouse position
    this.mouseX = e.x - this.size.origX;
    this.mouseY = e.y - this.size.origY;

    // Search if there are any tool that are being dragged
    this.allTools().forEach(tool => {
      
      if (this.size.mouseOverTool(this.mouseX, this.mouseY, tool)) {
        tool.tempX = tool.x;
        tool.tempY = tool.y;
        tool.isDragging = true; 
      }
    });
  }

  mouseMoveHandler (e) {
    
    this.allTools().forEach(tool => {
      if (tool.isDragging) {
        tool.tempX += e.movementX;
        tool.tempY += e.movementY;
        
      }
    });
  }

  mouseUpHandler (e) {

    const allGameTools = this.allTools();
    
    allGameTools.forEach(tool => {
      if (tool.isDragging) {
        // If the tool ended up in the toolbox
        if (this.size.toolInsideToolBox(tool)) {
          tool.x = tool.tempX;
          tool.y = tool.tempY;
          this.ensureToolInTools(tool);
          this.ensureToolOutOfWorkArea(tool);
        }

        // If the tool ended up in the work area
        if (this.size.toolInsideWorkArea(tool)) {
          tool.x = tool.tempX;
          tool.y = tool.tempY;
          this.ensureToolInWorkArea(tool);
          this.ensureWorkToolOutOfTools(tool);
        }
      }
      // Remove dragging flag from all tools
      tool.isDragging = false;
    });
    console.log(`this.tools ⬇⬇⬇ `);
    console.log(this.tools);

    console.log(`this.inWorkArea ⬇⬇⬇ `);
    console.log(this.inWorkArea);
    
    
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
  
  resetStaticGameSetup (ctxS) {
  
    // Creates non-level-specific elements on the screen

    // Clear the game area
    ctxS.clearRect(0, 0, this.size.DIM_X, this.size.DIM_Y);
    ctxS.save();
    
    // Draw the background
    ctxS.fillStyle = COLOR_PALETTE.backgroundColor;
    ctxS.fillRect(0, 0, this.size.DIM_X, this.size.DIM_Y);

    // Draw the toolbox container
    this.drawToolBoxContainer(ctxS);

    // TODO: refactor the following into their own methods
    // TODO: figure out internal grid that the tools could snap to
    // Draw the Work Area container
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.size.WORK_X, this.size.WORK_Y, this.size.WORK_DX, this.size.WORK_DY);

    // Draw the Board container
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.size.BOARD_X, this.size.BOARD_Y, this.size.BOARD_DX, this.size.BOARD_DY);

    // Draw grid on top
    // this.drawGridOnGameArea(ctxS);

    ctxS.restore();

    // 
    
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
      tools.push(tool);
    });
    return tools
  }

  populateToolBox(ctxA) {
    ctxA.save();
    let dx = this.size.TOOL_X + 10;
    let dy = this.size.TOOL_Y + 10;
    
    
    this.tools.forEach(tool => {
      tool.draw(ctxA, dx, dy);
      dx += tool.side + 10;
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

  createWorkArea () {

  }

  createBoard (level) {

  }
};

export default Game;

// TODO: add execute sequence function
// TODO: make tools to snap to the grid inside workarea
// TODO: make tools to snap to the grid inside tool box
// TODO: add the ability to reshuffle the tools by dragging them in between 
// other tools. so other tools whould snap to the next grid line.
// the tools sohould also change they posiiton in respective arrays on the 
// backend
// TODO: add name on the game to the play area
// TODO: add reset button
// TODO: make reset button render the level like new
// TODO: add a button that would execute the sequence
// TODO: add links to github, linkedin
// TODO: add obstacles class 
// TODO: add collectibles class
// TODO: add a character class
// TODO: add a class that would handle the escape
// TODO: populate the board with with character
// TODO: populate the board with collectibles
// TODO: add graphic icons to tools