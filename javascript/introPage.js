const soundCheckBox = document.getElementById("soundCheckBox");
const volumeSlider = document.getElementById("volumeSlider");
const adjustVolume = document.getElementById("adjustVolume");

const startGameButton = document.getElementById("startGame"); // Changed from goToGameButton
// Add a title attribute for the tooltip
startGameButton.title = "Please select a glove first!";

// Difficulty selection
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');
let selectedDifficulty = "medium"; // Default difficulty
sessionStorage.setItem("difficulty", selectedDifficulty); // Store default difficulty

let sound = "off";
let volumeValue = 0;
sessionStorage.setItem("sound", sound);
sessionStorage.setItem("volume", volumeValue);

soundCheckBox.addEventListener("change", soundCheck);
volumeSlider.addEventListener("input", volumeCheck);

// Call soundCheck initially to set the correct visibility based on the default checkbox state
soundCheck();
checkGloveSelection(); // Check initially if a glove is selected

const glove1 = document.getElementById("glove1");
const glove2 = document.getElementById("glove2");
const glove3 = document.getElementById("glove3");

glove1.addEventListener("click", gloveSelect);
glove2.addEventListener("click", gloveSelect);
glove3.addEventListener("click", gloveSelect);

// Add event listener to the start game button
startGameButton.addEventListener("click", function() {
    if (startGameButton.disabled) {
        // Optionally, you could show a more prominent message here instead of just relying on the tooltip
        // For example: alert("Please select a glove to start!");
        return; 
    }
    goToGame();
});


function soundCheck()
{
    if(soundCheckBox.checked)
    {
        volumeSlider.style.display = "block";
        adjustVolume.style.display = "block";
        sound = "on";
        sessionStorage.setItem("sound", sound);
        volumeValue = "5";
        sessionStorage.setItem("volume", volumeValue);
    } else {
        volumeSlider.style.display = "none";
        adjustVolume.style.display = "none";
        sound = "off";
        sessionStorage.setItem("sound", sound);
        volumeValue = "0";
        sessionStorage.setItem("volume", volumeValue);
    }
}

function volumeCheck(eventObject)
{
    volumeValue = eventObject.target.value;
    sessionStorage.setItem("volume", volumeValue);
}

function checkGloveSelection() {
    const selectedGlove = sessionStorage.getItem("openHand");
    if (selectedGlove) {
        startGameButton.disabled = false;
        startGameButton.title = ""; // Clear tooltip when enabled
    } else {
        startGameButton.disabled = true;
        startGameButton.title = "Please select a glove first!"; // Ensure tooltip is set
    }
}

function goToGame()
{
    // Store selected difficulty
    for (const radio of difficultyRadios) {
        if (radio.checked) {
            selectedDifficulty = radio.value;
            break;
        }
    }
    sessionStorage.setItem("difficulty", selectedDifficulty);
    window.location.href = "gamePage.html";
}

function gloveSelect(eventObject)
{
    const glove = eventObject.target.id;
    if(glove === "glove1")
    {
        glove1.style.border = "2px solid black";
        glove2.style.border = "0px";
        glove3.style.border = "0px";
        sessionStorage.setItem("openHand", "images/openHand1.png");
        sessionStorage.setItem("closeHand", "images/closeHand1.png");
    } else if(glove === "glove2")
    {
        glove2.style.border = "2px solid black";
        glove1.style.border = "0px";
        glove3.style.border = "0px";
        sessionStorage.setItem("openHand", "images/openHand2.png");
        sessionStorage.setItem("closeHand", "images/closeHand2.png");
    } else
    {
        glove3.style.border = "2px solid black";
        glove1.style.border = "0px";
        glove2.style.border = "0px";
        sessionStorage.setItem("openHand", "images/openHand3.png");
        sessionStorage.setItem("closeHand", "images/closeHand3.png");
    }
    checkGloveSelection(); // Check after a glove is selected
}