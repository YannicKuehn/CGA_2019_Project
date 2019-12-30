class Soundscape {

    constructor() {

        this.audioListener = new THREE.AudioListener();
        this.audioLoader = new THREE.AudioLoader();
        this.sounds = [];
    }

    getAudioListener() {
        return this.audioListener;
    }

    getSounds() {
        return this.sounds;
    }

    addSound(visualObject, path, refDistance = 10, cone = false) {

        var sound = new THREE.PositionalAudio(this.audioListener);

        this.audioLoader.load(path, function (buffer) {
            sound.setBuffer(buffer);
            sound.setRefDistance(refDistance);
            if (cone) {
                sound.setDirectionalCone(150, 230, 0.5);    // inner cone, outer cone, back cone factor
            }
        });
        visualObject.add(sound);
        this.sounds[path] = sound;
    }
}