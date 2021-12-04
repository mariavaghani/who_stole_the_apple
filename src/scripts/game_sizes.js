class GameSizes {
  constructor(canvasS) {
    this.DIM_X = canvasS.width;
    this.DIM_Y = canvasS.height;

    
    const gridBase = 80;
    this.gridBase = gridBase;
    const rect = canvasS.getBoundingClientRect();

    this.origX = rect.x;
    this.origY = rect.y;

    // // Grid 
    // this.gapX = this.DIM_X * (1 / gridBase);
    // this.gapY = this.DIM_Y * (2 / gridBase);


    // Title location
    this.TITLE_X = this.DIM_X * (2 / gridBase);
    this.TITLE_DX = this.DIM_X * (11 / gridBase);

    this.TITLE_Y = this.DIM_Y * (8 / gridBase);
    this.TITLE_DY = this.DIM_Y * (30 / gridBase);

    // Toolbox location
    this.TOOL_X = this.DIM_X * (14 / gridBase);
    this.TOOL_DX = this.DIM_X * (26 / gridBase);

    this.TOOL_Y = this.DIM_Y * (8 / gridBase);
    this.TOOL_DY = this.DIM_Y * (30 / gridBase);

    // Work Area location
    this.WORK_X = this.DIM_X * (2 / gridBase);
    this.WORK_DX = this.TOOL_DX; //this.DIM_X * (26 / gridBase);

    this.WORK_Y = this.DIM_Y * (40 / gridBase);
    this.WORK_DY = this.TOOL_DY; //this.DIM_Y * (30 / gridBase);

    // Work Area Grid ============================
    // X dir
    this.borderX = this.TOOL_DX / 20;
    this.width = this.TOOL_DX - 2 * this.borderX;
    this.cols = 6;
    this.cellWidth = this.width / this.cols;
    
    // Y dir
    this.borderY = this.TOOL_DY / 15;
    this.height = this.TOOL_DY - 2 * this.borderY;
    this.rows = 4;
    this.cellHeight = this.height / this.rows;

    this.wOrigX = this.WORK_X + this.borderX;
    this.wOrigY = this.WORK_Y + this.borderY;

    this.tOrigX = this.TOOL_X + this.borderX;
    this.tOrigY = this.TOOL_Y + this.borderY;

  

    // Execute button location
    this.EXEC_X = this.DIM_X * (30 / gridBase);
    this.EXEC_DX = this.DIM_X * (10 / gridBase);

    this.EXEC_Y = this.DIM_Y * (50 / gridBase);
    this.EXEC_DY = this.DIM_Y * (20 / gridBase);

    // Reset button location
    this.RESET_X = this.DIM_X * (30 / gridBase);
    this.RESET_DX = this.EXEC_DX; //this.DIM_X * (10 / gridBase);

    this.RESET_Y = this.DIM_Y * (40 / gridBase);
    this.RESET_DY = this.DIM_Y * (8 / gridBase);

    
    

    // Dialogs
    this.dialogX = this.DIM_X * (10 / gridBase);
    this.dialogY = this.DIM_X * (18 / gridBase);

    this.dialogDX = this.DIM_Y * (40 / gridBase);
    this.dialogDY = this.DIM_Y * (24 / gridBase);

    // Instructions button location
    this.INST_X = this.DIM_X * (4 / gridBase);
    this.INST_DX = this.DIM_X * (7 / gridBase);

    this.INST_Y = this.DIM_Y * (29 / gridBase);
    this.INST_DY = this.DIM_Y * (3 / gridBase);

    // About button location
    this.ABOUT_X = this.DIM_X * (4 / gridBase);
    this.ABOUT_DX = this.DIM_X * (7 / gridBase);

    this.ABOUT_Y = this.DIM_Y * (33 / gridBase);
    this.ABOUT_DY = this.DIM_Y * (3 / gridBase);

    // Instructions Dialog
    // this.instX = this.DIM_X * (10 / gridBase);
    // this.instY = this.DIM_X * (18 / gridBase);

    // this.instDX = this.DIM_Y * (40 / gridBase);
    // this.instDY = this.DIM_Y * (24 / gridBase);

    // About Dialog
    this.aboutX = this.DIM_X * (20 / gridBase);
    this.aboutY = this.DIM_Y * (20 / gridBase);

    this.aboutDX = this.DIM_X * (40 / gridBase);
    this.aboutDY = this.DIM_Y * (40 / gridBase);

    // Close About Button Location
    this.CLOSE_ABOUT_DX = this.DIM_X * (2 / gridBase); //this.DIM_X * (10 / gridBase);
    this.CLOSE_ABOUT_X = this.DIM_X * (56 / gridBase);;//this.DIM_X * (20 / gridBase);

    this.CLOSE_ABOUT_DY = this.DIM_Y * (4 / gridBase);; //this.DIM_Y * (7 / gridBase);
    this.CLOSE_ABOUT_Y = this.DIM_Y * (22 / gridBase);; //this.DIM_Y * (35 / gridBase);
    
    // Continue Button Location
    this.CONT_DX = this.dialogDX / 2; //this.DIM_X * (10 / gridBase);
    this.CONT_X = this.dialogX + (this.dialogDX - this.CONT_DX) / 2 ;//this.DIM_X * (20 / gridBase);

    this.CONT_DY = this.dialogDY / 4; //this.DIM_Y * (7 / gridBase);
    this.CONT_Y = this.dialogY + this.dialogDY - 70; //this.DIM_Y * (35 / gridBase);

    
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

  overInstructions(mouseX, mouseY) {
    return (mouseX >= this.INST_X &&
            mouseX <= this.INST_X + this.INST_DX &&
            mouseY >= this.INST_Y &&
            mouseY <= this.INST_Y + this.INST_DY
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

  contButtonClicked(mouseX, mouseY) {
    return this.mouseEventInArea(mouseX,
      mouseY,
      this.CONT_X,
      this.CONT_Y,
      this.CONT_DX,
      this.CONT_DY)
  }

  aboutButtonClicked(mouseX, mouseY) {
    return this.mouseEventInArea(mouseX,
      mouseY,
      this.ABOUT_X,
      this.ABOUT_Y,
      this.ABOUT_DX,
      this.ABOUT_DY)
  }

  closeAboutButtonClicked(mouseX, mouseY) {
    return this.mouseEventInArea(mouseX,
      mouseY,
      this.CLOSE_ABOUT_X,
      this.CLOSE_ABOUT_Y,
      this.CLOSE_ABOUT_DX,
      this.CLOSE_ABOUT_DY)
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