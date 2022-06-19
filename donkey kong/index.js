var player;
var playerImageStanding;
var playerImageRunning1;
var playerImageRunning2;
var playerImageRunning3;
var pXSpeed;
var pYSpeed;
var pMoveDistance;

const gravity = 1500;

var beams;
var beamImage;
var beamData;

var barrels;
var barrel;
var bMoveDistance;
var lastTimeSpawnBarrel;

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
      console.log(beamData);
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

  bMoveDistance = 100;
  bYSpeed = 0;
  lastTimeSpawnBarrel = 0;
  barrels = new Barrels(100, 100, 30, 30);

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
    pYSpeed = 0;
  }
  pYSpeed += gravity * timePassed;
  player.moveY(pYSpeed * timePassed, beams.getBeams());
  player.moveLeftRight(pMoveDistance, t);

  barrels.draw();
  barrels.applyGravity(gravity * timePassed);
  barrels.moveY(timePassed, beams.getBeams());
  barrels.moveLeftRight(bMoveDistance * timePassed, t);

  if (t - this.lastTimeSpawnBarrel >= 2000) {
    barrels.spawnBarrel();
    this.lastTimeSpawnBarrel = t;
  }

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
