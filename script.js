let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [{ x: 8 * box, y: 8 * box }];
let counter;
let direction = "right";

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

function iniciarJogo() {
  criarBackGround();
  criarCobrinha();

  let positionX = snake[0].x;
  let positionY = snake[0].y;

  if (direction === "right") positionX += box;
  if (direction === "left") positionX -= box;
  if (direction === "up") positionY -= box;
  if (direction === "down") positionY += box;

  snake.pop();

  let newHead = { x: positionX, y: positionY };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
