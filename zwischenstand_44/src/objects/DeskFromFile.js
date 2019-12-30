DeskFromFile = function () {

    var desk = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    var deskMaterial = new THREE.MeshLambertMaterial( {color: 0xFFFFFF});
    deskMaterial.map = new THREE.TextureLoader().load('src/models/Desk/Textures/Round table texture.png');
    deskMaterial.map.anisotropy = 8;

    radioAnimationMixer = null;

    fbxloader.load("src/models/Desk/round table.fbx", function (model) {

        desk.add(model);

        model.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material = deskMaterial;
            }
        })
    });

    return desk;
};