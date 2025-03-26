let level1;

/**
* Initializes the level with enemies, background objects, coins, and bottles.
*/
function initLevel() {
  level1 = new Level(
    createEnemies(),
    [new Cloud(), new Cloud(), new Cloud(),],
    [
      new bgObject("img/5_background/layers/air.png", -719),
      new bgObject("img/5_background/layers/3_third_layer/2.png", -719),
      new bgObject("img/5_background/layers/2_second_layer/2.png", -719),
      new bgObject("img/5_background/layers/1_first_layer/2.png", -719),

      new bgObject("img/5_background/layers/air.png", 0),
      new bgObject("img/5_background/layers/3_third_layer/1.png", 0),
      new bgObject("img/5_background/layers/2_second_layer/1.png", 0),
      new bgObject("img/5_background/layers/1_first_layer/1.png", 0),
      new bgObject("img/5_background/layers/air.png", 719),
      new bgObject("img/5_background/layers/3_third_layer/2.png", 719),
      new bgObject("img/5_background/layers/2_second_layer/2.png", 719),
      new bgObject("img/5_background/layers/1_first_layer/2.png", 719),

      new bgObject("img/5_background/layers/air.png", 719 * 2),
      new bgObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new bgObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new bgObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),
      new bgObject("img/5_background/layers/air.png", 719 * 3),
      new bgObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new bgObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new bgObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),
    ],
    createItems(Coin, 10),
    createItems(Bottle, 10)
  );
}

/**
* Creates an array of enemy instances.
* @returns {Array} Array of enemy objects.
*/
function createEnemies() {
  return [
    new Chicken(),
    new Chick(),
    new Chick(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chick(),
    new Chicken(),
    new Chick(),
    new Chicken(),
    new Chicken(),
    new Endboss(),
  ];
}

/**
* Creates an array of item instances (Coins or Bottles).
* @param {Function} ItemClass - The class of the item (e.g., Coin or Bottle).
* @param {number} count - The number of items to create.
* @returns {Array} Array of item instances.
*/
function createItems(ItemClass, count) {
  return Array.from({ length: count }, () => new ItemClass());
}
