import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    // console.log(this.experience.world.room.spotLight);
    this.sizes = this.experience.sizes;
    this.circle1 = this.experience.world.floor.circle1;
    this.circle2 = this.experience.world.floor.circle2;
    this.circle3 = this.experience.world.floor.circle3;
    this.frameBig = this.experience.world.room.roomChildren.FrameBig;
    this.frameTopLeft = this.experience.world.room.roomChildren.FrameTopLeft;
    this.frameBottomLeft =
      this.experience.world.room.roomChildren.FrameBottomLeft;
    GSAP.registerPlugin(ScrollTrigger);
    // console.log("control initiated");
    document.querySelector(".page").style.overflow = "visible";

    this.setSmoothScroll();
    this.setScrollTrigger();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.3,
      disableRaf: true,
      customScrollbar: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        return arguments.length
          ? (asscroll.currentPos = value)
          : asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTrigger() {
    let mm = GSAP.matchMedia();

    // Desktop --------------------------------
    mm.add("(min-width: 969px)", () => {
      // console.log("desktop");
      this.room.scale.set(1, 1, 1);

      // First section
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(this.room.position, {
        x: () => {
          return this.sizes.width * 0.0022;
        },
      });

      // Second section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.position,
          {
            x: () => {
              return this.sizes.width * -0.0022;
            },
            z: () => {
              return this.sizes.height * 0.011;
            },
          },
          "same"
        )
        .to(
          this.room.scale,
          {
            x: 2.2,
            y: 2.2,
            z: 2.2,
          },
          "same"
        );

      // Third section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.camera.orthographicCamera.position,
          {
            x: -1.5,
            y: -5,
            z: -6,
          },
          "same"
        )
        .to(
          this.room.scale,
          {
            x: 3.5,
            y: 3.5,
            z: 3.5,
          },
          "same"
        );

      // Fourth section
      this.fourthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fourth-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.camera.orthographicCamera.position,
          {
            x: -2.5,
            y: 0,
            z: 15,
          },
          "same"
        )
        .to(
          this.room.scale,
          {
            x: 3,
            y: 3,
            z: 3,
          },
          "same"
        );
    });

    // Mobile --------------------------------
    mm.add("(max-width: 968px)", () => {
      // console.log("mobile");
      this.room.scale.set(0.6, 0.6, 0.6);

      // First section
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(this.room.scale, {
        x: 1,
        y: 1,
        z: 1,
      });

      // Second section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.scale,
          {
            x: 1.5,
            y: 1.5,
            z: 1.5,
          },
          "same"
        )
        .to(
          this.room.position,
          {
            z: () => {
              return this.sizes.height * 0.008;
            },
          },
          "same"
        );

      // Third section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.position,
          {
            x: () => {
              return this.sizes.width * -0.01;
            },
            z: () => {
              return this.sizes.height * 0.003;
            },
          },
          "same"
        )
        .to(
          this.room.scale,
          {
            x: 2.5,
            y: 2.5,
            z: 2.5,
          },
          "same"
        );

      // Fourth section
      this.fourthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fourth-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.position,
          {
            x: () => {
              return this.sizes.width * 0.005;
            },
            z: () => {
              return this.sizes.height * -0.01;
            },
          },
          "same"
        )
        .to(
          this.room.scale,
          {
            x: 2,
            y: 2,
            z: 2,
          },
          "same"
        );
    });

    // All --------------------------------
    mm.add("all", () => {
      // Progress bar and border ------------------
      this.sections = document.querySelectorAll(".section");
      this.sections.forEach((section) => {
        this.progressWrapper = section.querySelector(".progress-wrapper");
        this.progressBar = section.querySelector(".progress-bar");

        if (section.classList.contains("right")) {
          GSAP.to(section, {
            borderTopLeftRadius: 50,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomLeftRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        } else {
          GSAP.to(section, {
            borderTopRightRadius: 50,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomRightRadius: 700,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
        GSAP.from(this.progressBar, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            pin: this.progressWrapper,
            pinSpacing: false,
          },
        });
      });

      // Shader Animation ------------------
      this.shaderTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.frameBig.children[2].material.uniforms.alpha,
          {
            value: 1.0,
          },
          "same"
        )
        .to(
          this.frameTopLeft.children[2].material.uniforms.alpha,
          {
            value: 1.0,
          },
          "same"
        )
        .to(
          this.frameBottomLeft.children[2].material.uniforms.alpha,
          {
            value: 1.0,
          },
          "same"
        );

      // Circle Animation ------------------

      // First section
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(this.circle1.scale, {
        x: 5,
        y: 5,
        z: 5,
      });

      // Second section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(this.circle2.scale, {
        x: 5,
        y: 5,
        z: 5,
      });

      // Third section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      }).to(this.circle3.scale, {
        x: 5,
        y: 5,
        z: 5,
      });

      // Door-step animation ------------------
      this.secondPartTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fourth-move",
          start: "center center",
        },
      });

      this.room.children.forEach((child) => {
        // console.log(child);
        if (child.name === "Platform") {
          this.first0 = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
          });
          this.first1 = GSAP.to(child.children[0].position, {
            x: 0,
            y: 0,
            z: 0,
            ease: "back.out(2)",
            duration: 0.3,
          });
          this.first2 = GSAP.to(child.children[1].position, {
            x: 0,
            y: 0,
            z: 0,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }

        if (child.name === "Mail_box") {
          this.second = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }

        if (child.name === "Steps") {
          this.third = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }

        if (child.name === "Steps001") {
          this.fourth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }

        if (child.name === "Steps002") {
          this.fifth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }

        if (child.name === "Lantern") {
          this.sixth = GSAP.to(child.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.3,
          });
        }
      });

      this.secondPartTimeline.add(this.first0);
      this.secondPartTimeline.add(this.first1, "first");
      this.secondPartTimeline.add(this.first2, "first");
      this.secondPartTimeline.add(this.second);
      this.secondPartTimeline.add(this.third, "-=0.2");
      this.secondPartTimeline.add(this.fourth, "-=0.2");
      this.secondPartTimeline.add(this.fifth, "-=0.2");
      this.secondPartTimeline.add(this.sixth);
    });
  }

  resize() {}

  update() {}
}
