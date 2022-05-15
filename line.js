export default class Line {
  constructor(context, x1, y1, x2, y2) {
    this.context = context;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    this.context.beginPath();
    this.context.moveTo(this.x1, this.y1);
    this.context.lineTo(this.x2, this.y2);
    this.context.lineWidth = 10;
    this.context.stroke();
  }
}
