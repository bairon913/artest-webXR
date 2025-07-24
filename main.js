import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/webxr/ARButton.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// 🔘 Botón para activar AR sin hit-test, con piso local
document.body.appendChild(ARButton.createButton(renderer, {
  optionalFeatures: ['local-floor', 'bounded-floor']
}));

// 💡 Luz ambiental para que el modelo se vea bien
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

// 📦 Cargar modelo al iniciar la sesión AR
const loader = new GLTFLoader();

renderer.xr.addEventListener('sessionstart', () => {
  loader.load('models/AV-7.glb', gltf => {
    const model = gltf.scene;
    model.position.set(1, 0, -1);  // Coordenadas X, Y, Z
    model.lookAt(0, 0, 0);         // Orienta hacia el centro
    scene.add(model);
  });
});

// 🎬 Render loop
function animate() {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, renderer.xr.getCamera());
  });
}

animate();
