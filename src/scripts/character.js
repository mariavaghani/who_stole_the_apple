import BoardElement from "./board_element";

class Character extends BoardElement{
  constructor(name, pos) {
    super(name, pos);
    this.orig = pos;
    this.bag = [];
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

  addToBag(board) {

    let colNum = this.bag.length;
    let newCollect;

    board.collectables.forEach(collectable => {
      if (
        this.pos[0] === collectable.pos[0] &&
        this.pos[1] === collectable.pos[1]
        ) {
        this.bag.push(collectable);
        newCollect = collectable;
      } 
    });
    
    if (this.bag.length !== colNum) {

      const idx = board.collectables.indexOf(newCollect);
      if (idx > -1) {
        board.collectables.splice(idx, 1);
      }
      return true;
    }
    board.status = "ERROR";
    board.msg = "There is nothing to collect!";
    return false;
  }
}

export default Character;