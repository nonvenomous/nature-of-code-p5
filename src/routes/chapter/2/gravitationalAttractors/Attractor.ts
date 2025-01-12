import p5 from 'p5';
import type { Mover } from './Mover';

const G = 1; // gravitational constant

export class Attractor {
  p: p5;
  position: p5.Vector;
  mass: number;

  constructor(p: p5, x: number, y: number) {
    this.p = p;
    this.position = p.createVector(x, y);
    this.mass = 20;
  }

  show() {
    this.p.strokeWeight(4);
    this.p.stroke(0);
    this.p.fill(175, 200);
    this.p.circle(this.position.x, this.position.y, this.p.sqrt(this.mass * 8));
    this.p.strokeWeight(0);
  }

  attract(mover: Mover): p5.Vector {
    const force = p5.Vector.sub(this.position, mover.position);
    let distance = force.mag();
    distance = this.p.constrain(distance, 8, 15);
    const magnitude = (G * mover.mass * this.mass) / (distance * distance);
    force.setMag(magnitude);
    return force;
  }
}
