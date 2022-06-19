class Enemies {
  constructor(img, lineWidth) {
    this.img = img;
    this.enemies = [];
    this.lineWidth = lineWidth;
    this.enemyCenter = width / 2;
    this.goLeft = false;
    this.numEnemiesDestroyed = 0;
  }

  spawnEnemy(totalEnemies) {
    var totalRows = Math.round(totalEnemies / 10); // Math.floor() returns the largest integer less than or equal to a given number.
    for (var i = 1; i <= totalRows; i++) {
      // i+1
      var initialPosition = width / 2 - this.lineWidth / 2;
      for (var j = 0; j < 10; j++) {
        var ex = 50 * j + initialPosition;
        if (i % 2 != 0) {
          ex += 15;
        }
        var ey = 50 * i;
        this.enemies.push(new Enemy(this.img, ex, ey, 30, 30, 0));
        totalEnemies--;
      }
    }
  }

  allEnemiesDestroyed() {
    if (this.enemies.length <= 0) {
      return true;
    }
    return false;
  }

  moveEnemies(distance) {
    if (this.goLeft) {
      this.enemies.forEach((enemy) => {
        enemy.moveLeftRight(-distance);
      });
      this.enemyCenter -= distance;
      if (this.enemyCenter < width / 2 - 100) {
        this.goLeft = false;
      }
    } else {
      this.enemies.forEach((enemy) => {
        enemy.moveLeftRight(distance);
      });
      this.enemyCenter += distance;
      if (this.enemyCenter > width / 2 + 100) {
        this.goLeft = true;
      }
    }
  }

  checkMissiles(missiles) {
    var destroyedEnemy = [];

    this.enemies.forEach((enemy) => {
      missiles.forEach((missile) => {
        if (missile.touch(enemy)) {
          destroyedEnemy.push(enemy);
          missile.toRemove = true;
        }
      });
    });

    this.numEnemiesDestroyed = destroyedEnemy.length;

    this.enemies = this.enemies.filter((enemy) => {
      return !destroyedEnemy.includes(enemy);
      // enemies: a b c d
      // destroyedEnemy: b c
      // !true = false
    });
  }

  getNumEnemiesDestroyed() {
    var temp = this.numEnemiesDestroyed;
    this.numEnemiesDestroyed = 0;
    return temp;
  }

  draw() {
    // console.log(this.missiles.length);
    this.enemies.forEach((enemies) => {
      enemies.draw();
    });
  }
}
