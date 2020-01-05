raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {

        var firstHit = intersects[0].object;

        if (firstHit.name === "powerSwitch") {
            gameBoyState.powerOn = !gameBoyState.powerOn;
            firstHit.userData.toggleEndPosition();
            window.dispatchEvent(new Event("gameBoyStateChanged"));
        } else if (firstHit.name === "aButton") {
            firstHit.userData.toggleEndPosition();
        } else if (firstHit.name === "bButton") {
            firstHit.userData.toggleEndPosition();
        } else if (firstHit.name === "volume") {
            gameBoyState.volumeHigh = !gameBoyState.volumeHigh;
            window.dispatchEvent(new Event("gameBoyStateChanged"));
        }
    }
}