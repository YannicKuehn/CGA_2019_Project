class Wall extends THREE.Mesh {

    constructor(dimX, dimY, segments) {
        super();

        var wallGeometry = new THREE.PlaneGeometry(dimX, dimY);
        var wallMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 0.8,
            metalness: 0.1
        });

        var wallTexture = new THREE.TextureLoader().load("src/images/walltexture.jpg");
        wallTexture.repeat.set(segments / 2, segments / 2);
        wallTexture.wrapS = THREE.RepeatWrapping;
        wallTexture.wrapT = THREE.RepeatWrapping;
        wallMaterial.map = wallTexture;
        wallMaterial.map.anisotropy = 8;
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        //wall.rotation.x = -90 * DEG_TO_RAD;
        wall.position.z = -200;
        wall.position.y = 175;
        wall.receiveShadow = true;

        return wall;
    }
}

