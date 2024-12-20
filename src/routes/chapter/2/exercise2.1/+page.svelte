<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';

  const canvasWidth = 600;
  const canvasHeight = 300;
  const fps = 120;

  const BALLRADIUS = 24;
  const WALLFRICTION = 0.2;
  const MAXWINDSTRENGTH = 0.03;
  const WINDCHANGESPEED = 0.003;
  const HELIUMLIFT = 0.003;

  class Mover {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    topSpeed: number;
    wind: p5.Vector;
    time: number;
    btime: number;

    constructor(p: p5) {
      this.position = p.createVector(canvasWidth / 2, canvasHeight / 2);
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.wind = p.createVector(0, 0);
      this.topSpeed = 5;
      this.time = Math.random() * 1000;
      this.btime = Math.random() * 10000;
    }

    update(p: p5) {
      const heliumLift = p.createVector(0, -HELIUMLIFT);
      this.acceleration.add(heliumLift);

      const randomWindY = p.noise(this.time);
      const mappedY = p.map(randomWindY, 0, 1, -MAXWINDSTRENGTH, MAXWINDSTRENGTH);
      const randomWindX = p.noise(this.btime);
      const mappedX = p.map(randomWindX, 0, 1, -MAXWINDSTRENGTH, MAXWINDSTRENGTH);
      const windVector = p.createVector(mappedX, mappedY);

      if (p.mouseIsPressed) {
        windVector.mult(0.1);
      }
      this.wind.x = windVector.x;
      this.wind.y = windVector.y;
      this.acceleration.add(windVector);

      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topSpeed);
      this.position.add(this.velocity);
      this.acceleration.setMag(0);

      this.time += WINDCHANGESPEED;
      this.btime += WINDCHANGESPEED;
    }
    show(p: p5) {
      p.stroke(0);
      p.fill(175);
      p.circle(this.position.x, this.position.y, BALLRADIUS * 2);

      const windMult = p5.Vector.copy(this.wind).mult(5000);

      p.line(
        canvasWidth / 2 + windMult.x,
        canvasHeight / 2 + windMult.y,
        canvasWidth / 2,
        canvasHeight / 2,
      );
      p.stroke(0);
    }
    checkEdges(p: p5) {
      if (this.position.x > canvasWidth) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = canvasWidth;
      }
      if (this.position.y + BALLRADIUS > canvasHeight) {
        this.position.y = canvasHeight - BALLRADIUS;

        const bounceOff = p.createVector(0, 0);
        const positiveVelocityY = Math.abs(this.velocity.y);
        bounceOff.add(0, -positiveVelocityY);
        bounceOff.mult(1.5);
        this.acceleration.add(bounceOff);

        const isXPositive = this.velocity.x > 0;
        if (isXPositive) {
          const friction = p.createVector(-this.velocity.x * WALLFRICTION);
          this.acceleration.add(friction);
        } else {
          const friction = p.createVector(-(this.velocity.x * WALLFRICTION));
          this.acceleration.add(friction);
        }
      } else if (this.position.y - BALLRADIUS <= 0) {
        this.position.y = BALLRADIUS;

        const bounceOff = p.createVector(0, 0);
        const positiveVelocityY = Math.abs(this.velocity.y);
        bounceOff.add(0, positiveVelocityY);
        bounceOff.mult(1.5);
        this.acceleration.add(bounceOff);

        const isXPositive = this.velocity.x > 0;
        if (isXPositive) {
          const friction = p.createVector(-this.velocity.x * WALLFRICTION);
          this.acceleration.add(friction);
        } else {
          const friction = p.createVector(-(this.velocity.x * WALLFRICTION));
          this.acceleration.add(friction);
        }
      }
    }
  }

  let mover: Mover;

  function sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);
      mover = new Mover(p);
    };

    p.draw = () => {
      p.background(55);

      mover.checkEdges(p);
      mover.update(p);
      mover.show(p);
    };
  }
</script>

<h2>Exercise 2.1</h2>

<Sketch sketchFunction={sketch} />

<p>Helium filled balloon, wall friction, bouncing off wall and ground, with changing wind</p>
