//git test
// External libraries
document.write('<script type="text/javascript" src="../../lib/three.js-r109/build/three.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/controls/OrbitControls.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/libs/inflate.min.js"></script>');
document.write('<script type="text/javascript" src="../../lib/three.js-r109/examples/js/loaders/FBXLoader_r90.js"></script>');
document.write('<script type="text/javascript" src="../../lib/dat.gui-0.7.6/build/dat.gui.js"></script>');
document.write('<script type="text/javascript" src="../../lib/ThreeCSG-1/three-csg.js"></script>');
document.write('<script type="text/javascript" src="../../lib/cannon.js-0.6.2/build/cannon.js"></script>');
document.write('<script type="text/javascript" src="../../lib/cannon.js-0.6.2/tools/threejs/CannonDebugRenderer.js"></script>');

// Own modules
document.write('<script type="text/javascript" src="src/objects/GameBoy.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Floor.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Wall.js"></script>');
document.write('<script type="text/javascript" src="src/objects/DeskFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/ModelFromFile.js"></script>');
document.write('<script type="text/javascript" src="src/objects/Lights.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Animation.js"></script>');
document.write('<script type="text/javascript" src="src/animation/Tween.js"></script>');
document.write('<script type="text/javascript" src="src/physics/Physics.js"></script>');
document.write('<script type="text/javascript" src="src/sound/Soundscape.js"></script>');

// Event functions
document.write('<script type="text/javascript" src="src/eventfunctions/updateAspectRatio.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/calculateMousePosition.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeRaycast.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/executeKeyAction.js"></script>');
document.write('<script type="text/javascript" src="src/eventfunctions/setGameBoySound.js"></script>');

const DEG_TO_RAD = Math.PI / 180;

function main() {

    scene = new THREE.Scene();

    physics = new Physics();
    physics.initialize(0, -200, 0, 1 / 240, true);
    physicsVisualDebugger = new THREE.CannonDebugRenderer(scene, physics.getWorld());

    soundscape = new Soundscape();

    //var axes = new THREE.AxesHelper(20);
    //scene.add(axes);

    let gameBoy = new GameBoy();
    gameBoy.position.set(15, 88, 5);
    physics.addBox(gameBoy, 5, 10, 15, 3.5, 0, 0, -0.5);
    soundscape.addSound(gameBoy, "src/sound/files/World_Music.mp3", 5, true);   
    scene.add(gameBoy);

    var teapot = new ModelFromFile();
    teapot.position.set(-10, 70.75, 5);
    physics.addCylinder(teapot, 9, 7.5, 10, 12.5, 32, 0, 6.42, 0, -90 * DEG_TO_RAD, 0, 0);
    scene.add(teapot);

    var desk = new DeskFromFile();
    desk.scale.set(0.5, 0.5, 0.5);
    physics.addCylinder(desk, 0, 65, 65, 3, 16, 0, 69.4, 0, -90 * DEG_TO_RAD, 0, 0);
    scene.add(desk);

    scene.add(new Floor(400, 400, 8));

    var wall = new Wall(400,350, 4);
    physics.addBox(wall, 0, 400, 350, 1, 0, 0, 0);
    scene.add(wall);

    var lights = new Lights();
    scene.add(lights.createAmbientLight());
    var directionalLight = lights.createDirectionalLight(-30, 200, 100);
    scene.add(directionalLight);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 100, 160);
    camera.lookAt(0, 83, 0);
    camera.add(soundscape.getAudioListener());

    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.target = new THREE.Vector3(0, 83, 0);
    orbitControls.update();

    var gui = new dat.GUI();
    gui.add(directionalLight.position, "x", -200, 200);
    gui.add(directionalLight.position, "y", 0, 200);
    gui.add(directionalLight.position, "z", -200, 200);
    gui.domElement.onmouseenter = function () {
        orbitControls.enabled = false;
    };
    gui.domElement.onmouseleave = function () {
        orbitControls.enabled = true;
    };

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.shadowMap.enabled = true;

    document.getElementById("3d_content").appendChild(renderer.domElement);

    var clock = new THREE.Clock();

    function mainLoop() {

        var delta = clock.getDelta();

        physics.update(delta);
        //physicsVisualDebugger.update();

        gameBoy.animations.forEach(function (animation) {
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
    window.onkeydown = keyDownAction;
    window.onkeyup = keyUpAction;

    window.addEventListener("gameBoyStateChanged", setGameBoySound);
    window.dispatchEvent(new Event("gameBoyStateChanged"));
}

window.onload = main;