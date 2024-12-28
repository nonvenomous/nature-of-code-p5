<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';
  import { Mover } from '../Mover';
  import { Liquid } from '../Liquid';

  const canvasWidth = 640;
  const canvasHeight = 300;
  const fps = 60;

  const GRAVITY = 0.1;

  function sketch(p: p5) {
    const movers: Mover[] = [];

    let liquid: Liquid;

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);

      liquid = new Liquid(p, 0, canvasHeight / 2, canvasWidth, canvasHeight / 2, 0.2);

      // movers.push(new Mover(p, 200, 30, 3));
      // movers.push(new Mover(p, 400, 30, 5));
      //
      for (let i = 0; i < 9; i++) {
        let mass = p.random(0.1, 3);
        movers[i] = new Mover(p, 40 + i * 70, 0, mass);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dragEvent: any;

    p.mouseDragged = (event) => {
      dragEvent = event;
    };

    p.draw = () => {
      p.background(55);

      liquid.show();
      const gravity = p.createVector(0, GRAVITY);

      for (const mover of movers) {
        if (liquid.contains(mover)) {
          console.log('liquid contains mover, applying dragForce');
          const dragForce = liquid.calculateDrag(mover);
          mover.applyForce(dragForce);
        }
        if (!p.mouseIsPressed) {
          const moverGravity = p5.Vector.mult(gravity, mover.mass) as unknown as p5.Vector;
          mover.applyForce(moverGravity);
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
