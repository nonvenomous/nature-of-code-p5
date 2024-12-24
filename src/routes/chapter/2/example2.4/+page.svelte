<script lang="ts">
  import type { _P9K_SSH_TTY } from '$env/static/private';
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';

  const canvasWidth = 600;
  const canvasHeight = 300;
  const fps = 120;

  // const normalForce = 1;
  const frictionCoefficient = 0.1;
  const GRAVITY = 0.5;

  class Mover {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    mass: number;

    constructor(p: p5, x: number, y: number, mass: number) {
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.mass = mass;
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
      // TODO: why -1 in contactEdge
      return this.position.y > canvasHeight - this.radius() - 1;
    }

    bounceEdges() {
      const bounce = -0.9;
      if (this.position.y > canvasHeight - this.radius()) {
        this.position.y = canvasHeight - this.radius();
        this.velocity.y *= bounce;
      }
    }

    update(p: p5) {
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

  let moverA: Mover;
  let moverB: Mover;

  function sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);
      moverA = new Mover(p, 200, 30, 5);
      moverB = new Mover(p, 400, 30, 10);
    };

    p.draw = () => {
      p.background(55);

      const gravity = p.createVector(0, GRAVITY);

      const gravityA = p5.Vector.mult(gravity, moverA.mass) as unknown as p5.Vector;
      moverA.applyForce(gravityA);

      const gravityB = p5.Vector.mult(gravity, moverB.mass) as unknown as p5.Vector;
      moverB.applyForce(gravityB);

      if (p.mouseIsPressed) {
        const wind = p.createVector(0.5, 0);
        moverA.applyForce(wind);
        moverB.applyForce(wind);
      }

      if (moverA.contactEdge()) {
        const friction = moverA.velocity.copy();
        friction.mult(-1);
        // TODO: understand frictionCoefficient
        friction.setMag(frictionCoefficient);
        moverA.applyForce(friction);
      }

      if (moverB.contactEdge()) {
        const friction = moverB.velocity.copy();
        friction.mult(-1);
        friction.setMag(frictionCoefficient);
        moverB.applyForce(friction);
      }

      moverA.bounceEdges();
      moverA.update(p);
      moverA.show(p);
      moverB.bounceEdges();
      moverB.update(p);
      moverB.show(p);
    };
  }
</script>

<h2>Example 2.4</h2>

<Sketch sketchFunction={sketch} />
