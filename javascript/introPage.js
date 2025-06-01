const soundCheckBox = document.getElementById("soundCheckBox");
const volumeSlider = document.getElementById("volumeSlider");
const volumeControlArea = document.getElementById("volumeControlArea"); // Get the volume control area
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

const gloveOptions = document.querySelectorAll(".glove-option"); // Select all glove options

gloveOptions.forEach(glove => {
    glove.addEventListener("click", gloveSelect);
});

// Add event listener to the start game button
startGameButton.addEventListener("click", function() {
    if (startGameButton.disabled) {
        // Optionally, you could show a more prominent message here instead of just relying on the tooltip
        // For example: alert("Please select a glove to start!");
        return;
    }
    goToGame();
});


function soundCheck() {
    if (soundCheckBox.checked) {
        volumeControlArea.classList.remove("is-hidden"); // Show volume controls
        sound = "on";
        sessionStorage.setItem("sound", sound);
        // Ensure volume is set if it wasn't before, or use stored/default
        if (!sessionStorage.getItem("volume")) {
            volumeValue = "5"; // Default volume when sound is turned on
            sessionStorage.setItem("volume", volumeValue);
            volumeSlider.value = volumeValue;
        } else {
            volumeValue = sessionStorage.getItem("volume");
            volumeSlider.value = volumeValue;
        }
    } else {
        volumeControlArea.classList.add("is-hidden"); // Hide volume controls
        sound = "off";
        sessionStorage.setItem("sound", sound);
        // volumeValue = "0"; // No need to set volume to 0 if sound is off, retain previous setting
        // sessionStorage.setItem("volume", volumeValue);
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

function gloveSelect(eventObject) {
    // Remove 'selected-glove' class from all options
    gloveOptions.forEach(opt => opt.classList.remove("selected-glove"));
    // Add 'selected-glove' class to the clicked option
    eventObject.target.classList.add("selected-glove");

    const gloveId = eventObject.target.id;
    if (gloveId === "glove1") {
        sessionStorage.setItem("openHand", "images/openHand1.png");
        sessionStorage.setItem("closeHand", "images/closeHand1.png");
    } else if (gloveId === "glove2") {
        sessionStorage.setItem("openHand", "images/openHand2.png");
        sessionStorage.setItem("closeHand", "images/closeHand2.png");
    } else if (gloveId === "glove3") {
        sessionStorage.setItem("openHand", "images/openHand3.png");
        sessionStorage.setItem("closeHand", "images/closeHand3.png");
    }
    checkGloveSelection(); // Check after a glove is selected
}

// Add listener for changelog button
const changelogButton = document.getElementById("changelogButton");
changelogButton.addEventListener("click", () => {
    window.location.href = "changelog.html";
});