// External libraries
document.write('<script type="text/javascript" src="../../lib/three.js-r109/build/three.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/libs/inflate.min.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/loaders/FBXLoader_r90.js"></script>');
document.write('<script type="text/javascript" src="../../lib/dat.gui-0.7.6/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="../../lib/ThreeCSG-1/three-csg.js"></script>');

// Own modules
document.write('<script type="text/javascript" src="src/objects/Radio.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Floor.js"></script>');
document.write('<script type="text/javascript" src="src/objects/RadioFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/TableFromFile.js"></script>');
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
    radio.position.set(-30, 83, 0);
    radio.rotation.y = 20 * DEG_TO_RAD;
    scene.add(radio);

    radioFromFile = new RadioFromFile();
    radioFromFile.position.set(30, 83, 0);
    radioFromFile.rotation.y = -20 * DEG_TO_RAD;
    scene.add(radioFromFile);

    scene.add(new TableFromFile());

    scene.add(new Floor(200, 200, 8));

    var lights = new Lights();
    scene.add(lights.createAmbientLight());
    var spotlight = lights.createSpotLight(-100, 200, 200);
    scene.add(spotlight);
    scene.add(lights.createSpotLight(100, 200, -200));

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 150, 150);
    camera.lookAt(0, 83, 0);

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0, 83, 0);
    orbitControls.update();

    var gui = new dat.GUI();
    gui.add(spotlight.position, "x", -200, 200);
    gui.add(spotlight.position, "y", -200, 200);
    gui.add(spotlight.position, "z", -200, 200);
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

        if (radioAnimationMixer != null) {
            radioAnimationMixer.update(delta);
        }

        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
    }

    mainLoop();

    window.onresize = updateAspectRatio;
    window.onmousemove = calculateMousePosition;
    window.onclick = executeRaycast;
}

window.onload = main;