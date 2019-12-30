ModelFromFile = function () {

    var importedModel = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    var teapotMaterial = new THREE.MeshStandardMaterial({ color: 0x851519, roughness: 0.3, metalness: 0.2});
    teapotMaterial.side = THREE.DoubleSide;

    fbxloader.load("src/models/ImportedModel/teapot.fbx", function (model) {

        importedModel.add(model);

        importedModel.traverse(function (child) {
            console.log(child);

            if (child.isMesh) {
                child.material = teapotMaterial;
                child.castShadow = true;
                child.receiveShadow = true;
            }

        })
    });

    importedModel.scale.set(10, 10, 10);
    return importedModel;
};