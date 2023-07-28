import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

import World from "./World/World.js";
import Theme from "./Theme.js";
import Preloader from "./Preloader.js";
import Controls from "./World/Controls.js";

export default class Experience {
  static instance;
  constructor(canvas) {
    // check if this already exist
    if (Experience.instance) {
      return Experience.instance;
    }

    // if does not exist, sets everything below to instance
    THREE.Cache.enabled = true;
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();

    this.preloader.on("enablecontrols", () => {
      this.controls = new Controls();
    });

    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  update() {
    this.preloader.update();
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }
}
