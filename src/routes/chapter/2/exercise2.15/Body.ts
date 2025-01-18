import p5 from 'p5';

const G = 5; // gravitational constant

export class Body {
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

  repel(body: Body) {
    const force = p5.Vector.sub(this.position, body.position);
    let distance = force.mag();
    distance = this.p.constrain(distance, 10, 25);
    const magnitude = (G * body.mass * this.mass) / (distance * distance);
    force.setMag(magnitude);
    force.mult(-1);
    body.applyForce(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(12);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show(p: p5) {
    p.stroke(0);
    p.fill(175);
    p.circle(this.position.x, this.position.y, this.radius() * 2);
    // console.log(this.velocity.x);
    p.line(
      this.position.x,
      this.position.y,
      this.position.x + 2 * this.velocity.x,
      this.position.y + 2 * this.velocity.y,
    );
  }
}
