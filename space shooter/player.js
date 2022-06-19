class Player {
  constructor(img, x, y, width, height, rotate, shootingSpeed) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotate = rotate;
    this.lastShootTime = Date.now();
    this.timeBetweenShots = 1000 / shootingSpeed; // 5 missiles per second = 200 milliseconds per missile
    // console.log(this.timeBetweenShots);
    // https://www.indeed.com/career-advice/career-development/how-to-calculate-frequency#:~:text=To%20calculate%20frequency%2C%20divide%20the,receives%203.9%20clicks%20per%20minute.
  }

  moveTo(x, y) {
    if (x > this.x) {
      this.rotate = Math.PI / 8;
    } else if (x < this.x) {
      this.rotate = -Math.PI / 8;
    } else {
      this.rotate = 0;
    }
    this.x = x;
    this.y = y;
  }

  rotateTo(rotate) {
    this.rotate = rotate;
  }

  canShoot(t) {
    var shootTimePassed = t - this.lastShootTime;
    if (shootTimePassed >= this.timeBetweenShots) {
      this.lastShootTime = t;
      return true;
    } else {
      return false;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    let v1 = createVector(0, this.y);
    let v2 = createVector(this.x - mouseX, this.y - mouseY);
    let angleBetween = v1.angleBetween(v2);
    rotate(-Math.PI / 2 + angleBetween);
    imageMode(CENTER);
    image(this.img, 0, 0, this.width, this.height);
    pop();
  }
}
