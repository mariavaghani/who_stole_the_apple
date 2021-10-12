
class GameView {
  constructor(game, canvasStatic, canvasActive) {
    this.game = game;
    this.canvasA = canvasActive;

    this.ctxA = this.createHiResAwareCtx(canvasActive);
    this.ctxS = this.createHiResAwareCtx(canvasStatic);
    
    // // Bind event handlers to the game
    this.mouseDownHandler = this.mouseDownHandler.bind(this.game);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this.game);
    this.mouseUpHandler = this.mouseUpHandler.bind(this.game);

    // // Make buttons pressable
    this.mouseClickHandler = this.mouseClickHandler.bind(this);

    // Install events on the active canvas
    this.bindEvents(canvasActive)
  }

  createHiResAwareCtx(canvas) {
    const rect = canvas.getBoundingClientRect();
    let dpr = window.devicePixelRatio;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    let ctx = canvas.getContext('2d');

    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    return ctx;
  }

  bindEvents(canvasA) {

    // Bind event handlers to the game
    // this.mouseDownHandler = this.mouseDownHandler.bind(this.game);
    // this.mouseMoveHandler = this.mouseMoveHandler.bind(this.game);
    // this.mouseUpHandler = this.mouseUpHandler.bind(this.game);

    // Make buttons pressable
    // this.mouseClickHandler = this.mouseClickHandler.bind(this);

    canvasA.addEventListener("mousedown", this.mouseDownHandler);
    canvasA.addEventListener("mousemove", this.mouseMoveHandler);
    canvasA.addEventListener("mouseup", this.mouseUpHandler);
    canvasA.addEventListener("click", this.mouseClickHandler);
  }

  mouseClickHandler(e) {
    // Save current mouse position
    this.mouseX = e.x - this.game.size.origX;
    this.mouseY = e.y - this.game.size.origY;

    if (this.game.size.resetButtonClicked(this.mouseX, this.mouseY)) {
      console.log("Reset!!")
      this.game.resetGame(this.ctxS, this.ctxA);
    }

    if (this.game.size.execButtonClicked(this.mouseX, this.mouseY)) {
      console.log("Executing!!")
      
      this.game.inExecution = true;
    }

    if (this.game.size.contButtonClicked(this.mouseX, this.mouseY)
        && this.game.board.status !== "OK"
        ) {
      console.log("continue!!")
      this.game.stateMachine(this.ctxS, this.ctxA);
      
      // this.game.inDialog = false;
    }
  }

  mouseDownHandler(e) {
    // Save current mouse position
    this.mouseX = e.x - this.size.origX;
    this.mouseY = e.y - this.size.origY;

    // Search if there are any tool that are being dragged
    this.allTools().forEach(tool => {

      if (this.size.mouseOverTool(this.mouseX, this.mouseY, tool)) {
        tool.tempX = tool.x;
        tool.tempY = tool.y;
        tool.isDragging = true;
      }
    });
  }

  mouseMoveHandler(e) {

    this.allTools().forEach(tool => {
      if (tool.isDragging) {
        tool.tempX += e.movementX;
        tool.tempY += e.movementY;

      }
    });
  }

  mouseUpHandler(e) {

    const allGameTools = this.allTools();

    allGameTools.forEach(tool => {
      if (tool.isDragging) {
        // If the tool ended up in the toolbox
        if (this.size.toolInsideToolBox(tool)) {
          tool.x = tool.tempX;
          tool.y = tool.tempY;

          this.snapToGrid(tool.tempX, tool.tempY,
                          this.size.tOrigX,
                          this.size.tOrigY, tool);
          this.ensureToolInTools(tool);
          this.ensureToolOutOfWorkArea(tool);
        }

        // If the tool ended up in the work area
        if (this.size.toolInsideWorkArea(tool)) {
          tool.x = tool.tempX;
          tool.y = tool.tempY;
          this.snapToGrid(tool.tempX, tool.tempY,
                          this.size.wOrigX,
                          this.size.wOrigY, tool);
          this.ensureToolInWorkArea(tool);
          this.ensureWorkToolOutOfTools(tool);
        }
      }
      // Remove dragging flag from all tools
      tool.isDragging = false;
    });
    this.ensureWorkingOrder();

  }

  start () {
    
    this.game.resetGame(this.ctxS, this.ctxA);
    const runLevel = setInterval( () => {
      
      this.ctxA.clearRect(0, 0, this.game.size.DIM_X, this.game.size.DIM_Y);

      this.game.drawExecuteButton(this.ctxA);
      this.game.drawResetButton(this.ctxA);
      
      this.game.drawBoard(this.ctxA);
      this.game.drawTools(this.ctxA);
      
      // Draw tools
      if (this.game.board.status !== "OK") {
        this.game.printMsg(this.ctxA);
      }
        

      // Draw Execution Board
      this.game.executeWorkingTools(this.ctxS, this.ctxA);
 
    }, 20);
  }
}

export default GameView;