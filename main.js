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
scene.background = new THREE.Color('#000000');

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2.5, 6);
camera.lookAt(0, 1.5, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 1.5, 0);

// Lights
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// Cornell box dimensions
const W = 4;   // width (X)
const H = 4;   // height (Y)
const D = 4;   // depth (Z)

// Materials
const whiteMat = new THREE.MeshStandardMaterial({ color: '#cccccc', roughness: 0.9, metalness: 0.0, side: THREE.DoubleSide });
const redMat = new THREE.MeshStandardMaterial({ color: '#cc3333', roughness: 0.8, metalness: 0.0, side: THREE.DoubleSide });
const greenMat = new THREE.MeshStandardMaterial({ color: '#33aa33', roughness: 0.8, metalness: 0.0, side: THREE.DoubleSide });
const yellowPastelMat = new THREE.MeshStandardMaterial({ color: '#fdfd96', roughness: 0.8, metalness: 0.0, side: THREE.DoubleSide });

// Floor
const floorGeo = new THREE.PlaneGeometry(W, D);
const floor = new THREE.Mesh(floorGeo, whiteMat);
floor.rotation.x = -Math.PI / 2;
floor.position.set(0, 0, 0);
floor.receiveShadow = true;
scene.add(floor);

// Back wall
const backGeo = new THREE.PlaneGeometry(W, H);
const back = new THREE.Mesh(backGeo, whiteMat);
back.position.set(0, H / 2, -D / 2);
back.receiveShadow = true;
scene.add(back);

// Left wall
const leftGeo = new THREE.PlaneGeometry(D, H);
const left = new THREE.Mesh(leftGeo, redMat);
left.rotation.y = Math.PI / 2;
left.position.set(-W / 2, H / 2, 0);
left.receiveShadow = true;
scene.add(left);

// Right wall
const rightGeo = new THREE.PlaneGeometry(D, H);
const right = new THREE.Mesh(rightGeo, greenMat);
right.rotation.y = -Math.PI / 2;
right.position.set(W / 2, H / 2, 0);
right.receiveShadow = true;
scene.add(right);

// Ceiling
const ceilGeo = new THREE.PlaneGeometry(W, D);
const ceil = new THREE.Mesh(ceilGeo, yellowPastelMat);
ceil.rotation.x = Math.PI / 2;
ceil.position.set(0, H, 0);
ceil.receiveShadow = true;
scene.add(ceil);

// Ceiling light geometry
const lightGeo = new THREE.BoxGeometry(0.6, 0.1, 0.6);
const lightMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3, metalness: 0.0, emissive: '#ffffff', emissiveIntensity: 0.5 });
const lightMesh = new THREE.Mesh(lightGeo, lightMat);
lightMesh.position.set(0, H - 0.05, 0);
scene.add(lightMesh);

const ceilingLight = new THREE.PointLight('#ffffff', 40, 30);
ceilingLight.position.set(0, H - 0.2, 0);
ceilingLight.castShadow = true;
ceilingLight.shadow.mapSize.set(1024, 1024);
ceilingLight.shadow.camera.near = 0.1;
ceilingLight.shadow.camera.far = 20;
scene.add(ceilingLight);

// Sphere inside
const sphereGeo = new THREE.SphereGeometry(0.5, 64, 64);
const sphereMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.1, metalness: 0.9 });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(0.5, 0.5, 0.5);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
