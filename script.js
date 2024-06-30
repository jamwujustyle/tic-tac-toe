"use strict";

const cells = document.querySelectorAll(".cell");
const winner = document.getElementById("winner");
let currentPlayer = "X";
let gameActive = true;
let mode = "player";
const gameBoard = ["", "", "", "", "", "", "", "", ""];
const again = document.getElementById("again");
const modeButton = document.getElementById("mode");

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = function () {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      return true;
    }
  }
  return false;
};

const checkDraw = () => {
  return gameBoard.every((cell) => cell !== "");
};

const handlePlayerMove = function (index) {
  if (gameBoard[index] === "" && gameActive && mode === "player") {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
      winner.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (checkDraw()) {
      winner.textContent = `It's a draw`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
};

const handlePlayerMove1 = function (index) {
  if (gameBoard[index] === "" && gameActive && mode === "pc") {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWin()) {
      winner.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (checkDraw()) {
      winner.textContent = `It's a draw`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (currentPlayer === "O") pcMove();
    }
  }
};

const pcMove = function () {
  let emptyCells = [];
  gameBoard.forEach((cell, index) => {
    if (cell === "") {
      emptyCells.push(index);
    }
  });
  if (emptyCells.length > 0 && gameActive) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const move = emptyCells[randomIndex];
    gameBoard[move] = "O";
    cells[move].textContent = "O";
  }
  if (checkWin()) {
    winner.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (checkDraw()) {
    winner.textContent = "It's a draw";
    gameActive = false;
  } else {
    currentPlayer = "X";
  }
};

modeButton.addEventListener("click", () => {
  resetGame();
  if (mode === "player") {
    mode = "pc";
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handlePlayerMove1(index));
    });
  } else {
    mode = "player";
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handlePlayerMove(index));
    });
  }
});

const resetGame = () => {
  currentPlayer = "X";
  gameActive = true;
  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i] = "";
    cells[i].textContent = "";
  }
  winner.textContent = "";
};

again.addEventListener("click", resetGame);

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handlePlayerMove(index));
  winner.textContent = mode;
});
