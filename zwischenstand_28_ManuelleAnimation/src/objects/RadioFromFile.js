RadioFromFile = function () {

    var radio = new THREE.Group();

    var loadingManager = new THREE.LoadingManager();

    var fbxloader = new THREE.FBXLoader(loadingManager);

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

    griffAnimation = null;
    loadingManager.onLoad = function () {
        radio.traverse(function (child) {
            if (child.name === "GriffFBX") {
                griffAnimation = new Animation(child, AnimationType.ROTATION, AnimationAxis.X);
                griffAnimation.setAmount(-45 * DEG_TO_RAD);
                griffAnimation.setSpeed(40 * DEG_TO_RAD);
                child.userData = griffAnimation;
            }
        });
    };

    return radio;
};
