import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.sizes = this.experience.sizes;
    
    this.setSunlight();
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight("#ffffff", 2, 1000);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 50;
    this.sunlight.shadow.camera.near = 1;
    this.sunlight.shadow.camera.left = (-this.sizes.aspect * this.sizes.frustum)/0.4;
    this.sunlight.shadow.camera.right = (this.sizes.aspect * this.sizes.frustum)/0.4;
    this.sunlight.shadow.camera.top = this.sizes.frustum/0.4;
    this.sunlight.shadow.camera.bottom = -this.sizes.frustum/0.1;
    this.sunlight.shadow.mapSize.set(4096,4096);
    this.sunlight.shadow.normalBias = 0.03;

    // shadow helper
    // const helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
    // this.scene.add(helper);

    this.sunlight.position.set(3, 20, 7);
    this.scene.add(this.sunlight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);

  }

  switchTheme(theme) {
    if(theme === "dark") {
      GSAP.to(this.sunlight.color, {
        r: 0.17254,
        g: 0.23137,
        b: 0.68627
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.17254,
        g: 0.23137,
        b: 0.68627
      });
      GSAP.to(this.sunlight, {
        intensity: 0.78
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78
      });
    } else {
      GSAP.to(this.sunlight.color, {
        r: 1,
        g: 1,
        b: 1
      });
      GSAP.to(this.ambientLight.color, {
        r: 1,
        g: 1,
        b: 1
      });
      GSAP.to(this.sunlight, {
        intensity: 2
      });
      GSAP.to(this.ambientLight, {
        intensity: 1
      });
    }
  }

  resize() {}

  update() {}
}