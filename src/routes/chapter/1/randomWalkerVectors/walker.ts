import type p5 from 'p5';

export class Walker {
  p: p5;
  x: number;
  y: number;
  position: p5.Vector;

  constructor(p5Instance: p5, x: number, y: number) {
    this.p = p5Instance;
    this.x = x;
    this.y = y;

    this.position = this.p.createVector(x, y);
  }

  show() {
    this.p.stroke(230);
    this.p.point(this.position);
  }

  step() {
    this.position.x += this.p.random(-1, 1);
    this.position.y += this.p.random(-1, 1);
  }
}
