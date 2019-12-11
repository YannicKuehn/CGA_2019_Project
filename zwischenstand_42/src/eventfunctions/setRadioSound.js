function setRadioSound(event) {

    soundscape.getSounds()["src/sound/files/sound_01.mp3"].pause();
    soundscape.getSounds()["src/sound/files/sound_02.mp3"].pause();
    soundscape.getSounds()["src/sound/files/white_noise.mp3"].pause();

    if (radioState.powerOn) {

        var volume = 0.3;
        if (radioState.volumeHigh) {
            volume = 1.0;
        }

        if (radioState.antennaOut) {

            if (radioState.markerRight) {
                soundscape.getSounds()["src/sound/files/sound_01.mp3"].setVolume(volume);
                soundscape.getSounds()["src/sound/files/sound_01.mp3"].play();
            } else {
                soundscape.getSounds()["src/sound/files/sound_02.mp3"].setVolume(volume);
                soundscape.getSounds()["src/sound/files/sound_02.mp3"].play();
            }

        } else {
            soundscape.getSounds()["src/sound/files/white_noise.mp3"].setVolume(volume);
            soundscape.getSounds()["src/sound/files/white_noise.mp3"].play();
        }

    } else {

        // Do nothing
    }
}

