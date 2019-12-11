document.write('<script type="text/javascript" src="../../lib/three.js-r109/build/three.js"></script>');
document.write('<script type="text/javascript" src="../../lib/dat.gui-0.7.6/build/dat.gui.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    scene = new THREE.Scene();

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-5, 3, 5);
    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(5, 10, 10);
    var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(10, 5, -5);
    scene.add(sphere);

    var planeGeometry = new THREE.PlaneGeometry(40, 40);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xaaaaaa, wireframe: true});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, 0);
    plane.rotation.x = -90 * DEG_TO_RAD;
    scene.add(plane);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 40, 50);
    camera.lookAt(0, 0, 0);

    var gui = new dat.GUI();
    gui.add(sphere.position, "x", -50, 50).step(5);
    gui.add(sphere.position, "y", -50, 50).onChange(function (e) {
        cube.position.y = e;
    });

    var proxies = {z_pos: 0};
    gui.add(proxies, "z_pos", -50, 50).onChange(function (e) {
        cube.position.z = e;
        sphere.position.z = e;
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff));

    document.getElementById("3d_content").appendChild(renderer.domElement);

    function mainLoop() {

        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
    }

    mainLoop();
}

window.onload = main;