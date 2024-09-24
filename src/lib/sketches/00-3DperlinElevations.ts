import type p5 from 'p5';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PerlinElevationsData = {};

// Exercise 0.10
// _: p5, data: PerlinElevationsData
export default function sketch(p: p5) {
  const frameRate = 60;
  const canvasWidth = 500;
  const canvasHeight = 400;

  const scale = 20;
  const width = 800;
  const height = 400;

  const cols = width / scale;
  const rows = height / scale;
  let zTime = 0.0;

  const OFF_SIZE = 0.1;
  const Z_OFF_SIZE = 0.015;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight, 'webgl');
    p.frameRate(frameRate);
    // p.noLoop();

    p.stroke(55);

    // p.noFill()
    // p.noStroke();
  };

  p.draw = () => {
    p.background(0); // clears screen

    p.push(); // Save the current transformation state

    // Apply transformations
    p.rotateX(Math.PI / 3); // camera angle
    p.rotateZ(zTime / 5);
    p.rotateZ(p.map(-p.mouseX, 0, canvasHeight, -Math.PI / 4, Math.PI / 4));
    p.translate(-width / 2, -height / 2); // fixing coords

    let yoff = 0.0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0.0;
      p.beginShape(p.TRIANGLE_STRIP);
      for (let x = 0; x <= cols; x++) {
        const elevation = p.map(p.noise(xoff, yoff, zTime), 0, 1, -100, 100);

        const color = p.map(elevation, -100, 100, 0, 150);
        p.fill(color);
        const elevation2 = p.map(p.noise(xoff, yoff + OFF_SIZE, zTime), 0, 1, -100, 100);
        p.vertex(x * scale, y * scale, elevation);
        p.vertex(x * scale, (y + 1) * scale, elevation2);
        xoff += OFF_SIZE;
      }
      p.endShape();
      yoff += OFF_SIZE;
    }

    p.pop(); // Restore the original transformation state
    zTime += Z_OFF_SIZE;
  };
}
