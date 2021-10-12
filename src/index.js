import Game from "./scripts/game";
import GameView from "./scripts/game_view";
import GameSizes from "./scripts/game_sizes";
import BoardSizes from "./scripts/board_sizes"


window.addEventListener('DOMContentLoaded', () => {
  let canvasStatic = document.getElementById('game-canvas-static');
  let canvasActive = document.getElementById('game-canvas-active');

  
  const sizeG = new GameSizes(canvasStatic);
  const sizeB = new BoardSizes(canvasStatic);
  

  let level = 2;
  const game = new Game(level, sizeG, sizeB); 

  const gameView = new GameView(game, canvasStatic, canvasActive); 
  

  gameView.start()


  console.log("All Loaded, thank you for asking");
})

