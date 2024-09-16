import type p5 from 'p5';

export type GaussSplatterData = {
  colorSd: number;
  coordinateSd: number;
};

// Exercise 0.4
export default function sketch(p: p5, _: p5, data: GaussSplatterData) {
  const canvasWidth = 400;
  const canvasHeight = 400;
  const targetFrameRate = 60;

  const middleXWidth = canvasWidth / 2;
  const middleYHeight = canvasHeight / 2;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(targetFrameRate);

    p.background(55);

    p.stroke(230);
    p.line(middleXWidth, 0, middleXWidth, canvasHeight);
    p.line(0, middleYHeight, canvasWidth, middleYHeight);
  };

  p.draw = () => {
    const x = p.randomGaussian(middleXWidth, data.coordinateSd);
    const y = p.randomGaussian(middleYHeight, data.coordinateSd);
    p.noStroke();

    // color palette
    // rgb(211, 73, 163)
    const r = p.randomGaussian(211, data.colorSd);
    const g = p.randomGaussian(73, data.colorSd);
    const b = p.randomGaussian(163, data.colorSd);

    p.fill(r, g, b, 10);
    p.circle(x, y, 32);
  };
}
