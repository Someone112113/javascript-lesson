class Player {
  constructor(
    imgStanding,
    imgRunning1,
    imgRunning2,
    imgRunning3,
    imgJumping,
    imgDead,
    x,
    y,
    width,
    height,
    jumpSpeed,
    runningAnimationTime
  ) {
    this.imgStanding = imgStanding;
    this.imgRunning = imgStanding;
    this.imgRunning1 = imgRunning1;
    this.imgRunning2 = imgRunning2;
    this.imgRunning3 = imgRunning3;
    this.imgJumping = imgJumping;
    this.imgDead = imgDead;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.jumpSpeed = jumpSpeed;
    this.runningAnimationTime = runningAnimationTime;
    this.lookleft = false;
    this.lastTimeMove = Date.now();
    this.status = "standing";
    this.onTheGround = false;
    this.jumping = false;
  }

  moveLeftRight(distance, currentTime) {
    if (distance != 0) {
      var timePassed = currentTime - this.lastTimeMove;
      if (timePassed >= this.runningAnimationTime / 4) {
        this.status = "running";
        if (timePassed < this.runningAnimationTime / 2) {
          this.imgRunning = this.imgRunning1;
        } else if (timePassed < (this.runningAnimationTime * 3) / 4) {
          this.imgRunning = this.imgRunning2;
        } else if (timePassed < this.runningAnimationTime) {
          this.imgRunning = this.imgRunning3;
        } else {
          this.imgRunning = this.imgStanding;
          this.lastTimeMove = currentTime;
        }
      }
      if (distance > 0) {
        this.lookleft = false;
      } else if (distance < 0) {
        this.lookleft = true;
      }
      this.x += distance;
      this.x = min(this.x, width - this.width / 2);
      this.x = max(this.x, this.width / 2);
    } else {
      this.status = "standing";
    }
  }

  moveY(distance, beams) {
    this.onTheGround = false;
    if (distance <= 0) {
      this.y += distance;
    } else {
      this.jumping = false;
      this.y += distance;
      beams.forEach((beam) => {
        if (beam.touch(this)) {
          this.y = beam.y - beam.height;
          this.onTheGround = true;
        }
      });
      if (this.y > height) {
        this.y = 500;
      }
    }
  }

  canJump() {
    if (this.onTheGround) {
      this.jumping = true;
      this.onTheGround = false;
      return true;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    if (this.lookleft) {
      scale(-1.0, 1.0);
    }
    switch (this.status) {
      case "standing":
        image(this.imgStanding, 0, 0, this.width, this.height);
        break;
      case "running":
        image(this.imgRunning, 0, 0, this.width, this.height);
        break;
    }
    pop();
  }
}
