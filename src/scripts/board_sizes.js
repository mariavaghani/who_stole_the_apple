class BoardSizes {
  constructor(canvasS) {
    this.canvas = canvasS;
    this.sizeBoard();
    this.canvas.addEventListener('resize', () => {
      console.log(`document.documentElement.clientWidth: `, document.documentElement.clientWidth);
      // this.canvas.width = Math.min(document.documentElement.clientWidth-70, 1200);
      // this.canvas.width = Math.min(document.documentElement.clientWidth-70, 1200);
      this.sizeBoard();
    });

  }
  sizeBoard () {
    this.DIM_X = this.canvas.width;
    this.DIM_Y = this.canvas.height;


    const gridBase = 80;

    // Board location
    this.BOARD_X = this.DIM_X * (42 / gridBase);
    this.BOARD_DX = this.DIM_X * (36 / gridBase);

    this.BOARD_Y = this.DIM_Y * (8 / gridBase);
    this.BOARD_DY = this.DIM_Y * (66 / gridBase);

    // Grid
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