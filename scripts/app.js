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
let dingoCurrentPosition = 50;
let logCurrentPosition = 32;
let truckCurrentPosition = 14;

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
}

// adds the kangaroo - remains in one place
function addKangaroo(position) {
  cells[position].classList.add("kangaroo");
}

// adds the joey and moves
function addJoey(position) {
  cells[position].classList.add("joey");
}

function addDingo(position) {
  cells[position].classList.add("dingo");
}

function addLog(position) {
  cells[position].classList.add("log");
}

function addTruck(position) {
  cells[position].classList.add("truck");
}

// adds the dingo

document.addEventListener("click", startGame);
