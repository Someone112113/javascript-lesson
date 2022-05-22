class Missiles {
  constructor(img) {
    this.img = img;
    this.missiles = [];
  }

  createMissile(x, y) {
    this.missiles.push(new Missile(this.img, x, y, 30, 30, 0));
  }

  moveMissiles(distance) {
    this.missiles.forEach((missile) => {
      missile.moveForward(distance);
    });
    this.missiles = this.missiles.filter((missile) => {
      return !missile.outOfBorders();
    });
  }

  draw() {
    // console.log(this.missiles.length);
    this.missiles.forEach((missile) => {
      missile.draw();
    });
  }
}
