

class GameView {
  constructor (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start () {
    this.game.drawGameSetup(this.ctx);
    this.game.populateToolBox(this.ctx);
  }
}

export default GameView;