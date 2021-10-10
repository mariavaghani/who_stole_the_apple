import Game from "./scripts/game";
import GameView from "./scripts/game_view";
import GameSizes from "./scripts/game_sizes";


window.addEventListener('DOMContentLoaded', () => {
  let canvasStatic = document.getElementById('game-canvas-static');
  let canvasActive = document.getElementById('game-canvas-active');

  console.log(`window.devicePixelRatio ⬇⬇⬇ `);
  console.log(window.devicePixelRatio);
  
  const size = new GameSizes(canvasStatic);
  
  
  let level = 1;
  const game = new Game(level, size); 

  const gameView = new GameView(game, canvasStatic, canvasActive); 
  

  gameView.start()


  console.log("All Loaded, thank you for asking");
})

