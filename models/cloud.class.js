/**
* Represents a cloud in the game background.
* Clouds move from right to left at a random speed.
*/
class Cloud extends MovableObject {
  height = 324;
  width = 720;
  y = 0;
  x = Math.random() * 2000;
  speed = 0.15 + Math.random() * 0.3;

  /**
  * Creates a new cloud instance and starts its animation.
  */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.animate();
  }

  /**
  * Moves the cloud to the left continuously to create a scrolling effect.
  */
  animate() {
    setInterval(() => {this.moveLeft()}, 1000 / 60);
  }
}
