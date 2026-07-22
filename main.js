import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('webgl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#1a1a2e');

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 6);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight('#404060', 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#ffffff', 1.2);
directionalLight.position.set(5, 8, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);

const pointLight = new THREE.PointLight('#e07020', 2, 15);
pointLight.position.set(-2, 3, 2);
pointLight.castShadow = true;
scene.add(pointLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: '#2a2a3e',
  roughness: 0.8,
  metalness: 0.2,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: '#4a90d9',
  roughness: 0.4,
  metalness: 0.6,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.5, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);

const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: '#d94a4a',
  roughness: 0.3,
  metalness: 0.7,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 0.5, -1);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

const torusGeometry = new THREE.TorusGeometry(0.4, 0.15, 32, 64);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: '#4ad9a0',
  roughness: 0.3,
  metalness: 0.8,
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-2, 1, 0);
torus.castShadow = true;
torus.receiveShadow = true;
scene.add(torus);

const cylinderGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial({
  color: '#d9a04a',
  roughness: 0.5,
  metalness: 0.5,
});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(1.5, 0.6, 2);
cylinder.castShadow = true;
cylinder.receiveShadow = true;
scene.add(cylinder);

const coneGeometry = new THREE.ConeGeometry(0.4, 1, 32);
const coneMaterial = new THREE.MeshStandardMaterial({
  color: '#a04ad9',
  roughness: 0.4,
  metalness: 0.6,
});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.set(-1.5, 0.5, 2);
cone.castShadow = true;
cone.receiveShadow = true;
scene.add(cone);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  box.rotation.x = elapsed * 0.5;
  box.rotation.y = elapsed * 0.3;
  box.position.y = 0.5 + Math.sin(elapsed) * 0.3;

  sphere.position.y = 0.5 + Math.sin(elapsed * 1.5 + 1) * 0.3;
  sphere.rotation.y = elapsed * 0.4;

  torus.rotation.x = elapsed * 0.6;
  torus.rotation.y = elapsed * 0.8;
  torus.position.y = 1 + Math.sin(elapsed * 1.2 + 2) * 0.2;

  cylinder.rotation.y = elapsed * 0.3;
  cylinder.position.y = 0.6 + Math.sin(elapsed * 0.8 + 3) * 0.2;

  cone.rotation.y = elapsed * 0.5;
  cone.position.y = 0.5 + Math.sin(elapsed * 1.1 + 4) * 0.25;

  controls.update();

  pointLight.position.x = Math.sin(elapsed) * 4;
  pointLight.position.z = Math.cos(elapsed) * 4;

  renderer.render(scene, camera);
}

animate();
