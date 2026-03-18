//initial data
let square = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};
let player = ""; //X ou O
let warning = ""; //variável para mostrar o aviso de quem ganhou ou se deu empate
let playing = false; //variável para controlar o jogo, se está acontecendo ou não
reset();
//events

document.querySelector(".reset").addEventListener("click", reset);
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", itemClick);
});

//functions
function itemClick(event) {
  let item = event.target.getAttribute("data-item"); //obtém o valor do atributo "data-item" do elemento clicado
  if (playing && square[item] === "") {
    square[item] = player; //atribui o símbolo do jogador à posição correspondente no tabuleiro
    renderSquare(); //atualiza a interface do jogo
    togglePlayer(); //alterna a vez do jogador
  }
}

function reset() {
  warning = ""; //limpa a variável de aviso

  let random = Math.floor(Math.random() * 2); //gera um número aleatório entre 0 e 1
  player = random === 0 ? "x" : "o"; //atribui "x" ou "o" ao jogador com base no número aleatório
  for (let i in square) {
    square[i] = ""; //limpa o tabuleiro, atribuindo uma string vazia a cada posição
  }
  playing = true; //ativa o jogo
  renderSquare(); //chama a função para atualizar a interface do jogo
  renderinfo(); //chama a função para atualizar as informações do jogo
}

function renderSquare() {
  for (let i in square) {
    let item = document.querySelector(`div[data-item=${i}]`); //seleciona o elemento HTML correspondente à posição do tabuleiro

    item.innerHTML = square[i]; //atualiza o conteúdo do elemento com o valor da posição do tabuleiro
    checkGame(); //chama a função para verificar se houve um vencedor ou empate
  }
}
function renderinfo() {
  document.querySelector(".vez").innerHTML = player; //atualiza a informação de qual jogador é a vez
  document.querySelector(".resultado").innerHTML = warning; //atualiza a informação do resultado do jogo
}
function togglePlayer() {
  player = player === "x" ? "o" : "x"; //alterna o jogador entre "x" e "o"
  renderinfo(); //atualiza as informações do jogo
}
function checkGame() {
  if (checkWinnerFor("x")) {
    warning = "O jogador 'X' venceu!";
    playing = false; //
  } else if (checkWinnerFor("o")) {
    warning = "O jogador 'O' venceu!";
    playing = false; //
  } else if (isFull()) {
    warning = "Empate!";
    playing = false; //
  }
}
function checkWinnerFor(player) {
  let pos = [
    "a1,a2,a3",
    "b1,b2,b3",
    "c1,c2,c3",
    "a1,b1,c1",
    "a2,b2,c2",
    "a3,b3,c3",
    "a1,b2,c3",
    "a3,b2,c1",
  ];
  for (let w in pos) {
    let pArray = pos[w].split(",");
    let hasWon = pArray.every((option) => square[option] === player);
    if (hasWon) {
      return true;
    }
  }
  return false;
}

function isFull() {
  for (let i in square) {
    if (square[i] === "") {
      return false; //se encontrar uma posição vazia, retorna false
    }
  }
  return true; //se todas as posições estiverem preenchidas, retorna true
}
