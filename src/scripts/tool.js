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

  execute(board) {
    console.log("One more!");
    this.method(board);
  }

  isValid() {
    console.log("Checking if move is valid");
    return true;
  }


}

export default Tool;


