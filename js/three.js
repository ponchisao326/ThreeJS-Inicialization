import * as THREE from 'three';

// Crear la escena
const scene = new THREE.Scene();
// Crear la camara
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Crear el renderer con WebGL
const renderer = new THREE.WebGLRenderer();
// Asignar el tamaño del render
renderer.setSize( window.innerWidth, window.innerHeight );
// Asignamos donde va a estar el objeto 3D
document.body.appendChild( renderer.domElement );

// Agregamos una nueva geometría (No hace falta que sea BoxGeometry, hay mas, como pueden ser esferas, triangulos, etc...)
const geometry = new THREE.BoxGeometry();
// Asignamos el material del objeto
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// Creamos el objeto 3d con la geometría y el material previamente predeclarado
const cube = new THREE.Mesh(geometry, material);
// Añadimos el objeto 3D a la escena
scene.add(cube);

// Cambiamos la posición de la camara para ver el objeto
camera.position.z = 5;

// Creamos la funcion que renderiza el objeto y lo anima
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();