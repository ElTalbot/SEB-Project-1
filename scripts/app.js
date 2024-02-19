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
let dingoCurrentPosition = 53;
let logCurrentPosition = 35;
let truckCurrentPosition = [17, 19, 21];

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
  logMove();
  truckMove();
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

// the truck needs to move from cell[17] to cell[9] and this needs to be a continuous movement

function addTruck(position) {
  cells[position].classList.add("truck");
}
function removeTruck() {
  const truck = document.querySelector(".truck");
  if (!truck) {
    return true;
  }
  truck.classList.remove("truck");
  return false;
}
function truckMove() {
  let truckTargetPosition = 17;
  let truckNewLocation = truckTargetPosition;
  let truckMoving = false;
  timer = setInterval(() => {
    removeTruck();
    if (truckMoving) {
      truckNewLocation++;
      if (truckNewLocation >= truckTargetPosition) {
        truckMoving = false;
      }
    } else {
      truckNewLocation--;
      if (truckNewLocation < 9) {
        truckNewLocation = truckTargetPosition;
      }
    }

    addTruck(truckNewLocation);
  }, gameSpeed);
}

// the log needs to move from cell[35] to cell[27] and this needs to be a continuous movement

function addLog(position) {
  cells[position].classList.add("log");
}
function removeLog() {
  const log = document.querySelector(".log");
  if (!log) {
    return true;
  }
  log.classList.remove("log");
  return false;
}
function logMove() {
  let logTargetPosition = 35;
  let logNewLocation = logTargetPosition;
  let logMoving = false;
  timer = setInterval(() => {
    removeLog();
    if (logMoving) {
      logNewLocationewLocation++;
      if (logNewLocationewLocation >= logTargetPosition) {
        logMoving = false;
      }
    } else {
      logNewLocation--;
      if (logNewLocation < 27) {
        logNewLocation = logTargetPosition;
      }
    }

    addLog(logNewLocation);
  }, gameSpeed);
}

// the dingo needs to move from cell[45] to cell[53] and this needs to be a continuous movement
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
function dingoMove() {
  let targetPosition = 53;
  let newLocation = targetPosition;
  let moving = false;
  timer = setInterval(() => {
    removeDingo();
    if (moving) {
      newLocation++;
      if (newLocation >= targetPosition) {
        moving = false;
      }
    } else {
      newLocation--;
      if (newLocation < 45) {
        newLocation = targetPosition;
      }
    }
    addDingo(newLocation);
  }, gameSpeed);
}

start.addEventListener("click", startGame);
