import Line from "./line.js";
import Circle from "./circle.js";

window.onload = () => {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.canvas.height = window.innerHeight * 0.96;
  context.canvas.width = window.innerWidth * 0.98;

  var t = Date.now();
  var speed = 100; // pixels per second
  var x = 500;
  var y = 100;
  var x1 = 300;
  var y1 = 200;
  var r = 100;

  var line = new Line(context, 200, 100, 300, 400);
  var cir = new Circle(context, x, y, r);
  var cir1 = new Circle(context, x1, y1, r);

  draw();

  function draw() {
    context.canvas.height = window.innerHeight * 0.96;
    context.canvas.width = window.innerWidth * 0.98;
    var timePassed = (Date.now() - t) / 1000;
    t = Date.now();

    context.clearRect(0, 0, canvas.width, canvas.height);
    line.draw();

    cir.draw();
    cir.moveTo(x, y);

    cir1.draw();
    cir1.moveTo(x1, y1);

    x += speed * timePassed;
    if (x >= canvas.width + r) {
      x = -r;
    }
    x1 += (speed + 100) * timePassed; // speed = 200
    if (x1 >= canvas.width + r) {
      x1 = -r;
    }
    window.requestAnimationFrame(draw);
  }
};
