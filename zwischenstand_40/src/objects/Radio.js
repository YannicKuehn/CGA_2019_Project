class Radio extends THREE.Group {

    constructor() {
        super();

        this.animations = new Array();
        this.addParts();
    }

    addParts() {

        var metallMaterial = new THREE.MeshStandardMaterial({color: 0xE7E7E7, roughness: 0.2, metalness: 0.4});

        var korpusGeometry = new THREE.BoxGeometry(30, 20, 8);
        var korpusMaterial = new THREE.MeshLambertMaterial({
            color: 0xE77C3E
        });
        var path = "../../lib/three.js-r109/examples/textures/cube/Bridge2/";
        var images = [path + "posx.jpg", path + "negx.jpg", path + "posy.jpg", path + "negy.jpg", path + "posz.jpg", path + "negz.jpg"];
        var cubeTextur = new THREE.CubeTextureLoader().load(images);
        cubeTextur.mapping = THREE.CubeReflectionMapping;
        korpusMaterial.envMap = cubeTextur;
        korpusMaterial.combine = THREE.MixOperation;
        korpusMaterial.reflectivity = 0.1;
        var korpus = new THREE.Mesh(korpusGeometry, korpusMaterial);
        korpus.castShadow = true;
        this.add(korpus);

        var antenneGeometry = new THREE.CylinderGeometry(0.25, 0.25, 25, 32, 1, false);
        antenneGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 12.5, 0));
        var antenne = new THREE.Mesh(antenneGeometry, metallMaterial);
        antenne.position.x = -13;
        antenne.position.y = 10.25;
        antenne.position.z = -2;
        antenne.rotation.z = -90 * DEG_TO_RAD;
        antenne.name = "Antenne";
        antenne.castShadow = true;
        this.add(antenne);

        var antennenAnimation = new Animation(antenne, AnimationType.ROTATION, AnimationAxis.Z);
        antennenAnimation.setAmount(70 * DEG_TO_RAD);
        antennenAnimation.setSpeed(40 * DEG_TO_RAD);
        antenne.userData = antennenAnimation;
        this.animations.push(antennenAnimation);

        var einschalterGeometry = new THREE.BoxGeometry(3, 1, 1);
        var einschalter = new THREE.Mesh(einschalterGeometry, metallMaterial);
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

        // Lautsprecherteil mit Bump Map
        // -----------------------------
        var lautsprecherteilGeometry = new THREE.BoxGeometry(28, 11.5, 1);
        var lautsprecherteilMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFEAD9
        });
        var lautsprecherMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFEAD9
        });
        lautsprecherMaterial.bumpMap = new THREE.TextureLoader().load("src/images/lautsprecher.png");
        lautsprecherMaterial.bumpScale = 0.1;
        var materialArray2 = [lautsprecherteilMaterial, lautsprecherteilMaterial, lautsprecherteilMaterial,
            lautsprecherteilMaterial, lautsprecherMaterial, lautsprecherteilMaterial];
        var lautsprecherteil = new THREE.Mesh(lautsprecherteilGeometry, materialArray2);
        lautsprecherteil.position.x = 0;
        lautsprecherteil.position.y = -3;
        lautsprecherteil.position.z = 3.75;
        this.add(lautsprecherteil);

        // Bedienteil
        // ----------
        var bedienteil = new THREE.Group();
        bedienteil.position.x = 0;
        bedienteil.position.y = 6.1;
        bedienteil.position.z = 3.75;

        var blendeGeometry = new THREE.BoxGeometry(28, 5.5, 1);
        var blendeMaterial = new THREE.MeshLambertMaterial({
            color: 0x222222
        });
        var skalaMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        skalaMaterial.map = new THREE.TextureLoader().load('src/images/skala.png');
        var materialArray = [blendeMaterial, blendeMaterial, blendeMaterial, blendeMaterial, skalaMaterial, blendeMaterial];
        var blende = new THREE.Mesh(blendeGeometry, materialArray);
        bedienteil.add(blende);

        var frequenzskalaGeometry = new THREE.BoxGeometry(15, 2, 1);
        var frequenzskalaMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.3
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
        var tuner = new THREE.Mesh(tunerGeometry, metallMaterial);
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
        var volume = new THREE.Mesh(volumeGeometry, metallMaterial);
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
        var griff = new THREE.Mesh(griffGeometry, metallMaterial);
        griff.position.z = -1.5;
        griff.castShadow = true;
        haltegriff.add(griff);

        var griffachseGeometry = new THREE.CylinderGeometry(2, 2, 33, 32, 1, false);
        var griffachse = new THREE.Mesh(griffachseGeometry, metallMaterial);
        griffachse.rotation.z = 90 * DEG_TO_RAD;
        haltegriff.add(griffachse);

        this.add(haltegriff);
    }
}