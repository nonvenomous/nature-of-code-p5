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

      // n-squared algorithm
      for (const body of bodies) {
        for (const otherBody of bodies) {
          if (otherBody === body) continue;
          body.attract(otherBody);
        }
        body.update();
        body.show(p);
      }
    };
  }
</script>

<h2>Two-Body Attraction</h2>

<Sketch sketchFunction={sketch} />

<p class="flex flex-col">
  <span>includes example 2.8 two-body attraction</span>
  <span>includes example 2.9 n-body attraction</span>
  <span>completes exercise 2.14 adding a third body</span>
</p>
