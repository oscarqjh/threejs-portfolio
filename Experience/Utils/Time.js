import { EventEmitter } from "events";

export default class Time extends EventEmitter{
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;  // start of time for this program
    this.elapsed = 0;
    this.delta = 16;            // time between each frame

    this.update();
  }

  update() {
    const currentTime = Date.now();           // get new current everytime update is called
    this.delta = currentTime - this.current;  // time between frames
    this.current = currentTime;               // set current for next update() call
    this.elapsed = this.current - this.start; // total time elapse from start

    // console.log(this.delta);
    this.emit("update");
    window.requestAnimationFrame(() => this.update());
  }
}