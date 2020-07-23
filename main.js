// at init time
var pxElem = document.querySelector('#px');
var pyElem = document.querySelector('#py');
var pzElem = document.querySelector('#pz');
var rxElem = document.querySelector('#rx');
var ryElem = document.querySelector('#ry');
var rzElem = document.querySelector('#rz');

const DEBUG = true;

const fov = 45;
const near = 1;
const aspect = window.innerWidth / window.innerHeight;
const far = 1000;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 80;
camera.position.y = -80;

//camera.position.x = -6.612;
//camera.position.y = -144.651;
//camera.position.z = 0;
//camera.rotation.x = 1.535/ 180 * Math.PI;
//camera.rotation.y =  10 / 180 * Math.PI;
//camera.rotation.z = -0.013/ 180 * Math.PI;

camera.lookAt(new THREE.Vector3(0,0,0));


renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;


keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);
scene.add(keyLight);

fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);
scene.add(fillLight);

backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();
scene.add(backLight);


mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('objects/molly2/');
mtlLoader.load('objects/molly2/molly2.mtl', function (materials) {

    materials.preload();

    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('objects/molly2/molly2.obj', function (object) 
	{
        scene.add(object);
        object.position.y = 5;
    });

});

if(DEBUG)
{
	const gridXZ = new THREE.GridHelper(100, 10,  new THREE.Color(0xff0000), new THREE.Color(0xffffff));
	const gridXY = new THREE.GridHelper(100, 10, new THREE.Color(0x00FF00), new THREE.Color(0xffAfff)  );
	gridXY.geometry.rotateX( Math.PI / 2 );
	gridXY.position.z=-50;
	scene.add(gridXZ);
	scene.add(gridXY);
}

window.addEventListener('resize', onResize, false);

 function onResize()
 {
	renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
	console.log('resize windows');
}


function animate() {
    requestAnimationFrame(animate);
	//scene.rotation.x += 0.01
	//scene.rotation.y += 0.01
	scene.rotation.z += 0.01

    controls.update();
    renderer.render(scene, camera);
	
	if(DEBUG){
		pxElem.innerText   = camera.position.x.toFixed(3);
		pyElem.innerText   = camera.position.y.toFixed(3);
		pzElem.innerText   = camera.position.z.toFixed(3);
		rxElem.innerText   = camera.rotation.x.toFixed(3);
		ryElem.innerText   = camera.rotation.y.toFixed(3);
		rzElem.innerText   = camera.rotation.z.toFixed(3);
	}
};

animate();