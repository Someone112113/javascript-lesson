var player;
var playerImage;
var pSpeed;
var px;
var py;
var shooting;

var missiles;
var missileImage;
var mSpeed;

var t;
var keys = [];

function preload() {
  playerImage = loadImage(
    "https://img.icons8.com/fluency/96/000000/space-shuttle.png"
  );
  missileImage = loadImage(
    "https://img.icons8.com/color/96/000000/missile.png"
  );
}

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);

  pSpeed = 100;
  px = width / 2;
  py = height / 2;
  player = new Player(playerImage, px, py, 50, 50, 0, 5);
  setupController();

  mSpeed = 150;
  missiles = new Missiles(missileImage);

  textSize(30);
  t = Date.now();
}

function draw() {
  clear();

  var timePassed = (Date.now() - t) / 1000;
  t = Date.now();

  rectMode(CENTER);
  rect(width / 2, height / 2, 55, 55);

  missiles.draw();
  missiles.moveMissiles(mSpeed * timePassed);

  player.draw();
  player.moveTo(px, py);

  // console.log(keys);

  controlPlayerMovement(timePassed);
}

function controlPlayerMovement(timePassed) {
  if (keys["KeyW"]) {
    py -= pSpeed * timePassed;
    if (py <= 0) {
      py = height;
    }
    text("up", 10, 30);
  }

  if (keys["KeyS"]) {
    py += pSpeed * timePassed;
    if (py >= height) {
      py = 0;
    }
    text("down", 10, 60);
  }

  if (keys["KeyA"]) {
    px -= pSpeed * timePassed;
    if (px <= 0) {
      px = width;
    }
    text("left", 10, 90);
  }

  if (keys["KeyD"]) {
    px += pSpeed * timePassed;
    if (px >= width) {
      px = 0;
    }
    text("right", 10, 120);
  }

  if (keys["Space"]) {
    if (player.canShoot(t)) {
      missiles.createMissile(px, py);
    }
    text("shoot", 10, 150);
  }
}

function setupController() {
  window.addEventListener("keydown", function (e) {
    keys[e.code] = true;
  });

  window.addEventListener("keyup", function (e) {
    keys[e.code] = false;
  });
}
