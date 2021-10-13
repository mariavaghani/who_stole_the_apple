import COLOR_PALETTE from "./styling";

class GamePainter {
  constructor (ctxS, size, board, level) {

    this.size = size;
    // this.ctxS = ctxS;

    // Creates non-level-specific elements on the screen
    // Clear the game area
    ctxS.clearRect(0, 0, this.size.DIM_X, this.size.DIM_Y);
    ctxS.save();

    // Draw the background
    ctxS.fillStyle = COLOR_PALETTE.backgroundColor;
    ctxS.fillRect(0, 0, this.size.DIM_X, this.size.DIM_Y);

    // Draw the Name of the game container
    this.drawNameContainer(ctxS, level);


    // Draw the toolbox container
    this.drawToolBoxContainer(ctxS);

    // Draw the Work Area container
    this.drawWorkArea(ctxS);

    // Draw the Board container
    board.drawStatic(ctxS);

    // Draw grid on top
    // this.drawGridOnGameArea(ctxS);

    // Draw Grid in tool box
    // this.drawToolGrid(ctxS, this.size.tOrigX, this.size.tOrigY);
  
    // Draw Grid in work area box
    // this.drawToolGrid(ctxS, this.size.wOrigX, this.size.wOrigY);

    ctxS.restore();

  }

  printMsg(ctxA, msg) {
    ctxA.save();
    ctxA.fillStyle = COLOR_PALETTE.msgColor;
    ctxA.fillRect(this.size.dialogX, this.size.dialogY,
      this.size.dialogDX, this.size.dialogDY);

    ctxA.font = "16px Arial";
    ctxA.textAlign = "center";
    ctxA.fillStyle = COLOR_PALETTE.containerColor;
    ctxA.fillText(msg,
      this.size.dialogX + this.size.dialogDX / 2,
      this.size.dialogY + this.size.dialogDY / 2);

    ctxA.fillRect(this.size.CONT_X, this.size.CONT_Y,
      this.size.CONT_DX, this.size.CONT_DY);

    ctxA.restore();

  }

  drawInstructionsContainer (ctxA) {

    ctxA.save();
    // ctxA.fillStyle = COLOR_PALETTE.msgColor;
    // ctxA.fillRect(this.size.instX, this.size.instY,
    //   this.size.instDX, this.size.instDY);

    // ctxA.font = "16px Arial";
    // ctxA.textAlign = "center";
    // ctxA.fillStyle = COLOR_PALETTE.containerColor;
    // ctxA.fillText("Hi",
    //   this.size.instX + this.size.instDX / 2,
    //   this.size.instY + this.size.instDY / 2);

    let drawing = new Image();
    drawing.src = "./src/assets/instructions-overlay.png"; // can also be a remote URL e.g. http://
    ctxA.drawImage(drawing, 0, this.size.origY, this.size.DIM_X, this.size.DIM_Y);
   

    ctxA.restore();
  }

  drawNameContainer(ctxS, level) {
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.size.TITLE_X, this.size.TITLE_Y,
      this.size.TITLE_DX, this.size.TITLE_DY);
    ctxS.fillStyle = COLOR_PALETTE.backgroundColor;

    const that = this.size;

    printText("Who Stole/nThe Apple", 30);
    printText("the game where/nyou could steal/nsome apples and/npractice your algorithmic/nthinking along the way", 14, 65);
    printText(`Level: ${level}`, 16, 145);


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

  drawToolBoxContainer(ctxS) {
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.size.TOOL_X, this.size.TOOL_Y, this.size.TOOL_DX, this.size.TOOL_DY);


  }

  drawToolGrid(ctxS, origX, origY) {
    ctxS.save();
    ctxS.translate(origX, origY);

    for (let i = 0; i <= this.size.cols; i++) {
      // X dir
      ctxS.beginPath();
      ctxS.moveTo(i * (this.size.cellWidth), 0);
      ctxS.lineTo(i * (this.size.cellWidth), this.size.height);
      ctxS.lineWidth = "1.5";
      ctxS.strokeStyle = COLOR_PALETTE.boardColor;
      ctxS.stroke();
    }

    for (let i = 0; i <= this.size.rows; i++) {

      // Y dir
      ctxS.beginPath();
      ctxS.moveTo(0, i * (this.size.cellHeight));
      ctxS.lineTo(this.size.width, i * (this.size.cellHeight));
      ctxS.lineWidth = "1.5";
      ctxS.strokeStyle = COLOR_PALETTE.boardColor;
      ctxS.stroke();
    }
    ctxS.restore();
  }

  drawWorkArea(ctxS) {
    ctxS.fillStyle = COLOR_PALETTE.containerColor;
    ctxS.fillRect(this.size.WORK_X, this.size.WORK_Y,
      this.size.WORK_DX, this.size.WORK_DY);
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




}

export default GamePainter;