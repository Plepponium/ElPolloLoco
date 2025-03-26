/**
* Represents a game level with enemies, clouds, background objects, and collectibles.
*/
class Level {
  enemies;
  clouds;
  bgObjects;
  coins;
  bottles;
  level_end_x = 2200;

  /**
  * Creates a new level with the specified objects.
  * 
  * @param {MovableObject[]} enemies - The enemies present in the level.
  * @param {Cloud[]} clouds - The cloud objects for the background.
  * @param {BackgroundObject[]} bgObjects - The background objects.
  * @param {Coin[]} coins - The collectible coins.
  * @param {Bottle[]} bottles - The collectible bottles.
  */
  constructor(enemies, clouds, bgObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.bgObjects = bgObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
