<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';

  const canvasWidth = 600;
  const canvasHeight = 300;
  const fps = 60;

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
      f.div(this.mass);
      this.acceleration.add(f);
    }

    private wallForce(p: p5) {
      const nearnessToLeftWall = this.position.x;
      const mappedA = p.map(nearnessToLeftWall, canvasWidth, 0, 0.05, 0);
      const nearnessToRightWall = Math.abs(this.position.x - canvasWidth);
      const mappedB = p.map(nearnessToRightWall, canvasWidth, 0, 0.05, 0);

      const forcePushingRight = p.createVector(-mappedA);
      const forcePushingLeft = p.createVector(mappedB);
      this.applyForce(forcePushingRight);
      this.applyForce(forcePushingLeft);
    }

    private mouseWind(p: p5) {
      p.line(p.mouseX, p.mouseY, this.position.x, this.position.y);
      const mouse = p.createVector(p.mouseX, p.mouseY);
      mouse.sub(this.position);
      mouse.setMag(0.3);
      mouse.mult(-1);
      this.applyForce(mouse);
    }

    private radius() {
      return this.mass * 8;
    }

    update(p: p5) {
      this.wallForce(p);
      if (p.mouseIsPressed) {
        this.mouseWind(p);
      }
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    show(p: p5) {
      p.stroke(0);
      p.fill(175);
      p.circle(this.position.x, this.position.y, this.radius() * 2);
    }

    checkEdges() {
      if (this.position.x + this.radius() > canvasWidth) {
        this.position.x = canvasWidth - this.radius();
        this.velocity.x *= -1;
      } else if (this.position.x - this.radius() < 0) {
        this.position.x = this.radius();
        this.velocity.x *= -1;
      }

      if (this.position.y + this.radius() > canvasHeight) {
        this.position.y = canvasHeight - this.radius();
        this.velocity.y *= -1;
      } else if (this.position.y - this.radius() < 0) {
        this.position.y = this.radius();
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
      moverA = new Mover(p, 200, 30, 10);
      moverB = new Mover(p, 400, 60, 2);
    };

    p.draw = () => {
      p.background(55);

      let gravity = p.createVector(0, 0.1);

      const gravityB = p5.Vector.mult(gravity, moverB.mass);
      // @ts-expect-error wrong type
      moverB.applyForce(gravityB);
      const gravityA = p5.Vector.mult(gravity, moverA.mass);
      // @ts-expect-error wrong type
      moverA.applyForce(gravityA);

      moverA.update(p);
      moverA.checkEdges();
      moverA.show(p);
      moverB.update(p);
      moverB.checkEdges();
      moverB.show(p);
    };
  }
</script>

<h2>Mover</h2>

<Sketch sketchFunction={sketch} />

<p>Movers with mass, walls with force, wind on mouse click</p>
