import COLOR_PALETTE from './styling';

class Tool {
  constructor(name, method, icon) {
    this.name = name;
    this.method = method;
    this.icon = icon;
    this.isDragging = false;
    this.side = 40;
    
  }
  
  draw(ctxA, x, y) {
    this.x = x;
    this.y = y;
    ctxA.fillStyle = this.icon;
    ctxA.fillRect(this.x, this.y, this.side, this.side);
  }

  drawWhileDragging(ctxA, x, y) {
    this.tempX = x;
    this.tempY = y;
    ctxA.fillStyle = this.icon;
    ctxA.fillRect(this.tempX, this.tempY, this.side, this.side);
  }


}

export default Tool;


