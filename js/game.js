let canvas;
let world;
let keyboard = new Keyboard();
let introMusic = new Audio('audio/intro-music.mp3');
let gameMusic = new Audio('audio/bg-music.mp3');
setupAudio();

/**
* Sets up audio properties and updates the UI.
*/
function setupAudio() {
    introMusic.loop = true;
    gameMusic.loop = true;
    soundManager.addSound(introMusic);
    soundManager.addSound(gameMusic);
    soundManager.updateButtonUI();
}

/**
* Toggles mute/unmute for game audio.
*/
function toggleMuteUI() {
    if (soundManager?.toggleMute) soundManager.toggleMute();
}

/**
* Toggles fullscreen mode for the game.
*/
function toggleFullScreen() {
    const fullscreenButton = document.getElementById('fullscreen-icon');
    const gameContainer = document.getElementById('game-container');

    if (!document.fullscreenElement) {
        openFullscreen(gameContainer);
        fullscreenButton.src = "./img/icons/exit-fullscreen.png";
    } else {
        closeFullscreen();
        fullscreenButton.src = "./img/icons/fullscreen.png";
    }
}

/**
* Enables fullscreen mode for a given element.
* @param {HTMLElement} element - The element to display in fullscreen.
*/
function openFullscreen(element) {
    element.requestFullscreen?.() ||
    element.webkitRequestFullscreen?.() ||
    element.msRequestFullscreen?.();
}

/**
* Exits fullscreen mode.
*/
function closeFullscreen() {
    document.exitFullscreen?.() ||
    document.webkitExitFullscreen?.() ||
    document.msExitFullscreen?.();
}

/**
* Starts playing the intro music when the user clicks anywhere outside the play button.
*/
document.addEventListener('click', handleIntroMusic, { once: true });

/**
* Handles starting the intro music.
* @param {Event} event - The click event.
*/
function handleIntroMusic(event) {
    let playButton = document.getElementById('playButton');
    if (!playButton.contains(event.target) && introMusic.paused) {
        introMusic.volume = 0.1;
        introMusic.play();
    }
}

/**
* Opens the overlay and displays the corresponding content.
* @param {string} id - The ID of the overlay to open ("controls" or "info").
*/
function openOverlay(id) {
    document.getElementById('overlay-text').innerHTML = id === 'controls' ? controlsHTML() : infoHTML();
    document.getElementById('overlay').classList.remove('hidden');
}

/**
* Closes the overlay.
*/
function closeOverlay() {
    document.getElementById('overlay').classList.add('hidden');
}

/**
* Initializes and starts the game.
*/
function startGame() {
    setupGameUI();
    initGame();
}

/**
* Sets up UI elements for starting the game.
*/
function setupGameUI() {
    canvas = document.getElementById('canvas');
    document.getElementById('startscreen').classList.add('hidden');
    canvas.classList.remove('hidden');
    introMusic.pause();
    introMusic.currentTime = 0;
    gameMusic.volume = 0.1;
    gameMusic.play();
}

/**
* Initializes the game world.
*/
function initGame() {
    initLevel();
    init();
    setupTouchControls();
}

/**
* Initializes the game world.
*/
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
* Restarts the game by hiding the end screen and starting the game again.
*/
function restartGame() {
    document.getElementById('endscreen').classList.add('hidden');
    startGame();
}

/**
* Returns to the main menu by hiding the end screen and showing the start screen.
*/
function backToMenu() {
    document.getElementById('endscreen').classList.add('hidden');
    document.getElementById('startscreen').classList.remove('hidden');
}

/**
* Sets up touch controls for mobile devices.
*/
function setupTouchControls() {
    const controls = [
        { id: 'btnLeft', key: 'LEFT' },
        { id: 'btnRight', key: 'RIGHT' },
        { id: 'btnJump', key: 'SPACE' },
        { id: 'btnThrow', key: 'D' }
    ];
    controls.forEach(setupTouchEvent);
}

/**
* Sets up touch event listeners for a button.
* @param {{ id: string, key: string }} control - The button configuration.
*/
function setupTouchEvent(control) {
    const button = document.getElementById(control.id);
    button.addEventListener('touchstart', (event) => handleTouch(event, control.key, true), { passive: false });
    button.addEventListener('touchend', (event) => handleTouch(event, control.key, false), { passive: false });
}

/**
* Handles touch events for controls.
* @param {TouchEvent} event - The touch event.
* @param {string} key - The key to set.
* @param {boolean} isPressed - Whether the key is pressed or released.
*/
function handleTouch(event, key, isPressed) {
    event.preventDefault();
    keyboard[key] = isPressed;
}

/**
* Handles keyboard events.
* @param {KeyboardEvent} event - The keyboard event.
* @param {boolean} isPressed - Whether the key is pressed or released.
*/
function handleKeyboardInput(event, isPressed) {
    const keyMap = {
        39: 'RIGHT',
        37: 'LEFT',
        38: 'UP',
        40: 'DOWN',
        32: 'SPACE',
        68: 'D'
    };
    if (keyMap[event.keyCode]) {
        keyboard[keyMap[event.keyCode]] = isPressed;
    }
}

// Attach event listeners for keyboard input
window.addEventListener("keydown", (event) => handleKeyboardInput(event, true));
window.addEventListener("keyup", (event) => handleKeyboardInput(event, false));
