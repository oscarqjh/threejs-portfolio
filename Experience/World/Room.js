import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.IsoRoom = this.resources.items.IsoRoom;
    this.actualRoom = this.IsoRoom.scene;
    this.roomChildren = {};
    console.log(this.actualRoom);

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }

      if (child.name === "Computer") {
        child.children[0].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.Screen,
        });
        child.children[0].rotation.x = Math.PI;
        child.children[0].translateZ(0.01);
      }

      if (child.name === "FrameBig") {
        child.children[2].material = new THREE.ShaderMaterial({
          vertexShader: this.resources.items.FrameBigVertex,
          fragmentShader: this.resources.items.FrameBigFragment,
        });
        child.children[2].material.blending = THREE.CustomBlending;
        child.children[2].material.blendEquation = THREE.AddEquation; //default
        child.children[2].material.blendSrc = THREE.SrcAlphaFactor; //default
        child.children[2].material.blendDst = THREE.OneMinusSrcAlphaFactor; //default
        child.children[2].material.uniforms = {
          iTime: { value: 0 },
          alpha: { value: 0 },
        };
      }

      if (child.name === "FrameTopLeft") {
        child.children[2].material = new THREE.ShaderMaterial({
          vertexShader: this.resources.items.FrameBigVertex,
          fragmentShader: this.resources.items.FrameTopLeftFragment,
        });
        child.children[2].material.blending = THREE.CustomBlending;
        child.children[2].material.blendEquation = THREE.AddEquation; //default
        child.children[2].material.blendSrc = THREE.SrcAlphaFactor; //default
        child.children[2].material.blendDst = THREE.OneMinusSrcAlphaFactor; //default
        child.children[2].material.uniforms = {
          iTime: { value: 0 },
          alpha: { value: 0 },
        };
      }

      if (child.name === "FrameBottomLeft") {
        child.children[2].material = new THREE.ShaderMaterial({
          vertexShader: this.resources.items.FrameBigVertex,
          fragmentShader: this.resources.items.FrameBottomLeftFragment,
        });
        child.children[2].material.blending = THREE.CustomBlending;
        child.children[2].material.blendEquation = THREE.AddEquation; //default
        child.children[2].material.blendSrc = THREE.SrcAlphaFactor; //default
        child.children[2].material.blendDst = THREE.OneMinusSrcAlphaFactor; //default
        child.children[2].material.uniforms = {
          iTime: { value: 0 },
          alpha: { value: 0 },
        };
      }

      if (child.name === "Platform") {
        child.children.forEach((platformChild) => {
          platformChild.position.x = 1;
          platformChild.position.y = 0;
          platformChild.position.z = 0;
        });
      }

      child.scale.set(0, 0, 0);

      if (child.name === "Cube001") {
        // child.scale.set(1, 1, 1);
        child.position.set(0, -0.25, 0);
        child.rotation.y = Math.PI / 4;
      }

      this.roomChildren[child.name] = child;
    });

    // Table Lamp light
    this.spotLight = new THREE.SpotLight(0xffffff, 0, 5, 0, 0.3);
    this.spotLight.position.set(2.1347, 1.495, 0.05);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.set(2048, 2048);
    this.spotLight.shadow.normalBias = 0.05;
    this.spotLight.shadow.camera.near = 10;
    this.spotLight.shadow.camera.far = 40;
    this.spotLight.shadow.camera.fov = 1;
    this.actualRoom.add(this.spotLight);

    const targetObject = new THREE.Object3D();
    targetObject.position.set(1.7, 1, 0);
    this.actualRoom.add(targetObject);

    this.spotLight.target = targetObject;

    // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    // this.actualRoom.add( spotLightHelper );

    // Standing Lamp light
    this.standingSpotLight = new THREE.SpotLight(0xffffff, 0, 5, 0, 0.3);
    this.standingSpotLight.position.set(-0.582076, 2.1, -0.142861);
    this.standingSpotLight.castShadow = true;
    this.standingSpotLight.shadow.mapSize.set(2048, 2048);
    this.standingSpotLight.shadow.normalBias = 0.05;
    this.standingSpotLight.shadow.camera.near = 10;
    this.standingSpotLight.shadow.camera.far = 40;
    this.standingSpotLight.shadow.camera.fov = 1;
    this.actualRoom.add(this.standingSpotLight);

    const standingTargetObject = new THREE.Object3D();
    standingTargetObject.position.set(-0.582076, 0, -0.7);
    this.actualRoom.add(standingTargetObject);

    this.standingSpotLight.target = standingTargetObject;

    // const spotLightHelper = new THREE.SpotLightHelper(this.standingSpotLight);
    // this.actualRoom.add(spotLightHelper);

    this.roomChildren["spotLight"] = this.spotLight;
    this.roomChildren["standingSpotLight"] = this.standingSpotLight;
    this.scene.add(this.actualRoom);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.spotLight, {
        intensity: 0.3,
        delay: 1,
      });
      GSAP.to(this.standingSpotLight, {
        intensity: 1,
        delay: 1.5,
      });
    } else {
      GSAP.to(this.spotLight, {
        intensity: 0,
      });
      GSAP.to(this.standingSpotLight, {
        intensity: 0,
      });
    }
  }

  // to add animation (no animation currently)
  setAnimation() {
    // this.mixer = new THREE.AnimationMixer(this.actualRoom);
    // this.animationName = this.mixer.clipAction(this.room.animations);
    // this.animationName.play();
  }

  resize() {}

  update() {
    // this.mixer.update(this.time.delta * 0.001);

    // shader uniforms
    this.roomChildren.FrameBig.children[2].material.uniforms.iTime.value =
      performance.now() / 200;
    this.roomChildren.FrameTopLeft.children[2].material.uniforms.iTime.value =
      performance.now() / 200;
    this.roomChildren.FrameBottomLeft.children[2].material.uniforms.iTime.value =
      performance.now() / 200;

    // room rotation lerping
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
