class GameBoy extends THREE.Group {

    constructor() {
        super();

        this.animations = new Array();
        this.addParts();
        setGameBoyState();
    }

    addParts() {

        //let korpusMaterial = new THREE.MeshStandardMaterial({ color: 0xE0E0E0, roughness: 0.1, metalness: 0 });
        
         let korpusMaterial = new THREE.MeshLambertMaterial({
            color: 0xE0E0E0
        }); 

        var blendeMaterial = new THREE.MeshLambertMaterial({
            color: 0xE0E0E0
        });
        var skalaMaterial = new THREE.MeshLambertMaterial({
            color: 0xE0E0E0
        });
        skalaMaterial.map = new THREE.TextureLoader().load('src/images/GameBoyLogo.jpeg');
        var materialArray = [blendeMaterial, blendeMaterial, blendeMaterial, blendeMaterial, skalaMaterial, blendeMaterial];

        let logoGeometry = new THREE.BoxGeometry(6,1,1);
        let logo = new THREE.Mesh(logoGeometry, materialArray)
        logo.position.x = -1;
        logo.position.y = -1.4;
        logo.position.z = 0.76;
        this.add(logo);

        let korpusGeometry = new THREE.BoxGeometry(10, 15, 2.5);

        let korpus = new THREE.Mesh(korpusGeometry, korpusMaterial);
        //this.add(korpus);

        let linkInterfaceGeometry = new THREE.BoxGeometry(1.5, 1, 1);
        let linkInterface = new THREE.Mesh(linkInterfaceGeometry, korpusMaterial);

        linkInterface.position.x = -5;
        linkInterface.position.y = 3.5;

        let powerSwitchGapGeometry = new THREE.BoxGeometry(1.5, 1, 0.5);
        let powerSwitchGap = new THREE.Mesh(powerSwitchGapGeometry, korpusMaterial);

        powerSwitchGap.position.x = -3;
        powerSwitchGap.position.y = 7.5;

        let korpusSubtractLink = new threecsg.subtract(korpus, linkInterface, korpusMaterial);
        

        let korpusSubtract = new threecsg.subtract(korpusSubtractLink, powerSwitchGap, korpusMaterial);

        korpusSubtract.castShadow = true;
        this.add(korpusSubtract);

        //powerSwitch
        let powerSwitchMaterial = new THREE.MeshStandardMaterial({ color: 0x404040, roughness: 0.2, metalness: 0.1 });
        let powerSwitchGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.4);
        let powerSwitch = new THREE.Mesh(powerSwitchGeometry, powerSwitchMaterial);
        powerSwitch.position.x = -2.5;
        powerSwitch.position.y = 7.3;
        powerSwitch.name = "powerSwitch";
        this.add(powerSwitch);

        //powerSwitch Animation
        var powerSwitchAnimation = new Animation(powerSwitch, AnimationType.TRANSLATION, AnimationAxis.X);
        powerSwitchAnimation.setAmount(-0.95);
        powerSwitchAnimation.setSpeed(3);
        powerSwitch.userData = powerSwitchAnimation;
        this.animations.push(powerSwitchAnimation);

        //batteryPack
        let batteryPackMaterial = korpusMaterial;
        let batteryPackGeometry = new THREE.BoxGeometry(8, 10, 1.5);
        let batteryPack = new THREE.Mesh(batteryPackGeometry, batteryPackMaterial);
        batteryPack.position.x = 0;
        batteryPack.position.y = 0;
        batteryPack.position.z = -1.7;

        let gameSlotGeometry = new THREE.BoxGeometry(6, 8, 0.9);
        let gameSlot = new THREE.Mesh(gameSlotGeometry, korpusMaterial);
        
        gameSlot.position.y = 5.5;
        gameSlot.position.z = -1.7;
        
        
        let batteryPackSubtract = new threecsg.subtract(batteryPack, gameSlot, korpusMaterial);
        batteryPackSubtract.castShadow = true;
        this.add(batteryPackSubtract);


        //A + B Buttons
        let abButtonMaterial = new THREE.MeshStandardMaterial({ color: 0x5e044c, roughness: 0.4, metalness: 0 });
        let abButtonGeometry = new THREE.CylinderGeometry(0.6, 0.6, 2, 32, 1, false);
        
        let aButton = new THREE.Mesh(abButtonGeometry, abButtonMaterial);
        let bButton = new THREE.Mesh(abButtonGeometry, abButtonMaterial);

