class BoardSizes {
  constructor(canvasS) {
    this.DIM_X = canvasS.width;
    this.DIM_Y = canvasS.height;


    const gridBase = 80;

    // Board location
    this.BOARD_X = this.DIM_X * (42 / gridBase);
    this.BOARD_DX = this.DIM_X * (36 / gridBase);

    this.BOARD_Y = this.DIM_Y * (8 / gridBase);
    this.BOARD_DY = this.DIM_Y * (66 / gridBase);

    // Grid
    console.log(`this.BOARD_X: `, this.BOARD_X);
    console.log(`this.BOARD_DX: `, this.BOARD_DX);
    console.log(`this.BOARD_Y: `, this.BOARD_Y);
    console.log(`this.BOARD_DY: `, this.BOARD_DY);
    if (this.BOARD_DX <= this.BOARD_DY) {
      this.borderX = this.BOARD_DX / 20;
      this.boardWidth = this.BOARD_DX - 2 * this.borderX;
      this.cols = 6;
      this.cellWidth = this.boardWidth / this.cols;
      this.borderY = (this.BOARD_DY - this.cols * this.cellWidth) / 2;
  
      // this.origX = this.BOARD_X + this.borderX; 
      // this.origY = this.BOARD_Y + this.borderY;
    } else {
      this.borderY = this.BOARD_DY / 20;
      this.boardWidth = this.BOARD_DY - 2 * this.borderY;
      this.cols = 6;
      this.cellWidth = this.boardWidth / this.cols;
      this.borderX = (this.BOARD_DX - this.cols * this.cellWidth) / 2;
  
    }
    this.origX = this.BOARD_X + this.borderX; 
    this.origY = this.BOARD_Y + this.borderY;
  }
}

export default BoardSizes;