export default class Circle {
  constructor(context, x, y, radius) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = "red";
    this.context.fill();
  }
}
