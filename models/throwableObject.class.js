/**
* Represents a throwable object, such as a salsa bottle.
* This object can be thrown, rotated in the air, and break upon impact.
* @extends MovableObject
*/
class ThrowableObject extends MovableObject {
  IMAGES_ROTATE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  width = 50;
  height = 60;
  offset = { top: 10, left: 20, right: 20, bottom: 10 };
  throwSound = new Audio("audio/throw-bottle.mp3");
  burstSound = new Audio("audio/bottle-break.mp3");
  isBroken = false;

  /**
  * Creates a throwable object.
  * @param {number} x - The initial x-coordinate of the bottle.
  * @param {number} y - The initial y-coordinate of the bottle.
  * @param {boolean} otherDirection - Whether the bottle is thrown in the opposite direction.
  * @param {Object} world - The game world reference.
  */
  constructor(x, y, otherDirection, world) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
    this.world = world;
    this.loadAssets();
    this.throw();
  }

  /**
  * Loads images and sounds into memory.
  */
  loadAssets() {
    soundManager.addSound(this.throwSound);
    soundManager.addSound(this.burstSound);
    this.loadImages(this.IMAGES_ROTATE);
    this.loadImages(this.IMAGES_SPLASH);
  }


  /**
  * Initiates the throw motion of the bottle.
  */
  throw() {
    this.playThrowSound();
    this.speedY = 30;
    this.applyGravity();
    this.applyMovement();
    this.startRotationAnimation();
  }

  /**
  * Moves the bottle in the chosen direction.
  */
  applyMovement() {
    let direction = this.otherDirection ? -10 : 10;
    this.throwInterval = setInterval(() => {
      if (!this.isBroken) this.x += direction;
    }, 25);
  }

  /**
  * Starts the bottle rotation animation while in the air.
  */
  startRotationAnimation() {
    this.rotationInterval = setInterval(() => {
      if (!this.isBroken) this.playAnimation(this.IMAGES_ROTATE);
    }, 80);
  }

  /**
  * Plays the throw sound effect.
  */
  playThrowSound() {
    this.throwSound.currentTime = 0;
    this.world.playSound(this.throwSound, 0.1);
  }

  /**
  * Triggers the bottle-breaking effect.
  */
  burst() {
    this.isBroken = true;
    this.stopMovement();
    this.playBurstSound();
    this.startSplashAnimation();
  }

  /**
  * Stops the bottle's movement and animations after impact.
  */
  stopMovement() {
    clearInterval(this.throwInterval);
    clearInterval(this.rotationInterval);
    this.speedX = this.speedY = this.acceleration = this.speed = 0;
  }

  /**
  * Plays the breaking sound effect.
  */
  playBurstSound() {
    this.world.playSound(this.burstSound, 0.3);
  }

  /**
  * Starts the splash animation upon breaking and removes the object after a short delay.
  */
  startSplashAnimation() {
    this.splashInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_SPLASH);
    }, 100);
    setTimeout(() => {
        clearInterval(this.splashInterval);
        this.world.throwableObjects = this.world.throwableObjects.filter(obj => obj !== this);
    }, 500);
  }
}
