// GENERATE TIE FIGHTER
function generateTieFighter(loader,x,y,z){
	var material;
	var object;
	loader.load('model/tiefighter.json', function ( geometry ,materials ) {
		material = new THREE.MeshFaceMaterial( materials );
		object = new THREE.Mesh( geometry,material );
		scene.add( object );
		object.position.x =x;
		object.position.y =y;
		object.position.z =z;
	});

	loader.load('model/tiefighter.json', function ( geometry ,materials ) {
		material = new THREE.MeshFaceMaterial( materials );
		object = new THREE.Mesh( geometry,material );
		scene.add( object );
		object.position.x =x;
		object.position.y =y;
		object.position.z =z;
	});
}

// GENERATE HAND
function generateHandDemo(loader){
	loader.load('model/hand.json', function ( geometry ,materials ) {
		var material = new THREE.MeshFaceMaterial( materials );
		hand = new THREE.Mesh( geometry,material );
		hand.position.x =10;
		hand.position.y =190;
		hand.position.z =175;
		hand.rotation.x = 0.8;
		hand.rotation.y = 3;
	});

	loader.load('model/hand.json', function ( geometry ,materials ) {
		var material = new THREE.MeshFaceMaterial( materials );
		hand2 = new THREE.Mesh( geometry,material );
		hand2.position.x =10;
		hand2.position.y =200;
		hand2.position.z =175;
		hand2.rotation.y = 3;
	});
}

// RENDER HAND 
function renderHandDemo(hand,hand2){
	// HAND TUTO
	hand.position.x -= 1;
	if(hand.position.x ==-10){
		hand.position.x =10;
	}
	hand2.position.y -= 0.50;
	if(hand2.position.y ==190){
		hand2.position.y =200;
	}
}

// GENERATE COMETS BACKGROUND
function cometsBackground(groupComets){
	var loader = new THREE.TextureLoader();
	var cometGeo;
	var cometMaterial;
	var comet;
	for(var i = 0; i < 70; i++){
		loader.load('texture/comet2.png', function ( texture ) {
			if(0 <= i <= 35){
				cometGeo = new THREE.TetrahedronGeometry( Math.random() * 50, 1 );
				cometMaterial = new THREE.MeshPhongMaterial({ map: texture });
				comet = new THREE.Mesh(cometGeo, cometMaterial);
				comet.position.z = -Math.random() * 4000;

				var posY = Math.random() * (1500 - (-1500)) - 1500;
				var posX = Math.random() * (1500 - (-1500)) - 1500;
				if( -750 < posX < 750 || -750 < posY < 750){
					comet.position.x = posX;
					comet.position.y = posY;
				}
				groupComets.add( comet );
			}
			if(35 < i <= 70){
				cometGeo = new THREE.SphereGeometry( Math.random() * 60, 5, 5 );
				cometMaterial = new THREE.MeshPhongMaterial({ map: texture });
				comet = new THREE.Mesh(cometGeo, cometMaterial);
				comet.position.z = -Math.random() * 4000;

				var posY = Math.random() * (1500 - (-1500)) - 1500;
				var posX = Math.random() * (1500 - (-1500)) - 1500;
				if( -750 < posX < 750 || -750 < posY < 750){
					comet.position.x = posX;
					comet.position.y = posY;
				}
				groupComets.add( comet );
			}
			if(80 < i <= 120){
				cometGeo = new THREE.IcosahedronGeometry( Math.random() * 60, 0 );
				cometMaterial = new THREE.MeshPhongMaterial({ map: texture });
				comet = new THREE.Mesh(cometGeo, cometMaterial);
				comet.position.z = -Math.random() * 4000;

				var posY = Math.random() * (1500 - (-1500)) - 1500;
				var posX = Math.random() * (1500 - (-1500)) - 1500;
				if( -750 < posX < 750 || -750 < posY < 750){
					comet.position.x = posX;
					comet.position.y = posY;
				}
				groupComets.add( comet );
			}
		});

	};
}

