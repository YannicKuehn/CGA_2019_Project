class Primitives {

    constructor() {

    }

    createCube(width, height, depth, posX, posY, posZ, cShadow, rShadow) {
        var cubeGeometry = new THREE.BoxGeometry(width, height, depth)
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(posX, posY, posZ);
        cube.castShadow = cShadow;
        cube.receiveShadow = rShadow;
        return cube;
    }

    createSphere(radius, wSeg, hSeg, posX, posY, posZ, cShadow, rShadow) {
        var sphereGeometry = new THREE.SphereGeometry(radius, wSeg, hSeg);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, wireframe: false});
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(posX, posY, posZ);
        sphere.castShadow = cShadow;
        sphere.receiveShadow = rShadow;
        return sphere;
    }

    createFloor(width, height, posX, posY, posZ, cShadow, rShadow) {
        var planeGeometry = new THREE.PlaneGeometry(width, height);
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa, wireframe: false});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(posX, posY, posZ);
        plane.rotation.x = -90 * DEG_TO_RAD;
        plane.castShadow = cShadow;
        plane.receiveShadow = rShadow;
        return plane;
    }
}