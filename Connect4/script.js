window.onload = function () {
  document.querySelector(".main-game").style.display = "none";
  document.getElementById("start-game").addEventListener("click", setGame);
};

// Declare variables
const playerOne = "1";
const playerTwo = "2";
let currPlayer = playerOne;

let gameOver = false;
let board;
let currCol;

const rows = 6; // y-axis
const cols = 7; // x-axis

const restartButton = document.getElementById("restart");
const playerMessage = document.querySelector(".player-container");
const timerContainer = document.querySelector(".timer-container");

function setTimer() {
  let counter = 10;

  const interval = setInterval(function () {
    playerMessage.innerText = `Player ${currPlayer} is making a move...`;
    timerContainer.innerText = `${counter}s remaining`;
    counter--;

    if (counter == 0) {
      switchPlayer();
      clearInterval(interval);
      setTimer();
    }

    if (counter > 0) {
      document.addEventListener("click", () => {
        clearInterval(interval);
      });
    }

    if (gameOver == true) {
      clearInterval(interval);
      playerMessage.innerText = "";
      timerContainer.innerText = "";
    }
  }, 1000);
}

function switchPlayer() {
  if (currPlayer == playerOne) {
    currPlayer = playerTwo;
  } else {
    currPlayer = playerOne;
  }
}

// To create the game board and tiles
function setGame() {
  document.querySelector(".homescreen").style.display = "none";
  document.querySelector(".main-game").style.display = "";

  board = [];
  currCol = [5, 5, 5, 5, 5, 5, 5];

  for (let y = 0; y < rows; y++) {
    let row = []; // Create row
    for (let x = 0; x < cols; x++) {
      row.push(" ");

      // Create <div id="row-col" class="tile"> for 42 tiles
      let tile = document.createElement("div");
      tile.id = y.toString() + "-" + x.toString();
      tile.classList.add("tile");

      tile.addEventListener("click", setColumn);
      tile.addEventListener("click", setTimer);

      document.getElementById("game-board").append(tile);

      tile.onmouseenter = function () {
        return chooseColumn(x);
      };
    }
    board.push(row);
  }
}

// Drop disc into column
function setColumn() {
  if (gameOver) {
    return;
  }

  // Get coords of tile clicked
  let coords = this.id.split("-");
  let y = parseInt(coords[0]);
  let x = parseInt(coords[1]);

  y = currCol[x];
  if (y < 0) {
    return;
  }

  board[y][x] = currPlayer;
  let tile = document.getElementById(y.toString() + "-" + x.toString());

  let disc = document.createElement("div");
  disc.classList.add("disc");
  disc.dataset.placed = true;
  disc.dataset.player = currPlayer;
  tile.appendChild(disc);

  // Setting disc colour for respective players
  if (currPlayer == playerOne) {
    disc.classList.add("red");
    currPlayer = playerTwo;
  } else {
    disc.classList.add("yellow");
    currPlayer = playerOne;
  }

  y -= 1; // Update row height of placed disc
  currCol[x] = y; // Update currCol array

  updateHover();

  // Animate dropping disc
  let unplacedDisc = document.querySelector("[data-placed='false']");
  let unplacedY = unplacedDisc.getBoundingClientRect().y;
  let placedY = disc.getBoundingClientRect().y;
  let yDiff = unplacedY - placedY;

  removeHoverDisc();
  let animation = disc.animate(
    [
      { transform: `translateY(${yDiff}px)`, offset: 0 },
      { transform: `translateY(0px)`, offset: 0.6 },
      { transform: `translateY(${yDiff / 20}px)`, offset: 0.8 },
      { transform: `translateY(0px)`, offset: 0.95 },
    ],
    {
      duration: 400,
      easing: "linear",
      iterations: 1,
    }
  );

  animation.addEventListener("finish", checkWinner);
}

function checkWinner() {
  // Check for horizontal wins
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols - 3; x++) {
      if (board[y][x] != " ") {
        if (
          board[y][x] == board[y][x + 1] &&
          board[y][x + 1] == board[y][x + 2] &&
          board[y][x + 2] == board[y][x + 3]
        ) {
          setWinner(y, x);
        }
      }
    }
  }

  // Check for vertical wins
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows - 3; y++) {
      if (board[y][x] != " ") {
        if (
          board[y][x] == board[y + 1][x] &&
          board[y + 1][x] == board[y + 2][x] &&
          board[y + 2][x] == board[y + 3][x]
        ) {
          setWinner(y, x);
        }
      }
    }
  }

  // Check for diagonal bottom left to top right wins
  for (let y = 3; y < rows; y++) {
    for (let x = 0; x < cols - 3; x++) {
      if (board[y][x] != " ") {
        if (
          board[y][x] == board[y - 1][x + 1] &&
          board[y - 1][x + 1] == board[y - 2][x + 2] &&
          board[y - 2][x + 2] == board[y - 3][x + 3]
        ) {
          setWinner(y, x);
        }
      }
    }
  }

  // Check for diagonal top left to bottom right wins
  for (let y = 0; y < rows - 3; y++) {
    for (let x = 0; x < cols - 3; x++) {
      if (board[y][x] != " ") {
        if (
          board[y][x] == board[y + 1][x + 1] &&
          board[y + 1][x + 1] == board[y + 2][x + 2] &&
          board[y + 2][x + 2] == board[y + 3][x + 3]
        ) {
          setWinner(y, x);
        }
      }
    }
  }
}

// Game over messages
function setWinner(y, x) {
  const alertContainer = document.querySelector(".alert-container");
  const alertMessage = document.getElementById("message");

  if (board[y][x] == playerOne) {
    alertContainer.style.display = "block";
    alertMessage.innerText = "Player 1 Wins!! 🎉";
  } else {
    alertContainer.style.display = "block";
    alertMessage.innerText = "Player 2 Wins!! 🎉";
  }
  gameOver = true;
}

// Remove disc when moved away from column
function removeHoverDisc() {
  let unplacedDisc = document.querySelector("[data-placed='false']");
  if (unplacedDisc) {
    unplacedDisc.parentElement.removeChild(unplacedDisc);
  }
}

function updateHover() {
  removeHoverDisc();

  // Add disc when column is not full
  if (currCol[hoverColumn] > -1) {
    let tile = document.getElementById("game-board").children[hoverColumn];
    let disc = document.createElement("div");
    disc.classList.add("disc");
    disc.dataset.placed = false;
    disc.dataset.player = currPlayer;
    tile.appendChild(disc);
  }
}

// Disc to hover over grid
function chooseColumn(col) {
  hoverColumn = col;
  updateHover();
}

// Reset the game board
function resetGame() {
  location.reload();
}

restartButton.addEventListener("click", resetGame);
