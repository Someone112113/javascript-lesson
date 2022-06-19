class Barrel {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // this.runningAnimationTime = runningAnimationTime;
    // this.lastTimeMove = Date.now();
    this.onTheGround = false;
    this.xDirection = 1;
    this.ySpeed = 0;
  }

  moveLeftRight(distance, currentTime) {
    // if (distance != 0) {
    //   var timePassed = currentTime - this.lastTimeMove;
    //   if (timePassed >= this.runningAnimationTime / 4) {
    //     this.status = "running";
    //     if (timePassed < this.runningAnimationTime / 2) {
    //       this.imgRunning = this.imgRunning1;
    //     } else if (timePassed < (this.runningAnimationTime * 3) / 4) {
    //       this.imgRunning = this.imgRunning2;
    //     } else if (timePassed < this.runningAnimationTime) {
    //       this.imgRunning = this.imgRunning3;
    //     } else {
    //       this.imgRunning = this.imgStanding;
    //       this.lastTimeMove = currentTime;
    //     }
    //   }
    //   if (distance > 0) {
    //     this.lookleft = false;
    //   } else if (distance < 0) {
    //     this.lookleft = true;
    //   }
    //   this.x += distance;
    //   this.x = min(this.x, width - this.width / 2);
    //   this.x = max(this.x, this.width / 2);
    // } else {
    //   this.status = "standing";
    // }
    this.x += distance * this.xDirection;
    if (this.x + this.width / 2 >= width || this.x - this.width / 2 <= 0) {
      this.xDirection *= -1;
    }
  }

  moveY(timePassed, beams) {
    this.onTheGround = false;
    if (this.ySpeed * timePassed <= 0) {
      this.y += this.ySpeed * timePassed;
    } else {
      this.jumping = false;
      this.y += this.ySpeed * timePassed;
      beams.forEach((beam) => {
        if (beam.touch(this)) {
          this.y = beam.y - beam.height / 2 - this.height / 2;
          this.onTheGround = true;
        }
      });
      if (this.y > height) {
        this.y = 500;
      }
    }
  }

  draw() {
    // push();
    // translate(this.x, this.y);
    // imageMode(CENTER);
    fill(0);
    circle(this.x, this.y, this.width);
    //pop();
  }
}
