import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/libs/tween.module.min.js'
const my_canvas = document.getElementById("scene-canvas")
const canvas_holder = document.getElementById("cholder")
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
    75, window.innerWidth / window.innerHeight,
     0.1, 1000 );

const renderer = new THREE.WebGLRenderer({canvas:my_canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
cholder.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry();
const directionalLight = new THREE.DirectionalLight()
scene.add(directionalLight)

scene.background = new THREE.Color('white')
camera.position.z = 5;
var loader = new GLTFLoader()
loader.load(lowerModel, function ( gltf ) {
    gltf.scene.scale.set(0.1,0.1,0.1)
    gltf.scene.position.set(0,0,0)
      gltf.scene.rotation.set(0, Math.PI * 2, 0)
    scene.add( gltf.scene );
  
   var   mixer_up = new THREE.AnimationMixer( gltf.scene );
    gltf.animations.forEach( ( clip ) => {
    
    var  duration = clip.duration + 2
      let animation =  mixer_up.clipAction( clip );
          mixer_up.addEventListener('finished', function(){
          animation.timeScale = 0
        })
        animation.play()
    })

  } );
function animate() {
	requestAnimationFrame( animate );
	
    renderer.render( scene, camera );
}
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
  console.log(window.innerWidth + 'x' + window.innerHeight)
    // camera.aspect = cholder.width / cholder.height;
    // camera.updateProjectionMatrix();

    // renderer.setSize(  cholder.width ,cholder.height );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render( scene, camera );
}
animate();