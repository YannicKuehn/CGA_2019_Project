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

        aButton.position.x = 1;
        aButton.position.y = -3;
        aButton.position.z = 1;

        aButton.rotation.x = 90 * DEG_TO_RAD;
        this.add(aButton);

        bButton.position.x = 3;
        bButton.position.y = -1;
        bButton.position.z = 1;

        bButton.rotation.x = 90 * DEG_TO_RAD;
        this.add(bButton);
    }
}