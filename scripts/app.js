console.log("Hello world!");

// Variables defining the grid and welcome page
const startButton = document.getElementById("start");
const gridGame = document.querySelector(".grid");
const welcomePage = document.querySelector(".welcome-page");

const width = 9;
const height = 7;
const cellCount = width * height;
const cells = [];
const billabongArray = [27, 28, 29, 30, 31, 32, 33, 34, 35];

const kangarooCurrentPosition = 6;
let joeyCurrentPosition = 62;
let dingoCurrentPositions = [51, 48, 45];
let logCurrentPositions = [33, 30, 27];
let truckCurrentPositions = [15, 12, 9];

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
  addDingo(dingoCurrentPositions);
  addLog(logCurrentPositions);
  addTruck(truckCurrentPositions);
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

// a function that initiates the collision
function collisionImpact() {
  removeJoey(joeyCurrentPosition);
  joeyCurrentPosition = 62;
  addJoey(joeyCurrentPosition);
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
  if (cells[joeyCurrentPosition].classList.contains("dingo")) {
    collisionImpact();
  }
  if (cells[joeyCurrentPosition].classList.contains("truck")) {
    collisionImpact();
  }

  if (
    !cells[joeyCurrentPosition].classList.contains("log") &&
    billabongArray.includes(joeyCurrentPosition)
  ) {
    collisionImpact();
  }

  addJoey(joeyCurrentPosition);

  // console.log(`position ${joeyCurrentPosition}`);
}
document.addEventListener("keydown", handleKeyDown);

// TRUCK CONTROLS --------------------------
function addTruck(truckPosition) {
  for (let i = 0; i < truckPosition.length; i++) {
    cells[truckPosition[i]].classList.add("truck");
  }
}
function removeTruck(truckPosition) {
  for (let i = 0; i < truckPosition.length; i++) {
    cells[truckPosition[i]].classList.remove("truck");
  }
}

function truckMove(interval) {
  timer = setInterval(() => {
    removeTruck(truckCurrentPositions);
    if (truckCurrentPositions.includes(17)) {
      truckCurrentPositions = [15, 12, 9];
    } else {
      console.log(truckCurrentPositions);
      truckCurrentPositions = truckCurrentPositions.map((element) => {
        return (element += 1);
      });
    }
    addTruck(truckCurrentPositions);
  }, interval);
}
truckMove(2000);

// LOG CONTROLS -------------------------------
function addLog(logPosition) {
  for (let i = 0; i < logPosition.length; i++) {
    cells[logPosition[i]].classList.add("log");
  }
}
function removeLog(logPosition) {
  for (let i = 0; i < logPosition.length; i++) {
    cells[logPosition[i]].classList.remove("log");
  }
}

function logMove(interval) {
  timer = setInterval(() => {
    removeLog(logCurrentPositions);
    if (logCurrentPositions.includes(35)) {
      logCurrentPositions = [33, 30, 27];
    } else {
      console.log(logCurrentPositions);
      logCurrentPositions = logCurrentPositions.map((element) => {
        return (element += 1);
      });
    }
    addLog(logCurrentPositions);
  }, interval);
}
logMove(2000);

// DINGO CONTROLS -----------------------
function addDingo(dingoPosition) {
  for (let i = 0; i < dingoPosition.length; i++) {
    cells[dingoPosition[i]].classList.add("dingo");
  }
}
function removeDingo(dingoPosition) {
  for (let i = 0; i < dingoPosition.length; i++) {
    cells[dingoPosition[i]].classList.remove("dingo");
  }
}

function dingoMove(interval) {
  timer = setInterval(() => {
    removeDingo(dingoCurrentPositions);
    if (dingoCurrentPositions.includes(53)) {
      dingoCurrentPositions = [51, 48, 45];
    } else {
      console.log(dingoCurrentPositions);
      dingoCurrentPositions = dingoCurrentPositions.map((element) => {
        return (element += 1);
      });
    }
    addDingo(dingoCurrentPositions);
  }, interval);
}
dingoMove(2000);

start.addEventListener("click", startGame);
