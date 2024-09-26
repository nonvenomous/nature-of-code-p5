import type p5 from 'p5';

export default function sketch(p: p5) {
  const canvasWidth = 640;
  const canvasHeight = 240;
  const frameRate = 120;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(frameRate);
  };

  let x = 100;
  let y = 100;
  let xspeed = 2.5;
  let yspeed = 2;

  const SIZE = 48;
  const RADIUS = SIZE / 2;

  p.draw = () => {
    p.background(55);
    p.stroke(255);
    p.line(0, canvasHeight, 0, 0);
    p.line(canvasWidth - 1, 0, canvasWidth - 1, canvasHeight);
    p.line(0, 0, canvasWidth, 0);
    p.line(0, canvasHeight, canvasWidth, canvasHeight);

    p.stroke(55);

    x = x + xspeed;
    y = y + yspeed;

    if (x + RADIUS > p.width || x - RADIUS < 0) {
      xspeed = xspeed * -1;
    } else if (y + RADIUS > p.height || y - RADIUS < 0) {
      yspeed = yspeed * -1;
    }

    p.fill(127);
    p.circle(x, y, SIZE);
  };
}
