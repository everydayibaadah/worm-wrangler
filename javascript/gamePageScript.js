let openHand = sessionStorage.getItem("openHand");
let closeHand = sessionStorage.getItem("closeHand");
cursor.style.backgroundImage = `url("${openHand}")`;
document.addEventListener("mousedown", function () {
cursor.style.backgroundImage = `url("${closeHand}")`;
cursor.style.transform = "rotate(-45deg)";
});

document.addEventListener("mouseup", function () {
cursor.style.backgroundImage = `url("${openHand}")`;
cursor.style.transform = "none";
});


 const homeButton = document.getElementById("homeButton");
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", function (eventObject) {
cursor.style.left = eventObject.pageX - 20 + "px";
cursor.style.top = eventObject.pageY - 20 + "px";
});


let sound = sessionStorage.getItem("sound");
let volumeString = sessionStorage.getItem("volume");
const startButton = document.getElementById("startButton");
const holes = document.querySelectorAll(".hole");
const missesDisplay = document.getElementById("misses");
let misses = 0;
const maxMisses = 8;
const scoreDisplay = document.getElementById("score");
const tray= document.querySelector(".tray");
const wormCountDisplay = document.getElementById("wormCount");
let score = 0;
let count = 0;
startButton.addEventListener("click", startGame);
const gameBoard= document.querySelector(".gameBoard");
gameBoard.addEventListener("click",function(eventObject){
});
gameBoard.addEventListener("click", function (eventObject) {
if (gameOn && eventObject.target.className === "gameBoard") {
missWorm();
}
});

homeButton.addEventListener("click", function () {
window.location.href = "index.html";
});

const timerElement = document.getElementById("timeLeft");
let timeLeft = 20;
const minCount = 6;
let timerId1;
let gameOn = false;
function popUpWorm() {
let wormDisplayTime = randomTime(500, 1000);
const hole = randomHole(holes);
const worm = hole.querySelector(".worm");
worm.style.display = "block";
worm.addEventListener("click", collectWorms);
setTimeout(() => {
worm.style.display = "none";
worm.removeEventListener("click", collectWorms);
if (gameOn && misses < maxMisses) {
popUpWorm();
}
}, wormDisplayTime);
}


function randomTime(minimum, maximum) {
return Math.floor(Math.random() * (maximum-minimum)) + minimum;
}

function randomHole(holes) {
const index = Math.floor(Math.random() * holes.length);
const hole = holes[index];
return hole;
}




let timerId;
function startGame() {
    score = 0;
misses = 0;
timeLeft = 20;
count = 0;
scoreDisplay.textContent = score;
missesDisplay.textContent = misses;
wormCountDisplay.textContent = count;
timerElement.textContent = "20";
resetTray();
gameOn = true;
startButton.disabled = true;
homeButton.disabled = true;
timerId1 = setInterval(updateTimer, 1000);
for(i=0; i<holes.length; i++){
holes[i].addEventListener("click", missWorm);
}
popUpWorm();
timerId = setTimeout(() => {
for(i=0; i<holes.length; i++){
holes[i].removeEventListener("click", missWorm);
}
gameOn = false;
startButton.disabled = false;
homeButton.disabled = false;
if (count >= minCount) {
alert("Congratulations, you won! Your score is " + score +".");
} else {
alert("You have slipped a bit! Your score is " + score +".");
}
}, 20000);
}
function missWorm() {
if (misses < maxMisses) {
misses++;
missesDisplay.textContent = misses;
if (misses >= maxMisses) {
startButton.disabled = false;
homeButton.disabled = false;
gameOn = false;
alert("Too many misses! You have slipped a bit! Your score is " +
score +".");
clearTimeout(timerId);
clearInterval(timerId1);
}
}
}








function missWorm() {
if (misses < maxMisses) {
misses++;
missesDisplay.textContent = misses;
if (misses >= maxMisses) {
alert("Too many misses! You have slipped a bit! Your score is " +
score +".");
clearTimeout(timerId);
clearInterval(timerId1);
}
}
}

function resetTray() {
while (tray.firstChild) {
tray.removeChild(tray.firstChild);
}
}


function updateTimer() {
timeLeft--;
timerElement.textContent = timeLeft;
if (timeLeft === 0) {
clearInterval(timerId1);
}
}

function collectWorms(eventObject) {
eventObject.stopPropagation();
const wormTarget = eventObject.target;
wormTarget.style.display = "none";
score += 5;
count++;
scoreDisplay.textContent = score;
wormCountDisplay.textContent = count;
const trayImg = document.createElement("img");
trayImg.src = "images/wormtray.png";
trayImg.alt = "Worm";
tray.appendChild(trayImg);
}