<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';
  import { Mover } from './Mover';
  import { Attractor } from './Attractor';

  const canvasWidth = 640;
  const canvasHeight = 360;
  const fps = 60;

  function sketch(p: p5) {
    const movers: Mover[] = [];
    let attractor: Attractor;
    let attractor2: Attractor;

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);

      for (let i = 0; i < 5; i++) {
        const randomX = p.random(canvasWidth);
        const randomY = p.random(canvasHeight);
        const mass = p.random(0.5, 5);
        movers.push(new Mover(p, randomX, randomY, mass));
      }
      attractor = new Attractor(
        p,
        p.random(100, canvasWidth / 2),
        p.random(100, canvasHeight - 100),
      );
      attractor2 = new Attractor(
        p,
        p.random(canvasWidth / 2, canvasWidth - 100),
        p.random(100, canvasHeight - 100),
      );
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dragEvent: any;

    p.mouseDragged = (event) => {
      dragEvent = event;
    };

    p.draw = () => {
      p.background(55, 10);

      for (const mover of movers) {
        const force = attractor.attract(mover);
        mover.applyForce(force);
        const force2 = attractor2.attract(mover);
        mover.applyForce(force2);

        if (p.mouseIsPressed && dragEvent) {
          const mouseMovementV = p.createVector(dragEvent.movementX, dragEvent.movementY);
          mouseMovementV.mult(0.5);
          mover.velocity.add(mouseMovementV);
        }

        if (p.mouseIsPressed && !dragEvent) mover.velocity.setMag(0);

        mover.bounceEdges();
        mover.update();
        mover.show(p);
      }
      // attractor.show();
      // attractor2.show();
      dragEvent = null;
    };
  }
</script>

<h2>Gravitational attractors</h2>

<Sketch sketchFunction={sketch} />

<p class="flex flex-col">
  <span>includes example 2.6 & 2.7</span>
  <span>completes exercise 2.12 (multiple attractors with moving trails)</span>
  <span>Mouse tossing</span>
</p>
