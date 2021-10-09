import LEVELS from './level_const';
import COLOR_PALETTE from './styling';
import GameSizes from "./game_sizes";

class Game {
  constructor (canvasS, canvasA, level) {

    this.size = new GameSizes(canvasS);

    // Level that this instance is rendering
    this.level = level;

    // Fill the tools with current level specific tools
    this.tools = this.createToolBox(this.level);

    // initialize empty workspace
    this.inWorkArea = [];

    // Make tools draggable
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.bindEvents(canvasA)
    
  }

  bindEvents(canvas) {
    canvas.addEventListener("mousedown", this.mouseDownHandler);
    canvas.addEventListener("mousemove", this.mouseMoveHandler);
    canvas.addEventListener("mouseup", this.mouseUpHandler);
  }

  mouseDownHandler (e) {
    // Save current mouse position
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Search if there are any tool that are being dragged
    this.allTools().forEach(tool => {
      let xMin = tool.x + this.size.origX;
      let xMax = tool.x + tool.side + this.size.origX;
      let yMin = tool.y + this.size.origY;
      let yMax = tool.y + tool.side + this.size.origY;
      
      if (this.mouseX >= xMin &&
          this.mouseX <= xMax &&
          this.mouseY >= yMin &&
          this.mouseY <= yMax
          ) {
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
  
  drawStaticGameSetup (ctxS) {
  
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
    for (let i = 0; i < 20; i++) {
      // X dir
      ctxS.beginPath();
      ctxS.moveTo(i * (this.size.DIM_X / 20), 0);
      ctxS.lineTo(i * (this.size.DIM_X / 20), this.size.DIM_Y);
      ctxS.lineWidth = "0.5";
      ctxS.strokeStyle = "#C0CBA8"; 
      ctxS.stroke();

      // Y dir
      ctxS.beginPath();
      ctxS.moveTo(0, i * (this.size.DIM_Y / 20));
      ctxS.lineTo(this.size.DIM_X, i * (this.size.DIM_Y / 20));
      ctxS.lineWidth = "0.5";
      ctxS.strokeStyle = "#C0CBA8"; 
      ctxS.stroke();
    }
  }


  createToolBox (level) {
    
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

  createWorkArea () {

  }

  createBoard (level) {

  }
};

export default Game;