const sketch = () => {
  const container = document.querySelector(".container");
  const size = { height: 16, width: 16 }; //grid size variable
  let drawColor = "black"; //color of draw tool

  function makeGrid(rows, cols) {
    //populate the container with the grid
    emptyCells();
    container.style.setProperty("--grid-rows", rows); //custom css property to dynamically create rows adn columns
    container.style.setProperty("--grid-cols", cols);
    for (c = 0; c < rows * cols; c++) {
      let cell = document.createElement("div");
      cell.style.backgroundColor = "rgb(255,255,255)";
      container.appendChild(cell).className = "grid-item";
      console.log(cell.style.backgroundColor);
    }
  }

  function emptyCells() {
    //remove cell  elements from grid
    cells = document.querySelectorAll(".grid-item");
    cells.forEach((cell) => {
      cell.remove();
    });
  }

  function clear() {
    //reset grid color scheme(set to a button in future)
    cells = document.querySelectorAll(".grid-item");
    cells.forEach((cell) => {
      cell.style.backgroundColor = "rgb(0,0,0)";
    });
  }
  function recolor() {
    //eventHandler to adjust draw tool depending on option selected
    recolorButtn = document.querySelectorAll(".recolor");
    recolorButtn.forEach((buttn) => {
      buttn.addEventListener("click", (e) => {
        console.log(drawColor);
        if (buttn.innerText == "Eraser") {
          drawColor = "white";
        } else if (buttn.innerText == "Black") {
          drawColor = "black";
        } else if (buttn.innerText == "Rainbow") {
          drawColor = "rainbow";
        } else if (buttn.innerText == "Shade") {
          drawColor = "shade";
        }
      });
    });
  }
  function addEvent() {
    //listener function
    let cells = document.querySelectorAll(".grid-item");
    cells.forEach((cell) => {
      console.log("in addevent");
      cell.addEventListener("mouseover", (e) => onHover(cell), false);
    });
  }

  function onHover(cell) {
    //event handler function
    console.log("in onHover");
    if (drawColor == "black") cell.style.backgroundColor = "rgb(0,0,0)";
    else if (drawColor == "rainbow") cell.style.backgroundColor = randomColor();
    else if (drawColor == "white") {
      cell.style.backgroundColor = "rgb(255, 255, 255)";
      console.log(cell.style.backgroundColor);
    } else if (drawColor == "shade") {
      //get the current color of the cell and cinrease the shade by 10% each hover over
      let rgb = cell.style.backgroundColor;
      let rgbArr = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")")).split(",");
      cell.style.backgroundColor = `rgb(${rgbArr[0] - 25},${rgbArr[1] - 25},${
        rgbArr[2] - 25
      })`;
    }
  }

  function random(number) {
    //get random number to generate rgb color adjusted for brighter colors
    return Math.floor(Math.random() * (number - 90) + 90);
  }
  function randomColor() {
    //return a random color
    console.log(
      "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")"
    );
    return "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
  }

  let resizeButton = document.querySelectorAll(".resize"); // event handler for resizing the grid
  resizeButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.innerText == "large") {
        size.height = 64;
        size.width = 64;
        makeGrid(size.height, size.width);
        addEvent();
      } else if (button.innerText == "medium") {
        size.height = 32;
        size.width = 32;
        makeGrid(size.height, size.width);
        addEvent();
      } else if (button.innerText == "small") {
        size.height = 16;
        size.width = 16;
        makeGrid(size.height, size.width);
        addEvent();
      }
    });
  });

  makeGrid(size.height, size.width);
  recolor();
  addEvent();
};
const snake = () => {
  const grid = document.querySelector(".grid");
  console.log(grid);
  const gridCtx = grid.getContext("2d");
  console.log(gridCtx);

  const boardBorder = "black";
  const boardBackground = "white";
  const snakeCol = "lightblue";
  const snakeBorder = "darkblue";
  let foox;
  let fooy;
  const startBtn = document.querySelector(".start");
  let dx = 10;

  let dy = 0;
  let score = 0;

  let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
  ];

  startBtn.addEventListener("click", (e) => {
    main();
    genFood();
  });

  document.addEventListener("keydown", changeDirection);

  function main() {
    if (hasGameEnded()) return;
    changingDirection = false;
    setTimeout(function onTick() {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      main();
    }, 100);
  }

  function clearBoard() {
    gridCtx.fillStyle = boardBackground;
    gridCtx.strokestyle = boardBorder;
    gridCtx.fillRect(0, 0, grid.width, grid.height);
    gridCtx.strokeRect(0, 0, grid.width, grid.height);
  }

  function drawSnakePart(snakePart) {
    gridCtx.fillStyle = "lightblue";
    gridCtx.strokestyle = "darkblue";
    gridCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
    gridCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }

  function drawSnake() {
    snake.forEach(drawSnakePart);
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const hasEatenFood = snake[0].x === foox && snake[0].y === fooy;
    if (hasEatenFood) {
      score += 10;

      document.querySelector(".Score").innerHTML = score;

      genFood();
    } else {
      snake.pop();
    }
  }

  function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
  }

  function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > grid.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > grid.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
  }

  function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }

  function genFood() {
    foox = randomFood(0, grid.width - 10);
    fooy = randomFood(0, grid.height - 10);
    snake.forEach(function hasSnakeEatenFood(part) {
      const hasEaten = part.x == foox && part.y == fooy;
      if (hasEaten) genFood();
    });
  }

  function drawFood() {
    gridCtx.fillStyle = "lightgreen";
    gridCtx.strokestyle = "darkgreen";
    gridCtx.fillRect(foox, fooy, 10, 10);
    gridCtx.strokeRect(foox, fooy, 10, 10);
  }
};

const sketchHTML = `<div class="game-container">
        <div class="size-container">
          <button class="resize">small</button>
          <button class="resize" id="medium">medium</button>
          <button class="resize" id="large">large</button>
        </div>
        <button class="recolor">Black</button>
        <button class="recolor">Rainbow</button>
        <button class="recolor">Shade</button>
        <button class="recolor">Eraser</button>
        <div class="container"></div>
      </div>`;

const snakeHTML = ` <div class="game-container">
      <h1 class="title">Snake Game</h1>
      <button class="start">start</button>
      <div class="score-card"></div>
      <h3 class="Score">0</h3>
      <canvas class="grid" width="400" height="400"></canvas>
    </div>`;

const gamebuttons = document.querySelectorAll(".game-button");

sketch();

gamebuttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.id === "sketch") {
      document.querySelector(".game-container").remove();
      document.querySelector(".game").innerHTML = sketchHTML;
      sketch();
    } else if (btn.id === "snake") {
      document.querySelector(".game-container").remove();
      document.querySelector(".game").innerHTML = snakeHTML;
      snake();
    }
  });
});
