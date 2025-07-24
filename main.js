import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/webxr/ARButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Botón para activar AR
document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

// Cargar modelos
const loader = new GLTFLoader();

// Modelo 1
loader.load('models/AV-7.glb', gltf => {
  const model1 = gltf.scene;
  model1.position.set(1, 0, -1);  // Coordenadas X, Y, Z
  scene.add(model1);
});

function animate() {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

animate();
