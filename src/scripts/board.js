import COLOR_PALETTE from "./styling";
import LEVELS from "./level_const";
import Character from "./character";

class Board {
  constructor(size, level) {
    this.size = size;
    
    this.char = LEVELS[level].character;
    this.populateBoard(level);
    
    
  }
  
  drawStatic(ctxS) {
    ctxS.fillStyle = COLOR_PALETTE.boardColor;
    ctxS.fillRect(this.size.BOARD_X, this.size.BOARD_Y,
                  this.size.BOARD_DX, this.size.BOARD_DY);
      
    this.drawGridOnBoard(ctxS)
  }
    
  drawActiveElements(ctxA) {
    
    this.char.draw(ctxA);

  }

  populateBoard(level) {
    this.char.connectToBoard(this.size.origX,
                            this.size.origY,
                            this.size.cellWidth)
    
    this.char.moveTo(LEVELS[level].character.pos);

  }

  drawGridOnBoard(ctxS) {
    // here we need to create a different gid from
    // the grid that governs the entire play area
    // here we want the grid cells to be square
    // also we need to allow classes on the board to have
    // pos [x,y] instance variable tracking where
    // they are on the grid
 
    ctxS.save();
    ctxS.translate(this.size.origX, this.size.origY);

    for (let i = 0; i <= this.size.cols; i++) {
      // X dir
      ctxS.beginPath();
      ctxS.moveTo(i * (this.size.cellWidth), 0);
      ctxS.lineTo(i * (this.size.cellWidth), this.size.boardWidth);
      ctxS.lineWidth = "1.5";
      ctxS.strokeStyle = COLOR_PALETTE.containerColor;
      ctxS.stroke();

      // Y dir
      ctxS.beginPath();
      ctxS.moveTo(0, i * (this.size.cellWidth));
      ctxS.lineTo(this.size.boardWidth, i * (this.size.cellWidth));
      ctxS.lineWidth = "1.5";
      ctxS.strokeStyle = COLOR_PALETTE.containerColor;
      ctxS.stroke();
    }
    ctxS.restore();
  }
}

export default Board;