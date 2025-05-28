let gloves = sessionStorage.getItem("openHand");
let sound = sessionStorage.getItem("sound");
let volumeString = sessionStorage.getItem("volume");

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);

const timerElement = document.getElementById("timeLeft");

let timeLeft = 20;
let timerID1;
let timerID;

const holes = document.querySelectorAll(".hole");

var scoreDisplay = document.getElementById("score");
const wormCountDisplay = document.getElementById("wormCount");

let score = 0;
let count = 0;

const tray = document.querySelector(".tray");

const missesDisplay = document.getElementById("misses");

let misses = 0;
const maxMisses = 8;

const minCount = 6;

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
    for(i = 0; i < holes.length; i++)
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
            winMessage.textContent = "Congrats, you did it dumbo... Your score is " + score + "."
        } else {
            winMessage.textContent = "You missed hahhahhah!!! Your score is " + score + ".";
        }
    }, 20000);
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
    let wormDisplayTime = randomTime(500, 1000);
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
    return Math.floor(Math.random() * (maximum-minimum)) + minimum;
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
    score += 5;
    if(sound === "on")
    {
        hitSound.currentTime = 0;
        hitSound.play();
    }
    count++;
    wormCountDisplay.textContent = count;
    const trayIMG = document.createElement("img");
    trayIMG.src = "image/wormtray.png";
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
    timeLeft = 20;
    count = 0;
    missesDisplay.textContent = misses;
    wormCountDisplay.textContent = count;
    timerElement.textContent = "20";
    resetTray();
    startButton.disabled = false;
    homeButton.disabled = false;
    scoreDisplay.textContent = score;
}
