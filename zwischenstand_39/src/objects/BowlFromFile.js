BowlFromFile = function () {

    var bowl = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    fbxloader.load('src/models/Bowl/Bowl.fbx', function (object) {

        bowl.add(object);

        object.traverse(function (child) {
            if (child.isMesh) {
                child.material.side = THREE.DoubleSide;
                child.castShadow = true;
            }
        });
    });

    return bowl;
};