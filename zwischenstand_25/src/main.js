// External libraries
document.write('<script type="text/javascript" src="../../lib/three.js-r109/build/three.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="../../lib/dat.gui-0.7.6/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="../../lib/ThreeCSG-1/three-csg.js"></script>');

// Own modules
document.write('<script type="text/javascript" src="src/objects/Radio.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Lights.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Animation.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Tween.js"></script>');

// Event functions
document.write('<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    scene = new THREE.Scene();

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    var radio = new Radio();
    scene.add(radio);

    var lights = new Lights();
    scene.add(lights.createAmbientLight());
    var spotlight = lights.createSpotLight(15, 20, 20);
    scene.add(spotlight);
    scene.add(lights.createSpotLight(0, 20, -20));

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 40, 50);
    camera.lookAt(0, 0, 0);

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0, 0, 0);
    orbitControls.update();

    var gui = new dat.GUI();
    gui.add(spotlight.position, "x", -50, 50);
    gui.add(spotlight.position, "y", -50, 50);
    gui.add(spotlight.position, "z", -50, 50);
    gui.domElement.onmouseenter = function () {
        orbitControls.enabled = false;
    };
    gui.domElement.onmouseleave = function () {
        orbitControls.enabled = true;
    };

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.shadowMap.enabled = true;

    document.getElementById("3d_content").appendChild(renderer.domElement);

    var clock = new THREE.Clock();

    function mainLoop() {

        var delta = clock.getDelta();

        radio.animations.forEach(function (animation) {
            animation.update(delta)
        });

        TWEEN.update();

        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
}

window.onload = main;