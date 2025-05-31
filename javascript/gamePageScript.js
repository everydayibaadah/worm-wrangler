const GAME_CONFIG = {
    INITIAL_TIME_LEFT: 20, // seconds
    MAX_MISSES: 8,
    MIN_WORM_COUNT_TO_WIN: 6,
    WORM_DISPLAY_TIME_MIN: 500, // milliseconds
    WORM_DISPLAY_TIME_MAX: 1000, // milliseconds
    SCORE_PER_WORM: 5,
    GAME_DURATION: 20000 // milliseconds (should align with INITIAL_TIME_LEFT * 1000)
};

let gloves = sessionStorage.getItem("openHand");
let sound = sessionStorage.getItem("sound");
let volumeString = sessionStorage.getItem("volume");

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

const timerElement = document.getElementById("timeLeft");

let timeLeft = GAME_CONFIG.INITIAL_TIME_LEFT;
let timerID1;
let timerID;

const holes = document.querySelectorAll(".hole");

var scoreDisplay = document.getElementById("scoreDisplay");
const wormCountDisplay = document.getElementById("wormCount");

let score = 0;
let count = 0;

const tray = document.querySelector(".tray");

const missesDisplay = document.getElementById("misses");

let misses = 0;
const maxMisses = GAME_CONFIG.MAX_MISSES;

const minCount = GAME_CONFIG.MIN_WORM_COUNT_TO_WIN;

const homeButton = document.getElementById("homeButton");

homeButton.addEventListener("click", function () {
    window.location.href = "index.html";
});

let gameOn = false;

const gameBoard = document.querySelector(".gameBoard");

gameBoard.addEventListener("click", function(eventObject){
    if(gameOn && eventObject.target.className === "gameBoard")
    {
        missWorm();
    }
});


const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function(eventObject)
{
    cursor.style.left = eventObject.pageX - 20 + "px";
    cursor.style.top = eventObject.pageY - 20 + "px";
});

let openHand = sessionStorage.getItem("openHand");
let closeHand = sessionStorage.getItem("closeHand");


document.addEventListener("mousedown", function()
{
    const closeHandImage = closeHand && closeHand.trim() ? closeHand : "./image/closeHand1.png";
    cursor.style.backgroundImage = `url("${closeHandImage}")`;
    cursor.style.transform = "rotate(-45deg)";
});

document.addEventListener("mouseup", function()
{
    const openHandImage = openHand && openHand.trim() ? openHand : "./image/openHand1.png";
    cursor.style.backgroundImage = `url("${openHandImage}")`;
    cursor.style.transform = "none";
});

const popUpWindow = document.getElementById("popUpWindow");
const winMessage = document.getElementById("winMessage");
const closeButton = document.getElementById("closeButton");

closeButton.addEventListener("click", closePopUp);


const hitSound = document.getElementById("hitSound");
const missSound = document.getElementById("missSound");
const completionSound = document.getElementById("completionSound");

let volume = parseInt(volumeString);
volume = volume/10.0;
hitSound.volume = volume;
missSound.volume = volume;
completionSound.volume = volume;




function startGame()
{
    // score = 0;
    // misses = 0;
    // timeLeft = 20;
    // count = 0;
    // scoreDisplay.textContent = score;
    // missesDisplay.textContent = misses;
    // wormCountDisplay.textContent = count;
    // timerElement.textContent = "20";
    // resetTray();
    gameOn = true;
    startButton.disabled = true;
    homeButton.disabled = true;
    timerID1 = setInterval(updateTimer, 1000);
    for(let i = 0; i < holes.length; i++)
    {
        holes[i].addEventListener("click", missWorm);
    }
    popUpWorm();
    timerID = setTimeout(() => {
        alert("Game Over! :(");
        for(i = 0; i < holes.length; i++)
        {
            holes[i].removeEventListener("click", missWorm);
        }
        gameOn = false;
        // startButton.disabled = false;
        // homeButton.disabled = false;
        popUpWindow.style.display = "flex";
        if(sound === "on")
        {
            completionSound.play();
        }
        if(count >= minCount)
        {
            winMessage.textContent = "Congrats, you did it! Your score is " + score + "."
        } else {
            winMessage.textContent = "You missed, haha! Your score is " + score + ".";
        }
    }, GAME_CONFIG.GAME_DURATION);
}

function resetTray()
{
    while(tray.firstChild)
    {
        tray.removeChild(tray.firstChild);
    }
}

function popUpWorm()
{
    let wormDisplayTime = randomTime(GAME_CONFIG.WORM_DISPLAY_TIME_MIN, GAME_CONFIG.WORM_DISPLAY_TIME_MAX);
    const hole = randomHole(holes);
    const worm = hole.querySelector(".worm");
    worm.style.display = "block";
    worm.addEventListener("click", collectWorms);
    setTimeout(() => {
        worm.style.display = "none";
        worm.removeEventListener("click", collectWorms);
        if(gameOn && misses < maxMisses)
        {
            popUpWorm();
        }
    }, wormDisplayTime);
}

function randomTime(minimum, maximum)
{
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; // Corrected random range
}

function randomHole()
{
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    return hole;
}

function missWorm()
{
    if(sound === "on")
    {
        missSound.currentTime = 0;
        missSound.play();
    }
    if(misses < maxMisses)
    {
        misses++;
        missesDisplay.textContent = misses;
        if(misses >= maxMisses)
        {
            // startButton.disabled = false;
            // homeButton.disabled = false;
            gameOn = false;
            popUpWindow.style.display = "flex";
            winMessage.textContent = "Bro Stop missing anyways you lost... Your score is " + score + ".";
            clearTimeout(timerID);
            clearInterval(timerID1);
        }
    }
}

function collectWorms(eventObject)
{
    eventObject.stopPropagation();
    const wormTarget = eventObject.target;
    wormTarget.style.display = "none";
    score += GAME_CONFIG.SCORE_PER_WORM;
    if(sound === "on")
    {
        hitSound.currentTime = 0;
        hitSound.play();
    }
    count++;
    wormCountDisplay.textContent = count;
    const trayIMG = document.createElement("img");
    trayIMG.src = "images/wormtray.png";
    trayIMG.alt = "Worm";
    tray.appendChild(trayIMG);
    scoreDisplay.textContent = score;
}

function updateTimer()
{
    timeLeft--;
    timerElement.textContent = timeLeft;
    if(timeLeft === 0)
    {
        clearInterval(timerID1);
    }
}

function closePopUp()
{
    popUpWindow.style.display = "none";
    score = 0;
    misses = 0;
    timeLeft = GAME_CONFIG.INITIAL_TIME_LEFT;
    count = 0;
    missesDisplay.textContent = misses;
    wormCountDisplay.textContent = count;
    timerElement.textContent = GAME_CONFIG.INITIAL_TIME_LEFT;
    resetTray();
    startButton.disabled = false;
    homeButton.disabled = false;
    scoreDisplay.textContent = score;
}
