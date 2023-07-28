import * as THREE from "three";
import Experience from "../Experience";

import Room from "./Room.js";
import Environment from "./Environment.js";
import Controls from "./Controls";
import Floor from "./Floor";
import EventEmitter from "events";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.canvas = this.experience.canvas;
    this.resources = this.experience.resources;
    this.theme = this.experience.theme;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.room = new Room();
      // this.controls = new Controls();
      this.emit("worldReady");

      // console.log("Room created");
    });

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });
  }

  switchTheme(theme) {
    if (this.environment) {
      this.environment.switchTheme(theme);
    }
    if (this.room) {
      this.room.switchTheme(theme);
    }
  }

  resize() {}

  update() {
    // call only if room is created
    if (this.room) {
      this.room.update();
    }

    // call only if controls exist
    if (this.controls) {
      this.controls.update();
    }
  }
}
