class Physics {

    constructor() {

        this.world = new CANNON.World();
        this.stepSize = 0;
        this.timeToGo = 0;
        this.visualObjects = [];
        this.physicalBodies = [];
    }

    addPair(visualObject, body) {
        this.visualObjects.push(visualObject);
        this.physicalBodies.push(body);
    }

    initialize(gravityX, gravityY, gravityZ, stepsize, addfloor) {

        this.world.gravity.set(gravityX, gravityY, gravityZ);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.stepSize = stepsize;

        if (addfloor) {
            var floor = new CANNON.Body({
                shape: new CANNON.Plane(),
                mass: 0
            });
            floor.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
            this.world.addBody(floor);
        }
    }

    update(delta) {

        // Step physics world forward
        this.timeToGo += delta;
        while (this.timeToGo >= this.stepSize) {
            this.world.step(this.stepSize);
            this.timeToGo -= this.stepSize;
        }
        // Copy transformations
        for (var i = 0; i < this.visualObjects.length; i++) {
            this.visualObjects[i].position.copy(this.physicalBodies[i].position);
            this.visualObjects[i].quaternion.copy(this.physicalBodies[i].quaternion);
        }
    }

    getWorld() {
        return this.world;
    }

    addBox(visualObject, mass, dimX, dimY, dimZ, offsetX = 0, offsetY = 0, offsetZ = 0) {

        var dimension = new CANNON.Vec3(dimX / 2, dimY / 2, dimZ / 2);
        var offset = new CANNON.Vec3(offsetX, offsetY, offsetZ);

        var body = new CANNON.Body({mass: mass});

        // Add shape (~collider) to physical body
        body.addShape(new CANNON.Box(dimension), offset);

        // Copy initial transformation from visual object
        body.position.copy(visualObject.position);
        body.quaternion.copy(visualObject.quaternion);

        this.world.addBody(body);

        this.addPair(visualObject, body);
    }
}