import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xe0cb7b,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.4;
    this.plane.receiveShadow = true;

    this.scene.add(this.plane);
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 64);
    const material1 = new THREE.MeshStandardMaterial({ color: 0x435b66 });
    const material2 = new THREE.MeshStandardMaterial({ color: 0xf6f4eb });
    const material3 = new THREE.MeshStandardMaterial({ color: 0x8395cd });

    // circle 1
    this.circle1 = new THREE.Mesh(geometry, material1);
    this.circle1.position.y = -0.39;
    this.circle1.scale.set(0, 0, 0);
    this.circle1.rotation.x = -Math.PI / 2;
    this.circle1.receiveShadow = true;

    // circle 2
    this.circle2 = new THREE.Mesh(geometry, material2);
    this.circle2.position.y = -0.38;
    this.circle2.position.x = 3;
    this.circle2.scale.set(0, 0, 0);
    this.circle2.rotation.x = -Math.PI / 2;
    this.circle2.receiveShadow = true;

    // circle 3
    this.circle3 = new THREE.Mesh(geometry, material3);
    this.circle3.position.y = -0.37;
    this.circle3.position.x = -2;
    this.circle3.position.z = 3;
    this.circle3.scale.set(0, 0, 0);
    this.circle3.rotation.x = -Math.PI / 2;
    this.circle3.receiveShadow = true;

    this.scene.add(this.circle1);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
  }

  resize() {}

  update() {}
}
