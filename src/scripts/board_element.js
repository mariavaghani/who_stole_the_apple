class BoardElement {
  constructor(name, pos) {
    this.name = name;
    this.icon = "#BE879C"
    this.pos = pos;
  }

  placeTo(pos) {
    
    this.pos = pos;
    this.x = this.pos[0] * this.cellWidth + this.origX;
    this.y = this.pos[1] * this.cellWidth + this.origY;
  }

  draw(ctxA) {
    ctxA.fillStyle = this.icon;
    ctxA.fillRect(this.x,
      this.y,
      this.cellWidth,
      this.cellWidth);

    ctxA.fillStyle = "#C0CBA8";
    ctxA.font = "15px Arial";
    ctxA.fillText(this.name, this.x, this.y + 15);

  }

  connectToBoard(origX, origY, cellWidth) {
    this.origX = origX;
    this.origY = origY;
    this.cellWidth = cellWidth;
  }
}

export default BoardElement;