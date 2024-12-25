<script lang="ts">
  import type { _P9K_SSH_TTY } from '$env/static/private';
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';

  const canvasWidth = 600;
  const canvasHeight = 300;
  const fps = 60;

  const GRAVITY = 0.5;
  // arbitrary constants
  // const NORMAL_FORCE = 1;
  const FRICTION_COEFFICIENT = 0.1;

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
      const isWithin1PixelOfBottom = this.position.y + this.radius() > canvasHeight - 1;
      return isWithin1PixelOfBottom;
    }

    bounceEdges() {
      const bounce = -0.9;
      if (this.position.y > canvasHeight - this.radius()) {
        this.position.y = canvasHeight - this.radius();
        this.velocity.y *= bounce;
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

  function sketch(p: p5) {
    const movers: Mover[] = [];

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);
      movers.push(new Mover(p, 200, 30, 5));
      movers.push(new Mover(p, 400, 30, 10));
    };

    p.draw = () => {
      p.background(55);

      const gravity = p.createVector(0, GRAVITY);

      for (const mover of movers) {
        const moverGravity = p5.Vector.mult(gravity, mover.mass) as unknown as p5.Vector;
        mover.applyForce(moverGravity);

        if (p.mouseIsPressed) {
          const wind = p.createVector(0.5, 0);
          mover.applyForce(wind);
        }

        if (mover.contactEdge()) {
          const friction = mover.velocity.copy();
          friction.mult(-1);
          const normalForce = mover.mass;
          // const FRICTION_MAGNITUDE = FRICTION_COEFFICIENT * NORMAL_FORCE;
          const FRICTION_MAGNITUDE = FRICTION_COEFFICIENT * normalForce; // accounts for mass
          friction.setMag(FRICTION_MAGNITUDE); // == normalize && mult
          mover.applyForce(friction);
        }

        mover.bounceEdges();
        mover.update();
        mover.show(p);
      }
    };
  }
</script>

<h2>Example 2.4</h2>

<Sketch sketchFunction={sketch} />
