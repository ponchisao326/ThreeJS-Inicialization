import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

// Agregamos una nueva geometría (No hace falta que sea BoxGeometry, hay mas, como pueden ser esferas, triangulos, etc...)
var geometry = new THREE.BoxGeometry(1, 1, 1);
// Asignamos el material del objeto
var material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// Creamos el objeto 3d con la geometría y el material previamente predeclarado
var cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.position.set(1, 2, 1);
// Añadimos el objeto 3D a la escena
scene.add(cube);

// Luz
var light = new THREE.DirectionalLight(0xffffff, 1, 10);
light.position.set(-1, 1, 1);
light.castShadow = true;
scene.add(light);

// Creamos un Plano
var planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.position.set(0, 0, 0);
scene.add(plane);

// Cambiamos la posición de la camara para ver el objeto y el grid
camera.position.z = 5;
camera.position.y = -3;
camera.rotation.x = .5;

// Controles
const controls = new OrbitControls(camera, renderer.domElement);

// Activar o desactivar zoom
// controls.enableZoom = false;

// Distancia minima y maxima del zoom
// controls.minDistance = 1;
// controls.maxDistance = 15;

// Click derecho
//controls.screenSpacePanning = true;

controls.enableDamping = false;
controls.enableDamping = 0.1;
controls.autoRotate = true;
controls.autoRotateSpeed = 60.0;
controls.enablePan = true;

// Limitar la rotación horizontal (si es necesario)
// controls.minAzimuthAngle = (85 * (-Math.PI / 2)) / 90; // -85 grados
// controls.maxAzimuthAngle = (85 * (Math.PI / 2)) / 90;  // 85 grados

// Creamos la funcion que renderiza el objeto y lo anima
function render() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    // required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();
