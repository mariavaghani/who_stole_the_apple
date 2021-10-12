// import COLOR_PALETTE from './styling';


class Tool {
  constructor(name, method, icon) {
    this.name = name;
    this.method = method;
    this.icon = icon;
    this.isDragging = false;
  }

  size(sideX, sideY) {
    this.sideX = sideX;
    this.sideY = sideY;
  }

  draw(ctxA, x, y) {

    this.x = x;
    this.y = y;

    ctxA.fillStyle = this.icon;
    ctxA.fillRect(this.x, this.y, this.sideX, this.sideY);
    ctxA.font = "10px Arial";
    ctxA.fillText(this.name, this.x, this.y);
  }

  drawWhileDragging(ctxA, x, y) {
    this.tempX = x;
    this.tempY = y;

    ctxA.fillStyle = this.icon;
    ctxA.fillRect(this.tempX, this.tempY, this.sideX, this.sideY);
    ctxA.font = "10px Arial";
    ctxA.fillText(this.name, this.tempX, this.tempY);
  }

  placeTo(pos, origX, origY) {

    this.pos = pos;
    this.x = this.pos[0] * this.sideX + origX;
    this.y = this.pos[1] * this.sideY + origY;
  }

  execute(board) {
    return this.method(board);
  }

}

export default Tool;


