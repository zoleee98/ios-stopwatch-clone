export class Stopwatch {
    private time: {
        ms: number,
        s: number,
        m: number,
        h: number,
    }
    private startTime: number
    private stopTime: number
    private runningState: boolean
    private lapTimeValues: number[]
    constructor() {
        this.time = { ms: 0, s: 0, m: 0, h: 0 }
        this.startTime = 0
        this.stopTime = 0
        this.runningState = false
        this.lapTimeValues = []
    }

    get isRunning(): boolean {
        return this.runningState
    }
    get getTime(): number {
        if(this.isRunning) this.update()
        return this.time.ms
    }
    get getTimeToString(): { ms: string, s: string, m: string, h: string } {
        const ms: string = this.formatMs(this.getTime % 1000)
        const s: string = this.format(this.time.s)
        const m: string = this.format(this.time.m)
        const h: string = this.format(this.time.h)
        return { ms, s, m, h }
    }
    get getShortestLap(): number{
        return this.lapTimeValues.length <= 1 ? -1 : Math.min(...this.lapTimeValues)
    }
    get getLongestLap(): number{
        return this.lapTimeValues.length <= 1 ? -1 : Math.max(...this.lapTimeValues)
    }
    get getShortestLapIndex(): number{
        return this.lapTimeValues.indexOf(this.getShortestLap)
    }
    get getLongestLapIndex(): number{
        return this.lapTimeValues.indexOf(this.getLongestLap)
    }
    get getLapTimeValues(): number[]{
        return this.lapTimeValues
    }
    private formatMs(ms: number): string{
        if(ms < 10) return `00${ms}`
        else if(ms < 100) return `0${ms}`
        return `${ms}`
    }
    private format(num: number): string {
        return num < 10 ? `0${num}` : `${num}`
    }
    private update(): void {
        this.time.ms = Math.floor(performance.now() - this.startTime)
        this.time.s = Math.floor(this.time.ms / 1000) % 60
        this.time.m = Math.floor(this.time.ms / (1000 * 60)) % 60
        this.time.h = Math.floor(this.time.ms / (1000 * 60 * 60))
    }
    start(): void {
        if(!this.runningState){
            this.runningState = true
            this.startTime = performance.now() - this.stopTime
        }
        else{
            console.warn("Stopwatch is already running!")
        }
    }
    stop(): void {
        if(this.runningState){
            this.runningState = false
            this.stopTime = performance.now() - this.startTime
            this.update()
        }
        else{
            console.warn("Stopwatch is already stopped!")
        }
    }
    lap(): void{
        if(this.isRunning){
            this.lapTimeValues.push(this.getTime)
            this.clearTimer()
            this.start()
        }
        else{
            console.warn("Stopwatch is not running!")
        }
    }
    clearTimer(): void{
        this.stop()
        this.time = { ms: 0, s: 0, m: 0, h: 0 }
        this.startTime = 0
        this.stopTime = 0
    }
    reset(): void {
        this.stop()
        this.time = { ms: 0, s: 0, m: 0, h: 0 }
        this.startTime = 0
        this.stopTime = 0
        this.lapTimeValues = []
    }
}