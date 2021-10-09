import LEVELS from './level_const';
import COLOR_PALETTE from './styling';

console.log(`LEVELS ⬇⬇⬇ `);
console.log(LEVELS);



class Game {
  constructor (canvasS, canvasA, level) {
    // Game display dims
    this.DIM_X = canvasS.width;
    this.DIM_Y = canvasS.height;

    const rect = canvasS.getBoundingClientRect()
    console.log(`rect ⬇⬇⬇ `);
    console.log(rect);
    
    this.origX = rect.x;
    this.origY = rect.y;

    console.log(`this.origX ⬇⬇⬇ `);
    console.log(this.origX);
    console.log(`this.origY ⬇⬇⬇ `);
    console.log(this.origY);
    

    

    // Toolbox location
    this.TOOL_X = this.DIM_X * (4/20);
    this.TOOL_DX = this.DIM_X * (5/20);

    this.TOOL_Y = this.DIM_Y * (2/20);
    this.TOOL_DY = this.DIM_Y * (5/20);

    // Work Area location
    this.WORK_X = this.DIM_X * (1/20);
    this.WORK_DX = this.DIM_X * (7 / 20);

    this.WORK_Y = this.DIM_Y * (10/20);
    this.WORK_DY = this.DIM_Y * (8 / 20);

    // Board location
    this.BOARD_X = this.DIM_X * (10 / 20);
    this.BOARD_DX = this.DIM_X * (9 / 20);

    this.BOARD_Y = this.DIM_Y * (2 / 20);
    this.BOARD_DY = this.DIM_Y * (16 / 20);


    // Level that this instance is rendering
    this.level = level;

    // Fill the tools with current level specific tools
    this.tools = this.createToolBox(this.level);

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

    console.log(`e ⬇⬇⬇ `);
    console.log(e);
    

    // Search if there are any tool that are being dragged
    this.tools.forEach(tool => {
      let xMin = tool.x + this.origX;
      let xMax = tool.x + tool.side + this.origX;
      let yMin = tool.y + this.origY;
      let yMax = tool.y + tool.side + this.origY;
      
      if (this.mouseX >= xMin &&
          this.mouseX <= xMax &&
          this.mouseY >= yMin &&
          this.mouseY <= yMax
          ) {
        tool.isDragging = true; 
      }
    });
  }

  mouseMoveHandler (e) {
    
    this.tools.forEach(tool => {
      if (tool.isDragging) {
        console.log(`tool ⬇⬇⬇ `);
        console.log(tool);
        tool.x += e.movementX;
        tool.y += e.movementY;
        
      }
    });
  }

  mouseUpHandler (e) {
    this.tools.forEach(tool => {
      tool.isDragging = false;
    });
  }
  
  drawGameSetup (ctxS) {
  
    // Creates non-level-specific elements on the screen

    // Clear the game area
    ctxS.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctxS.save();
    
    // Draw the background
    ctxS.fillStyle = COLOR_PALETTE.backgroundColor;
    ctxS.fillRect(0, 0, this.DIM_X, this.DIM_Y);

    // Draw the toolbox container
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.TOOL_X, this.TOOL_Y, this.TOOL_DX, this.TOOL_DY);


    // Draw the Work Area container
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.WORK_X, this.WORK_Y, this.WORK_DX, this.WORK_DY);

    // Draw the Board container
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.BOARD_X, this.BOARD_Y, this.BOARD_DX, this.BOARD_DY);

    ctxS.restore();

    // 
    
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
    let dx = this.TOOL_X + 10;
    let dy = this.TOOL_Y + 10;
    
    
    this.tools.forEach(tool => {
      tool.draw(ctxA, dx, dy);
      dx += 40;
    });
    ctxA.restore();
  }

  createWorkArea () {

  }

  createBoard (level) {

  }
};

export default Game;