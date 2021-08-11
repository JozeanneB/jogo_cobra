const BOX = 32;

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

let cobra = [];
cobra[0] = { x: 8 * BOX, y: 8 * BOX };
let direcao = "right";

function obtemNovaComida() {
  return { x: obtemPosicaoAleatoria(), y: obtemPosicaoAleatoria() };
}

function obtemPosicaoAleatoria() {
  return Math.floor(Math.random() * 15 + 1) * BOX;
}

let food = obtemNovaComida();

function criaBackGround() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * BOX, 16 * BOX);
}

function criaCobra() {
  for (counter = 0; counter < cobra.length; counter++) {
    context.fillStyle = "green";
    context.fillRect(cobra[counter].x, cobra[counter].y, BOX, BOX);
  }
}

function criaComida() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, BOX, BOX);
}

document.addEventListener("keydown", atualizaDirecaoCobra);

function atualizaDirecaoCobra(event) {
  if (event.keyCode == 37 && direcao != "right") direcao = "left";
  if (event.keyCode == 38 && direcao != "down") direcao = "up";
  if (event.keyCode == 39 && direcao != "left") direcao = "right";
  if (event.keyCode == 40 && direcao != "up") direcao = "down";
}

function cobraEnconstaNaBorda() {
  return cobra[0].x > 15 || cobra[0].x < 0 || cobra[0].y > 15 || cobra[0].y < 0;
}

function afastaCobraDaBorda() {
  if (cobra[0].x > 15 * BOX && direcao == "right") cobra[0].x = 0;
  if (cobra[0].x < 0 && direcao == "left") cobra[0].x = 16 * BOX;

  if (cobra[0].y > 15 * BOX && direcao == "down") cobra[0].y = 0;
  if (cobra[0].y < 0 && direcao == "up") cobra[0].y = 16 * BOX;
}

function finalizaJogoSeCabecaDaCobraEncostaNoCorpo() {
  for (counter = 1; counter < cobra.length; counter++) {
    if (cobra[0].x == cobra[counter].x && cobra[0].y == cobra[counter].y) {
      clearInterval(jogo);
      alert("Fim de Jogo. Atualize a página para jogar novamente.");
    }
  }
}

function definePosicaoCobra() {
  let posicaoX = cobra[0].x;
  let posicaoY = cobra[0].y;

  if (direcao == "right") posicaoX += BOX;
  if (direcao == "left") posicaoX -= BOX;
  if (direcao == "up") posicaoY -= BOX;
  if (direcao == "down") posicaoY += BOX;

  return { x: posicaoX, y: posicaoY };
}

function moveComida() {
  food = obtemNovaComida();
}

function cobraComeuComida(newPosition) {
  return newPosition.x == food.x && newPosition.y == food.y;
}

function moveCobraEComida() {
  let novaPosicao = definePosicaoCobra();

  if (cobraComeuComida(novaPosicao)) moveComida();
  else cobra.pop();

  cobra.unshift(novaPosicao);
}

function iniciaJogo() {
  if (cobraEnconstaNaBorda()) afastaCobraDaBorda();

  finalizaJogoSeCabecaDaCobraEncostaNoCorpo();

  criaBackGround();
  criaCobra();
  criaComida();

  moveCobraEComida();
}

let jogo = setInterval(iniciaJogo, 100);
