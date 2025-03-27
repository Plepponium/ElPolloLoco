/**
* Represents a status bar for health, coins, and bottles in the game.
* Also manages the Endboss health bar.
*/
class StatusBar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
  * Creates a new status bar.
  * @param {"health" | "bossHealth"} type - The type of the status bar.
  * @param {number} x - The x position of the status bar.
  * @param {number} y - The y position of the status bar.
  * @param {object} [endboss=null] - The Endboss object, only required for the boss health bar.
  */
  constructor(type, x, y, endboss = null) {
    super();
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = type === "bossHealth" ? 300 : 160;
    this.height = 40;
    this.endboss = endboss;
    this.counter = 0;
    this.loadImages(this.IMAGES_HEALTH);
    this.setupBar();
  }

  /**
  * Initializes the status bar based on its type.
  */
  setupBar() {
    if (this.type === "bossHealth") this.setupBossHealthBar();
    else if (this.type === "coin" || this.type === "bottle") this.setupCounterBar();
    else this.setPercentage(100);
  }

  /**
  * Sets up the assets for the Endboss health bar.
  */
  setupBossHealthBar() {
    this.icon = this.loadImage("img/7_statusbars/3_icons/icon_health_endboss.png");
    this.barEmpty = this.loadImage("img/7_statusbars/4_bar_elements/statusbar_empty.png");
    this.barGreen = this.loadImage("img/7_statusbars/4_bar_elements/statusbar_green.png");
  }

  /**
  * Sets up the assets for the coin or bottle counter bar.
  */
  setupCounterBar() {
    this.icon = this.loadImage(
      this.type === "coin" ? "img/8_coin/coin_2.png" : "img/6_salsa_bottle/salsa_bottle.png");
  }

  /**
  * Loads an image and returns it.
  * @param {string} src - The source path of the image.
  * @returns {HTMLImageElement} The loaded image.
  */
  loadImage(src) {
    let img = new Image();
    img.src = src;
    return img;
  }

  /**
  * Sets the percentage and updates the displayed image.
  * @param {number} percentage - The new percentage value.
  */
  setPercentage(percentage) {
    this.percentage = percentage;
    this.img = this.imageCache[this.IMAGES_HEALTH[this.resolveImageIndex()]];
  }

  /**
  * Determines the image index based on the current percentage.
  * @returns {number} The index of the image to be used.
  */
  resolveImageIndex() {
    if (this.percentage > 80) return 5;
    if (this.percentage > 60) return 4;
    if (this.percentage > 40) return 3;
    if (this.percentage > 20) return 2;
    if (this.percentage > 0) return 1;
    return 0;
}

  /**
  * Draws the status bar on the canvas.
  * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
  */
  draw(ctx) {
    if (this.type === "bossHealth" && this.endboss && this.endboss.hadFirstContact) {
      this.drawBossHealthBar(ctx);
    } else if (this.type === "coin" || this.type === "bottle") {
      this.drawCounter(ctx);
    } else if (this.type === "health"){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  /**
  * Draws the Endboss health bar with a mirrored effect.
  * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
  */
  drawBossHealthBar(ctx) {
    ctx.save();
    ctx.scale(-1, 1);
    let drawX = -this.x - this.width;
    ctx.drawImage(this.barEmpty, drawX, this.y, this.width, this.height);
    this.drawBossHealthGreenBar(ctx, drawX);
    ctx.restore();
    ctx.drawImage(this.icon, this.x + this.width - 30, this.y, 40, 40);
  }

  /**
  * Draws the green health bar for the Endboss.
  * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
  * @param {number} drawX - The x-coordinate for the mirrored drawing.
  */
  drawBossHealthGreenBar(ctx, drawX) {
    let greenWidth = (this.width * this.endboss.energy) / 18;
    if (greenWidth > 0) ctx.drawImage(this.barGreen, drawX, this.y, greenWidth, this.height);
  }

  /**
  * Draws the coin or bottle counter.
  * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
  */
  drawCounter(ctx) {
    ctx.drawImage(this.icon, this.x, this.y, 60, 60);
    ctx.fillStyle = "white";
    ctx.font = "30px zabars";
    ctx.fillText("x " + this.counter, this.x + 50, this.y + 40);
  }

  /**
  * Increases the counter for coins or bottles.
  */
  increaseCounter() {
    this.counter++;
  }
}