import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Crear la escena
var scene = new THREE.Scene();

// Crear la camara
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Crear el renderer con WebGL
var renderer = new THREE.WebGLRenderer({ alpha: true }); // Fondo transparente: alpha: true:
// Asignar el tamaño del render
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// Asignamos donde va a estar el objeto 3D
document.body.appendChild(renderer.domElement);

// Luz
var light = new THREE.DirectionalLight(0xffffff, 1, 10);
light.position.set(0, 0, 1);
light.castShadow = true;
light.shadow.mapSize.width = 1024; // Aumenta la resolución del mapa de sombras
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 100;
light.shadow.camera.left = -50;
light.shadow.camera.right = 50;
light.shadow.camera.top = 50;
light.shadow.camera.bottom = -50;
scene.add(light);

// Creamos un Plano
var planeGeometry = new THREE.PlaneGeometry(70, 70, 32, 32);
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.position.set(0, 0, -30);
scene.add(plane);

// Cambiamos la posición de la camara para ver el objeto y el grid
camera.position.z = 45;
camera.position.y = 45;
camera.rotation.x = 45;

// Controles
const controls = new OrbitControls(camera, renderer.domElement);

// Activar o desactivar zoom
// controls.enableZoom = false;

// Distancia minima y maxima del zoom
// controls.minDistance = 1;
// controls.maxDistance = 15;

// Click derecho
//controls.screenSpacePanning = true;


controls.enableDamping = 0.1;
controls.autoRotate = false;
controls.autoRotateSpeed = 60.0;
controls.enablePan = true;

// Limitar la rotación horizontal (si es necesario)
// controls.minAzimuthAngle = (85 * (-Math.PI / 2)) / 90; // -85 grados
// controls.maxAzimuthAngle = (85 * (Math.PI / 2)) / 90;  // 85 grados

const loader = new GLTFLoader();

let loadedModel = null; // Variable global para el modelo

loader.load('model.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    loadedModel = gltf.scene; // Guarda la referencia del modelo cargado
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});



// Creamos la funcion que renderiza el objeto y lo anima
function render() {

    if (loadedModel) {

        loadedModel.rotation.y += 0.01;
        loadedModel.rotation.z += 0.01
    }
    
    // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();
