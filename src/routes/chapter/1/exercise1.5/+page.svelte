<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';

  const canvasWidth = 300;
  const canvasHeight = 300;
  const fps = 120;

  class Mover {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    topSpeed: number;

    constructor(p: p5) {
      this.position = p.createVector(canvasHeight / 2, canvasWidth / 2);
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector(0.05, 0);
      this.topSpeed = 10;
    }

    update() {
      if (accerlate === 1) {
        this.velocity.add(this.acceleration);
      } else if (accerlate === -1) {
        this.velocity.sub(this.acceleration);
      }
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

      mover.update();
      mover.checkEdges();
      mover.show(p);
    };
  }

  let accerlate = $state(0);
  const keyHandler = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.type === 'keyup') {
      accerlate = 0;
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
        accerlate = 1;
        break;
      case 'ArrowLeft':
        accerlate = -1;
        break;
      default:
        break;
    }
  };
</script>

<svelte:window onkeydown={keyHandler} onkeyup={keyHandler} />

<h2>Mover Controlled</h2>

<Sketch sketchFunction={sketch} />

<p>Mover class controlled by left and right arrow</p>
