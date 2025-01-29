<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';
  import { Body } from './Body';

  const canvasWidth = 640;
  const canvasHeight = 360;
  const fps = 60;

  function sketch(p: p5) {
    const bodies: Body[] = [];
    const NUM_OF_BODIES = 200;
    const centerMass = 300;

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);

      const initialMag = 50;

      for (let i = 0; i < NUM_OF_BODIES; i++) {
        const center = p.createVector(1, 1);
        center.setHeading(Math.random() * 2 * Math.PI);

        center.setMag(p.random(120, 200));

        const body = new Body(p, center.x, center.y, 1);
        const xAcc = initialMag * Math.cos(center.heading());
        const yAcc = initialMag * Math.sin(center.heading());

        const angleDegrees = 100;
        const angleRadians = (angleDegrees * Math.PI) / 180;

        const xNew = xAcc * Math.cos(angleRadians) - yAcc * Math.sin(angleRadians);
        const yNew = xAcc * Math.sin(angleRadians) + yAcc * Math.cos(angleRadians);

        const acceleration = p.createVector(xNew, yNew);
        acceleration.setMag(10);
        body.applyForce(acceleration);

        bodies.push(body);
      }
      const largeBoy = new Body(p, 0, 0, centerMass);
      bodies.push(largeBoy);
    };

    p.draw = () => {
      p.translate(canvasWidth / 2, canvasHeight / 2);
      p.background(55, 50);

      // n-squared algorithm
      for (const body of bodies) {
        for (const otherBody of bodies) {
          if (otherBody === body) continue;
          body.attract(otherBody);
        }
        if (body.mass === centerMass) continue;
        body.update();
        body.show(p);
      }
      // p.noLoop();
    };
  }
</script>

<h2>Spiral Galaxy - Mutual Attract</h2>

<Sketch sketchFunction={sketch} />

<p class="flex flex-col">
  <span>completes exercise 2.16</span>
</p>
