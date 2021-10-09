

class GameView {
  constructor (game, ctxS, ctxA) {
    this.game = game;
    this.ctxS = ctxS;
    this.ctxA = ctxA;
  }

  start () {
    this.game.drawStaticGameSetup(this.ctxS);
    this.game.populateToolBox(this.ctxA);
    let that = this;
    setInterval(function () {
      that.ctxA.clearRect(0, 0, that.game.size.DIM_X, that.game.size.DIM_Y);
      that.game.tools.forEach(tool => {
        if (tool.isDragging) {
          tool.drawWhileDragging(that.ctxA, tool.tempX, tool.tempY);
        } else {
          tool.draw(that.ctxA, tool.x, tool.y);
        }
      });
      
    }, 20);
  }
}

export default GameView;