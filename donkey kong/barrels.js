class Barrels {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.barrels = [];
  }

  spawnBarrel() {
    this.barrels.push(new Barrel(this.x, this.y, this.width, this.height));
  }

  moveLeftRight(distance, currentTime) {
    this.barrels.forEach((barrel) => {
      barrel.moveLeftRight(distance, currentTime);
    });
  }

  moveY(timePassed, beams) {
    this.barrels.forEach((barrel) => {
      barrel.moveY(timePassed, beams);
    });
  }

  applyGravity(gravity) {
    this.barrels.forEach((barrel) => {
      if (barrel.onTheGround) {
        barrel.ySpeed = 0;
      }
      barrel.ySpeed += gravity;
    });
  }

  draw() {
    // console.log(this.missiles.length);
    this.barrels.forEach((barrel) => {
      barrel.draw();
    });
  }
}
