let players = ['x', 'o'];
let activePlayer = 0;
let board = [];
let win;
let sign = prompt("Введите размер поля, например 3");
let move = 0;
let allMove = sign * sign;

// для объявления ничьи
let myModalEl = document.getElementById('modal');
function draw() {
  let header = myModalEl.getElementsByTagName('h2')[0];
  header.textContent = 'НИЧЬЯ';
  myModalEl.classList.remove('hidden');
  move = 0;
}

// функция для прорисовки поля любого размера
function  signBoard() {
  let signBoard = [];
  for (let i = 0; i < sign; i += 1) {
    signBoard[i] = [""];
  };

  for (let i = 0; i < sign; i += 1) {
    for (let k = 0; k < sign; k += 1) {
      if (i < sign) {
      signBoard[k][i] = "";
      };
    };
  };
  return signBoard;
}

// начало игры
function startGame() {
  activePlayer = 0;
  win = false;
  board = signBoard();
  renderBoard(board);
}

// событие по клику
function click(row, col) {
  board[row][col] = players[activePlayer];
  renderBoard(board);
  winCondition();
  if (win) showWinner(activePlayer);
  changePlayer();
}

// автоматическая смена игрока
function changePlayer(){ 
  activePlayer = (activePlayer == 0) ? 1 : 0;
  move += 1;
  // счётчик ходов
  if (move == allMove) {draw();}
}

// условия победы
function winCondition(){
  let x = 0;
  let o = 0;
  let diagonal = sign;
  
  //функция проверки условия для победы
  function lineVictory(index) {
    if (sign == index + 1 && x != sign && o != sign) {x = 0; o = 0;};
    if (x == sign || o == sign) {win = true;};
  };
  
  // победа по горизонтали
  for (let i = 0; i < sign; i += 1) {
    for (let k = 0; k < sign; k += 1) {
      if (board[i][k] == 'x') {x += 1;} 
      if (board[i][k] == 'o') {o += 1;} 
      lineVictory(k);
    };
  } 

  // победа по вертикали 
  for (let i = 0; i < sign; i += 1) {
    for (let k = 0; k < sign; k += 1) {
      if (board[k][i] == 'x') {x += 1;};
      if (board[k][i] == 'o') {o += 1;};
      lineVictory(k);
    };
  } 

  // победа по диагонали с лева на право
  for (let i = 0; i < sign; i += 1) {
    if (board[i][i] == 'o') {o += 1;};
    if (board[i][i] == 'x') {x += 1;};
    lineVictory(i);
  };

  // победа по диагонали с права на лево
  for (let i = 0; i < sign; i += 1) {
    diagonal -= 1;
    if (board[i][diagonal] == 'o') {o += 1;};
    if (board[i][diagonal] == 'x') {x += 1;};
    lineVictory(i);
  };
}



// мой первый вариант для определения победы по горизонтали
//    if ((board[i].includes('x') == true) 
//        && (board[i].includes('o') == false) 
//        && (board[i].includes('') == false )) {
//        win = true;
//    };
//    if ((board[i].includes('o') == true) 
//        && (board[i].includes('x') == false) 
//        && (board[i].includes('') == false )) {
//        win = true;
//    };