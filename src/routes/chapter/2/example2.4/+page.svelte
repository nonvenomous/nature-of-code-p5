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
      const isWithin1PixelOfBottom = this.position.y > canvasHeight - this.radius() - 1;
      return isWithin1PixelOfBottom;
    }

    bounceEdges() {
      const bounce = -0.9;
      if (this.position.y > canvasHeight - this.radius()) {
        this.position.y = canvasHeight - this.radius();
        this.velocity.y *= bounce;
      } else if (this.position.y < this.radius()) {
        this.position.y = this.radius();
        this.velocity.y *= bounce;
      }
      if (this.position.x > canvasWidth - this.radius()) {
        this.position.x = canvasWidth - this.radius();
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

  function sketch(p: p5) {
    const movers: Mover[] = [];

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);
      movers.push(new Mover(p, 200, 30, 5));
      movers.push(new Mover(p, 400, 30, 10));
    };

    let dragEvent: any;

    p.mouseDragged = (event) => {
      dragEvent = event;
    };

    p.draw = () => {
      p.background(55);

      const gravity = p.createVector(0, GRAVITY);

      for (const mover of movers) {
        if (!p.mouseIsPressed) {
          const moverGravity = p5.Vector.mult(gravity, mover.mass) as unknown as p5.Vector;
          mover.applyForce(moverGravity);
        }

        if (mover.contactEdge()) {
          const friction = mover.velocity.copy();
          friction.mult(-1); // opposite direction of velocity
          const normalForce = mover.mass; // normal force propotional to mass
          const FRICTION_MAGNITUDE = FRICTION_COEFFICIENT * normalForce;

          friction.setMag(FRICTION_MAGNITUDE); // == normalize && mult
          mover.applyForce(friction);
        }

        if (p.mouseIsPressed && dragEvent) {
          const mouseMovementV = p.createVector(dragEvent.movementX, dragEvent.movementY);
          mouseMovementV.mult(0.5);
          mover.velocity.add(mouseMovementV);
        }
        if (p.mouseIsPressed && !dragEvent) {
          mover.velocity.setMag(0);
        }
        mover.bounceEdges();
        mover.update();
        mover.show(p);
      }
      dragEvent = null;
    };
  }
</script>

<h2>Example 2.4</h2>

<Sketch sketchFunction={sketch} />

<p>
  <span>Includes exercise 2.7 (interaction by mouse tossing)</span>
  <span>Manages movers in an array</span>
</p>
