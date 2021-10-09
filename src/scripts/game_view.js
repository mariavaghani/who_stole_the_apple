

class GameView {
  constructor (game, ctxS, ctxA) {
    this.game = game;
    this.ctxS = ctxS;
    this.ctxA = ctxA;
  }

  start () {
    this.game.drawGameSetup(this.ctxS);
    this.game.populateToolBox(this.ctxA);
    let that = this;
    setInterval(function () {
      that.ctxA.clearRect(0, 0, that.game.DIM_X, that.game.DIM_Y);
      that.game.tools.forEach(tool => {
        tool.draw(that.ctxA, tool.x, tool.y);
      });
      
    }, 20);
  }
}

export default GameView;