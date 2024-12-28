<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';
  import { Mover } from './Mover';
  import { Liquid } from '../Liquid';

  const canvasWidth = 640;
  const canvasHeight = 300;
  const fps = 60;

  const GRAVITY = 0.1;
  const DRAG_COEFFICIENT = 0.2;

  function sketch(p: p5) {
    const movers: Mover[] = [];

    let liquid: Liquid;

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);

      liquid = new Liquid(p, 0, canvasHeight / 2, canvasWidth, canvasHeight / 2, DRAG_COEFFICIENT);

      for (let i = 0; i < 9; i++) {
        let mass = p.random(0.5, 3);
        movers[i] = new Mover(p, 40 + i * 70, 0, mass);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dragEvent: any;

    p.mouseDragged = (event) => (dragEvent = event);

    p.draw = () => {
      p.background(55);

      liquid.show();
      const gravity = p.createVector(0, GRAVITY);

      for (const mover of movers) {
        if (liquid.contains(mover)) {
          const dragForce = liquid.calculateDrag(mover);
          mover.applyForce(dragForce);
        }

        if (!p.mouseIsPressed) {
          const moverGravity = p5.Vector.mult(gravity, mover.mass) as unknown as p5.Vector;
          mover.applyForce(moverGravity);
        }

        if (p.mouseIsPressed && dragEvent) {
          const mouseMovementV = p.createVector(dragEvent.movementX, dragEvent.movementY);
          mouseMovementV.mult(1);
          mover.velocity.add(mouseMovementV);
        }

        if (p.mouseIsPressed && !dragEvent) mover.velocity.setMag(0);

        mover.bounceEdges();
        mover.update();
        mover.show(p);
      }

      dragEvent = null;
    };
  }
</script>

<h2>Example 2.5 - Fluid Resistance</h2>

<Sketch sketchFunction={sketch} />

<p class="flex flex-col place-content-start">
  <span
    >Completes exercise 2.8, implementing a limit to prevent movers from bouncing due to coefficient</span
  >
</p>
