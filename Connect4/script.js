// Declare variables
const playerOne = "1";
const playerTwo = "2";
let currPlayer = playerOne;

let gameOver = false;
// let board;
// let currCol;

const rows = 6; // y-axis
const cols = 7; // x-axis

// window.onload = function () {
setGame();
// };

// creating the board and tiles
function setGame() {
  board = [];
  currCol = [5, 5, 5, 5, 5, 5, 5];

  for (let y = 0; y < rows; y++) {
    let row = []; //create row
    for (let x = 0; x < cols; x++) {
      row.push(" ");

      // to create <div id="row-col" class="tile"> for 42 tile
      let tile = document.createElement("div");
      tile.id = y.toString() + "-" + x.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setColumn);
      document.getElementById("board").append(tile);

      tile.onmouseenter = function () {
        return chooseColumn(x);
      };
    }
    board.push(row);
  }
}

// drop disc into column / set disc
function setColumn() {
  if (gameOver) {
    return;
  }

  // get coords of that tile clicked
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

  if (currPlayer == playerOne) {
    console.log(`Player ${currPlayer}`);
    disc.classList.add("red");
    currPlayer = playerTwo;
  } else {
    console.log(`Player ${currPlayer}`);
    disc.classList.add("yellow");
    currPlayer = playerOne;
  }

  y -= 1; //updating row height for col
  currCol[x] = y; //updat currCol array
  // console.log(y);

  // upate hovering piece
  updateHover();

  // animate dropping pieces
  // let unplacedDisc = document.querySelector("[data-placed='false']");
  // let unplacedY = unplacedDisc.getBoundingClientRect().y
  // let placedY =
}

function updateHover() {
  // remove disc when moved away from column
  let unplacedDisc = document.querySelector("[data-placed='false']");
  if (unplacedDisc) {
    unplacedDisc.parentElement.removeChild(unplacedDisc);
  }

  // add disc when column is not full
  if (currCol[hoverColumn] > -1) {
    let tile = document.getElementById("board").children[hoverColumn];
    let disc = document.createElement("div");
    disc.classList.add("disc");
    disc.dataset.placed = false;
    disc.dataset.player = currPlayer;
    tile.appendChild(disc);
  }
}

// disc to hover over grid
function chooseColumn(col) {
  hoverColumn = col;
  updateHover();
}
