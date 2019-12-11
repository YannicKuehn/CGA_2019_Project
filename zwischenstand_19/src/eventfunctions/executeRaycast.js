raycaster = new THREE.Raycaster();

function executeRaycast(event) {

    raycaster.setFromCamera(mousePosition, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {

        var firstHit = intersects[0].object;

        if(firstHit.name === "Einschalter") {
            firstHit.userData.toggleEndPosition();
        }
    }
}
