class GameSizes {
  constructor(canvasS) {
    this.DIM_X = canvasS.width;
    this.DIM_Y = canvasS.height;

    
    const gridBase = 80;
    this.gridBase = gridBase;
    const rect = canvasS.getBoundingClientRect();

    this.origX = rect.x;
    this.origY = rect.y;

    // Grid 
    this.gapX = this.DIM_X * (1 / gridBase);
    this.gapY = this.DIM_Y * (2 / gridBase);

    // Tool size
    this.toolSideX = this.DIM_X * (3 / gridBase);
    this.toolSideY = this.DIM_Y * (4 / gridBase);

    // Title location
    this.TITLE_X = this.DIM_X * (4 / gridBase);
    this.TITLE_DX = this.DIM_X * (11 / gridBase);

    this.TITLE_Y = this.DIM_Y * (8 / gridBase);
    this.TITLE_DY = this.DIM_Y * (25 / gridBase);

    // Toolbox location
    this.TOOL_X = this.DIM_X * (16 / gridBase);
    this.TOOL_DX = this.DIM_X * (22 / gridBase);

    this.TOOL_Y = this.DIM_Y * (8 / gridBase);
    this.TOOL_DY = this.DIM_Y * (25 / gridBase);

    // Work Area location
    this.WORK_X = this.DIM_X * (4 / gridBase);
    this.WORK_DX = this.DIM_X * (26 / gridBase);

    this.WORK_Y = this.DIM_Y * (36 / gridBase);
    this.WORK_DY = this.DIM_Y * (32 / gridBase);

  

    // Execute button location
    this.EXEC_X = this.DIM_X * (31 / gridBase);
    this.EXEC_DX = this.DIM_X * (7 / gridBase);

    this.EXEC_Y = this.DIM_Y * (53 / gridBase);
    this.EXEC_DY = this.DIM_Y * (14 / gridBase);

    // Reset button location
    this.RESET_X = this.DIM_X * (31 / gridBase);
    this.RESET_DX = this.DIM_X * (7 / gridBase);

    this.RESET_Y = this.DIM_Y * (37 / gridBase);
    this.RESET_DY = this.DIM_Y * (14 / gridBase);
  }

  toolInsideToolBox(tool) {
    //  returns a boolean value
    // indicating whether temporary location of the tool is inside the toolbox
    return (
      // check X coordinates
      tool.tempX >= this.TOOL_X &&
      tool.tempX <= this.TOOL_X + this.TOOL_DX &&
      tool.tempX + tool.sideX >= this.TOOL_X &&
      tool.tempX + tool.sideX <= this.TOOL_X + this.TOOL_DX &&

      // check Y coordinates
      tool.tempY >= this.TOOL_Y &&
      tool.tempY <= this.TOOL_Y + this.TOOL_DY &&
      tool.tempY + tool.sideY >= this.TOOL_Y &&
      tool.tempY + tool.sideY <= this.TOOL_Y + this.TOOL_DY
    )
  }

  toolInsideWorkArea(tool) {

    //  returns a boolean value
    // indicating whether temporary locationof the tool is inside the toolbox

    return (
      // check X coordinates
      tool.tempX >= this.WORK_X &&
      tool.tempX <= this.WORK_X + this.WORK_DX &&
      tool.tempX + tool.sideX >= this.WORK_X &&
      tool.tempX + tool.sideX <= this.WORK_X + this.WORK_DX &&

      // check Y coordinates
      tool.tempY >= this.WORK_Y &&
      tool.tempY <= this.WORK_Y + this.WORK_DY &&
      tool.tempY + tool.sideX >= this.WORK_Y &&
      tool.tempY + tool.sideX <= this.WORK_Y + this.WORK_DY
    )
  }

  mouseOverTool (mouseX, mouseY, tool) {
    return (mouseX >= tool.x &&
            mouseX <= tool.x + tool.sideX &&
            mouseY >= tool.y &&
            mouseY <= tool.y + tool.sideX
    )
  }

  resetButtonClicked (mouseX, mouseY) {
    return this.mouseEventInArea(mouseX, 
                                mouseY,
                                this.RESET_X,
                                this.RESET_Y,
                                this.RESET_DX,
                                this.RESET_DY)
  }

  execButtonClicked(mouseX, mouseY) {
    return this.mouseEventInArea(mouseX,
      mouseY,
      this.EXEC_X,
      this.EXEC_Y,
      this.EXEC_DX,
      this.EXEC_DY)
  }

  mouseEventInArea (mouseX, mouseY, originX, originY, sideDimX, sideDimY = sideDimX) {
    return (mouseX >= originX &&
      mouseX <= originX + sideDimX &&
      mouseY >= originY &&
      mouseY <= originY + sideDimY
    )
  }
};

export default GameSizes;