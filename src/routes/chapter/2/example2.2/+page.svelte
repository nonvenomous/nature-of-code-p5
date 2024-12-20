<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';

  const canvasWidth = 600;
  const canvasHeight = 300;
  const fps = 120;

  class Mover {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    topSpeed: number;
    mass: number;

    constructor(p: p5, x: number, y: number, mass: number) {
      this.position = p.createVector(x, y);
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.topSpeed = 10;
      this.mass = mass;
    }

    applyForce(force: p5.Vector) {
      let f = p5.Vector.copy(force);
      this.acceleration.add(f);
    }

    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    show(p: p5) {
      p.stroke(0);
      p.fill(175);
      p.circle(this.position.x, this.position.y, this.mass * 16);
    }

    checkEdges() {
      if (this.position.x > canvasWidth) {
        this.position.x = canvasWidth;
        this.velocity.x *= -1;
      } else if (this.position.x < 0) {
        this.position.x = 0;
        this.velocity.x *= -1;
      }

      if (this.position.y > canvasHeight) {
        this.position.y = canvasHeight;
        this.velocity.y *= -1;
      } else if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y *= -1;
      }
    }
  }
  let moverA: Mover;
  let moverB: Mover;

  function sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);
      moverA = new Mover(p, 100, 30, 10);
      moverB = new Mover(p, 400, 30, 2);
    };

    p.draw = () => {
      p.background(55);

      let gravity = p.createVector(0, 0.1);
      moverA.applyForce(gravity);
      moverB.applyForce(gravity);

      if (p.mouseIsPressed) {
        let wind = p.createVector(0.1, 0);
        moverA.applyForce(wind);
        moverB.applyForce(wind);
      }

      moverA.update();
      moverA.checkEdges();
      moverA.show(p);
      moverB.update();
      moverB.checkEdges();
      moverB.show(p);
    };
  }
</script>

<h2>Mover</h2>

<Sketch sketchFunction={sketch} />

<p>Mover class utilzing different algorithms</p>
