import { COLOR_PALETTE } from "./styling";

class BoardElement {
  constructor(name, pos, icon) {
    this.name = name;
    this.icon = icon;
    this.pos = pos;
  }

  placeTo(pos) {
    
    this.pos = pos;
    this.x = this.pos[0] * this.cellWidth + this.origX;
    this.y = this.pos[1] * this.cellWidth + this.origY;
  }

  draw(ctxA) {
    ctxA.save();
    ctxA.drawImage(this.icon, this.x, this.y, this.cellWidth, this.cellWidth);
    const fontSize = Math.max(11, 0.2 * this.cellWidth)

    ctxA.fillStyle = COLOR_PALETTE.boardOutlineColor;
    ctxA.font = `${fontSize}px Coming Soon`;
    ctxA.fillText(this.name, this.x, this.y + 15);
    ctxA.restore();
  }

  connectToBoard(origX, origY, cellWidth) {
    this.origX = origX;
    this.origY = origY;
    this.cellWidth = cellWidth;
  }
}

export default BoardElement;