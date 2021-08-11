let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = { x: 8 * box, y: 8 * box };
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function criarBackGround() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (counter = 0; counter < snake.length; counter++) {
    context.fillStyle = "green";
    context.fillRect(snake[counter].x, snake[counter].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;

  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for (counter = 1; counter < snake.length; counter++) {
    if (snake[0].x == snake[counter].x && snake[0].y == snake[counter].y) {
      clearInterval(jogo);
      alert("Game Over :(");
    }
  }

  criarBackGround();
  criarCobrinha();
  drawFood();

  let positionX = snake[0].x;
  let positionY = snake[0].y;

  if (direction == "right") positionX += box;
  if (direction == "left") positionX -= box;
  if (direction == "up") positionY -= box;
  if (direction == "down") positionY += box;

  if (positionX != food.x || positionY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = { x: positionX, y: positionY };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
