console.log("Hello world!");

// ------------------------VARIABLES DEFINING BUTTONS, GRID, WELCOME AND GAMEOVER PAGES ----------------------------------------
const startButton = document.getElementById("start");
const gridGame = document.querySelector(".grid");
const welcomePage = document.querySelector(".welcome-page");
const score = document.querySelector(".score-board");
const audio = document.querySelector(".audio");
const endGame = document.querySelector(".end-game");
const winGame = document.querySelector(".win-game");

// reset buttons
const tryAgain = document.getElementById("try-again");
const playAgain = document.getElementById("play-again");

const width = 9;
const height = 7;
const cellCount = width * height;
const cells = [];
const billabongArray = [27, 28, 29, 30, 31, 32, 33, 34, 35];
const trackArray = [45, 46, 47, 48, 49, 50, 51, 52, 53];
const roadArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// -------------------------- AUDIO CONTROLS ---------------------------------------------------------------

const playButton = document.getElementById("on");
const muteButton = document.getElementById("off");
const audioElement = document.querySelector("audio");

function muteAudio() {
  audioElement.muted = true;
  muteButton.classList.add("hidden");
  playButton.classList.remove("hidden");
  console.log(`audio`);
}

muteButton.addEventListener("click", muteAudio);

function playAudio() {
  audioElement.muted = false;
  muteButton.classList.remove("hidden");
  playButton.classList.add("hidden");
  console.log(`audio on`);
}

playButton.addEventListener("click", playAudio);
// -------------------------- VARIABLES DEFINING SCORES AND LIVES ------------------------------------------

let playerScore = 0;
const scoreDisplay = document.getElementById("total");
const scorePopUp = document.querySelector(".total-pop-up");
let lives = 8;
const livesDisplay = document.getElementById("lives");
const livesPopUp = document.querySelector(".lives-pop-up");
let textHighScore = document.getElementById("high-score");
const totalEndGame = document.getElementById("total-end-game");
const highScore = localStorage.getItem("high-score");

// --------------------------- VARIABLES DEFINING THE ELEMENT POSITIONS -------------------------------------

const kangarooCurrentPosition = 6;
let joeyCurrentPosition = 62;
let dingoCurrentPositions = [51, 48, 45];
let logCurrentPositions = [33, 30, 27];
let truckCurrentPositions = [15, 12, 9];

const foodScoreOne = 40;
const foodScoreTwo = 24;
const water = document.querySelector("water");
const track = document.querySelector("track");
const road = document.querySelector("road");

// --------------------------- OBSTACLE TIMERS -------------------------------------------------------------
dingoTimer = null;
logTimer = null;
truckTimer = null;

// ---------------------------- GRID CREATION --------------------------------------------------------------
function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    gridGame.appendChild(cell);
    cells.push(cell);
  }
}
createGrid();

// --------------------------------- START GAME BUTTON -------------------------------------------------------
function startGame() {
  welcomePage.classList.add("hidden");
  gridGame.classList.remove("hidden");
  score.classList.remove("hidden");
  audio.classList.remove("hidden");
  textHighScore.innerHTML = highScore;
  truckMove(2000);
  logMove(2000);
  dingoMove(2000);
}

// --------------------------------- ADDING AND REMOVING THE KANGAROO AND JOEY -----------------------------------------------------
// adds the kangaroo
function addKangaroo(position) {
  cells[position].classList.add("kangaroo");
}
addKangaroo(kangarooCurrentPosition);

// remove the kangaroo
function removeKangaroo(position) {
  cells[position].classList.remove("kangaroo");
}

// adds the joey
function addJoey(position) {
  cells[position].classList.add("joey");
}
addJoey(joeyCurrentPosition);

// removes the joey
function removeJoey(position) {
  cells[position].classList.remove("joey");
}

// adds the food
function addFoodOne(position) {
  cells[position].classList.add("food");
}
addFoodOne(foodScoreOne);

// removes the food
function removeFoodOne(position) {
  cells[position].classList.remove("food");
}

function addFoodTwo(position) {
  cells[position].classList.add("food");
}
addFoodTwo(foodScoreTwo);

// removes the food
function removeFoodTwo(position) {
  cells[position].classList.remove("food");
}

// -------------------------------- OBSTACLE COLLISION FUNCTION ------------------------------------------------------------------
function obstacleCollision() {
  if (
    cells[joeyCurrentPosition].classList.contains("truck") ||
    cells[joeyCurrentPosition].classList.contains("dingo") ||
    (!cells[joeyCurrentPosition].classList.contains("log") &&
      billabongArray.includes(joeyCurrentPosition))
  ) {
    removeJoey(joeyCurrentPosition);
    joeyCurrentPosition = 62;
    addJoey(joeyCurrentPosition);
    lives = lives - 1;
    livesDisplay.innerHTML = "❤️".repeat(lives);
    livesPopUp.innerHTML = "❤️".repeat(lives);
    totalEndGame.textContent = playerScore;
  }
  if (!lives) {
    endOfGame();
  }
  livesDisplay.innerHTML = lives ? "❤️".repeat(lives) : "🥹";

  if (cells[joeyCurrentPosition].classList.contains("kangaroo")) {
    winTheGame();
    joeyCurrentPosition = 62;
  }
}

