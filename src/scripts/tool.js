import COLOR_PALETTE from './styling';


console.log(`COLOR_PALETTE ⬇⬇⬇ `);
console.log(COLOR_PALETTE);



class Tool {
  constructor(name, method, icon) {
    this.name = name;
    this.method = method;
    this.icon = icon;
    this.isDragging = false;
    this.side = 30;
    
  }
  
  draw(ctxA, x, y) {
    this.x = x;
    this.y = y;
    ctxA.fillStyle = this.icon;
    ctxA.fillRect(this.x, this.y, this.side, this.side);
  }


}

export default Tool;


