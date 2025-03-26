/**
* Represents a collectible coin in the game.
* Coins have an animated appearance and a randomized position.
*/
class Coin extends MovableObject {
  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  width = 80;
  height = 80;
  x = 200 + Math.random() * 2000;
  y = 80 + Math.random() * 300;
  offset = {top: 20, left: 20, right: 20, bottom: 20};
  counter = 0;

  /**
  * Creates a new coin instance with a randomized position.
  */
  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.animate();
  }

  /**
  * Animates the coin by cycling through its images.
  */
  animate() {
    setInterval(() => {this.playAnimation(this.IMAGES)}, 300);
  }
}
