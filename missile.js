class Missile {
  constructor(img, x, y, width, height, rotate) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotate = rotate;
  }

  moveForward(distance) {
    this.y -= distance;
  }

  rotateTo(rotate) {
    this.rotate = rotate;
  }

  outOfBorders() {
    if (
      this.x > width + this.width / 2 ||
      this.y > height + this.height / 2 ||
      this.x < -this.width / 2 ||
      this.y < -this.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(-Math.PI / 4);
    imageMode(CENTER);
    image(this.img, 0, 0, this.width, this.height);
    pop();
  }
}
