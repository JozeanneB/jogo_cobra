let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [{ x: 8 * box, y: 8 * box }];
let contador;

function criarBackGround() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (contador = 0; contador < snake.length; contador++) {
    context.fillStyle = "green";
    context.fillRect(snake[contador].x, snake[contador].y, box, box);
  }
}

criarBackGround();
criarCobrinha();
