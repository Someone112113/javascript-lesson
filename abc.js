window.onload = () => {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  context.canvas.height = window.innerHeight * 0.96;
  context.canvas.width = window.innerWidth * 0.98;

  var t = Date.now();
  var speed = 100; // 100px / second
  var x1 = 100;
  var y1 = 100;
  var x2 = 300;
  var y2 = 300;
  var obj = new Line(context, x1, y1, x2, y2);

  draw();

  function draw() {
    var timePassed = (Date.now() - t) / 1000;
    t = Date.now();
    context.clearRect(0, 0, canvas.width, canvas.height);
    x1 += speed * timePassed;

    if (x1 >= canvas.width) {
      speed *= -1; // speed = -100
    }
    if (x1 <= 0) {
      speed *= -1; // speed = 100
    }
    obj.moveTo(x1, y1);
    obj.draw();
    window.requestAnimationFrame(draw);
  }
};

class Line {
  constructor(context1, x1, y1, x2, y2) {
    this.context1 = context1;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  moveTo(x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
  }

  draw() {
    this.context1.moveTo(this.x1, this.y1);
    this.context1.lineTo(this.x2, this.y2);
    this.context1.lineWidth = 10;
    this.context1.stroke();
  }
}
