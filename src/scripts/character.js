import BoardElement from "./board_element";

class Character extends BoardElement{
  constructor(name, pos) {
    super(name, pos);
    this.orig = pos;
  }

  reset () {
    this.pos = this.orig;
  }

  moveInDir(moveVect, board) {
    const newPos = [this.pos[0] + moveVect[0],
                    this.pos[1] + moveVect[1]];
                    
    if (board.validMove(newPos)) {
      this.placeTo(newPos);
      return true;
    } else {
      return false;
    }
    
  }
}

export default Character;