// GENERATE STARS BACKGROUND
function starsBackground(groupStar){
	var starGeo;
	var starMaterial;
	var star;
	for (var i = 0; i < 1000; i++) {
		starGeo = new THREE.BoxGeometry (1,1,10);
		starMaterial = new THREE.LineBasicMaterial({color:0xffffff});
		star = new THREE.Mesh(starGeo, starMaterial);
		star.position.z = -Math.random() * 2000;
		star.position.y = Math.random() * (1500 - (-1500)) - 1500;
		star.position.x =Math.random() * (1500 - (-1500)) - 1500;
		groupStar.add( star );
	};
}

// RENDER BACKGROUND
function renderBackground(starsGroup,starsGroup2, cometsGroupBackground, cometsGroupBackground2){
	// Star
	starsGroup.position.z += 10;
	if(starsGroup.position.z == 2000){
		starsGroup.position.z = -2000;
	}
	starsGroup2.position.z += 10;
	if(starsGroup2.position.z == 2000){
		starsGroup2.position.z = -2000;
	}

	cometsGroupBackground.position.z += 10;
	if(cometsGroupBackground.position.z == 4000){
		cometsGroupBackground.position.z = -4000;
	}
	cometsGroupBackground2.position.z += 10;
	if(cometsGroupBackground2.position.z == 4000){
		cometsGroupBackground2.position.z = -4000;
	}

	// Rotation Comet Background
	for(var a = 0; a < cometsGroupBackground.children.length; a++){
		cometsGroupBackground.children[a].rotation.x += 0.01;
		cometsGroupBackground.children[a].rotation.y += 0.01;
	}
	for(var a = 0; a < cometsGroupBackground2.children.length; a++){
		cometsGroupBackground2.children[a].rotation.x += 0.01;
		cometsGroupBackground2.children[a].rotation.y += 0.01;
	}
}
// GENERATE COMET INTERACT
function cometInteraction(loader,color){
	var comet = new THREE.Object3D();
	// COMET TO SWIPE 
	var customMaterial = new THREE.ShaderMaterial({
		    uniforms: 
			{ 
				"c":   { type: "f", value: 0.5},
				"p":   { type: "f", value: 4 },
				glowColor: { type: "c", value: new THREE.Color(color) },
				viewVector: { type: "v3", value: camera.position }
			},
			vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
			fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
			side: THREE.FrontSide,
			blending: THREE.AdditiveBlending,
			transparent: true
	});
	loader.load('texture/comet2.png', function ( texture ) {
				// do something with the texture
			var geometry = new THREE.SphereGeometry( Math.round(Math.random() * 60), 5, 5 );
			var material = new THREE.MeshPhongMaterial( { map: texture} );
			comet1 = new THREE.Mesh( geometry, material );
			comet1.position.y = 200;
			comet1Glow = new THREE.Mesh( geometry.clone(), customMaterial.clone() );
			comet1Glow.position.y =	200;
			comet1Glow.scale.multiplyScalar(1.5);
			comet.add(comet1);
			comet.add(comet1Glow);
			}
	);
	return comet;
}

// RENDER COMET INTERACTION
function renderCometInteraction(redComet,greenComet){
	redComet.position.z += 7;
	if(redComet.position.z > 200){		
		redComet.position.x = 0;
		redComet.position.y = 0;
		redComet.position.z = -2000;
		scene.remove( hand );
	}
	if(redComet.position.z > -700){
		scene.add( hand );
	}
	if(redComet.position.z >= 198 && redComet.position.x < 100 && redComet.position.x > -100 && redComet.position.y < 100 && redComet.position.y > -100){
		hitFeedback();
		scene.remove( hand );
	}

	greenComet.position.z += 6;
	if(greenComet.position.z > 200){		
		greenComet.position.x = 0;
		greenComet.position.y = 0;
		greenComet.position.z = -2800;
		scene.remove(hand2);
	}
	// HAND 
	if(greenComet.position.z > -700){
		scene.add(hand2);
	}
	if(greenComet.position.z >= 198 && greenComet.position.x < 100 && greenComet.position.x > -100 && greenComet.position.y < 100 && greenComet.position.y > -100){
		hitFeedback();
		scene.remove(hand2);
	}

	for(var a = 0; a < redComet.children.length; a++){
		redComet.children[a].rotation.x += 0.01;
		redComet.children[a].rotation.y += 0.01;
	}
	for(var a = 0; a < greenComet.children.length; a++){
		greenComet.children[a].rotation.x += 0.01;
		greenComet.children[a].rotation.y += 0.01;
	}
}

