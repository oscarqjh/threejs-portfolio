import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);

    // camera position
    this.perspectiveCamera.position.x = 6;
    this.perspectiveCamera.position.y = 11;
    this.perspectiveCamera.position.z = 30;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 1.2,
      (this.sizes.aspect * this.sizes.frustum) / 1.2,
      this.sizes.frustum / 1.2,
      -this.sizes.frustum / 1.2,
      -50,
      50
    );
    this.scene.add(this.orthographicCamera);

    /////////////////////// helper ///////////////////////

    // const size = 20;
    // const divisions = 20;
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);

    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    /////////////////////////////////////////////////////////////////////

    // camera position , original y: 5.3
    this.orthographicCamera.position.x = 0;
    this.orthographicCamera.position.y = 3.3;
    this.orthographicCamera.position.z = 5.5;
    this.orthographicCamera.rotation.x = -Math.PI / 6;
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  resize() {
    // update perspective Camera on resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // update orthographic camera on resize
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustum) / 1.2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustum) / 1.2;
    this.orthographicCamera.top = this.sizes.frustum / 1.2;
    this.orthographicCamera.bottom = -this.sizes.frustum / 1.2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    // console.log(this.perspectiveCamera.position);
    this.controls.update();
    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
