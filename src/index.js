import Game from "./scripts/game";
import GameView from "./scripts/game_view";

window.addEventListener('DOMContentLoaded', () => {
  let canvasStatic = document.getElementById('game-canvas-static');
  let ctxS = canvasStatic.getContext('2d');
  let canvasActive = document.getElementById('game-canvas-active');
  let ctxA = canvasActive.getContext('2d');
  
  

  let level = 1;
  const game = new Game(canvasStatic, canvasActive, level); 

  const gameView = new GameView(game, ctxS, ctxA) // renders
  

  gameView.start()


  console.log("All Loaded, thank you for asking");
})

