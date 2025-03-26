/**
* Represents the Endboss in the game, which moves, animates, and reacts to the player's presence.
*/
class Endboss extends MovableObject {
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  bossDieSound = new Audio("audio/endboss-die.mp3");
  bossHurtSound = new Audio("audio/endboss-hurt.mp3");
  bossAlertSound = new Audio("audio/endboss-alert.mp3");

  MIN_SPEED = 0.75;
  MAX_SPEED = 1.5;
  width = 300;
  height = 500;
  y = -30;
  x = 2500;
  offset = { top: 120, left: 50, right: 40, bottom: 140 };
  isAlert = false;
  isDefeated = false;
  hadFirstContact = false;
  alertFrameCounter = 0;

  /**
  * Initializes the Endboss with random speed and loads assets.
  */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.energy = 18;
    this.speed = this.MIN_SPEED + Math.random() * this.MAX_SPEED;
    this.loadAllImages();
    this.addSounds();
    this.animate();
  }

  /**
  * Loads all required animation images into the cache.
  */
  loadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
  * Registers the Endboss sound effects in the sound manager.
  */
  addSounds() {
    soundManager.addSound(this.bossDieSound);
    soundManager.addSound(this.bossHurtSound);
    soundManager.addSound(this.bossAlertSound);
  }

  /**
  * Handles the movement logic of the Endboss.
  * The boss moves left and right within a set range.
  */
  handleMovement() {
    if (this.isDefeated) return;
    if (this.x <= 2000) this.movingLeft = false;
    if (this.x >= 2500) this.movingLeft = true;
    this.movingLeft ? this.moveLeft() : this.moveRight();
  }

  /**
  * Starts the animation and movement behavior of the Endboss.
  */
  animate() {
    this.movingLeft = true;
    setInterval(() => this.handleMovement(), 1000 / 60);
    setInterval(() => this.handleAnimations(), 150);
  }

   /**
   * Controls which animation is played based on the boss's state.
   */
  handleAnimations() {
    if (this.isDefeated) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAlert) {
      this.playAnimation(this.IMAGES_ALERT);
      this.handleAlertAnimation();
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
    this.checkForAlertTrigger();
  }

  /**
  * Manages the alert animation by tracking the frames displayed.
  */
  handleAlertAnimation() {
    this.alertFrameCounter++;
    if (this.alertFrameCounter >= this.IMAGES_ALERT.length) {
      this.isAlert = false;
      this.alertFrameCounter = 0;
    }
  }

  /**
  * Triggers the alert animation and sound when the player reaches a certain position.
  */
  checkForAlertTrigger() {
    if (this.world.character.x > 1700 && !this.hadFirstContact) {
      this.hadFirstContact = true;
      this.isAlert = true;
      this.alertFrameCounter = 0;
      this.world.playSound(this.bossAlertSound, 0.05);
    }
  }
}
