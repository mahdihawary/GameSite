const Snake = () => {
  console.log("insnake");
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

  main();
  genFood();
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
