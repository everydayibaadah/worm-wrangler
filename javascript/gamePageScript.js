const GAME_CONFIG = {
    GOLDEN_WORM_CHANCE: 0.1, // 10% chance
    SCORE_PER_GOLDEN_WORM: 25,
    difficulties: {
        easy: {
            INITIAL_TIME_LEFT: 30,
            MAX_MISSES: 10,
            MIN_WORM_COUNT_TO_WIN: 5,
            WORM_DISPLAY_TIME_MIN: 700,
            WORM_DISPLAY_TIME_MAX: 1200,
            SCORE_PER_WORM: 3,
            GAME_DURATION: 30000
        },
        medium: { // Current default values
            INITIAL_TIME_LEFT: 20,
            MAX_MISSES: 8,
            MIN_WORM_COUNT_TO_WIN: 6,
            WORM_DISPLAY_TIME_MIN: 500,
            WORM_DISPLAY_TIME_MAX: 1000,
            SCORE_PER_WORM: 5,
            GAME_DURATION: 20000
        },
        hard: {
            INITIAL_TIME_LEFT: 15,
            MAX_MISSES: 5,
            MIN_WORM_COUNT_TO_WIN: 8,
            WORM_DISPLAY_TIME_MIN: 300,
            WORM_DISPLAY_TIME_MAX: 700,
            SCORE_PER_WORM: 7,
            GAME_DURATION: 15000
        }
    },
    // Default to medium if no difficulty is set, or for direct access
    get current() {
        const difficulty = sessionStorage.getItem("difficulty") || "medium";
        let config = {...this.difficulties[difficulty]}; // Create a copy
        config.GOLDEN_WORM_CHANCE = this.GOLDEN_WORM_CHANCE; // Add global golden worm chance
        config.SCORE_PER_GOLDEN_WORM = this.SCORE_PER_GOLDEN_WORM; // Add global golden worm score
        return config;
    }
};

let gloves = sessionStorage.getItem("openHand");
let sound = sessionStorage.getItem("sound");
let volumeString = sessionStorage.getItem("volume");

// Retrieve selected difficulty and set current game configuration
const selectedDifficulty = sessionStorage.getItem("difficulty") || "medium";
let currentConfig = GAME_CONFIG.difficulties[selectedDifficulty];


const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

const timerElement = document.getElementById("timeLeft");

let timeLeft = currentConfig.INITIAL_TIME_LEFT;
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
const maxMisses = currentConfig.MAX_MISSES;

const minCount = currentConfig.MIN_WORM_COUNT_TO_WIN;

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
    // timeLeft = 20; // Will be set by currentConfig
    // count = 0;
    // scoreDisplay.textContent = score;
    // missesDisplay.textContent = misses;
    // wormCountDisplay.textContent = count;
    // timerElement.textContent = "20"; // Will be set by currentConfig
    // resetTray();
    gameOn = true;
    startButton.disabled = true;
    homeButton.disabled = true;

    // Initialize game state based on difficulty
    timeLeft = currentConfig.INITIAL_TIME_LEFT;
    timerElement.textContent = timeLeft;
    // maxMisses is already set via currentConfig
    // minCount is already set via currentConfig
    // SCORE_PER_WORM will be used in collectWorms

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
    }, currentConfig.GAME_DURATION);
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
    let wormDisplayTime = randomTime(currentConfig.WORM_DISPLAY_TIME_MIN, currentConfig.WORM_DISPLAY_TIME_MAX);
    const hole = randomHole(holes);
    const worm = hole.querySelector(".worm");

    // Reset previous state
    worm.isGolden = false;
    worm.classList.remove("golden-worm");
    worm.removeEventListener("click", collectWorms); // Remove previous listener before adding a new one

    // Golden worm logic
    if (Math.random() < currentConfig.GOLDEN_WORM_CHANCE) {
        worm.isGolden = true;
        worm.classList.add("golden-worm");
    }

    worm.style.display = "block";
    worm.addEventListener("click", collectWorms);
    setTimeout(() => {
        worm.style.display = "none";
        worm.removeEventListener("click", collectWorms);
        // Reset golden state if missed
        if (worm.isGolden) {
            worm.isGolden = false;
            worm.classList.remove("golden-worm");
        }
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

    if (wormTarget.isGolden) {
        score += currentConfig.SCORE_PER_GOLDEN_WORM;
        wormTarget.isGolden = false; // Reset state
        wormTarget.classList.remove("golden-worm");
    } else {
        score += currentConfig.SCORE_PER_WORM;
    }

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
    timeLeft = currentConfig.INITIAL_TIME_LEFT;
    count = 0;
    missesDisplay.textContent = misses;
    wormCountDisplay.textContent = count;
    timerElement.textContent = currentConfig.INITIAL_TIME_LEFT;
    resetTray();
    startButton.disabled = false;
    homeButton.disabled = false;
    scoreDisplay.textContent = score;
}
