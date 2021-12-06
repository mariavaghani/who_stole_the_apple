import Game from "./scripts/game";
import GameView from "./scripts/game_view";
import GameSizes from "./scripts/game_sizes";
import BoardSizes from "./scripts/board_sizes"


window.addEventListener('DOMContentLoaded', () => {
  let canvasStatic = document.getElementById('game-canvas-static');
  let canvasActive = document.getElementById('game-canvas-active');
  let displayElement = document.getElementById('dynamic-height');

  displayElement.style.height = `${Math.min(document.documentElement.clientHeight-70, 600)}px`;
  displayElement.style.width = `${Math.min(document.documentElement.clientWidth-70, 1200)}px`;


  canvasStatic.height = Math.min(document.documentElement.clientHeight-70, 600);
  canvasActive.height = Math.min(document.documentElement.clientHeight-70, 600);
  canvasStatic.width = Math.min(document.documentElement.clientWidth-70, 1200);
  canvasActive.width = Math.min(document.documentElement.clientWidth-70, 1200);
  // window.addEventListener('resize', () => {
  //   console.log(`document.documentElement.clientWidth: `, document.documentElement.clientWidth);

  // });
  const sizeG = new GameSizes(canvasStatic);
  const sizeB = new BoardSizes(canvasStatic);
  

  let level = 1;
  const game = new Game(level, sizeG, sizeB); 

  const gameView = new GameView(game, canvasStatic, canvasActive); 
  

  gameView.start()


  // console.log("All Loaded, thank you for asking");
})



// TODO: BONUS add dynamic resize on window resize    