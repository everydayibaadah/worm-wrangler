const GAME_CONFIG = {
    GOLDEN_WORM_CHANCE: 0.1,
    SCORE_PER_GOLDEN_WORM: 25,
    TIME_WORM_CHANCE: 0.08,
    TIME_WORM_BONUS_SECONDS: 5,
    BOMB_CHANCE: 0.07, // 7% chance (after golden and time worm checks)
    BOMB_PENALTY_POINTS: 10,
    BOMB_PENALTY_MISSES: 1,
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
        let config = {...this.difficulties[difficulty]};
        config.GOLDEN_WORM_CHANCE = this.GOLDEN_WORM_CHANCE;
        config.SCORE_PER_GOLDEN_WORM = this.SCORE_PER_GOLDEN_WORM;
        config.TIME_WORM_CHANCE = this.TIME_WORM_CHANCE;
        config.TIME_WORM_BONUS_SECONDS = this.TIME_WORM_BONUS_SECONDS;
        config.BOMB_CHANCE = this.BOMB_CHANCE;
        config.BOMB_PENALTY_POINTS = this.BOMB_PENALTY_POINTS;
        config.BOMB_PENALTY_MISSES = this.BOMB_PENALTY_MISSES;
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
    let displayTime = randomTime(currentConfig.WORM_DISPLAY_TIME_MIN, currentConfig.WORM_DISPLAY_TIME_MAX);
    const hole = randomHole(holes);
    const item = hole.querySelector(".worm"); // Keep using .worm for now, style will differentiate

    // Reset previous state
    item.isGolden = false;
    item.isTimeWorm = false;
    item.isBomb = false;
    item.classList.remove("golden-worm", "time-worm", "bomb-item");
    item.removeEventListener("click", collectWorms);
    item.removeEventListener("click", handleBombClick); // Remove bomb listener if any

    // Special item logic
    const randomChance = Math.random();
    if (randomChance < currentConfig.GOLDEN_WORM_CHANCE) {
        item.isGolden = true;
        item.classList.add("golden-worm");
        item.addEventListener("click", collectWorms);
    } else if (randomChance < currentConfig.GOLDEN_WORM_CHANCE + currentConfig.TIME_WORM_CHANCE) {
        item.isTimeWorm = true;
        item.classList.add("time-worm");
        item.addEventListener("click", collectWorms);
    } else if (randomChance < currentConfig.GOLDEN_WORM_CHANCE + currentConfig.TIME_WORM_CHANCE + currentConfig.BOMB_CHANCE) {
        item.isBomb = true;
        item.classList.add("bomb-item");
        item.addEventListener("click", handleBombClick);
        // Bombs might have a shorter display time or different logic
        // displayTime = randomTime(300, 600); // Optional: Shorter display for bombs
    } else {
        // Regular worm
        item.addEventListener("click", collectWorms);
    }

    item.style.display = "block";

    setTimeout(() => {
        item.style.display = "none";
        // Remove specific listener attached
        if (item.isGolden || item.isTimeWorm) {
            item.removeEventListener("click", collectWorms);
        } else if (item.isBomb) {
            item.removeEventListener("click", handleBombClick);
        } else {
            item.removeEventListener("click", collectWorms); // Regular worm listener
        }

        // Reset special states if missed
        if (item.isGolden) {
            item.isGolden = false;
            item.classList.remove("golden-worm");
        }
        if (item.isTimeWorm) {
            item.isTimeWorm = false;
            item.classList.remove("time-worm");
        }
        if (item.isBomb) {
            item.isBomb = false;
            item.classList.remove("bomb-item");
        }

        if(gameOn && misses < maxMisses)
        {
            popUpWorm();
        }
    }, displayTime);
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
    // This function is also called when clicking on an empty hole or the game board.
    // We only want to penalize for missing an actual worm, not a bomb.
    // The bomb click has its own penalty.
    // However, if a bomb despawns without being clicked, it's not a "miss" in the traditional sense.

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
            winMessage.textContent = "Game Over: Too many misses! Your score is " + score + ".";
            clearTimeout(timerID);
            clearInterval(timerID1);
        }
    }
}

function handleBombClick(eventObject) {
    eventObject.stopPropagation();
    const bombTarget = eventObject.target;
    bombTarget.style.display = "none";
    bombTarget.isBomb = false;
    bombTarget.classList.remove("bomb-item");

    score -= currentConfig.BOMB_PENALTY_POINTS;
    if (score < 0) score = 0; // Prevent negative score
    scoreDisplay.textContent = score;

    misses += currentConfig.BOMB_PENALTY_MISSES;
    missesDisplay.textContent = misses;

    // Play a different sound for bomb? (TODO for sound design)
    if(sound === "on")
    {
        missSound.currentTime = 0; // Or a new bomb sound: bombSound.play();
        missSound.play();
    }

    if(misses >= maxMisses)
    {
        gameOn = false;
        popUpWindow.style.display = "flex";
        winMessage.textContent = "KABOOM! Game Over. Your score is " + score + ".";
        clearTimeout(timerID);
        clearInterval(timerID1);
        if(sound === "on") {
            completionSound.play();
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
        wormTarget.isGolden = false;
        wormTarget.classList.remove("golden-worm");
    } else if (wormTarget.isTimeWorm) {
        timeLeft += currentConfig.TIME_WORM_BONUS_SECONDS;
        timerElement.textContent = timeLeft; // Update timer display
        // Add score for time worm as well, or make it purely a time bonus
        // For now, let's give it the standard worm score too
        score += currentConfig.SCORE_PER_WORM;
        wormTarget.isTimeWorm = false;
        wormTarget.classList.remove("time-worm");
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
