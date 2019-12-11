class Floor extends THREE.Mesh {

    constructor(dimX, dimY, segments) {
        super();

        var floorGeometry = new THREE.PlaneGeometry(dimX, dimY);
        var floorMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 0.4,
            metalness: 0.0
        });

        var floorTexture = new THREE.TextureLoader().load("src/images/checker.png");
        floorTexture.repeat.set(segments / 2, segments / 2);
        floorTexture.wrapS = THREE.RepeatWrapping;
        floorTexture.wrapT = THREE.RepeatWrapping;
        floorMaterial.map = floorTexture;
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -90 * DEG_TO_RAD;
        floor.receiveShadow = true;

        return floor;
    }
}

