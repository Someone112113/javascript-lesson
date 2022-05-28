var player;
var playerImageStanding;
var playerImageRunning1;
var playerImageRunning2;
var playerImageRunning3;
var pXSpeed;
var pYSpeed;
var pMoveDistance;

const gravity = 20;

var beams;
var beamImage;
var beamData;

var t;
var keys = [];

function preload() {
  playerImageStanding = loadImage("standing.bmp");
  playerImageRunning1 = loadImage("running1.bmp");
  playerImageRunning2 = loadImage("running2.bmp");
  playerImageRunning3 = loadImage("running3.bmp");
  playerImageJumping = loadImage("standing.bmp");
  playerImageDead = loadImage("standing.bmp");

  beamImage = loadImage("beam.bmp");
  fetch("./beams.json")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      beamData = jsondata.data;
    });
}

function setup() {
  createCanvas(800, 600);

  pXSpeed = 100;
  pYSpeed = 0;
  pMoveDistance = 0;
  player = new Player(
    playerImageStanding,
    playerImageRunning1,
    playerImageRunning2,
    playerImageRunning3,
    playerImageJumping,
    playerImageDead,
    100,
    100,
    50,
    50,
    500,
    500
  );
  setupController();

  beams = new Beams(beamImage, beamData);
  beams.spawnBeam();

  textSize(30);
  t = Date.now();
}

function draw() {
  clear();

  var timePassed = (Date.now() - t) / 1000;
  t = Date.now();

  beams.draw();

  player.draw();
  if (!player.jumping && player.onTheGround) {
    pYSpeed = gravity;
  }
  pYSpeed += gravity;
  player.moveY(pYSpeed * timePassed, beams.getBeams());
  player.moveLeftRight(pMoveDistance, t);

  controlPlayerMovement(timePassed);
}

function controlPlayerMovement(timePassed) {
  pMoveDistance = 0;

  if (keys["KeyA"]) {
    pMoveDistance = -pXSpeed * timePassed;
    text("left", 10, 90);
  }

  if (keys["KeyD"]) {
    pMoveDistance = pXSpeed * timePassed;
    text("right", 10, 120);
  }

  if (keys["Space"]) {
    if (player.canJump()) {
      pYSpeed = -500;
    }
    text("jump", 10, 150);
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
