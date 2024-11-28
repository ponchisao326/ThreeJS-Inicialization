import * as THREE from 'three';

// Crear la escena
const scene = new THREE.Scene();
// Agregamos backgrounds

/*Fondo de X color: */ // scene.background = new THREE.Color(0x666666);

// Crear la camara
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Crear el renderer con WebGL
const renderer = new THREE.WebGLRenderer({alpha: true}); // Fondo transparente: alpha: true:
// Asignar el tamaño del render
renderer.setSize( window.innerWidth, window.innerHeight );
// Asignamos donde va a estar el objeto 3D
document.body.appendChild( renderer.domElement );

// Agregamos una nueva geometría (No hace falta que sea BoxGeometry, hay mas, como pueden ser esferas, triangulos, etc...)
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Asignamos el material del objeto
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// Creamos el objeto 3d con la geometría y el material previamente predeclarado
const cube = new THREE.Mesh(geometry, material);
// Añadimos el objeto 3D a la escena
scene.add(cube);

// Creamos el grid del suelo
var grid = new THREE.GridHelper(100, 10);
scene.add(grid);

// Cambiamos la posición de la camara para ver el objeto y el grid
camera.position.z = 15;
camera.position.y = -10;
camera.rotation.y = -10;
camera.rotation.x = 10

// Creamos la funcion que renderiza el objeto y lo anima
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();