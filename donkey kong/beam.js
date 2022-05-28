class Beam {
  constructor(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  touch(object) {
    if (
      this.x - this.width / 2 <= object.x &&
      this.x + this.width / 2 >= object.x &&
      this.y - this.height / 2 < object.y + object.height / 2 &&
      this.y - this.height / 4 > object.y + object.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.img, 0, 0, this.width, this.height);
    pop();
  }
}
