class Radio extends THREE.Group {

    constructor() {
        super();

        this.animations = new Array();
        this.addParts();
    }

    addParts() {

        var korpusGeometry = new THREE.BoxGeometry(30, 20, 8);
        var korpusMaterial = new THREE.MeshLambertMaterial({
            color: 0xE77C3E
        });
        var korpus = new THREE.Mesh(korpusGeometry, korpusMaterial);
        this.add(korpus);

        var antenneGeometry = new THREE.CylinderGeometry(0.25, 0.25, 25, 32, 1, false);
        antenneGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 12.5, 0));
        var antenneMaterial = new THREE.MeshLambertMaterial({
            color: 0xE7E7E7
        });
        var antenne = new THREE.Mesh(antenneGeometry, antenneMaterial);
        antenne.position.x = -13;
        antenne.position.y = 10.25;
        antenne.position.z = -2;
        antenne.rotation.z = -70 * DEG_TO_RAD;
        antenne.name = "Antenne";
        this.add(antenne);

        var antennenAnimation = new Animation(antenne, AnimationType.ROTATION, AnimationAxis.Z);
        antennenAnimation.setAmount(-20 * DEG_TO_RAD);
        antennenAnimation.setSpeed(40 * DEG_TO_RAD);
        antenne.userData = antennenAnimation;
        this.animations.push(antennenAnimation);

        var einschalterGeometry = new THREE.BoxGeometry(3, 1, 1);
        var einschalterMaterial = new THREE.MeshLambertMaterial({
            color: 0xE7E7E7
        });
        var einschalter = new THREE.Mesh(einschalterGeometry, einschalterMaterial);
        einschalter.position.x = 10;
        einschalter.position.y = 10.5;
        einschalter.position.z = 0;
        einschalter.name = "Einschalter";
        this.add(einschalter);

        var einschalterAnimation = new Animation(einschalter, AnimationType.TRANSLATION, AnimationAxis.Y);
        einschalterAnimation.setAmount(-0.5);
        einschalterAnimation.setSpeed(2);
        einschalter.userData = einschalterAnimation;
        this.animations.push(einschalterAnimation);

        // Lautsprecherteil CSG
        // --------------------
        var lautsprecherteilGeometry = new THREE.BoxGeometry(28, 11.5, 1);
        var lautsprecherteilMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFEAD9
        });
        var lautsprecherteil = new THREE.Mesh(lautsprecherteilGeometry, lautsprecherteilMaterial);
        lautsprecherteil.position.x = 0;
        lautsprecherteil.position.y = -3;
        lautsprecherteil.position.z = 3.75;
        //this.add(lautsprecherteil);

        // Lautsprecher
        var lautsprecherGeometry = new THREE.CylinderGeometry(5, 5, 1, 32, 1, false);
        var lautsprecher = new THREE.Mesh(lautsprecherGeometry);
        lautsprecher.position.x = -6;
        lautsprecher.position.y = -3;
        lautsprecher.position.z = 4.6;
        lautsprecher.rotation.x = 90 * DEG_TO_RAD;
        //this.add(lautsprecher);

        // Lautsprecherteil CSG
        var subtract = threecsg.subtract(lautsprecherteil, lautsprecher, lautsprecherteilMaterial);
        this.add(subtract);

        // Bedienteil
        // ----------
        var bedienteil = new THREE.Group();
        bedienteil.position.x = 0;
        bedienteil.position.y = 6.1;
        bedienteil.position.z = 3.75;

        var blendeGeometry = new THREE.BoxGeometry(28, 5.5, 1);
        var blendeMaterial = new THREE.MeshLambertMaterial({
            color: 0x535353
        });
        var blende = new THREE.Mesh(blendeGeometry, blendeMaterial);
        bedienteil.add(blende);

        var frequenzskalaGeometry = new THREE.BoxGeometry(15, 2, 1);
        var frequenzskalaMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF
        });
        var frequenzskala = new THREE.Mesh(frequenzskalaGeometry, frequenzskalaMaterial);
        frequenzskala.position.z = 0.2;
        bedienteil.add(frequenzskala);

        var markerGeometry = new THREE.BoxGeometry(0.2, 2, 1);
        var markerMaterial = new THREE.MeshLambertMaterial({
            color: 0xFF0000
        });
        var marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.x = -4;
        marker.position.z = 0.3;
        bedienteil.add(marker);

        var tunerGeometry = new THREE.CylinderGeometry(1.5, 1.5, 2.5, 32, 1, false);
        var tunerMaterial = new THREE.MeshLambertMaterial({
            color: 0xE7E7E7
        });
        var tuner = new THREE.Mesh(tunerGeometry, tunerMaterial);
        tuner.position.x = -10;
        tuner.position.y = 0;
        tuner.position.z = 1;
        tuner.rotation.x = 90 * DEG_TO_RAD;
        tuner.name = "Tuner";
        bedienteil.add(tuner);

        var tweens = {
            forward: false,
            forwardTween: new TWEEN.Tween(marker.position).to(new THREE.Vector3(marker.position.x + 8,
                marker.position.y, marker.position.z), 2000).easing(TWEEN.Easing.Quadratic.Out),
            backwardTween: new TWEEN.Tween(marker.position).to(new THREE.Vector3(marker.position.x,
                marker.position.y, marker.position.z), 2000).easing(TWEEN.Easing.Quadratic.Out)
        };
        tuner.userData = tweens;

        var volumeGeometry = new THREE.CylinderGeometry(1.5, 1.5, 2.5, 32, 1, false);
        var volumeMaterial = new THREE.MeshLambertMaterial({
            color: 0xE7E7E7
        });
        var volume = new THREE.Mesh(volumeGeometry, volumeMaterial);
        volume.position.x = 10;
        volume.position.y = 0;
        volume.position.z = 1;
        volume.rotation.x = 90 * DEG_TO_RAD;
        volume.name = "Volume";
        bedienteil.add(volume);

        this.add(bedienteil);

        // Haltegriff
        // ----------
        var haltegriff = new THREE.Group();
        haltegriff.position.y = 5;

        var shape = new THREE.Shape();
        shape.moveTo(-16, 0);
        shape.lineTo(-16, 10);
        shape.lineTo(16, 10);
        shape.lineTo(16, 0);
        shape.lineTo(15.5, 0);
        shape.lineTo(15.5, 9.5);
        shape.lineTo(-15.5, 9.5);
        shape.lineTo(-15.5, 0);
        shape.lineTo(-16, 0);

        var extrudeSettings = {
            steps: 1,
            depth: 3,
            bevelEnabled: false
        };
        var griffGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        var griffMaterial = new THREE.MeshLambertMaterial({
            color: 0xE7E7E7
        });
        var griff = new THREE.Mesh(griffGeometry, griffMaterial);
        griff.position.z = -1.5;
        haltegriff.add(griff);

        var griffachseGeometry = new THREE.CylinderGeometry(2, 2, 33, 32, 1, false);
        var griffachseMaterial = new THREE.MeshLambertMaterial({
            color: 0xE7E7E7
        });
        var griffachse = new THREE.Mesh(griffachseGeometry, griffachseMaterial);
        griffachse.rotation.z = 90 * DEG_TO_RAD;
        haltegriff.add(griffachse);

        this.add(haltegriff);
    }
}