import type p5 from 'p5';

export type PerlinMandalaData = {
  frameRate: number;
  amount: number;
  strokeWeight: number;
  enableDarken: boolean;
  enableTurning: boolean;
  width?: number;
  height?: number;
};

export default function sketch(p: p5, _: p5, data: PerlinMandalaData) {
  const canvasWidth = data.width || 1560;
  const canvasHeight = data.height || 1560;

  const middleXWidth = canvasWidth / 2;
  const middleYHeight = canvasHeight / 2;
  let time = Math.random() * 1000;
  let btime = Math.random() * 10000;
  let ctime = 20000;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(data.frameRate);

    p.background(55);

    p.stroke(0);
  };

  p.draw = () => {
    p.frameRate(data.frameRate);

    if (data.enableDarken) {
      p.strokeWeight(0);
      p.fill(0, 0, 0, 2);
      p.rect(0, 0, canvasWidth, canvasHeight);
    }
    p.strokeWeight(data.strokeWeight);

    const noiseA = p.noise(time);
    const noiseB = p.noise(btime);
    const noiseC = p.noise(ctime);

    time += 0.005;
    btime += 0.005;
    ctime += 0.02;

    const r = p.map(noiseA, 0, 1, 0, 255);
    const g = p.map(noiseB, 0, 1, 0, 255);
    const b = p.map(noiseC, 0, 1, 0, 255);

    p.fill(r, g, b);

    const xMapped = p.map(noiseA, 0, 1, 0, canvasWidth);
    const yMapped = p.map(noiseB, 0, 1, 0, canvasHeight);

    const degreesOffset = data.enableTurning ? p.frameCount % 360 : 0;

    const sizeMapped = p.map(noiseA, 0, 1, 12, 72);

    for (let i = 0; i < data.amount; i++) {
      const [rotatedX, rotatedY] = rotate(
        middleXWidth,
        middleYHeight,
        xMapped,
        yMapped,
        i * (360 / data.amount) + degreesOffset,
      );
      p.circle(rotatedX, rotatedY, sizeMapped);
    }
  };
}

const value = Math.PI / 180;

function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
  const radians = value * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
}
