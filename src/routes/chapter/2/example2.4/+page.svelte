<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';
  import { Mover } from './Mover';

  const canvasWidth = 600;
  const canvasHeight = 300;
  const fps = 60;

  const GRAVITY = 0.5;
  const FRICTION_COEFFICIENT = 0.1;

  function sketch(p: p5) {
    const movers: Mover[] = [];

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);
      movers.push(new Mover(p, 200, 30, 5));
      movers.push(new Mover(p, 400, 30, 10));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

<p class="flex flex-col">
  <span>Includes exercise 2.7 (interaction by mouse tossing)</span>
  <span>Contact edge friction</span>
  <span>Manages movers in an array</span>
</p>
