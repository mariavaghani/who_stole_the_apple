import {COLOR_PALETTE, GAME_ELE} from "./styling";
// import img from "../assets"
class GamePainter {
  constructor (ctxS, size, board, level) {

    this.size = size;
    // this.ctxS = ctxS;
    this.printText = this.printText.bind(this.size);

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
    board.drawStatic(ctxS, this.roundRect);

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

  drawAboutModal(ctxA) {
    
    ctxA.save();
    ctxA.fillStyle = COLOR_PALETTE.aboutBGColor;
    this.roundRect(ctxA, this.size.aboutX, this.size.aboutY,
      this.size.aboutDX, this.size.aboutDY,
      GAME_ELE.aboutDialog);
    const lh = 42;
    const lhs = 18;
    ctxA.font = `${lh}px Permanent Marker`;
    ctxA.textAlign = "center";
    ctxA.fillStyle = COLOR_PALETTE.containerColor;
    ctxA.fillText(
      "Who Stole the Apple",
      this.size.aboutX + this.size.aboutDX / 2,
      this.size.aboutY + this.size.aboutDY / 2
    );
    const aboutTxt = "the game where you could steal/nsome apples and practice your/nalgorithmic thinking along the way"
    const lines = aboutTxt.split("/n");
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      ctxA.font = `${lhs}px Permanent Marker`;
      ctxA.fillText(
        line,
        this.size.aboutX + this.size.aboutDX / 2,
        this.size.aboutY + this.size.aboutDY / 2 + lh + i * lhs
        );
        
    }
      
    // ctxA.fillRect(this.size.CLOSE_ABOUT_X, this.size.CLOSE_ABOUT_Y,
    //   this.size.CLOSE_ABOUT_DX, this.size.CLOSE_ABOUT_DY
    // );
    ctxA.font=`${this.size.CLOSE_ABOUT_DY}px FontAwesome`;
    ctxA.fillStyle = COLOR_PALETTE.backgroundColor;
      
      ctxA.fillText(
            "\uf057",
            this.size.CLOSE_ABOUT_X + this.size.CLOSE_ABOUT_DX / 2,
            this.size.CLOSE_ABOUT_Y + this.size.CLOSE_ABOUT_DY
      );
    ctxA.restore();

  }

  drawInstructionsContainer (ctxA) {

    ctxA.save();

    let drawing = new Image();
    drawing.src = "./src/assets/instructions-overlay.png"; // can also be a remote URL e.g. http://
    ctxA.drawImage(drawing, 0, this.size.origY, this.size.DIM_X, this.size.DIM_Y);
   
    ctxA.restore();
  }

  drawNameContainer(ctxS, level) {
    ctxS.save();
    this.roundRect(ctxS, this.size.TITLE_X, this.size.TITLE_Y,
      this.size.TITLE_DX, this.size.TITLE_DY,
      GAME_ELE.name);
    ctxS.restore();
    ctxS.save();
      let gameLogo = new Image();
      gameLogo.src = "./src/assets/fox_logo.png";
      gameLogo.onload = () => {
        ctxS.drawImage(
          gameLogo,
          this.size.TITLE_X + 0.25*this.size.TITLE_DX,
          this.size.TITLE_Y + 0.04 * this.size.TITLE_DY,
          this.size.TITLE_DX * 0.5,
          this.size.TITLE_DX * 0.5
          );
      }
      
      // ctxS.drawImage(gameLogo, this.size.TITLE_X, this.size.TITLE_Y, 200, 200);
      const that = this.size;
    const titleOffset = Math.max(this.size.TITLE_DX * 0.55, this.size.TITLE_DY * 0.25)
    this.printText(ctxS, 
      "Who Stole/nThe Apple",
      this.size.TITLE_DY * 0.1,
      titleOffset
    );
    this.printText(ctxS, 
      `Level: ${level}`,
      this.size.TITLE_DY * 0.06,
      this.size.TITLE_Y + this.size.TITLE_DY * 0.3
    );


    ctxS.restore();
  }

  printText(ctxS, titleTxt, lh, offset = 0) {
    let lines = titleTxt.split("/n");
    ctxS.font = `${lh}px Permanent Marker`;
    ctxS.textAlign = "center";

   for (let i = 1; i <= lines.length; i++) {
     const line = lines[i - 1];
     ctxS.fillText(line,
       this.TITLE_X + 0.5 * this.TITLE_DX,
       this.TITLE_Y + i * lh + offset);

   }
  }

  drawToolBoxContainer(ctxS) {
    this.roundRect(ctxS, this.size.TOOL_X, this.size.TOOL_Y,
      this.size.TOOL_DX, this.size.TOOL_DY,
      GAME_ELE.workArea);

  }

  roundRect (ctx, x, y, xd, yd, options) {
    let rad;
    if (options.rad) {
      rad = options.rad;
    } else {
      rad = 0;
    }
    
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(rad, 0);
    ctx.lineTo(xd-rad, 0);
    ctx.quadraticCurveTo(xd, 0, xd, rad);
    ctx.lineTo(xd, yd-rad);
    ctx.quadraticCurveTo(xd, yd, xd-rad, yd);
    ctx.lineTo(rad, yd);
    ctx.quadraticCurveTo(0, yd, 0, yd-rad);
    ctx.lineTo(0, rad);
    ctx.quadraticCurveTo(0, 0, rad, 0);
    ctx.fillStyle = options.fillColor;
    if (options.shadow) {
      ctx.shadowOffsetX = options.shadow.offsetX;
      ctx.shadowOffsetY = options.shadow.offsetY;
      ctx.shadowColor = options.shadow.color;
      ctx.shadowBlur = options.shadow.blur;

    }
    ctx.fill();
    ctx.restore();
    ctx.save();
    if (options.outline) {
      ctx.strokeStyle = options.outline.color;
      ctx.lineWidth = options.outline.thickness;
      ctx.stroke();

    }
    ctx.closePath();
    ctx.restore();
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
    this.roundRect(ctxS,
      this.size.WORK_X, this.size.WORK_Y,
      this.size.WORK_DX, this.size.WORK_DY, GAME_ELE.workArea)

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