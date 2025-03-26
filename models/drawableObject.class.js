/**
* Represents a drawable object in the game.
* This class provides methods for loading and drawing images, 
* as well as displaying debug frames around certain objects.
*/
class DrawableObject {
  img;
  x = 120;
  y = 270;
  width = 100;
  height = 150;
  imageCache = {};
  currentImage = 0;

  /**
  * Loads an image from the given file path.
  * @param {string} path - The path to the image file.
  */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
  * Preloads multiple images and stores them in the `imageCache`.
  * @param {string[]} arr - An array of image file paths.
  */
  loadImages(arr) {
   arr.forEach((path) => {
     let img = new Image();
     img.src = path;
     this.imageCache[path] = img;
   });
  }

  /**
  * Draws the object on the given canvas context.
  * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
  */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.warn(error);
      console.log(this.img);
    }
  }

  /**
  * Draws a blue frame around the object.
  * Used for debugging purposes.
  * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
  */
  drawFrame(ctx) {
    if (this instanceof Coin || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
  * Draws a red frame around the object, considering its offset.
  * Used for debugging hitbox detection.
  * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
  */
  drawOffsetFrame(ctx){
    if (this instanceof Character || this instanceof Endboss || this instanceof Bottle || this instanceof Coin || this instanceof Chicken || this instanceof Chick) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right -this.offset.left, this.height - this.offset.top - this.offset.bottom)
      ctx.stroke();
    }
  }
}
