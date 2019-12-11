TableFromFile = function () {

    var table = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    radioAnimationMixer = null;

    fbxloader.load("src/models/Old_Table/Old_Table.fbx", function (model) {

        table.add(model);

        model.traverse(function (child) {
            if (child.isMesh) {
                child.material.map.anisotropy = 8;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        })
    });

    return table;
};