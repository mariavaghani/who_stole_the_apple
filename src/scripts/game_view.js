import { COLOR_PALETTE, STYLES } from "./styling";

class GameView {
  constructor(game, canvasStatic, canvasActive) {
    this.game = game;
    this.inExecution = false;
    
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
      // console.log("Reset!!")
      this.game.resetGame(this.ctxS, this.ctxA);
    }

    if (this.game.size.execButtonClicked(this.mouseX, this.mouseY) && !this.inExecution) {
      // console.log("Executing!!")
      
      this.inExecution = true;
      this.game.executeWorkingTools();
    }

    if (this.game.size.aboutButtonClicked(this.mouseX, this.mouseY)) {
      this.game.showAboutModal = true;
    }
    if (this.game.size.closeAboutButtonClicked(this.mouseX, this.mouseY) && this.game.showAboutModal) {
      this.game.showAboutModal = false;
    }

    if (this.game.size.contButtonClicked(this.mouseX, this.mouseY)
        && this.game.board.status !== "OK"
        ) {
      // console.log("continue!!")
      this.game.stateMachine(this.ctxS, this.ctxA);
      this.inExecution = false;
    }
  }

  mouseDownHandler(e) {
    // Save current mouse position
    this.mouseX = e.x - this.size.origX;
    this.mouseY = e.y - this.size.origY;

    // Search if there are any tool that are being dragged
    this.allTools().forEach(tool => {

      if (this.size.mouseOverTool(this.mouseX, this.mouseY, tool) && this.board.status === "OK") {
        tool.tempX = tool.x;
        tool.tempY = tool.y;
        tool.isDragging = true;
      }
    });
  }

  mouseMoveHandler(e) {
    let hoverOverButton = false;
    let hoverOverTool = false;
    this.mouseX = e.x - this.size.origX;
    this.mouseY = e.y - this.size.origY;

    this.allTools().forEach(tool => {
      if (tool.isDragging) {
        tool.tempX += e.movementX;
        tool.tempY += e.movementY;
        hoverOverTool = true
      } 
      if (this.size.mouseOverTool (this.mouseX, this.mouseY, tool) && !tool.isDragging && this.board.status === "OK") {
        tool.hovered = true;
        hoverOverTool = true;
      } else {
        tool.hovered = false;
      }
    });
    
    

    if (this.size.overInstructions(this.mouseX, this.mouseY) && !this.showAboutModal && this.board.status === "OK") {
      this.showInstructions = true;
      this.buttonHoverState.instructions = true
      hoverOverButton = true;
    } else {
      this.showInstructions = false;
      this.buttonHoverState.instructions = false
    }

    if (this.size.execButtonClicked(this.mouseX, this.mouseY) && !this.showAboutModal && this.board.status === "OK") {
      this.buttonHoverState.execute = true;
      hoverOverButton = true;

    } else {
      this.buttonHoverState.execute = false
    }
    
    if (this.size.resetButtonClicked(this.mouseX, this.mouseY) && !this.showAboutModal && this.board.status === "OK") {
      this.buttonHoverState.reset = true;
      hoverOverButton = true;

    } else {
      this.buttonHoverState.reset = false
    }
    if (this.size.aboutButtonClicked(this.mouseX, this.mouseY) && !this.showAboutModal && this.board.status === "OK") {
      this.buttonHoverState.about = true
      hoverOverButton = true;

    } else {
      this.buttonHoverState.about = false
    }

    if (this.size.closeAboutButtonClicked(this.mouseX, this.mouseY) && this.showAboutModal) {
      this.buttonHoverState.closeAbout = true;
      hoverOverButton = true;

    } else {
      this.buttonHoverState.closeAbout = false
    }

    if (this.size.contButtonClicked(this.mouseX, this.mouseY)  && this.board.status !== "OK") {
      this.buttonHoverState.msgContinue = true;
      hoverOverButton = true;

    } else {
      this.buttonHoverState.msgContinue = false
    }

    if (hoverOverButton || hoverOverTool) {
      if (hoverOverButton) document.body.style.cursor = "pointer"
      if (hoverOverTool) document.body.style.cursor = "grab"
    } else {
      document.body.style.cursor = "default"
    }
  }

  mouseUpHandler(e) {

    const allGameTools = this.allTools();

    allGameTools.forEach(tool => {
      if (tool.isDragging) {
        // If the tool ended up in the toolbox
        if (this.size.toolInsideToolBox(tool)) {
          this.placeToolIn(this.tools,
                          tool,
                          this.size.tOrigX,
                          this.size.tOrigY)
          
          this.ensureToolInTools(tool);
          this.ensureToolOutOfWorkArea(tool);
        }

        // If the tool ended up in the work area
        if (this.size.toolInsideWorkArea(tool)) {
          this.placeToolIn(this.inWorkArea,
                          tool,
                          this.size.wOrigX,
                          this.size.wOrigY)
          
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

    let gameAnimationStep = () => {

      this.ctxA.clearRect(0, 0, this.game.size.DIM_X, this.game.size.DIM_Y);

      this.game.painter.drawAllButtons(this.ctxA, this.game.buttonHoverState);

      this.game.drawBoard(this.ctxA);
      // Draw tools
      this.game.drawTools(this.ctxA);


      if (this.game.board.status !== "OK") {
        this.game.painter.printMsg(this.ctxA, this.game.board.msg, this.game.buttonHoverState, this.game.board.status);
      }
      
      if (this.game.showInstructions) {
        this.game.painter.drawInstructionsContainer(this.ctxA);
      }
      if (this.game.showAboutModal) {
        
        this.game.painter.drawAboutModal(this.ctxA, this.game.buttonHoverState.closeAbout);
      }

      requestAnimationFrame(gameAnimationStep);
    }
    this.animation = requestAnimationFrame(gameAnimationStep);

  }
}

export default GameView;