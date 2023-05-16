export class Stopwatch {
    time;
    startTime;
    stopTime;
    runningState;
    lapTimeValues;
    constructor() {
        this.time = { ms: 0, s: 0, m: 0, h: 0 };
        this.startTime = 0;
        this.stopTime = 0;
        this.runningState = false;
        this.lapTimeValues = [];
    }
    get isRunning() {
        return this.runningState;
    }
    get getTime() {
        if (this.isRunning)
            this.update();
        return this.time.ms;
    }
    get getTimeToString() {
        const ms = this.formatMs(this.getTime % 1000);
        const s = this.format(this.time.s);
        const m = this.format(this.time.m);
        const h = this.format(this.time.h);
        return { ms, s, m, h };
    }
    get getShortestLap() {
        return this.lapTimeValues.length <= 1 ? -1 : Math.min(...this.lapTimeValues);
    }
    get getLongestLap() {
        return this.lapTimeValues.length <= 1 ? -1 : Math.max(...this.lapTimeValues);
    }
    get getShortestLapIndex() {
        return this.lapTimeValues.indexOf(this.getShortestLap);
    }
    get getLongestLapIndex() {
        return this.lapTimeValues.indexOf(this.getLongestLap);
    }
    get getLapTimeValues() {
        return this.lapTimeValues;
    }
    formatMs(ms) {
        if (ms < 10)
            return `00${ms}`;
        else if (ms < 100)
            return `0${ms}`;
        return `${ms}`;
    }
    format(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
    update() {
        this.time.ms = Math.floor(performance.now() - this.startTime);
        this.time.s = Math.floor(this.time.ms / 1000) % 60;
        this.time.m = Math.floor(this.time.ms / (1000 * 60)) % 60;
        this.time.h = Math.floor(this.time.ms / (1000 * 60 * 60));
    }
    start() {
        if (!this.runningState) {
            this.runningState = true;
            this.startTime = performance.now() - this.stopTime;
        }
        else {
            console.warn("Stopwatch is already running!");
        }
    }
    stop() {
        if (this.runningState) {
            this.runningState = false;
            this.stopTime = performance.now() - this.startTime;
            this.update();
        }
        else {
            console.warn("Stopwatch is already stopped!");
        }
    }
    lap() {
        if (this.isRunning) {
            this.lapTimeValues.push(this.getTime);
            this.clearTimer();
            this.start();
        }
        else {
            console.warn("Stopwatch is not running!");
        }
    }
    clearTimer() {
        this.stop();
        this.time = { ms: 0, s: 0, m: 0, h: 0 };
        this.startTime = 0;
        this.stopTime = 0;
    }
    reset() {
        this.stop();
        this.time = { ms: 0, s: 0, m: 0, h: 0 };
        this.startTime = 0;
        this.stopTime = 0;
        this.lapTimeValues = [];
    }
}
