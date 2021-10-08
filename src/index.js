import Game from "./scripts/game";
import GameView from "./scripts/game_view";

window.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('game-canvas');
  let ctx = canvas.getContext('2d');

  let level = 1;
  const game = new Game(canvas, level); // holds game assets

  const gameView = new GameView(game, ctx) // renders

  gameView.start()


  console.log("All Loaded, thank you for asking");
})