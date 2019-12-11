RadioFromFile = function () {

    var radio = new THREE.Group();

    var fbxloader = new THREE.FBXLoader();

    radioAnimationMixer = null;

    fbxloader.load("src/models/Radio/Radio.fbx", function (model) {

        radio.add(model);

        radioAnimationMixer = new THREE.AnimationMixer(model);

        for (var i = 0; i < model.animations.length; i++) {

            var action = radioAnimationMixer.clipAction(model.animations[i]);
            action.clampWhenFinished = true;
            action.setLoop(THREE.LoopOnce);
        }
    });

    radioState = {
        powerOn: false,
        antennaOut: false,
        markerRight: false
    };

    return radio;
};
