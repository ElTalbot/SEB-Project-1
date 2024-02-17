console.log("Hello world!");

// Variables defining the grid and welcome page
const startButton = document.getElementById("start");
const gridGame = document.querySelector(".grid");
const welcomePage = document.querySelector(".welcome-page");

const width = 9;
const height = 7;
const cellCount = width * height;
const cells = [];

const kangarooCurrentPosition = 6;
let joeyCurrentPosition = 62;
let dingoCurrentPosition = 53;
let logCurrentPosition = 32;
let truckCurrentPosition = 14;

let isPlaying = true;
let gameSpeed = 1000;

// What happens when the 'start' button is clicked
function startGame(event) {
  welcomePage.classList.add("hidden");
  gridGame.classList.remove("hidden");
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    gridGame.appendChild(cell);
    cells.push(cell);
  }
  addKangaroo(kangarooCurrentPosition);
  addJoey(joeyCurrentPosition);
  addDingo(dingoCurrentPosition);
  addLog(logCurrentPosition);
  addTruck(truckCurrentPosition);

  dingoMove();
}

// adds the kangaroo - remains in one place
function addKangaroo(position) {
  cells[position].classList.add("kangaroo");
}

// adds the joey
function addJoey(position) {
  cells[position].classList.add("joey");
}

// removes the joey
function removeJoey(position) {
  cells[position].classList.remove("joey");
}

// moves the joey
function handleKeyDown(event) {
  removeJoey(joeyCurrentPosition);
  // left is 37
  if (event.keyCode === 37 && joeyCurrentPosition % width !== 0) {
    joeyCurrentPosition--;
    // up is 38
  } else if (event.keyCode === 38 && joeyCurrentPosition >= width) {
    joeyCurrentPosition -= width;
    // right is 39
  } else if (
    event.keyCode === 39 &&
    joeyCurrentPosition % width !== width - 1
  ) {
    joeyCurrentPosition++;
    // down is 40
  } else if (event.keyCode === 40 && joeyCurrentPosition < cellCount - width) {
    joeyCurrentPosition += width;
  }

  addJoey(joeyCurrentPosition);

  console.log(`position ${joeyCurrentPosition}`);
}
document.addEventListener("keydown", handleKeyDown);

// adds the dingo
function addDingo(position) {
  cells[position].classList.add("dingo");
}

function removeDingo() {
  const dingo = document.querySelector(".dingo");
  if (!dingo) {
    return true;
  }
  dingo.classList.remove("dingo");
  return false;
}

// the dingo needs to move from cell[53] to cell[61] and this needs to be a continuous movement
//
function dingoMove() {
  let targetPosition = 61;
  let newLocation = dingoCurrentPosition;
  let moving = true;
  timer = setInterval(() => {
    removeDingo();
    if (moving) {
      newLocation++;
      if (newLocation < targetPosition) {
        newLocation = dingoCurrentPosition;
        moving = false;
      }
    } else {
      newLocation--;
      if (newLocation > dingoCurrentPosition) {
        newLocation = targetPosition;
        moving = true;
      }
    }

    addDingo(newLocation);
  }, gameSpeed);
}
// Need to identify the cells that will contain the dingo
// If the cell contains the dingo it needs be removed after a short amount of time
// the dingo then needs to be added to the cell one index to the left of the one it was just in
// this needs to continue until the dingo moves all the way across the row
// when it reaches the last cell in the row it needs to disappear and start back at the first cell in the row
// adds the log
function addLog(position) {
  cells[position].classList.add("log");
}

// adds the truck
function addTruck(position) {
  cells[position].classList.add("truck");
}
document.addEventListener("click", startGame);