        aButton.position.x = 3.5;
        aButton.position.y = -2.5;
        aButton.position.z = 0.5;
        aButton.rotation.x = 90 * DEG_TO_RAD;
        aButton.name = "aButton";
        this.add(aButton);

        var aButtonAnimation = new Animation(aButton, AnimationType.TRANSLATION, AnimationAxis.Z);
        aButtonAnimation.setAmount(-0.1);
        aButtonAnimation.setSpeed(3);
        aButton.userData = aButtonAnimation;
        this.animations.push(aButtonAnimation);

        bButton.position.x = 1.9;
        bButton.position.y = -3.45;
        bButton.position.z = 0.5;
        bButton.rotation.x = 90 * DEG_TO_RAD;
        bButton.name = "bButton";
        this.add(bButton);

        var bButtonAnimation = new Animation(bButton, AnimationType.TRANSLATION, AnimationAxis.Z);
        bButtonAnimation.setAmount(-0.1);
        bButtonAnimation.setSpeed(3);
        bButton.userData = bButtonAnimation;
        this.animations.push(bButtonAnimation);

        //Cross
        let crossMaterial = new THREE.MeshStandardMaterial({ color: 0x404040, roughness: 0.2, metalness: 0.1 });
        let crossGeometry = new THREE.BoxGeometry(2, 0.75, 1);

        let verticalCross = new THREE.Mesh(crossGeometry, crossMaterial);
        let horizontalCross = new THREE.Mesh(crossGeometry, crossMaterial);

        verticalCross.position.x = -2.5;
        verticalCross.position.y = -3;
        verticalCross.position.z = 1;
        this.add(verticalCross);

        horizontalCross.position.x = -2.5;
        horizontalCross.position.y = -3;
        horizontalCross.position.z = 1;
        horizontalCross.rotation.z = 90 * DEG_TO_RAD;
        this.add(horizontalCross);

        //loch in der mitte fehlt noch
        //sphere abziehen

        //startButton
        let startButtonMaterial = new THREE.MeshStandardMaterial({ color: 0x4d4d4d, roughness: 0.4, metalness: 0 });
        let startButtonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        startButtonGeometry.applyMatrix(new THREE.Matrix4().makeScale(3, 1, 1));
        let startButton = new THREE.Mesh(startButtonGeometry, startButtonMaterial);
        startButton.position.x = 0.7;
        startButton.position.y = -5;
        startButton.position.z = 1.2;
        startButton.rotation.z = 30 * DEG_TO_RAD;
        this.add(startButton);

        //selectButton
        let selectButton = new THREE.Mesh(startButtonGeometry, startButtonMaterial);
        selectButton.position.x = -0.7;
        selectButton.position.y = -5;
        selectButton.position.z = 1.2;
        selectButton.rotation.z = 30 * DEG_TO_RAD;
        this.add(selectButton);

        //screenCase
        let screenCaseMaterial = new THREE.MeshStandardMaterial({ color: 0x4d4d4d, roughness: 0.4, metalness: 0 });
        let screenCaseGeometry = new THREE.BoxGeometry(8,7,2);
        let screenCase = new THREE.Mesh(screenCaseGeometry, screenCaseMaterial);
        screenCase.position.y = 3;
        screenCase.position.z = 0.3;
        this.add(screenCase);

        //sreen
        let screenMaterial = new THREE.MeshStandardMaterial({ color: 0x4b694a, roughness: 0.4, metalness: 0 });
        let screenGeometry = new THREE.BoxGeometry(6, 5, 2);
        let screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.y = 3;
        screen.position.z = 0.4;
        this.add(screen);

        //controlLamp
        let controlLampMaterial = new THREE.MeshStandardMaterial({ color: 0x700329, roughness: 0.4, metalness: 0 });
        let controlLampGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        let controlLamp = new THREE.Mesh(controlLampGeometry, controlLampMaterial);
        controlLamp.position.x = -3.5;
        controlLamp.position.y = 3;
        controlLamp.position.z = 1.25;
        this.add(controlLamp);

        //volume
        let volumeMaterial = new THREE.MeshStandardMaterial({ color: 0x404040, roughness: 0.2, metalness: 0.1 });
        let volumeGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 32, 1, false);
        let volume = new THREE.Mesh(volumeGeometry, volumeMaterial);
        volume.position.x =-4.8;
        volume.position.y = 5;
        volume.position.z = 0;
        volume.rotation.x = 90 * DEG_TO_RAD;
        volume.name = "volume";
        this.add(volume);



    }



}
function setGameBoyState(){
    gameBoyState = {
        powerOn: false,
        volumeHigh: false
    }; 
}