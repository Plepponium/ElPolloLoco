/**
 * Represents the main character in the game.
 * Inherits movement functionality from MovableObject.
 */
class Character extends MovableObject {
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  jumpSound = new Audio("audio/jump.mp3");
  walkingSound = new Audio("audio/walking.mp3");
  hurtSound = new Audio("audio/hurt.mp3");
  snoringSound = new Audio("audio/snoring.mp3");
  deadSound = new Audio("audio/die.mp3");

  width = 140;
  height = 280;
  y = 80;
  speed = 5;
  offset = { top: 120, left: 25, right: 42, bottom: 20 };

  world;
  isIdle = false;
  isLongIdle = false;
  idleTimeout;
  deathAnimationPlayed = false;

  /**
  * Creates an instance of Character.
  * @param {Object} world - The game world instance.
  */
  constructor(world) {
    super().loadImage(this.IMAGES_IDLE[0]);
    this.loadAllImages();
    this.addSounds();
    this.world = world;
    this.applyGravity();
    this.animate();
  }

  /**
  * Loads all character animation images.
  */
  loadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
  }

  /**
  * Adds character sounds to the sound manager.
  */
  addSounds() {
    soundManager.addSound(this.jumpSound);
    soundManager.addSound(this.walkingSound);
    soundManager.addSound(this.hurtSound);
    soundManager.addSound(this.snoringSound);
    soundManager.addSound(this.deadSound);
  }

  /**
  * Starts the animation loop for movement and animations.
  */
  animate() {
    setInterval(() => this.handleMovement(), 1000 / 60);
    setInterval(() => this.handleAnimations(), 80);
  }

  /**
  * Handles character movement and resets idle timers.
  */
  handleMovement() {
    let moving = this.processMovement();
    if (moving) this.resetIdleTimer();
    this.updateCamera();
  }

  /**
   * Processes user inputs and applies corresponding movement.
   * @returns {boolean} Whether the character moved.
   */
  processMovement() {
    let moved = false;
    if (this.isMovingRight()) this.moveCharacter(false), (moved = true);
    if (this.isMovingLeft()) this.moveCharacter(true), (moved = true);
    if (this.isJumping()) this.jump(), (moved = true);
    if (this.isThrowing()) moved = true;
    return moved;
  }

  /**
   * Moves the character in the specified direction.
   * @param {boolean} otherDirection - True if moving left, false if right.
   */
  moveCharacter(otherDirection) {
    otherDirection ? this.moveLeft() : this.moveRight();
    this.otherDirection = otherDirection;
  }

  /**
  * Checks if the character is moving to the right.
  * The character can move right only if the right key is pressed
  * and the character has not reached the level's end.
  * 
  * @returns {boolean} True if the character is moving right, otherwise false.
  */
  isMovingRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
  * Checks if the character is moving to the left.
  * The character can move left only if the left key is pressed
  * and the character is not at the leftmost position.
  * 
  * @returns {boolean} True if the character is moving left, otherwise false.
  */
  isMovingLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
  * Checks if the character is jumping.
  * The character can jump only if the space key is pressed
  * and the character is not already in the air.
  * 
  * @returns {boolean} True if the character is jumping, otherwise false.
  */
  isJumping() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
  * Checks if the character is throwing an object.
  * The character can throw only if the 'D' key is pressed
  * and the character is not dead.
  * 
  * @returns {boolean} True if the character is throwing, otherwise false.
  */
  isThrowing() {
    return this.world.keyboard.D && !this.isDead();
  }

  /**
  * Checks if the character is currently walking.
  * @returns {boolean} True if moving left or right, otherwise false.
  */
  isWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
  * Updates the camera position relative to the character.
  */
  updateCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
  * Handles character animation logic.
  */
  handleAnimations() {
    if (this.isDead()) {
        this.handleDeathAnimation();
    } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.handleJumpAnimation();
    } else if (this.isWalking()) {
      this.handleWalkingAnimation();
    } else {
        this.handleIdleAnimations();
        this.resetWalkingSound();
    }
  }

  /**
  * Handles the jumping animation logic.
  */
  handleJumpAnimation() {
    this.adjustJumpingFrame();
    this.playAnimation(this.IMAGES_JUMPING);
  }

  /**
  * Adjusts the current frame for the jumping animation.
  */
  adjustJumpingFrame() {
    if (this.currentImage >= 1 && this.speedY > 0) {
        this.currentImage = 1;
    } else if (this.currentImage >= this.IMAGES_JUMPING.length) {
        this.currentImage = this.IMAGES_JUMPING.length - 1;
    }
  }

  /**
  * Handles the walking animation and sound.
  */
  handleWalkingAnimation() {
    this.playAnimation(this.IMAGES_WALKING);
    if (this.walkingSound.paused) {
        this.world.playSound(this.walkingSound, 0.3);
    }
  }

  /**
  * Handles idle animations and sound.
  */
  handleIdleAnimations() {
    const idleImages = this.isLongIdle ? this.IMAGES_LONG_IDLE : this.IMAGES_IDLE;
    this.playAnimation(idleImages);

    if (this.isLongIdle && this.snoringSound.paused) {
        this.world.playSound(this.snoringSound, 0.1);
    }
  }

  /**
  * Resets walking sound when the character stops moving.
  */
  resetWalkingSound() {
    this.walkingSound.pause();
    this.walkingSound.currentTime = 0;
  }

  /**
  * Handles the death animation and plays the death sound.
  */
  handleDeathAnimation() {
    if (this.deathAnimationPlayed) return;
    this.playAnimation(this.IMAGES_DEAD);
    this.deathAnimationPlayed = true;
    this.world.playSound(this.deadSound, 0.1);
  }

  /**
  * Makes the character jump.
  */
  jump() {
    if (this.speedY > 0) return;
    this.currentImage = 0;
    this.speedY = 30;
    this.world.playSound(this.jumpSound, 0.05);
  }

  /**
  * Resets the idle timer whenever the character moves.
  * 
  * - The character is considered idle after 4 seconds of no movement.
  * - If the character remains idle for a total of 10 seconds, it enters the long idle state.
  * - Moving in any direction resets the idle and long idle states.
  */
  resetIdleTimer() {
    this.isIdle = false;
    this.isLongIdle = false;
    this.stopSnoringSound();
    clearTimeout(this.idleTimeout);
    clearTimeout(this.longIdleTimeout);
    this.idleTimeout = setTimeout(() => {
        this.isIdle = true;
        this.setLongIdleTimeout();
    }, 4000);
  }

  /**
  * Stops snoring sound and resets playback time.
  */
  stopSnoringSound() {
    this.snoringSound.pause();
    this.snoringSound.currentTime = 0;
  }

  /**
  * Sets a timeout to transition into the long idle state.
  */
  setLongIdleTimeout() {
    this.longIdleTimeout = setTimeout(() => {
        if (this.isIdle && !this.isMovingRight() && !this.isMovingLeft()) {
            this.isLongIdle = true;
        }
    }, 6000);
  }
}
