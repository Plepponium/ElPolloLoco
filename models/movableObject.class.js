/**
* Represents a movable object in the game, such as characters, enemies, and projectiles.
* Inherits from `DrawableObject`.
*/
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  groundY = 145;
  energy = 100;
  lastHit = 0;
  offset = {top: 0, left: 0, right: 0, bottom: 0};

  /**
  * Applies gravity to the object, making it fall unless it's on the ground.
  */
  applyGravity() {
    setInterval(() => this.updateGravity(), 1000 / 45);
  }

  /**
  * Updates the gravity effect on the object.
  */
  updateGravity() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    } else {
      this.resetToGround();
    }
  }

  /**
  * Resets the object to the ground level.
  */
  resetToGround() {
    this.y = this.groundY;
    this.speedY = 0;
  }


  /**
   * Checks if the object is above the ground.
   * @returns {boolean} `true` if the object is in the air, otherwise `false`.
   */
  isAboveGround() {
    return this instanceof ThrowableObject || this.y < this.groundY;
  }

  /**
  * Checks if this object is colliding with another movable object.
  * @param {MovableObject} mo - The object to check collision with.
  * @returns {boolean} `true` if the objects are colliding, otherwise `false`.
  */
  isColliding(mo) {
    let [left, right, top, bottom] = this.getBounds();
    let [moLeft, moRight, moTop, moBottom] = mo.getBounds();
    return right > moLeft && left < moRight && bottom > moTop && top < moBottom;
  }

  /**
  * Gets the object's bounding box, considering offsets.
  * @returns {number[]} Array containing [left, right, top, bottom] values.
  */
  getBounds() {
    let left = this.x + (this.otherDirection ? this.offset.right : this.offset.left);
    let right = this.x + this.width - (this.otherDirection ? this.offset.left : this.offset.right);
    let top = this.y + this.offset.top;
    let bottom = this.y + this.height - this.offset.bottom;
    return [left, right, top, bottom];
  }



  /**
  * Checks if this object is colliding on top of another object.
  * @param {MovableObject} obj The object to check collision with.
  * @returns {boolean} `true` if this object is on top of the other object, otherwise `false`.
  */
  isCollidingOnTop(obj) {
    return (
      this.x + this.width / 2 > obj.x &&
      this.x + this.width / 2 < obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y + this.height <= obj.y + obj.height * 0.75 &&
      this.speedY <= 0
    );
  }

  /**
  * Reduces the object's energy when hit. If energy reaches zero, the object dies.
  */
  hit() {
    if (this.canTakeDamage()) {
      this.energy -= 2;
      if (this.isDead()) this.die();
      this.lastHit = Date.now();
    }
  }

  /**
  * Checks if the object can take damage based on time since last hit.
  * @returns {boolean} `true` if the object can take damage.
  */
  canTakeDamage() {
    return Date.now() - this.lastHit > 100;
  }


  /**
  * Checks if the object has been recently hurt.
  * @returns {boolean} `true` if the object was hurt in the last second, otherwise `false`.
  */
  isHurt() {
    return (Date.now() - this.lastHit) / 1000 < 1;
  }

  /**
  * Checks if the object is dead.
  * @returns {boolean} `true` if energy is zero, otherwise `false`.
  */
  isDead() {
    return this.energy <= 0;
  }

  /**
  * Plays an animation by cycling through an array of images.
  * @param {string[]} images Array of image paths for the animation.
  */
  playAnimation(images) {
    let path = images[this.currentImage % images.length];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
  * Moves the object to the right.
  */
  moveRight() {
    this.x += this.speed;
  }

  /**
  * Moves the object to the left.
  */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
  * Makes the object jump by setting its vertical speed.
  */
  jump() {
    this.speedY = 30;
  }

  /**
  * Handles the object's death by playing the death animation and sound.
  */
  die() {
    if (this.isDefeated) return;
    this.isDefeated = true;
    this.speed = 0;
    this.playDeathAnimation();
    this.playDeathSound();
  }

  /**
  * Plays the death animation if available.
  */
  playDeathAnimation() {
    if (this.IMAGES_DEAD) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.DEATH_IMAGE) {
      this.loadImage(this.DEATH_IMAGE);
    }
  }

  /**
  * Plays the appropriate death sound.
  */
  playDeathSound() {
    let sound = this.getDeathSound();
    if (sound) {
      sound.volume = 0.1;
      sound.currentTime = 0;
      sound.play();
    }
  }
  
  /**
  * Returns the appropriate death sound based on the object's type.
  * @returns {HTMLAudioElement | null} The corresponding sound or `null` if no sound is assigned.
  */
  getDeathSound() {
    if (this instanceof Chicken) return this.chickenDieSound;
    if (this instanceof Endboss) return this.bossDieSound;
    if (this instanceof Chick) return this.chickDieSound;
    return null;
  }
}
