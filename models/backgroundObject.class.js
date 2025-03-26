/**
* Represents a background object in the game.
* Extends the MovableObject class.
*/
class bgObject extends MovableObject {
  width = 720;
  height = 480;
  y = 0;

  /**
  * Creates a new background object.
  * @param {string} imagePath - The path to the image file.
  * @param {number} x - The x-coordinate position.
  */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
  }
}
