import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/libs/tween.module.min.js'
const my_canvas = document.getElementById("scene-canvas")
const canvas_holder = document.getElementById("cholder")
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
    75, cholder.width / cholder.height,
     0.1, 1000 );

const renderer = new THREE.WebGLRenderer({canvas:my_canvas});
renderer.setSize( cholder.width, cholder.height );
cholder.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry();
const directionalLight = new THREE.DirectionalLight()
scene.add(directionalLight)
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
scene.background = new THREE.Color('white')
camera.position.z = 5;
function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    // camera.aspect = cholder.width / cholder.height;
    // camera.updateProjectionMatrix();

    // renderer.setSize(  cholder.width ,cholder.height );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
animate();