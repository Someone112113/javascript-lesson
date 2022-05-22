var player;
var speed;
var px;
var py;
var t;
var goUp;
var goDown;
var goLeft;
var goRight;

function preload() {
  playerImage = loadImage(
    "https://img.icons8.com/fluency/96/000000/space-shuttle.png"
  );
}

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  speed = 100;
  px = width / 2;
  py = height / 2;
  player = new Player(playerImage, px, py, 50, 50, 0);
  setupController();
  t = Date.now();
}

function draw() {
  clear();
  player.draw();
  player.moveTo(px, py);
  var timePassed = (Date.now() - t) / 1000;
  t = Date.now();
  if (goUp) {
    py -= speed * timePassed;
    if (py >= canvas.height) {
      py = 0;
    }
  }

  if (goDown) {
    py += speed * timePassed;
    if (py <= 0) {
      py = canvas.height;
    }
  }

  if (goLeft) {
    px -= speed * timePassed;
    if (px <= 0) {
      px = canvas.width;
    }
  }

  if (goRight) {
    px += speed * timePassed;
    if (px <= 0) {
      px = 0;
    }
  }
}

function setupController() {
  window.addEventListener("keydown", function (e) {
    if (e.key == "ArrowUp") {
      goUp = true;
    }

    if (e.key == "ArrowDown") {
      goDown = true;
    }

    if (e.key == "ArrowLeft") {
      goLeft = true;
    }

    if (e.key == "ArrowRight") {
      goRight = true;
    }
  });

  window.addEventListener("keyup", function (e) {
    if (e.key == "ArrowUp") {
      goUp = false;
    }

    if (e.key == "ArrowDown") {
      goDown = false;
    }

    if (e.key == "ArrowLeft") {
      goLeft = false;
    }

    if (e.key == "ArrowRight") {
      goRight = false;
    }
  });
}
