RadioFromFile = function () {

    var radio = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    fbxloader.load("src/models/Radio/Radio.fbx", function (model) {

        radio.add(model);

        model.traverse(function (child) {

            if (child.isMesh) {
                console.log(child.name);
            }
        });
    });

    return radio;
};