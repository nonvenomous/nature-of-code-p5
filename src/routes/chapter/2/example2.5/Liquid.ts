import p5 from 'p5';
import type { Mover } from './Mover';

export class Liquid {
  p: p5;
  x: number;
  y: number;
  w: number;
  h: number;
  coefficientOfDrag: number;

  constructor(p: p5, x: number, y: number, w: number, h: number, c: number) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.coefficientOfDrag = c;
  }

  show() {
    this.p.noStroke();
    this.p.fill(175, 20);
    this.p.rect(this.x, this.y, this.w, this.h);
  }

  contains(mover: Mover) {
    const pos = mover.position;
    return pos.x > this.x && pos.x < this.x + this.w && pos.y > this.y && pos.y < this.y + this.h;
  }

  calculateDrag(mover: Mover) {
    const radiusOrSide = mover.radius(); // radius for circle, side length for square
    const surfaceArea = mover.isBox
      ? Math.pow(radiusOrSide, 2)
      : (Math.PI * Math.pow(radiusOrSide, 2)) / 2;
    const scaledSurfaceArea = surfaceArea / 1000;

    const speed = mover.velocity.mag();
    const dragMagnitude = this.coefficientOfDrag * scaledSurfaceArea * Math.pow(speed, 2);
    const dragForce = mover.velocity.copy();
    dragForce.mult(-1);
    dragForce.setMag(dragMagnitude);
    return dragForce;
  }
}
