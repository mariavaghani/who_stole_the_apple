import {COLOR_PALETTE, GAME_ELE} from "./styling";
import LEVELS from "./level_const";

class Board {
  constructor(size, level) {
    this.size = size;
    this.msg = "";
    this.status = "OK";
    
    this.char = LEVELS[level].character;
    this.escape = LEVELS[level].escape;
    this.collectables = LEVELS[level].collectables.slice();
    
    this.char.reset();
    this.populateBoard(level);
    
    
  }
  
  drawStatic(ctxS, painterMethod) {
    painterMethod(ctxS, this.size.BOARD_X, this.size.BOARD_Y,
      this.size.BOARD_DX, this.size.BOARD_DY,
      GAME_ELE.board)
    // ctxS.fillStyle = COLOR_PALETTE.boardColor;
    // ctxS.fillRect(this.size.BOARD_X, this.size.BOARD_Y,
    //               this.size.BOARD_DX, this.size.BOARD_DY);
      
    this.drawGridOnBoard(ctxS)
  }
    
  drawActiveElements(ctxA) {
    
    this.allBoardElements().forEach(element => element.draw(ctxA))
    // this.char.draw(ctxA);
    // this.escape.draw(ctxA);
    // this.collectables.forEach(element => element.draw(ctxA));

    // at this point we are drawing all elements in this method on the
    // active canvas. Later, when we have more elements, will separate them
    // into static and active contexts

  }

  allBoardElements () {
    return [].concat(this.char, this.escape, this.collectables);
  }

  populateBoard(level) {
    // Character

    this.allBoardElements().forEach(element => {

      
      element.connectToBoard(this.size.origX,
                              this.size.origY,
                              this.size.cellWidth)
      
      element.placeTo(element.pos);
    });
   
    

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

  validMove(newPos) {

    // check if position is on the board
    if (
      
      newPos[0] < 0 ||
      newPos[0] >= this.size.cols ||
      newPos[1] < 0 ||
      newPos[1] >= this.size.cols
      ) {
      this.msg = `${this.char.name} is leaving the board!!`;
      this.status = "ERROR";

      return false;
    }

    // when all checks passed
    return true;
  }
}

export default Board;