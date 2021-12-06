import {COLOR_PALETTE, GAME_ELE, BTN_STYLES} from "./styling";
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

  printMsg(ctxA, msg, hoverState, gameStatus) {
    
    ctxA.save();
    ctxA.fillStyle = COLOR_PALETTE.msgColor;
    // ctxA.fillRect(this.size.dialogX, this.size.dialogY,
    //   this.size.dialogDX, this.size.dialogDY);
    const dialogStyle = gameStatus !== "VICTORY" ? GAME_ELE.errorsDialog : GAME_ELE.successDialog
    this.roundRect(ctxA, this.size.dialogX, this.size.dialogY,
      this.size.dialogDX, this.size.dialogDY,
      dialogStyle);
    const fontSize = Math.max(11, 0.08 * this.size.dialogDY)
    
    ctxA.font = `${fontSize}px Coming Soon`;
    ctxA.textAlign = "center";
    ctxA.fillStyle = COLOR_PALETTE.containerColor;
    ctxA.fillText(msg,
      this.size.dialogX + this.size.dialogDX / 2,
      this.size.dialogY + this.size.dialogDY / 2);

    // ctxA.fillRect(this.size.CONT_X, this.size.CONT_Y,
    //   this.size.CONT_DX, this.size.CONT_DY);
    const btnStyle = gameStatus !== "VICTORY" ? BTN_STYLES.errorsContinueBtn : BTN_STYLES.successContinueBtn
    this.drawButton(ctxA,
      this.size.CONT_X, this.size.CONT_Y,
      this.size.CONT_DX, this.size.CONT_DY,
      btnStyle, hoverState.msgContinue
    );
    ctxA.restore();

  }

  drawAboutModal(ctxA, hoveringOverCloseBtn) {
    
    ctxA.save();
    ctxA.fillStyle = COLOR_PALETTE.aboutBGColor;
    this.roundRect(ctxA, this.size.aboutX, this.size.aboutY,
      this.size.aboutDX, this.size.aboutDY,
      GAME_ELE.aboutDialog);
    const lh = Math.max(14, 0.12 * this.size.aboutDY);
    const lhs = Math.max(11, 0.07 * this.size.aboutDY);
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
      ctxA.font = `${lhs}px Coming Soon`;
      ctxA.fillText(
        line,
        this.size.aboutX + this.size.aboutDX / 2,
        this.size.aboutY + this.size.aboutDY / 2 + lh + i * lhs
        );
        
    }
      
    ctxA.font=`${this.size.CLOSE_ABOUT_DY}px FontAwesome`;
    
    hoveringOverCloseBtn ? ctxA.fillStyle = BTN_STYLES.closeAboutBtn.fillColor : ctxA.fillStyle = BTN_STYLES.closeAboutBtn.hover.fillColor;
      
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
    ctxA.drawImage(drawing, 0, 0, this.size.DIM_X, this.size.DIM_Y);
   
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
      // const that = this.size;
      const bigFontSize = Math.max(14, this.size.TITLE_DY * 0.1);
      const smFontSize = Math.max(11, this.size.TITLE_DY * 0.06)
    const titleOffset = Math.max(this.size.TITLE_DX * 0.55, this.size.TITLE_DY * 0.25)
    this.printText(ctxS, 
      "Who Stole/nThe Apple",
      bigFontSize,
      titleOffset
    );
    this.printText(ctxS, 
      `Level: ${level}`,
      smFontSize,
      this.size.TITLE_Y + this.size.TITLE_DY * 0.35
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
    ctxS.save();
    this.roundRect(ctxS, this.size.TOOL_X, this.size.TOOL_Y,
      this.size.TOOL_DX, this.size.TOOL_DY,
      GAME_ELE.workArea);
    ctxS.restore();
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

  drawButton (ctxA, x, y, width, height, style, hovered) {
    ctxA.save();
    const btnFaceStyle = hovered ? style.hover : style
    this.roundRect(ctxA, x+0.008*x, y+0.008*y,
                          width, height,
                          style.accent);
    this.roundRect(ctxA, x, y,
                          width, height,
                          btnFaceStyle);
    const btnFontSize = Math.max(11, style.fontSize)
    ctxA.font = `${btnFontSize}px ${style.font}`;
    ctxA.fillStyle = style.textColor;
    ctxA.textAlign = "center";
    ctxA.fillText(style.txt,
      x + width / 2,
      y + (height + btnFontSize / 2) / 2);
    ctxA.restore();
  }

  drawAllButtons(ctxA, hoverState) {
    // Execute button
    this.drawButton(ctxA,
      this.size.EXEC_X, this.size.EXEC_Y,
      this.size.EXEC_DX, this.size.EXEC_DY,
      BTN_STYLES.execBtn, hoverState.execute
      );

    // Reset Button
    this.drawButton(ctxA,
      this.size.RESET_X, this.size.RESET_Y,
      this.size.RESET_DX, this.size.RESET_DY,
      BTN_STYLES.resetBtn, hoverState.reset
    );

    // Instructions Button
    this.drawButton(ctxA,
      this.size.INST_X, this.size.INST_Y,
      this.size.INST_DX, this.size.INST_DY,
      BTN_STYLES.instBtn, hoverState.instructions
      );

    // About Button
    this.drawButton(ctxA,
      this.size.ABOUT_X, this.size.ABOUT_Y,
      this.size.ABOUT_DX, this.size.ABOUT_DY,
      BTN_STYLES.aboutBtn, hoverState.about
      );
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