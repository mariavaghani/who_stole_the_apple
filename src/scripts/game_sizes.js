class GameSizes {
  constructor(canvasS) {
    this.DIM_X = canvasS.width;
    this.DIM_Y = canvasS.height;

    const rect = canvasS.getBoundingClientRect();

    this.origX = rect.x;
    this.origY = rect.y;

    // Toolbox location
    this.TOOL_X = this.DIM_X * (4 / 20);
    this.TOOL_DX = this.DIM_X * (5 / 20);

    this.TOOL_Y = this.DIM_Y * (2 / 20);
    this.TOOL_DY = this.DIM_Y * (5 / 20);

    // Work Area location
    this.WORK_X = this.DIM_X * (1 / 20);
    this.WORK_DX = this.DIM_X * (7 / 20);

    this.WORK_Y = this.DIM_Y * (10 / 20);
    this.WORK_DY = this.DIM_Y * (8 / 20);

    // Board location
    this.BOARD_X = this.DIM_X * (10 / 20);
    this.BOARD_DX = this.DIM_X * (9 / 20);

    this.BOARD_Y = this.DIM_Y * (2 / 20);
    this.BOARD_DY = this.DIM_Y * (16 / 20);
  }

  toolInsideToolBox(tool) {
    //  returns a boolean value
    // indicating whether temporary location of the tool is inside the toolbox
    return (
      // check X coordinates
      tool.tempX >= this.TOOL_X &&
      tool.tempX <= this.TOOL_X + this.TOOL_DX &&
      tool.tempX + tool.side >= this.TOOL_X &&
      tool.tempX + tool.side <= this.TOOL_X + this.TOOL_DX &&

      // check Y coordinates
      tool.tempY >= this.TOOL_Y &&
      tool.tempY <= this.TOOL_Y + this.TOOL_DY &&
      tool.tempY + tool.side >= this.TOOL_Y &&
      tool.tempY + tool.side <= this.TOOL_Y + this.TOOL_DY
    )
  }

  toolInsideWorkArea(tool) {

    //  returns a boolean value
    // indicating whether temporary locationof the tool is inside the toolbox

    return (
      // check X coordinates
      tool.tempX >= this.WORK_X &&
      tool.tempX <= this.WORK_X + this.WORK_DX &&
      tool.tempX + tool.side >= this.WORK_X &&
      tool.tempX + tool.side <= this.WORK_X + this.WORK_DX &&

      // check Y coordinates
      tool.tempY >= this.WORK_Y &&
      tool.tempY <= this.WORK_Y + this.WORK_DY &&
      tool.tempY + tool.side >= this.WORK_Y &&
      tool.tempY + tool.side <= this.WORK_Y + this.WORK_DY
    )
  }
};

export default GameSizes;