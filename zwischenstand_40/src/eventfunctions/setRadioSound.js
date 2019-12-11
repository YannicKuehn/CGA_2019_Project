function setRadioSound(event) {

    if (radioState.powerOn) {

        console.log("Radio is on.");

        if (radioState.volumeHigh) {
            console.log("Volume is high.");
        } else {
            console.log("Volume is low.");
        }

        if (radioState.antennaOut) {

            if (radioState.markerRight) {
                console.log("Playing high frequency sound.")
            } else {
                console.log("Playing low frequency sound.")
            }

        } else {
            console.log("Playing white noise");
        }

    } else {

        console.log("Radio is off.");
    }
}