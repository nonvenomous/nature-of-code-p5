import p5 from 'p5';

export class Mover {
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  mass: number;
  p: p5;

  constructor(p: p5, x: number, y: number, mass: number) {
    this.position = p.createVector(x, y);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.mass = mass;
    this.p = p;
  }

  applyForce(force: p5.Vector) {
    const f = p5.Vector.copy(force);
    f.div(this.mass);
    this.acceleration.add(f);
  }

  private radius() {
    return this.mass * 8;
  }

  contactEdge() {
    const isWithin1PixelOfBottom = this.position.y > this.p.height - this.radius() - 1;
    return isWithin1PixelOfBottom;
  }

  bounceEdges() {
    const bounce = -0.9;
    if (this.position.y > this.p.height - this.radius()) {
      this.position.y = this.p.height - this.radius();
      this.velocity.y *= bounce;
    } else if (this.position.y < this.radius()) {
      this.position.y = this.radius();
      this.velocity.y *= bounce;
    }
    if (this.position.x > this.p.width - this.radius()) {
      this.position.x = this.p.width - this.radius();
      this.velocity.x *= bounce;
    } else if (this.position.x < this.radius()) {
      this.position.x = this.radius();
      this.velocity.x *= bounce;
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show(p: p5) {
    p.stroke(0);
    p.fill(175);
    p.circle(this.position.x, this.position.y, this.radius() * 2);
  }
}
