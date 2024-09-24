import type p5 from 'p5';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PerlinElevationsData = {};

// Exercise 0.10
// _: p5, data: PerlinElevationsData
export default function sketch(p: p5) {
  const frameRate = 60;
  const canvasWidth = 500;
  const canvasHeight = 400;

  let land: Terrain;
  let theta = 0.0;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight, 'webgl');
    p.frameRate(frameRate);

    p.stroke(0);

    land = new Terrain(20, 800, 400);
  };

  p.draw = () => {
    land.calculate();
    p.background(55);
    p.push();
    p.translate(0, 20, -200);
    p.rotateX(Math.PI / 3);
    p.rotateZ(theta);
    land.render();
    p.pop();

    theta += 0.0025;
  };

  class Terrain {
    scale: number;
    width: number;
    height: number;
    widthHalf: number;
    heightHalf: number;

    cols: number;
    rows: number;
    z: Float32Array[];
    zoff: number = 0.0;

    constructor(scale: number, width: number, height: number) {
      this.scale = scale; // size of each cell
      this.width = width;
      this.height = height;

      this.widthHalf = width / 2;
      this.heightHalf = height / 2;

      this.cols = Math.floor(width / scale);
      this.rows = Math.floor(height / scale);

      this.z = Array.from({ length: this.cols }, () => new Float32Array(this.rows));
    }

    calculate() {
      let xoff = 0.0;
      for (let col = 0; col < this.cols; col++) {
        let yoff = 0.0;
        for (let row = 0; row < this.rows; row++) {
          const noise = p.noise(xoff, yoff, this.zoff);
          this.z[col][row] = p.map(noise, 0, 1, -120, 120);
          yoff += 0.1;
        }
        xoff += 0.1;
      }
      this.zoff += 0.01;
    }

    render() {
      for (let x = 0; x < this.z.length - 1; x++) {
        p.beginShape(p.QUAD_STRIP);
        for (let y = 0; y < this.z[x].length; y++) {
          const currentElevation = this.z[x][y];
          const nextElevation = this.z[x + 1][y];
          const currentShade = p.map(currentElevation, -120, 120, 0, 255);

          p.fill(currentShade, 255); // Set fill once per vertex

          const xCoordinate = x * this.scale - this.widthHalf;
          const yCoordinate = y * this.scale - this.heightHalf;
          p.vertex(xCoordinate, yCoordinate, currentElevation);
          p.vertex(xCoordinate + this.scale, yCoordinate, nextElevation);
        }
        p.endShape();
      }
    }
  }
}
