/**
* Represents a small chick enemy in the game.
* The chick moves left, jumps occasionally, and can be defeated.
* Inherits from `MovableObject`.
*/
class Chick extends MovableObject {
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  DEATH_IMAGE = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  chickDieSound = new Audio ('audio/chick-die.mp3');

  MIN_X = 300;
  MAX_X = 2000;
  MIN_SPEED = 0.3;
  MAX_SPEED = 0.8;
  x = this.MIN_X + Math.random() * this.MAX_X;
  y = 375;
  speed = this.MIN_SPEED + Math.random() * this.MAX_SPEED;
  groundY = 375;
  height = 40;
  width = 40;
  isDefeated = false;
    
  /**
  * Creates a new chick instance with random position and speed.
  * @param {Object} world The game world in which the chick exists.
  */
  constructor(world) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.world = world;
    this.energy = 2;
    soundManager.addSound(this.chickDieSound);
    this.applyGravity();
    this.animate();
  }

  /**
  * Starts the chick's movement, animation, and occasional jumping.
  */
  animate() {
    setInterval(() => {this.handleMovement()}, 1000 / 60);
    setInterval(() => {this.handleAnimation()}, 100);
    setInterval(() => {this.handleJumping()}, 500);
  }

  /**
  * Moves the chick to the left if it is not defeated.
  */
  handleMovement(){
    if (!this.isDefeated) this.moveLeft();
  }

  /**
  * Plays the walking animation if the chick is not defeated.
  */
  handleAnimation(){
    if (!this.isDefeated) this.playAnimation(this.IMAGES_WALKING);
  }

  /**
  * Makes the chick jump with a 10% chance if it is not defeated.
  */
  handleJumping(){
    if (!this.isDefeated && Math.random() < 0.1) this.jump();
  }

  /**
  * Makes the chick jump by setting its vertical speed.
  */
  jump() {
    this.speedY = 20;
  }
}
  