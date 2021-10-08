import LEVELS from './level_const';
import COLOR_PALETTE from './styling';

console.log(`LEVELS ⬇⬇⬇ `);
console.log(LEVELS);

// const COLOR_PALETTE = COLOR_PALETTE;
// const LEVELS = LEVELS;


class Game {
  constructor (canvas, level) {
    // Game display dims
    this.DIM_X = canvas.width;
    this.DIM_Y = canvas.height;

    // Toolbox location
    this.TOOL_X = this.DIM_X / 2 - 250;
    this.TOOL_Y = 100;

    // Work Area location
    this.WORK_X = this.DIM_X / 2 - 250;
    this.WORK_Y = this.DIM_Y / 2;

    // Level that this instance is rendering
    this.level = level;

    // Fill the tools with current level specific tools
    this.tools = this.createToolBox(this.level);
  }
  
  drawGameSetup (ctx) {
  
    // Creates non-level-specific elements on the screen

    // Clear the game area
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.save();
    
    // Draw the background
    ctx.fillStyle = COLOR_PALETTE.backgroundColor;
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

    // Draw the toolbox container
    ctx.fillStyle = COLOR_PALETTE.containerColor;
    ctx.fillRect(this.TOOL_X, this.TOOL_Y, 200, 100);


    // Draw the toolbox container
    ctx.fillStyle = COLOR_PALETTE.containerColor;
    ctx.fillRect(this.WORK_X, this.WORK_Y, 200, 100);

    ctx.restore();

    // 
    
  }

  createToolBox (level) {
    
    let tools = [];

    LEVELS[level].tools.forEach(tool => {
      tools.push(tool);
    });
    return tools
  }

  populateToolBox(ctx) {
    ctx.save();
    this.tools.forEach(tool => {
      ctx.translate(40, 0);
      tool.draw(ctx);
    });
    ctx.restore();
  }

  createWorkArea () {

  }

  createBoard (level) {

  }
};

export default Game;