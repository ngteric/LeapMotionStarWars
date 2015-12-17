// CREATE SCENE THREE
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set( 0, 200, 200 );

var canvas = document.getElementById('scene');
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;

var renderer = new THREE.WebGLRenderer({
	antialias:true,
	canvas: canvas
});

renderer.setSize(window.innerWidth, window.innerHeight);

// RESIZE
onResize = function() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', onResize, false);

// LIGHT 
var light = new THREE.PointLight(0xffffff, 5, 1000);
light.position.set(0, 200, 0);
scene.add(light);

// MODEL TIE FIGHTER
var tieFighterLoader = new THREE.JSONLoader();
generateTieFighter(tieFighterLoader,-27,210,175);
generateTieFighter(tieFighterLoader,27,210,175);

// MODEL HAND 
var handLoader = new THREE.JSONLoader();
generateHandDemo(handLoader);

// COMETS BACKGROUND
var cometsGroupBackground = new THREE.Object3D();
var cometsGroupBackground2 = new THREE.Object3D();
cometsBackground(cometsGroupBackground);
cometsBackground(cometsGroupBackground2);
scene.add( cometsGroupBackground );
scene.add( cometsGroupBackground2 );
cometsGroupBackground2.position.z = -4000;

// STARS BACKGROUND
var starsGroup = new THREE.Object3D();
var starsGroup2 = new THREE.Object3D();
starsBackground(starsGroup);
starsBackground(starsGroup2);
scene.add( starsGroup );
scene.add( starsGroup2 );
starsGroup2.position.z = -2000;

// COMET INTERACTION
var cometInteractionLoader = new THREE.TextureLoader();
var redComet = cometInteraction(cometInteractionLoader,0xff0000);
var greenComet = cometInteraction(cometInteractionLoader,0x00ff00);
redComet.position.z = -2000;
greenComet.position.z = -2800;
scene.add(redComet);
scene.add(greenComet);

// FEEDBACK
var planeGeo;
var planeMaterial;
var plane;
var hitFeedbackLoader = new THREE.TextureLoader();
hitFeedbackLoader.load('texture/feedback.png', function ( texture ) {
	planeGeo = new THREE.PlaneBufferGeometry(10,10,10);
	planeMaterial = new THREE.MeshBasicMaterial( {map: texture, transparent:true} );
	plane = new THREE.Mesh( planeGeo, planeMaterial );
	plane.position.set(0,200,197);
});

// TIE FIGHTER SHOT
var shots = [];

// EXPLOSION
var clock = new THREE.Clock();
var hit = false;
function render(){
	renderer.render( scene, camera );
	requestAnimationFrame( render );
	for (var i = 0, len = shots.length; i < len; i++) {
				shots[i].position.z -= 10;

				if(shots[i].position.z  <=  greenComet.position.z){
					explosion();
					cube.position.z = greenComet.position.z;
					scene.remove( hand2 );
					hit = true;
					greenComet.position.z = -2000;
				}
				if (shots[i].position.z < -1000) {
					scene.remove(shots[i]);
					shots.splice(i, 1);
					len--;
				}
			}
	if (hit == true){
		// Explosion
		var delta = clock.getDelta(); 
		boomer.update(1000 * delta);
		setTimeout(function(){ scene.remove(cube); hit = false;},1000);
	}

	renderBackground(starsGroup,starsGroup2, cometsGroupBackground, cometsGroupBackground2);
	renderCometInteraction(redComet,greenComet);
	renderHandDemo(hand,hand2);
}

// LEAP MOTION CONTROL
function leapInit(){
	var leapOptions = {enableGestures : true};

	Leap.loop(leapOptions,function(frame){
	frame.gestures.forEach(function(gesture){
			switch(gesture.type){
				case "swipe":
				if(redComet.position.z > -700){
					swipeGesture(frame);
					$('.swipe').jWebAudio('play');
				}
				break;
				case "keyTap":
					shots.push(createShot());
					$('.fire').jWebAudio('play');	
				break;
			}
		});
	}).use('screenPosition');

	Leap.loopController.use('boneHand', {
	    scene: scene,
	    boneColor:	(new THREE.Color).setHex(0xffffff)	,
		jointColor:	(new THREE.Color).setHex(0xffffff)	,
	    arm: true
	  });
}

leapInit();


