DeskFromFile = function () {

    var desk = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    fbxloader.load("src/models/Desk/round table.fbx", function (model) {

        desk.add(model);
        desk.scale.set(0.5, 0.5, 0.5);

        model.traverse(function (child) {
            if (child.isMesh) {
                child.material.map.anisotropy = 8;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
    });

    return desk;
};