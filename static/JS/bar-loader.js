//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js';
console.log('Script Loaded Bar Loader')
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
//Button Controls
const upperBar = document.getElementById('upper-loader');
const lowerBar = document.getElementById('lower-loader');
const canvas_holder = document.getElementById("bholder")
const playbackButton = document.getElementById('playback-button')
const my_canvas = document.getElementById('bar-canvas')
const scene = new THREE.Scene()
var mixer, animation_control;
let delta = 0;
let fps = 25
let seconds = 2
let interval = 1/fps;
var animation_speed = 1/15
var isPlaying = false
var hasFinished = false;
scene.background = new THREE.Color('#1a2238')
var clock = new THREE.Clock()
const camera = new THREE.PerspectiveCamera(
    75,
    canvas_holder.offsetWidth/ canvas_holder.offsetHeight,
    0.5,
    1000
)
const renderer = new THREE.WebGLRenderer({canvas: my_canvas})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(canvas_holder.offsetWidth, canvas_holder.offsetHeight)
canvas_holder.appendChild(renderer.domElement)

//controls.maxAzimuthAngle = Math.PI /2
//controls.maxPolarAngle = Math.PI /2

playbackButton.addEventListener("click", function(){
    if(!isPlaying){  
      isPlaying = true
    playbackButton.className = 'pause'
    } else if(isPlaying){
      isPlaying = false
      playbackButton.className = 'play'
    } 
  
     
  })

var positionSet = (object) => {
    object.position.set(0,0,0)
     object.scale.set(0.1,0.1,0.1)
     object.rotation.x =-1 * ( Math.PI / 2)
 }

const spotLight = new THREE.RectAreaLight(0xffffff, 1,window.innerWidth,window.innerHeight );
spotLight.position.set( 0, 0, -100);
scene.add( spotLight );
const pointLight = new THREE.RectAreaLight( 0xffffff, 1,1000,1000)
pointLight.position.set(10,10,-120)
pointLight.rotation.y = Math.PI/2.6
scene.add(pointLight)

var loader = new GLTFLoader()
camera.position.set(0,0,-142)

loader.load(lowerbart, function ( gltf ) {
    gltf.scene.scale.set(0.8,0.1,0.1)
    gltf.scene.position.set(0,0,-150)   
    gltf.scene.rotation.set(0, 0 , 0)
    console.log('Bar Scene' + gltf.scene)
    scene.add( gltf.scene );
    mixer = new THREE.AnimationMixer( gltf.scene );
    gltf.animations.forEach( ( clip ) => { 
      let animation =  mixer.clipAction( clip );
      mixer.addEventListener('finished', function(){
        isPlaying = false
        hasFinished = true
        animation.timeScale = 0

    })
    animation_control = setInterval(animation_play, 100)
    function playmyAnim(){
     
     animation.setLoop(THREE.LoopOnce)
     animation.clampWhenFinished = true;
     animation.timeScale = animation_speed
       
       animation.setDuration(2).play()
         }
   
    function animation_play(){
     if(isPlaying && !hasFinished){
       playmyAnim()
     }
     if(!isPlaying && !hasFinished){
       animation.timeScale = 0
     }
     //Click will set it to isPlaying. So this will function will execute only if it has finished before 
     if(isPlaying && hasFinished){
       animation.reset()
       animation.reset()
       animation.reset()
       
       var newInterval = setInterval(waitAndRun, 100)
       function waitAndRun(){
         clearInterval(newInterval) // STEP ADDED
         if(isPlaying){
         playmyAnim()
         }
         hasFinished = false
       }

     }
 }
 } );

}); 
  
// canvas_holder.addEventListener('resize', function(){ 
//   my_canvas.setAttribute("style", `max-height:${canvas_holder.offsetHeight}; max-width:${canvas_holder.offsetWidth} `);
//   console.log('Window Resized')
// }
//)
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {

  
  camera.aspect = canvas_holder.offsetWidth / canvas_holder.offsetHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( canvas_holder.offsetWidth, canvas_holder.offsetHeight );
    renderer.setPixelRatio(window.devicePixelRatio);
    render()
}
function animate() {
    requestAnimationFrame( animate );
    
    delta += clock.getDelta();
    if (delta  > interval) {
        // The draw or time dependent code are here
   
         render()
        delta = delta % interval;

    }
  //console.log('Camera At: '+camera.position.x + ',' +camera.position.y +','+ camera.position.z)
  //console.log('Camera Rotation: '+camera.rotation.x + ',' +camera.rotation.y +','+ camera.rotation.z )
   if ( mixer) mixer.update( delta );
}

function render() {

    renderer.render(scene, camera)
}

animate()