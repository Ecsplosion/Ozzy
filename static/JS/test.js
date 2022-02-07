//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js';

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/libs/tween.module.min.js'
//Button Controls
const upperBar = document.getElementById('upper-loader');
const lowerBar = document.getElementById('lower-loader');
const progressHolder= document.getElementsByClassName('progress-holder')[0]
const progressBar = document.getElementsByClassName('progress-bar')[0]
const canvas_holder = document.getElementById("cholder")
const my_canvas = document.getElementById('scene-canvas')
const showUpperRadio = document.getElementById('show-upper')
const showLowerRadio = document.getElementById('show-lower')
const playbackButton = document.getElementById('playback-button')
const responsivePane = document.getElementById('responsive-pane');

showUpperRadio.checked =true
showLowerRadio.checked =true
showUpperRadio.addEventListener('click', function(){
    showUpper()
})
showLowerRadio.addEventListener('click', function(){
    showLower()
})
   
//Camera Control
const frontViewButton = document.getElementById('frontal_view')
const leftViewButton = document.getElementById('left_view')
const rightViewButton = document.getElementById('right_view')
const topViewButton = document.getElementById('upper_view')
const lowViewButton = document.getElementById('lower_view')


//Visibility Controller

var upper_isHidden = false;
var lower_isHidden = false;
var visiblity_control, animation_control;  

var isPlaying = false

var hasFinished = false;
//EventListeners
function showUpper(){
if(showUpperRadio.checked){
    upper_isHidden = false
} else {
    upper_isHidden = true
}
}
function showLower(){
    if(showLowerRadio.checked){
        lower_isHidden = false
    } else {
        lower_isHidden = true
    }
}
const scene = new THREE.Scene()

var mixer_up,mixer_down,clock;
let delta = 0;
let fps = 25
let seconds = 2
let interval = 1/fps;
var animation_speed = 1/15
scene.background = new THREE.Color('#1a2238')
//White-ish Color: '#e8e4e1'
// const light = new THREE.SpotLight()
// light.position.set(20, 20, 20)
// scene.add(light)
clock = new THREE.Clock()
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

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.enablePan = false  
//controls.maxAzimuthAngle = Math.PI /2
//controls.maxPolarAngle = Math.PI /2



