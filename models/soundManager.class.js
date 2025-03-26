/**
* Manages sound effects and music in the game, allowing for muting and unmuting.
*/
class SoundManager {
    /**
    * Creates a new SoundManager instance.
    * Initializes the mute state based on local storage and stores sound objects.
    */
    constructor() {
        this.isMuted = localStorage.getItem("mute") === "true";
        this.sounds = [];
    }

    /**
    * Adds an audio element to the sound manager and applies the current mute state.
    * @param {HTMLAudioElement} audio The audio element to be managed.
    */
    addSound(audio) {
        this.sounds.push(audio);
        if (this.isMuted) audio.muted = true;
    }

    /**
    * Toggles the mute state and updates all sounds and UI accordingly.
    */
    toggleMute() {
        this.isMuted = !this.isMuted;
        localStorage.setItem("mute", this.isMuted.toString());
        this.sounds.forEach(sound => (sound.muted = this.isMuted));
        this.updateButtonUI();
    }

    /**
    * Updates the mute button UI to reflect the current mute state.
    */
    updateButtonUI() {
        const muteButton = document.getElementById("mute-button");
        if (muteButton) {
            const img = muteButton.querySelector("img");
            if (img) img.src = this.isMuted ? "./img/icons/muted.png" : "./img/icons/unmuted.png";
        }
    }
}

/** Singleton instance of the SoundManager. */
const soundManager = new SoundManager();