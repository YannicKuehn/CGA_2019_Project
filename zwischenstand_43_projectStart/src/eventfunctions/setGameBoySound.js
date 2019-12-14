function setGameBoySound(event) {

    soundscape.getSounds()["src/sound/files/World_Music.mp3"].pause();

    if (gameBoyState.powerOn) {

        var volume = 0.3;

        if (gameBoyState.volumeHigh) {
            volume = 1.0;
        }

        soundscape.getSounds()["src/sound/files/World_Music.mp3"].setVolume(volume);
        soundscape.getSounds()["src/sound/files/World_Music.mp3"].play();
    }
}