// GENERATE THE FEEDBACK WHEN YOU ARE HIT BY A COMET
function hitFeedback(){
	scene.add( plane );
	var shake = true;
		setInterval(function(){
			if(shake == true){
				if(camera.position.x > 0.1){
					camera.position.x -= 0.1;
				}
				else{camera.position.x += 0.1; }
			}
		}, 10);
	setTimeout(function(){ scene.remove( plane ); shake=false;}, 1000);
}

// GENERATE SHOT TIE FIGHTER
function createShot(){
	var shot = new THREE.Object3D();
	var cylinderGeo;
	var cylinderMaterial;
	var cylinder;
	cylinderGeo = new THREE.CylinderGeometry(1, 1, 5,32 );
	cylinderMaterial = new THREE.MeshBasicMaterial( {color:0x33FF00} );
	cylinder = new THREE.Mesh( cylinderGeo, cylinderMaterial );
	cylinder.rotation.x = 1.5;
	cylinder.position.set(-27,210,170);
	shot.add(cylinder);

	cylinderGeo = new THREE.CylinderGeometry(1, 1, 5,32 );
	cylinderMaterial = new THREE.MeshBasicMaterial( {color:0x33FF00} );
	cylinder = new THREE.Mesh( cylinderGeo, cylinderMaterial );
	cylinder.rotation.x = 1.5;
	cylinder.position.set(27,210,170);
	shot.add(cylinder);
	scene.add(shot);
	return shot;
}

// ADD TO SCENE SHOT
function shoot(){
	laserShoot.position.z =170;
	scene.add(laserShoot);
	laserShoot.position.z -= 5;
}

// ADD TEXTURE FROM EXPLOSION
function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration){	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}		

// EXPLOSION
function explosion(){
	var explosionTexture = new THREE.ImageUtils.loadTexture( 'texture/Explosion.png' );
	boomer = new TextureAnimator( explosionTexture, 5, 4, 20, 55 ); // texture, #horiz, #vert, #total, duration.
	var explosionMaterial = new THREE.MeshPhongMaterial( { map: explosionTexture , transparent:true} );
	var cubeGeometry = new THREE.BoxGeometry( 150, 150, 150 );
	cube = new THREE.Mesh( cubeGeometry, explosionMaterial );
	cube.position.set(0,200,-500);
	scene.add(cube);
}

// LEAP SWIPE ANIMATE
function swipeAnimate(direction){
	if(direction == 'left'){
		redComet.position.x -= 5;
	}
	if(direction == 'right'){
		redComet.position.x += 5;
	}
	if(direction == 'up'){
		redComet.position.y += 5;
	}
	if(direction == 'down'){
		redComet.position.y -= 5;
	}
}

// LEAP SWIPE GESTURE
function swipeGesture(frame){
	if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      if(gesture.type == "swipe") {
          //Classify swipe as either horizontal or vertical
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if(isHorizontal){
              if(gesture.direction[0] > 0){
                  swipeAnimate('right');
              } else {
                  swipeAnimate('left');
              }
          } else { //vertical
              if(gesture.direction[1] > 0){
                  swipeAnimate('up');
              } else {
                  swipeAnimate('down');
              }                  
          }
       }
     }
  }
}

