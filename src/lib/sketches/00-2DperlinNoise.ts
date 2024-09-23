import type p5 from 'p5';

export type Perlin2DNoiseData = {
  xoffIncrementSize: number;
  yoffIncrementSize: number;
  lod: number;
  falloff: number;
  zoffIncrementSize: number;
};

export default function sketch(p: p5, _: p5, data: Perlin2DNoiseData) {
  const canvasWidth = 640;
  const canvasHeight = 240;
  const frameRate = 5;
  let increment = 0; // exercise 0.9, animating

  p.setup = () => {
    const canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.mousePressed(() => {
      p.redraw();
    });
    p.frameRate(frameRate);
    p.noStroke();
  };

  p.draw = () => {
    p.noiseDetail(data.lod, data.falloff);
    increment += data.zoffIncrementSize;

    p.loadPixels();

    let xoff = 0.0;
    for (let x = 0; x < canvasWidth; x++) {
      let yoff = 0.0;
      for (let y = 0; y < canvasHeight; y++) {
        const noise = p.noise(xoff, yoff, increment);
        const mapped = p.map(noise, 0, 1, 0, 255);

        p.set(x, y, mapped);

        yoff += data.yoffIncrementSize;
      }
      xoff += data.xoffIncrementSize;
    }

    p.updatePixels();
  };
}
