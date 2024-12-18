<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';

  const canvasWidth = 600;
  const canvasHeight = 300;
  const fps = 60;

  let time = Math.random() * 1000;
  let btime = Math.random() * 1000;

  class Mover {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    topSpeed: number;

    constructor(p: p5) {
      this.position = p.createVector(canvasWidth / 2, canvasHeight / 2);
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0, 0);
      this.topSpeed = 10;
    }

    update(p: p5) {
      // acc based on perlin noise
      time += 0.005;
      btime += 0.05;
      let xMapped = p.map(p.noise(time), 0, 1, -1, 1);
      let yMapped = p.map(p.noise(btime), 0, 1, -1, 1);

      const acceleration = p.createVector(xMapped, yMapped);
      this.velocity.add(acceleration);
      this.velocity.limit(this.topSpeed);
      this.position.add(this.velocity);
    }

    show(p: p5) {
      p.stroke(0);
      p.fill(175);
      p.circle(this.position.x, this.position.y, 48);
    }

    checkEdges() {
      if (this.position.x > canvasWidth) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = canvasWidth;
      }

      if (this.position.y > canvasHeight) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = canvasHeight;
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

      mover.update(p);
      mover.checkEdges();
      mover.show(p);
    };
  }
</script>

<h2>Exercise 1.6</h2>

<Sketch sketchFunction={sketch} />

<p>Accerleration based on Perlin Noise</p>
