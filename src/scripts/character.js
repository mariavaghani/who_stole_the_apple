import BoardElement from "./board_element";

class Character extends BoardElement{
  constructor(name, pos) {
    super(name, pos);
    this.orig = pos;
  }

  reset () {
    this.pos = this.orig;
  }
  
  moveInDir(moveVect) {
    const newPos = [this.pos[0] + moveVect[0],
                    this.pos[1] + moveVect[1]];
    this.placeTo(newPos);
  }
}

export default Character;