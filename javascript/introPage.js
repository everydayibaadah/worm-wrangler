const soundCheckBox = document.getElementById("soundCheckBox");
const volumeSlider = document.getElementById("volumeSlider");
const adjustVolume = document.getElementById("adjustVolume");

const goToGameButton = document.getElementById("goToGameButton");
goToGameButton.addEventListener("click", goToGame);


let sound = "off";
let volumeValue = 0;
sessionStorage.setItem("sound", sound);
sessionStorage.setItem("volume", volumeValue);

soundCheckBox.addEventListener("change", soundCheck);
volumeSlider.addEventListener("input", volumeCheck);


const glove1 = document.getElementById("glove1");
const glove2 = document.getElementById("glove2");
const glove3 = document.getElementById("glove3");

glove1.addEventListener("click", gloveSelect);
glove2.addEventListener("click", gloveSelect);
glove3.addEventListener("click", gloveSelect);


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

function goToGame()
{
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
        sessionStorage.setItem("openHand", "image/openHand1.png");
        sessionStorage.setItem("closeHand", "image/closeHand1.png");
    } else if(glove === "glove2")
    {
        glove2.style.border = "2px solid black";
        glove1.style.border = "0px";
        glove3.style.border = "0px";
        sessionStorage.setItem("openHand", "image/openHand2.png");
        sessionStorage.setItem("closeHand", "image/closeHand2.png");
    } else
    {
        glove3.style.border = "2px solid black";
        glove1.style.border = "0px";
        glove2.style.border = "0px";
        sessionStorage.setItem("openHand", "image/openHand3.png");
        sessionStorage.setItem("closeHand", "image/closeHand3.png");
    }
}