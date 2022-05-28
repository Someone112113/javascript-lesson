class Beams {
  constructor(img, data) {
    this.img = img;
    this.beams = [];
    this.beamPositions = data;
  }

  spawnBeam() {
    this.beamPositions.forEach((pos) => {
      this.beams.push(new Beam(this.img, pos.x, pos.y, 100, 50));
    });
  }

  getBeams() {
    return this.beams;
  }

  draw() {
    // console.log(this.missiles.length);
    this.beams.forEach((beam) => {
      beam.draw();
    });
  }
}
