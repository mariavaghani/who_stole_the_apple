import Game from "./scripts/game";
import GameView from "./scripts/game_view";
import GameSizes from "./scripts/game_sizes";
import BoardSizes from "./scripts/board_sizes"


window.addEventListener('DOMContentLoaded', () => {
  let canvasStatic = document.getElementById('game-canvas-static');
  let canvasActive = document.getElementById('game-canvas-active');
  let displayElement = document.getElementById('dynamic-height');

  displayElement.style.height = `${Math.min(document.documentElement.clientHeight-70, 700)}px`;


  canvasStatic.height = Math.min(document.documentElement.clientHeight-70, 700);
  canvasActive.height = Math.min(document.documentElement.clientHeight-70, 700);
  
  const sizeG = new GameSizes(canvasStatic);
  const sizeB = new BoardSizes(canvasStatic);
  

  let level = 1;
  const game = new Game(level, sizeG, sizeB); 

  const gameView = new GameView(game, canvasStatic, canvasActive); 
  

  gameView.start()


  // console.log("All Loaded, thank you for asking");
})

// TODO: remove the listeners on pressing the execute button. could add a state 
// and an if statement to listen to the button press