// ------------------------------- ARROW KEY FUNCTION ---------------------------------------------------------------------------
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
    obstacleCollision();
  }
  if (cells[joeyCurrentPosition].classList.contains("truck")) {
    obstacleCollision();
  }

  if (
    !cells[joeyCurrentPosition].classList.contains("log") &&
    billabongArray.includes(joeyCurrentPosition)
  ) {
    obstacleCollision();
  }
  addJoey(joeyCurrentPosition);

  if (cells[joeyCurrentPosition].classList.contains("food")) {
    foodScoring();
  }
}

// ------------------------------- END GAME FUNCTION ----------------------------------------------------------------------------
function endOfGame() {
  endGame.classList.remove("hidden");
  gridGame.classList.add("hidden");
  clearInterval(logTimer);
  clearInterval(truckTimer);
  clearInterval(dingoTimer);
  removeDingo(dingoCurrentPositions);
  removeTruck(truckCurrentPositions);
  removeLog(logCurrentPositions);
  removeJoey(joeyCurrentPosition);
  removeKangaroo(kangarooCurrentPosition);
  removeFoodOne(foodScoreOne);
  removeFoodTwo(foodScoreTwo);
  console.log(`Your score is ${playerScore}`);
  foodScoring();
}

//  ------------------------------- WIN GAME FUNCTION ------------------------------------------------------------------------

function winTheGame() {
  winGame.classList.remove("hidden");
  gridGame.classList.add("hidden");
  clearInterval(logTimer);
  clearInterval(truckTimer);
  clearInterval(dingoTimer);
  removeDingo(dingoCurrentPositions);
  removeTruck(truckCurrentPositions);
  removeLog(logCurrentPositions);
  removeJoey(joeyCurrentPosition);
  removeKangaroo(kangarooCurrentPosition);
  totalScoring();
}

//  -------------------------------- RESET GAME FUNCTION --------------------------------------------------------------------
function reset() {
  playerScore = 0;
  scoreDisplay.textContent = playerScore;
  scorePopUp.textContent = playerScore;
  lives = 8;
  livesDisplay.innerHTML = "❤️".repeat(lives);
  livesPopUp.innerHTML = "❤️".repeat(lives);
  startGame();
  removeJoey(joeyCurrentPosition);
  joeyCurrentPosition = 62;
  addJoey(joeyCurrentPosition);
  addKangaroo(kangarooCurrentPosition);
  addFoodOne(foodScoreOne);
  addFoodTwo(foodScoreTwo);
  endGame.classList.add("hidden");
  winGame.classList.add("hidden");
}

// ------------------------------ SCORING ------------------------------------------------------

function totalScoring() {
  playerScore = playerScore + 400;
  scoreDisplay.textContent = playerScore;
  scorePopUp.textContent = playerScore;
  if (!highScore || playerScore > highScore) {
    localStorage.setItem("high-score", playerScore);
  }
  textHighScore.innerHTML = highScore;
  console.log(`high score is ${highScore}`);
}

function foodScoring() {
  playerScore = playerScore + 100;
  scoreDisplay.textContent = playerScore;
  scorePopUp.textContent = playerScore;
  if (cells[foodScoreOne].classList.contains("joey")) {
    removeFoodOne(foodScoreOne);
  } else if (cells[foodScoreTwo].classList.contains("joey")) {
    removeFoodTwo(foodScoreTwo);
  }
  textHighScore.innerHTML = highScore;
}

document.addEventListener("keydown", handleKeyDown);

// ---------------------------------- TRUCK CONTROLS - ADD, REMOVE, MOVE ----------------------------------------------------
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
  truckTimer = setInterval(() => {
    removeTruck(truckCurrentPositions);
    if (truckCurrentPositions.includes(9)) {
      truckCurrentPositions = [17, 15, 13, 11];
    } else {
      truckCurrentPositions = truckCurrentPositions.map((element) => {
        return (element -= 1);
      });
    }
    addTruck(truckCurrentPositions);
    obstacleCollision();
  }, interval);
}
function addRoad() {
  for (let i = width * 1; i < width * 2; i++) {
    cells[i].classList.add("road");
  }
}
addRoad(roadArray);

// ---------------------------------- LOG CONTROLS - ADD, REMOVE, MOVE -------------------------------------------------------
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
  logTimer = setInterval(() => {
    removeLog(logCurrentPositions);
    if (logCurrentPositions.includes(35)) {
      logCurrentPositions = [33, 30, 27];
    } else {
      logCurrentPositions = logCurrentPositions.map((element) => {
        return (element += 1);
      });
    }
    addLog(logCurrentPositions);
  }, interval);
}

function addWater() {
  for (let i = width * 3; i < width * 4; i++) {
    cells[i].classList.add("water");
  }
}
addWater(billabongArray);

// ---------------------------------- DINGO CONTROLS - ADD, REMOVE, MOVE ---------------------------------------------------
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
  dingoTimer = setInterval(() => {
    removeDingo(dingoCurrentPositions);
    if (dingoCurrentPositions.includes(45)) {
      dingoCurrentPositions = [53, 51, 49, 47];
    } else {
      dingoCurrentPositions = dingoCurrentPositions.map((element) => {
        return (element -= 1);
      });
    }
    addDingo(dingoCurrentPositions);
    obstacleCollision();
  }, interval);
}

function addTrack() {
  for (let i = width * 5; i < width * 6; i++) {
    cells[i].classList.add("track");
  }
}
addTrack(trackArray);

startButton.addEventListener("click", startGame);
tryAgain.addEventListener("click", reset);
playAgain.addEventListener("click", startGame);
