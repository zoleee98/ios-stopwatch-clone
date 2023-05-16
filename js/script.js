import { Stopwatch } from "./Stopwatch.js";
const stopwatch = new Stopwatch();
const startButton = document.getElementById("start");
const lapButton = document.getElementById("lap");
const display = document.getElementById("display");
const lapBox = document.getElementById("lapBox");
let lapBoxData = [];
let interval = 0;
let firstStart = true;
function displayTime() {
    const { ms: ms, s: s, m: m, h: h } = stopwatch.getTimeToString;
    const currentLapTime = lapBox.firstElementChild?.lastElementChild;
    display.textContent = `${m}:${s},${ms.slice(0, 2)}`;
    currentLapTime.textContent = `${m}:${s},${ms.slice(0, 2)}`;
}
function addNewLap() {
    const newLapBoxData = document.createElement("div");
    const newLapName = document.createElement("span");
    const newLapTime = document.createElement("span");
    newLapBoxData.append(newLapName, newLapTime);
    lapBox.insertBefore(newLapBoxData, lapBox.firstElementChild);
    newLapName.textContent = `Lap ${lapBox.childElementCount}`;
    newLapTime.textContent = "00:00,00";
    lapBoxData.push(newLapBoxData);
}
startButton.addEventListener("click", () => {
    if (stopwatch.isRunning) {
        stopwatch.stop();
        clearInterval(interval);
    }
    else {
        interval = setInterval(displayTime, 10);
        stopwatch.start();
    }
    if (firstStart) {
        addNewLap();
        firstStart = false;
    }
    startButton.classList.toggle("startstop");
    startButton.textContent = stopwatch.isRunning ? "Stop" : "Start";
    lapButton.textContent = stopwatch.isRunning ? "Lap" : "Reset";
    lapButton.disabled = false;
});
lapButton.addEventListener("click", () => {
    if (stopwatch.isRunning) {
        addNewLap();
        stopwatch.lap();
        if (stopwatch.getLapTimeValues.length > 1) {
            lapBoxData.map(el => el.style.color = "white");
            lapBoxData[stopwatch.getLongestLapIndex].style.color = getComputedStyle(document.documentElement).getPropertyValue("--clr-stop");
            lapBoxData[stopwatch.getShortestLapIndex].style.color = getComputedStyle(document.documentElement).getPropertyValue("--clr-start");
        }
        console.log(lapBoxData);
    }
    else {
        stopwatch.reset();
        display.textContent = "00:00,00";
        lapButton.disabled = true;
        lapButton.textContent = "Lap";
        lapBox.replaceChildren();
        lapBoxData = [];
        firstStart = true;
    }
});