const material = new THREE.MeshPhysicalMaterial({
    color: 0xb2ffc8,
    metalness: 0.25,
    roughness: 0.1,
    opacity: 1.0,
    transparent: true,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25
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

//TWEEN
frontViewButton.addEventListener('click', function(ev){
  var cameraSettings = buttonCameraSettings[frontViewButton.id];
  updateCameraTweens(cameraSettings);
})
leftViewButton.addEventListener('click', function(){
  var cameraSettings = buttonCameraSettings[leftViewButton.id];
  updateCameraTweens(cameraSettings);  
})
rightViewButton.addEventListener('click', function(){
  var cameraSettings = buttonCameraSettings[rightViewButton.id];
  updateCameraTweens(cameraSettings);  
})
topViewButton.addEventListener('click', function(){
   
    var cameraSettings = buttonCameraSettings[topViewButton.id];
    var loading_interval = setInterval(loading, 500)
    function loading(){
    updateCameraTweens(cameraSettings);
      clearInterval(loading_interval)
      upper_isHidden = false
      lower_isHidden = true
  
  }  
})
lowViewButton.addEventListener('click', function(){
   
  var cameraSettings = buttonCameraSettings[lowViewButton.id];
  var loading_interval = setInterval(loading, 100)
  function loading(){
    upper_isHidden = true
    lower_isHidden = false
  updateCameraTweens(cameraSettings);
    clearInterval(loading_interval)
  
}
})
var positionTween = new TWEEN.Tween(camera.position)
    .easing(TWEEN.Easing.Quadratic.InOut);
var rotationTween = new TWEEN.Tween(camera.rotation)
    .easing(TWEEN.Easing.Quadratic.InOut);
function updateCameraTweens(params) {
  if (params.position) {
    positionTween.stop();
    positionTween.to(params.position, 1).start();
  }

  if (params.rotation) {
    rotationTween.stop();
    rotationTween.to(params.rotation, 1).start();
  }
}
//TWEENING
 
    var buttonCameraSettings = {
      frontal_view: {
        position: {x: 1, y: 0, z: -142},
        rotation: {x: 0, y: 0, z: 0}
      },
      left_view: {
        position: {x: 8, y: 0, z: -150},
        rotation: {x: 0, y:Math.PI/2, z: 0}
      },
      right_view: {
        position: {x: -8, y: 0, z: -150},
        rotation: {x: 0, y:-1 *  Math.PI/2, z: 0}
      },
      lower_view:{
        position: {x: 0, y: 8, z: -148},
        rotation: {x:-1.323912097082636, y:0.028129128243044775, z:0.11113760738609535}
        ,
      },
      upper_view:{
        position: {x:0,y:-8,z:-148},
        rotation: {x:1.3179576935393325,y:0.03498565656921337,z:-0.13456450231737477}
      }
  };    
//END
playbackButton.addEventListener("click", function(){
  if(!isPlaying){  
    isPlaying = true
  playbackButton.className = 'pause'
  } else if(isPlaying){
    isPlaying = false
    playbackButton.className = 'play'
  } 

   
})
var loader = new GLTFLoader()
camera.position.set(0,0,-142)

loader.load(lowerModel, function ( gltf ) {
    visiblity_control = setInterval(hideLower, 1000) 
    gltf.scene.scale.set(0.1,0.1,0.1)
    gltf.scene.position.set(0,0,-150)
   
    controls.target.copy(gltf.scene.position)
    controls.update()
    gltf.scene.rotation.set(0, Math.PI * 2, 0)
    scene.add( gltf.scene );
  
    function hideLower (){  
        if(!lower_isHidden){
            gltf.scene.visible = true
    } else {
        gltf.scene.visible = false
    }
    }
    Array.prototype.max = function() {
      return Math.max.apply(null, this);
    };
    mixer_up = new THREE.AnimationMixer( gltf.scene );
    gltf.animations.forEach( ( clip ) => {
    
    var  duration = clip.duration + 2
      let animation =  mixer_up.clipAction( clip );
          mixer_up.addEventListener('finished', function(){
            isPlaying = false
          hasFinished = true
          animation.timeScale = 0
          playbackButton.className = 'play'
        })
        var i = 0 
        // var progressControl = setInterval(progressIncrease, 100)
        // function progressIncrease(){
        //   if(isPlaying){
        //     i++;
        //     progressBar.style.width = `${i}%`            
        //   }
        // }
    
        let meth = animation.time/clip.duration
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

  },
	// called while loading is progressing
	function ( xhr ) {

	
    var percentLoaded = xhr.loaded / xhr.total * 100
    if(lowerBar){
      //${(xhr.loader / xhr.total * 100)}%
    lowerBar.setAttribute("style", `width:${percentLoaded}%;`)
    } else {
      console.log('Not Found')
    }
    },
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	} );
  loader.load(upperModel, function ( gltf ) {
    visiblity_control = setInterval(hideUpper, 1000)
    gltf.scene.scale.set(0.1,0.1,0.1)
    gltf.scene.position.set(0,0,-150)
    scene.add( gltf.scene);
  
    var my_object = scene.getObjectByName("15", true)

    function hideUpper(){
        
        if(!upper_isHidden){
        gltf.scene.visible = true
    } else {
        gltf.scene.visible = false
    }
    }
    mixer_down = new THREE.AnimationMixer( gltf.scene );
    
    gltf.animations.forEach( ( clip ) => {
       let animation =  mixer_down.clipAction( clip );
       
       mixer_down.addEventListener('finished', function(){
        isPlaying = false
      hasFinished = true
      animation.timeScale = 0
      playbackButton.className = 'play'
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

  },
	// called while loading is progressing
	function ( xhr ) {
	
    var percentLoaded = xhr.loaded / xhr.total * 100
    if(upperBar){
      //${(xhr.loader / xhr.total * 100)}%
    upperBar.setAttribute("style", `width:${percentLoaded}%;`)
    
    } else {
      console.log('Not Found')
    }
    },
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	} );
  
  
// canvas_holder.addEventListener('resize', function(){ 
//   my_canvas.setAttribute("style", `max-height:${canvas_holder.offsetHeight}; max-width:${canvas_holder.offsetWidth} `);
//   console.log('Window Resized')
// }
//)
function responsewrtwidth(){
  if(window.innerWidth >= 768){
    responsivePane.className = 'right-pane'
  } else {
    responsivePane.className = 'lower-pane'
  }
}
responsewrtwidth()
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  responsewrtwidth()
  
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
   if ( mixer_up ) mixer_up.update( delta );
   if ( mixer_down ) mixer_down.update( delta );
 
 

}

function render() {
  TWEEN.update()
    renderer.render(scene, camera)
}

animate()