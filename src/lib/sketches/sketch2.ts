import type p5 from 'p5';

// This sketch illustrates the Sketch component interactions with the Pause/Resume and Reset buttons

export default function sketch(p: p5, P5: p5) {
  let x = 0;

  p.setup = function () {
    p.createCanvas(600, 100);
  };

  // Mouse velocity x axis, y axis
  function velocityXY() {
    const dx = p.mouseX - p.pmouseX;
    const dy = p.mouseY - p.pmouseY;
    p.line(x, 25 + dx, x, 25 - dx);
    p.line(x, 75 + dy, x, 75 - dy);
  }

  // General mouse velocity
  function velocity() {
    const distance = p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    p.line(x, p.height / 2 + distance, x, p.height / 2 - distance);
  }

  p.draw = function () {
    p.noStroke();
    p.fill(255, 10);
    p.rect(0, 0, p.width, p.height);
    p.stroke('red');
    x = (x + 1) % p.width;
    0 ? velocity() : velocityXY();
  };
}
