<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';
  import { Body } from './Body';

  const canvasWidth = 640;
  const canvasHeight = 360;
  const fps = 60;

  function sketch(p: p5) {
    const bodies: Body[] = [];
    const NUM_OF_BODIES = 10;

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);

      for (let i = 0; i < NUM_OF_BODIES; i++) {
        const x = p.random(0, canvasWidth);
        const y = p.random(0, canvasHeight);
        const size = p.random(1, 3);
        bodies.push(new Body(p, x, y, size));
      }
    };

    p.draw = () => {
      p.background(55);
      const mouseVector = p.createVector(p.mouseX, p.mouseY);
      const G = 2; // gravitational constant
      const isClicked = p.mouseIsPressed;
      const mouseMass = isClicked ? 40 : 10;

      // n-squared algorithm
      for (const body of bodies) {
        for (const otherBody of bodies) {
          if (otherBody === body) continue;
          body.repel(otherBody);
        }
        const force = p5.Vector.sub(mouseVector, body.position);
        let distance = force.mag();
        distance = p.constrain(distance, 5, 12);
        const magnitude = (G * body.mass * mouseMass) / (distance * distance);
        force.setMag(magnitude);
        body.applyForce(force);

        body.update();
        body.show(p);
      }
    };
  }
</script>

<h2>N-Body Attraction</h2>

<Sketch sketchFunction={sketch} />

<p class="flex flex-col">
  <span>complets exercise 2.15, bodies repel each other but attracted by mouse</span>
  <span>on mouse click mouse mass is multiplied</span>
</p>
