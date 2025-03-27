/**
* Represents the game world, managing the game state, rendering, and interactions.
*/
class World {
  character = new Character();
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthStatusbar = new StatusBar("health", 20, 0);
  coinStatusbar = new StatusBar("coin", 0, 25);
  bottleStatusbar = new StatusBar("bottle", 0, 70);
  bossHealthStatusBar = null;
  throwableObjects = [];

  collectCoinSound = new Audio("audio/collect-coin.mp3");
  collectBottleSound = new Audio("audio/collect-bottle.mp3");
  gameoverSound = new Audio("audio/gameover.mp3");
  winnerSound = new Audio('audio/winner.mp3')

  /**
  * Creates a new game world.
  * @param {HTMLCanvasElement} canvas - The canvas where the game is rendered.
  * @param {Object} keyboard - The keyboard input handler.
  */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level1;
    this.throwCooldown = false;
    this.loadSounds();
    this.initialize();
  }

  /**
  * Loads game sounds into the sound manager.
  */
  loadSounds() {
   soundManager.addSound(this.collectCoinSound);
   soundManager.addSound(this.collectBottleSound);
   soundManager.addSound(this.gameoverSound);
   soundManager.addSound(this.winnerSound);
  }

  /**
  * Initializes game objects and starts the game loop.
  */
  initialize() {
    this.assignWorldToEnemies();
    this.character.world = this;
    this.run();
    this.draw();
  }

  /**
  * Assigns the world to all enemies and sets up the boss health status bar if applicable.
  */
  assignWorldToEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
        this.bossHealthStatusBar = new StatusBar("bossHealth", 400, 0, enemy);
      }
    });
  }

  /**
  * Starts the game loop for checking collisions, throwing objects, and checking game over.
  */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkGameOver();
    }, 1000 / 60);
  }

  /**
  * Checks if the game is over and handles the end screen display after a short delay.
  */
  checkGameOver() {
    if (this.character.isDead()) {
        setTimeout(() => {
            this.endGame("img/9_intro_outro_screens/game_over/game over!.png", this.gameoverSound);
        }, 1000);
    } else if (this.level.enemies.some(e => e instanceof Endboss && e.isDead())) {
        setTimeout(() => {
            this.endGame("img/9_intro_outro_screens/game_over/you_won.png", this.winnerSound);
        }, 1000);
    }
  }

  
  /**
  * Displays the end screen with a given image and plays the corresponding sound.
  * @param {string} imageSrc - The path to the end screen image.
  * @param {HTMLAudioElement} sound - The sound to be played.
  */
  endGame(imageSrc, sound) {
    document.getElementById("canvas").classList.add("hidden");
    document.getElementById("endscreen").classList.remove("hidden");
    document.getElementById("end-image").src = imageSrc;
    soundManager.stopAllSounds();
    this.playSound(sound, 0.1);
    this.clearWorld();
  }

  /**
  * Clears all game elements from the world.
  */
  clearWorld() {
    let highestIntervalId = setInterval(() => {}, 1000);
    for (let i = 0; i < highestIntervalId; i++) clearInterval(i);
    this.stopDrawing = true;
    this.level.enemies = [];
    this.level.coins = [];
    this.level.bottles = [];
    this.throwableObjects = [];
    this.character = null;
    this.healthStatusbar = null;
    this.coinStatusbar = null;
    this.bottleStatusbar = null;
    this.bossHealthStatusBar = null;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
  * Handles throwing bottle objects.
  */
  checkThrowObjects() {
    if (this.keyboard.D &&  this.bottleStatusbar.counter > 0 && !this.throwCooldown) {
      this.throwCooldown = true;
      let offsetX = this.character.otherDirection ? -10 : 100;
      this.throwableObjects.push(new ThrowableObject(this.character.x + offsetX, this.character.y + 100, this.character.otherDirection, this));
      this.bottleStatusbar.counter--;
      setTimeout(() => (this.throwCooldown = false), 500);
    }
  }

  /**
  * Checks for collisions between the character, enemies, coins, and throwable objects.
  */
  checkCollisions() {
    this.checkEnemyCollisions();
    this.checkItemCollisions(this.level.coins, this.coinStatusbar, this.collectCoinSound);
    this.checkItemCollisions(this.level.bottles, this.bottleStatusbar, this.collectBottleSound);
    this.checkThrowableCollisions();
  }

  /**
  * Checks collisions with enemies and handles damage or defeat.
  */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isCollidingOnTop(enemy)) {
        this.character.jump();
        enemy.hit();
        if (enemy.isDead()) this.defeatEnemy(enemy);
      } else if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.healthStatusbar.setPercentage(this.character.energy);
        this.playHurtSound();
      }
    });
  }

  /**
  * Plays the hurt sound with a cooldown.
  */
  playHurtSound() {
    const now = Date.now();
    if (this.character.isHurt() && (!this.character.lastHurtSoundTime || now - this.character.lastHurtSoundTime >= 1000)) {
      this.playSound(this.character.hurtSound, 0.1);
      this.character.lastHurtSoundTime = now;
    }
  }

  checkItemCollisions(items, statusbar, sound) {
    items.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        items.splice(index, 1);
        statusbar.increaseCounter();
        this.playSound(sound, 0.02);
      }
    });
  }

  /**
  * Handles collisions between throwable objects and enemies.
  */
  checkThrowableCollisions() {
    this.throwableObjects.forEach((bottle) => {
      if (!bottle.hasHit) {
        this.level.enemies.forEach((enemy) => {
          if (bottle.isColliding(enemy)) {
            bottle.hasHit = true;
            enemy.hit();
            if (enemy instanceof Endboss && this.bossHealthStatusBar) this.bossHealthStatusBar.endboss = enemy;
            bottle.burst();
            setTimeout(() => {
              if (enemy.isDead()) this.defeatEnemy(enemy);
            }, 500);
          }
        });
      }
    });
  }

  /**
  * Handles the defeat of an enemy.
  * @param {Enemy} enemy - The defeated enemy.
  */
  defeatEnemy(enemy) {
   enemy.die();
   setTimeout(() => {
     this.level.enemies = this.level.enemies.filter(e => e !== enemy);
   }, 250);
  }


  /**
  * Draws the game world, rendering all objects and handling the camera movement.
  * The function continuously calls itself using `requestAnimationFrame` to keep the game running.
  */
  draw() {
    if (this.stopDrawing) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addBackgroundObjects()
    this.ctx.translate(-this.camera_x, 0);
    this.addStatusbars();
    this.ctx.translate(this.camera_x, 0);
    this.addMovableObjects();
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
  * Adds background objects such as clouds and other decorative elements to the game world.
  */
  addBackgroundObjects(){
    this.addObjectsToMap(this.level.bgObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
  * Adds all movable objects to the game world, including the character, enemies, coins, bottles, and throwable objects.
  */
  addMovableObjects(){
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
  * Adds an array of objects to the game map by calling `addToMap` for each object.
  * @param {Array<Object>} objects - The objects to be drawn on the canvas.
  */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
  * Draws a single movable object (character, enemies, items, etc.) onto the canvas.
  * Handles image flipping for objects facing the opposite direction.
  * @param {Object} mo - The movable object to be drawn.
  */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
  * Draws all status bars (health, coins, bottles, and boss health if present) on the screen.
  */
  addStatusbars() {
    this.addToMap(this.healthStatusbar);
    this.addToMap(this.coinStatusbar);
    this.addToMap(this.bottleStatusbar);
    if (this.bossHealthStatusBar) this.addToMap(this.bossHealthStatusBar);
  }

  /**
  * Flips an image horizontally before drawing it.
  * This is used for characters or enemies that are facing the opposite direction.
  * @param {Object} mo - The object to be flipped.
  */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }

  /**
  * Restores the original position of an image after flipping it.
  * @param {Object} mo - The object to be restored.
  */
  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }

  /**
  * Plays a sound with a specified volume.
  * @param {HTMLAudioElement} sound - The sound to play.
  * @param {number} volume - The volume level (0 to 1).
  */
  playSound(sound, volume) {
    sound.currentTime = 0;
    sound.volume = volume;
    sound.play();
  }
}
