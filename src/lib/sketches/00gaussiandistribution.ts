import type p5 from 'p5';

// uniform distribution
export default function sketch(p: p5) {
  const canvasWidth = 600;
  const canvasHeight = 200;
  const targetFrameRate = 120;

  const middleXWidth = canvasWidth / 2;
  const middleYHeight = canvasHeight / 2;

  let maxX = Number.NEGATIVE_INFINITY;
  let minX = Number.POSITIVE_INFINITY;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(targetFrameRate);

    p.stroke(10);
    p.background(55);

    p.stroke(230);
    p.line(middleXWidth, 0, middleXWidth, canvasHeight);
    p.line(0, middleYHeight, canvasWidth, middleYHeight);
  };

  p.draw = () => {
    const x = p.randomGaussian(middleXWidth, 60);
    p.noStroke();
    p.fill(0, 10);

    if (x > maxX) {
      maxX = x;
      // p.fill(255, 160, 10, 10);
      p.stroke(10);
      // console.log(
      //   `frame: ${String(p.frameCount).padStart(6, '0')} | 📈: ${Math.floor(maxX)} | distance: ${Math.floor(maxX - middleXWidth)}`,
      // );
    }
    if (x < minX) {
      minX = x;
      // p.fill(255, 160, 10, 30);
      p.stroke(10);
      // console.log(
      //   `frame: ${String(p.frameCount).padStart(6, '0')} | 📉: ${Math.floor(minX)} | distance: ${Math.floor(middleXWidth - minX)}`,
      // );
    }
    p.circle(x, middleYHeight, 32);

    // if (p.frameCount % 10000 === 0) console.log(`frame: ${p.frameCount}`);
  };
}
