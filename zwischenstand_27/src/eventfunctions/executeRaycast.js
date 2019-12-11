raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {

        var firstHit = intersects[0].object;

        if(firstHit.name === "Einschalter" || firstHit.name === "Antenne") {
            firstHit.userData.toggleEndPosition();

        } else if (firstHit.name === "Tuner") {
            firstHit.userData.forward = !firstHit.userData.forward;
            if(firstHit.userData.forward) {
                firstHit.userData.backwardTween.stop();
                firstHit.userData.forwardTween.start();
            } else {
                firstHit.userData.forwardTween.stop();
                firstHit.userData.backwardTween.start();
            }
        }

        if (firstHit.name === "EinschalterFBX") {
            radioState.powerOn = !radioState.powerOn;
            if (radioState.powerOn && !radioAnimationMixer.existingAction("Einschalter_Action_aus").isRunning()) {
                radioAnimationMixer.existingAction("Einschalter_Action_aus").stop();
                radioAnimationMixer.existingAction("Einschalter_Action_ein").play();
            } else if (!radioState.powerOn && !radioAnimationMixer.existingAction("Einschalter_Action_ein").isRunning()) {
                radioAnimationMixer.existingAction("Einschalter_Action_ein").stop();
                radioAnimationMixer.existingAction("Einschalter_Action_aus").play();
            }
        }
    }
}