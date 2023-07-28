import EventEmitter from "events";
import * as THREE from "three";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldReady", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-second-subheading"));
    convert(document.querySelector(".hero-second-description"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log(this.roomChildren);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animate", { y: 0, yPercent: 100 });
      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });

      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.Cube001.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 1,
          })
          .to(this.room.position, {
            x: () => {
              return this.sizes.width * -0.002;
            },
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.timeline
          .to(this.roomChildren.Cube001.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 1,
          })
          .to(this.room.position, {
            z: () => {
              return this.sizes.height * -0.0025;
            },
            ease: "power1.out",
            duration: 0.7,
          });
      }

      this.timeline
        .to(".intro-text .animate", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        })
        .to(
          ".arrow-wrapper",
          {
            opacity: 1,
          },
          "same"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "same"
        );
      // console.log("1stanimationdone");
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      this.secondTimeline
        .to(
          ".intro-text .animate",
          {
            yPercent: 100,
            stagger: {
              each: 0.03,
              from: "end",
            },
            ease: "back.in(2)",
          },
          "fadeout"
        )
        .to(
          ".arrow-wrapper",
          {
            opacity: 0,
          },
          "fadeout"
        )
        .to(
          ".hero-main-title .animate",
          {
            yPercent: 0,
            stagger: 0.03,
            ease: "back.out(1.7)",
          },
          "hero-text"
        )
        .to(
          ".hero-main-description .animate",
          {
            yPercent: 0,
            stagger: 0.01,
            ease: "back.out(1.7)",
          },
          "hero-text"
        )
        .to(
          ".hero-second-subheading .animate",
          {
            yPercent: 0,
            stagger: 0.03,
            ease: "back.out(1.7)",
          },
          "hero-text"
        )
        .to(
          ".hero-second-description .animate",
          {
            yPercent: 0,
            stagger: 0.03,
            ease: "back.out(1.7)",
          },
          "hero-text"
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "hero-text"
        )
        .to(
          this.roomChildren.Cube001.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
            ease: "power2.out",
            duration: 0.7,
          },
          "same"
        )
        .to(
          this.roomChildren.Cube001.scale,
          {
            x: 7.5,
            y: 7.5,
            z: 7.5,
            ease: "back.out(2.5)",
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 5.3,
          },
          "same"
        )
        .to(
          this.roomChildren.Cube001.position,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          "same"
        )
        .to(this.roomChildren.Walls.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          this.roomChildren.Cube001.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5,
          },
          "same2"
        )
        .to(
          this.roomChildren.Cube001.position,
          {
            z: -2.7,
            x: -0.05,
            duration: 0.5,
          },
          "same2"
        )
        .to(
          this.roomChildren.SkirtingFloor.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "Sine.easeOut",
            duration: 0.3,
          },
          ">-0.3"
        )
        .to(this.roomChildren.BedTable.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(1)",
          duration: 0.3,
        })
        .to(this.roomChildren.FloorItems.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(1)",
          duration: 0.3,
        })
        .to(
          this.roomChildren.Shelfs.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1)",
            duration: 0.3,
          },
          ">-0.3"
        )
        .to(this.roomChildren.TableItems.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(1)",
          duration: 0.3,
        })
        .to(
          this.roomChildren.FrameBig.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
          },
          ">-0.3"
        )
        .to(
          this.roomChildren.FrameTopLeft.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
          },
          ">-0.15"
        )
        .to(
          this.roomChildren.FrameBottomLeft.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
          },
          ">-0.15"
        )
        .to(
          this.roomChildren.Poster.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
          },
          ">-0.15"
        )
        .to(
          this.roomChildren.Computer.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.5)",
            duration: 0.3,
            onComplete: resolve,
          },
          ">-0.15"
        )
        .to(
          this.roomChildren.spotLight,
          {
            angle: Math.PI / 4.9,
            ease: "back.out(1.5)",
            duration: 0.3,
          },
          "light"
        )
        .to(
          this.roomChildren.standingSpotLight,
          {
            angle: Math.PI / 4.9,
            ease: "back.out(1.5)",
            duration: 0.3,
          },
          "light"
        )
        .to(".arrow-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
      // console.log("animation done");
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      // console.log("added event");
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initialY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initialY - currentY;
    if (difference > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.initialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.x = this.sizes.width * -0.002;
      this.room.position.y = 0;
      this.room.position.z = 0;
    } else {
      this.room.position.x = 0;
      this.room.position.y = 0;
      this.room.position.z = this.sizes.height * -0.0025;
    }
  }

  scale() {
    if (this.device === "desktop") {
      this.room.scale.set(1, 1, 1);
    } else {
      this.room.scale.set(0.6, 0.6, 0.6);
    }
  }

  async playIntro() {
    await this.firstIntro();
    // console.log("1stanimationDONE");
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;
    // console.log("second preloader done");
    this.emit("enablecontrols");
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }

    if (this.scaleFlag) {
      this.scale();
    }
  }
}
