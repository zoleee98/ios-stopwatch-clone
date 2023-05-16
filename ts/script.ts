import { Stopwatch } from "./Stopwatch.js"
const stopwatch: Stopwatch = new Stopwatch()

const startButton: HTMLButtonElement = document.getElementById("start") as HTMLButtonElement
const lapButton: HTMLButtonElement = document.getElementById("lap") as HTMLButtonElement
const display: HTMLSpanElement = document.getElementById("display") as HTMLSpanElement
const lapBox: HTMLDivElement = document.getElementById("lapBox") as HTMLDivElement
let lapBoxData: HTMLDivElement[] = []
let interval: number = 0
let firstStart: boolean = true

function displayTime(): void {
    const {ms: ms, s: s, m: m, h: h} = stopwatch.getTimeToString
    const currentLapTime: HTMLSpanElement = lapBox.firstElementChild?.lastElementChild as HTMLSpanElement
    display.textContent = `${m}:${s},${ms.slice(0, 2)}`
    currentLapTime.textContent = `${m}:${s},${ms.slice(0, 2)}`
}
function addNewLap(): void{
    const newLapBoxData: HTMLDivElement = document.createElement("div") as HTMLDivElement
    const newLapName: HTMLSpanElement = document.createElement("span") as HTMLSpanElement
    const newLapTime: HTMLSpanElement = document.createElement("span") as HTMLSpanElement
    newLapBoxData.append(newLapName, newLapTime)
    lapBox.insertBefore(newLapBoxData, lapBox.firstElementChild)
    newLapName.textContent = `Lap ${lapBox.childElementCount}`
    newLapTime.textContent = "00:00,00"
    lapBoxData.push(newLapBoxData)
}
startButton.addEventListener("click", () => {
    if(stopwatch.isRunning){
        stopwatch.stop()
        clearInterval(interval)
    }
    else{
        interval = setInterval(displayTime, 10)
        stopwatch.start()
    }

    if(firstStart){
        addNewLap()
        firstStart = false
    }
    startButton.classList.toggle("startstop")
    startButton.textContent = stopwatch.isRunning ? "Stop" : "Start"
    lapButton.textContent = stopwatch.isRunning ? "Lap" : "Reset"
    lapButton.disabled = false
})
lapButton.addEventListener("click", () => {
    if(stopwatch.isRunning){
        addNewLap()
        stopwatch.lap()
        if(stopwatch.getLapTimeValues.length > 1){
            lapBoxData.map(el => el.style.color = "white")
            lapBoxData[stopwatch.getLongestLapIndex].style.color = getComputedStyle(document.documentElement).getPropertyValue("--clr-stop")
            lapBoxData[stopwatch.getShortestLapIndex].style.color = getComputedStyle(document.documentElement).getPropertyValue("--clr-start")
        }
        console.log(lapBoxData)
    }
    else{
        stopwatch.reset()
        display.textContent = "00:00,00"
        lapButton.disabled = true
        lapButton.textContent = "Lap"
        lapBox.replaceChildren()
        lapBoxData = []
        firstStart = true
    }
})