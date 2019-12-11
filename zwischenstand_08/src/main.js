document.write('<script type="text/javascript" src="../../lib/three.js-r109/build/three.js"></script>');
document.write('<script type="text/javascript" src="../../lib/dat.gui-0.7.6/build/dat.gui.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    scene = new THREE.Scene();

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-5, 3, 5);
    cube.castShadow = true;
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(5, 10, 10);
    var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, wireframe: false});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(10, 5, -5);
    sphere.castShadow = true;
    scene.add(sphere);

    var planeGeometry = new THREE.PlaneGeometry(40, 40);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa, wireframe: false});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, 0);
    plane.rotation.x = -90 * DEG_TO_RAD;
    plane.receiveShadow = true;
    scene.add(plane);

    var ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.intensity = 0.5;
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(15, 20, 20);
    spotLight.intensity = 0.8;
    spotLight.target = plane;
    spotLight.angle = 30 * DEG_TO_RAD;
    spotLight.penumbra = 1;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.aspect = 1;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 40;
    scene.add(new THREE.CameraHelper(spotLight.shadow.camera));
    scene.add(spotLight);
    ;

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 40, 50);
    camera.lookAt(0, 0, 0);

    var gui = new dat.GUI();
    gui.add(spotLight.position, "x", -50, 50);
    gui.add(spotLight.position, "y", -50, 50);
    gui.add(spotLight.position, "z", -50, 50);
    ;

    var proxies = {z_pos: 0};
    gui.add(proxies, "z_pos", -50, 50).onChange(function (e) {
        cube.position.z = e;
        sphere.position.z = e;
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.shadowMap.enabled = true;

    document.getElementById("3d_content").appendChild(renderer.domElement);

    function mainLoop() {

        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
    }

    mainLoop();
}

window.onload = main;