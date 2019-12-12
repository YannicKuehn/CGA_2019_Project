class GameBoy extends THREE.Group {

    constructor() {
        super();

        this.animations = new Array();
        this.addParts();
    }

    addParts() {

        let korpusMaterial = new THREE.MeshStandardMaterial({color: 0xE0E0E0, roughness: 0.4, metalness: 0});
        let korpusGeometry = new THREE.BoxGeometry(10, 15, 3);
        let korpus = new THREE.Mesh(korpusGeometry, korpusMaterial);
        this.add(korpus);

        let batteryPackMaterial = korpusMaterial;
        let batteryPackGeometry = new THREE.BoxGeometry(8, 10, 2);
        let batteryPack = new THREE.Mesh(batteryPackGeometry, batteryPackMaterial);
        batteryPack.position.x = 0;
        batteryPack.position.y = 0;
        batteryPack.position.z = -1.5;
        this.add(batteryPack);

        let abButtonMaterial = new THREE.MeshStandardMaterial({color: 0xce42f5, roughness: 0.4, metalness: 0});
        let abButtonGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32, 1, false);
       
        let aButton = new THREE.Mesh(abButtonGeometry, abButtonMaterial);
        let bButton = new THREE.Mesh(abButtonGeometry, abButtonMaterial);

        aButton.position.x = 3.5;
        aButton.position.y = -2.5;
        aButton.position.z = 0.75;

        aButton.rotation.x = 90 * DEG_TO_RAD;
        this.add(aButton);

        bButton.position.x = 1.7;
        bButton.position.y = -3.5;
        bButton.position.z = 0.75;

        bButton.rotation.x = 90 * DEG_TO_RAD;
        this.add(bButton);

        let crossMaterial = new THREE.MeshStandardMaterial({color: 0x404040, roughness: 0.2, metalness: 0.1});
        let crossGeometry = new THREE.BoxGeometry(2,0.75,1);

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

        let startButtonMaterial = new THREE.MeshStandardMaterial({color: 0x141414, roughness: 0.2, metalness: 0.1});

    }
}