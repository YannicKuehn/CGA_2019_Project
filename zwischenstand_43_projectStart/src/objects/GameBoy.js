class GameBoy extends THREE.Group {

    constructor() {
        super();

        this.animations = new Array();
        this.addParts();
    }

    addParts() {

        let korpusMaterial = new THREE.MeshStandardMaterial({ color: 0xE0E0E0, roughness: 0.1, metalness: 0 });

        /*         var korpusMaterial = new THREE.MeshLambertMaterial({
                    color: 0xE0E0E0,
                    roughness: 0.8,
                    metalness: 0
                });
                var path = "../../lib/three.js-r109/examples/textures/cube/Bridge2/";
                var images = [path + "posx.jpg", path + "negx.jpg", path + "posy.jpg", path + "negy.jpg", path + "posz.jpg", path + "negz.jpg"];
                var cubeTextur = new THREE.CubeTextureLoader().load(images);
                cubeTextur.mapping = THREE.CubeReflectionMapping;
                korpusMaterial.envMap = cubeTextur;
                korpusMaterial.combine = THREE.MixOperation;
                korpusMaterial.reflectivity = 0.005; */

        let korpusGeometry = new THREE.BoxGeometry(10, 15, 3);
        let korpus = new THREE.Mesh(korpusGeometry, korpusMaterial);
        korpus.castShadow = true;
        this.add(korpus);

        let batteryPackMaterial = korpusMaterial;
        let batteryPackGeometry = new THREE.BoxGeometry(8, 10, 2);
        let batteryPack = new THREE.Mesh(batteryPackGeometry, batteryPackMaterial);
        batteryPack.position.x = 0;
        batteryPack.position.y = 0;
        batteryPack.position.z = -1.5;
        this.add(batteryPack);

        let abButtonMaterial = new THREE.MeshStandardMaterial({ color: 0xce42f5, roughness: 0.4, metalness: 0 });
        let abButtonGeometry = new THREE.CylinderGeometry(0.6, 0.6, 2, 32, 1, false);

        let aButton = new THREE.Mesh(abButtonGeometry, abButtonMaterial);
        let bButton = new THREE.Mesh(abButtonGeometry, abButtonMaterial);

        aButton.position.x = 3.5;
        aButton.position.y = -2.5;
        aButton.position.z = 0.75;

        aButton.rotation.x = 90 * DEG_TO_RAD;
        this.add(aButton);

        bButton.position.x = 1.9;
        bButton.position.y = -3.45;
        bButton.position.z = 0.75;

        bButton.rotation.x = 90 * DEG_TO_RAD;
        this.add(bButton);

        let crossMaterial = new THREE.MeshStandardMaterial({ color: 0x404040, roughness: 0.2, metalness: 0.1 });
        let crossGeometry = new THREE.BoxGeometry(2, 0.75, 1);

        let verticalCross = new THREE.Mesh(crossGeometry, crossMaterial);
        let horizontalCross = new THREE.Mesh(crossGeometry, crossMaterial);

        verticalCross.position.x = -2.5;
        verticalCross.position.y = -3;
        verticalCross.position.z = 1.25;
        this.add(verticalCross);

        horizontalCross.position.x = -2.5;
        horizontalCross.position.y = -3;
        horizontalCross.position.z = 1.25;
        horizontalCross.rotation.z = 90 * DEG_TO_RAD;
        this.add(horizontalCross);

        //loch in der mitte fehlt noch
        //sphere abziehen


        let startButtonMaterial = new THREE.MeshStandardMaterial({ color: 0x4d4d4d, roughness: 0.4, metalness: 0 });
        let startButtonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        startButtonGeometry.applyMatrix(new THREE.Matrix4().makeScale(3, 1, 1));

        let startButton = new THREE.Mesh(startButtonGeometry, startButtonMaterial);


        startButton.position.x = 0.7;
        startButton.position.y = -5;
        startButton.position.z = 1.4;

        startButton.rotation.z = 30 * DEG_TO_RAD;

        this.add(startButton);

       
        let selectButton = new THREE.Mesh(startButtonGeometry, startButtonMaterial);

        selectButton.position.x = -0.7;
        selectButton.position.y = -5;
        selectButton.position.z = 1.4;

        selectButton.rotation.z = 30 * DEG_TO_RAD;

        this.add(selectButton);




    }
}