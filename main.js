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

// Pillars with spheres on top

// Pillar 1 - short, front left
const p1Geo = new THREE.BoxGeometry(0.6, 1.2, 0.6);
const p1Mat = new THREE.MeshStandardMaterial({ color: '#e74c3c', roughness: 0.4, metalness: 0.5 });
const p1 = new THREE.Mesh(p1Geo, p1Mat);
p1.position.set(-1.3, 0.6, 1.0);
p1.castShadow = true;
p1.receiveShadow = true;
scene.add(p1);

const s1Geo = new THREE.SphereGeometry(0.35, 64, 64);
const s1 = new THREE.Mesh(s1Geo, new THREE.MeshStandardMaterial({ color: '#f1c40f', roughness: 0.1, metalness: 0.9 }));
s1.position.set(-1.3, 1.55, 1.0);
s1.castShadow = true;
s1.receiveShadow = true;
scene.add(s1);

// Pillar 2 - medium, center
const p2Geo = new THREE.BoxGeometry(0.6, 2.0, 0.6);
const p2Mat = new THREE.MeshStandardMaterial({ color: '#2ecc71', roughness: 0.4, metalness: 0.5 });
const p2 = new THREE.Mesh(p2Geo, p2Mat);
p2.position.set(0.2, 1.0, 0.0);
p2.castShadow = true;
p2.receiveShadow = true;
scene.add(p2);

const s2Geo = new THREE.SphereGeometry(0.35, 64, 64);
const s2 = new THREE.Mesh(s2Geo, new THREE.MeshStandardMaterial({ color: '#9b59b6', roughness: 0.1, metalness: 0.9 }));
s2.position.set(0.2, 2.35, 0.0);
s2.castShadow = true;
s2.receiveShadow = true;
scene.add(s2);

// Pillar 3 - tall, back right
const p3Geo = new THREE.BoxGeometry(0.6, 2.8, 0.6);
const p3Mat = new THREE.MeshStandardMaterial({ color: '#3498db', roughness: 0.4, metalness: 0.5 });
const p3 = new THREE.Mesh(p3Geo, p3Mat);
p3.position.set(1.3, 1.4, -0.8);
p3.castShadow = true;
p3.receiveShadow = true;
scene.add(p3);

const s3Geo = new THREE.SphereGeometry(0.35, 64, 64);
const s3 = new THREE.Mesh(s3Geo, new THREE.MeshStandardMaterial({ color: '#e67e22', roughness: 0.1, metalness: 0.9 }));
s3.position.set(1.3, 3.15, -0.8);
s3.castShadow = true;
s3.receiveShadow = true;
scene.add(s3);

// Small moving spheres with lights
const movingSpheres = [];
const sphereCount = 8;
const sphereColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#88ff00'];
const limit = 1.7;

for (let i = 0; i < sphereCount; i++) {
  const geo = new THREE.SphereGeometry(0.03, 32, 32);
  const mat = new THREE.MeshStandardMaterial({
    color: sphereColors[i],
    emissive: sphereColors[i],
    emissiveIntensity: 1.2,
    roughness: 0.2,
    metalness: 0.8
  });
  const sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);

  const light = new THREE.PointLight(sphereColors[i], 2, 4);
  scene.add(light);

  // Each sphere has unique path parameters
  movingSpheres.push({
    mesh: sphere,
    light: light,
    speedX: 1.5 + Math.random() * 2.0,
    speedY: 1.0 + Math.random() * 1.5,
    speedZ: 1.2 + Math.random() * 1.8,
    offset: Math.random() * Math.PI * 2,
    radiusX: 0.5 + Math.random() * 1.0,
    radiusZ: 0.5 + Math.random() * 1.0,
    baseY: 0.3 + Math.random() * 2.5,
    amplitudeY: 0.3 + Math.random() * 0.8
  });
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  movingSpheres.forEach((s) => {
    const x = Math.sin(t * s.speedX + s.offset) * s.radiusX;
    const z = Math.cos(t * s.speedZ + s.offset * 1.3) * s.radiusZ;
    const y = s.baseY + Math.sin(t * s.speedY + s.offset * 0.7) * s.amplitudeY;

    s.mesh.position.x = Math.max(-limit, Math.min(limit, x));
    s.mesh.position.z = Math.max(-limit, Math.min(limit, z));
    s.mesh.position.y = Math.max(0.1, Math.min(H - 0.1, y));

    s.light.position.copy(s.mesh.position);
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();
