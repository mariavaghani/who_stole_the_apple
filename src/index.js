import Game from "./scripts/game";
import GameView from "./scripts/game_view";
import GameSizes from "./scripts/game_sizes";
import BoardSizes from "./scripts/board_sizes"


window.addEventListener('DOMContentLoaded', () => {
  let canvasStatic = document.getElementById('game-canvas-static');
  let canvasActive = document.getElementById('game-canvas-active');
  let displayElement = document.getElementById('dynamic-height');
  let gameHeight = Math.min(document.documentElement.clientHeight-70, 600);
  let gameWidth = Math.min(document.documentElement.clientWidth-70, 1200);

  displayElement.style.height = `${gameHeight}px`;
  displayElement.style.width = `${gameWidth}px`;


  canvasStatic.height = gameHeight;
  canvasStatic.width = gameWidth;

  canvasStatic.style.height = `${gameHeight}`;
  canvasStatic.style.width = `${gameWidth}px`;

  canvasActive.height = Math.min(document.documentElement.clientHeight-70, 600);
  canvasActive.width = Math.min(document.documentElement.clientWidth-70, 1200);

  canvasActive.style.height = `${gameHeight}`;
  canvasActive.style.width = `${gameWidth}`;

  window.addEventListener('resize', (e) => {
    gameHeight = Math.min(document.documentElement.clientHeight-70, 600);
    gameWidth = Math.min(document.documentElement.clientWidth-70, 1200);

    displayElement.style.height = `${gameHeight}px`;
    displayElement.style.width = `${gameWidth}px`;
    canvasStatic.height = gameHeight;
    canvasStatic.width = gameWidth;

    canvasStatic.style.height = `${gameHeight}px`;
    canvasStatic.style.width = `${gameWidth}px`;

    canvasActive.height = gameHeight;
    canvasActive.width = gameWidth;

    canvasActive.style.height = `${gameHeight}px`;
    canvasActive.style.width = `${gameWidth}px`;
  });
  const sizeG = new GameSizes(canvasStatic);
  const sizeB = new BoardSizes(canvasStatic);
  

  let level = 1;
  const game = new Game(level, sizeG, sizeB); 

  const gameView = new GameView(game, canvasStatic, canvasActive); 
  

  gameView.start(canvasStatic)


  // console.log("All Loaded, thank you for asking");
})

// TODO: add back highlight to tools on hover
// TODO: fix appearance of level on the title container
// TODO: style errors modal
// TODO: make the canvas to appear in the vertical center and the footer at the bottom
// TODO: add icons to characters
// TODO: add dynamic resize on window resize    