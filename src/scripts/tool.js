import COLOR_PALETTE from './styling';


console.log(`COLOR_PALETTE ⬇⬇⬇ `);
console.log(COLOR_PALETTE);



class Tool {
  constructor(name, method) {
    this.name = name;
    this.method = method;
    // this.icon = icon
  }

  draw(ctx) {
    console.log("draw");
    ctx.fillStyle = COLOR_PALETTE.toolColor;
    ctx.fillRect(0, 0, 30, 30);
  }


}

export default Tool;


