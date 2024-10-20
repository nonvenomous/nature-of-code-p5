import type p5 from 'p5';

export default function sketch(p: p5) {
  const canvasWidth = 640;
  const canvasHeight = 240;
  const frameRate = 120;

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(frameRate);
  };

  const position = p.createVector(100, 100);
  const velocity = p.createVector(2.5, 2);

  const SIZE = 48;
  const RADIUS = SIZE / 2;

  p.draw = () => {
    p.background(55);
    p.stroke(55);

    position.add(velocity);

    if (position.x + RADIUS > p.width || position.x - RADIUS < 0) {
      velocity.x = velocity.x * -1;
    } else if (position.y + RADIUS > p.height || position.y - RADIUS < 0) {
      velocity.y = velocity.y * -1;
    }

    p.fill(127);
    p.circle(position.x, position.y, SIZE);
  };
}
