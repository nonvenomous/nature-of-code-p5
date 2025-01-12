<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';
  import { Body } from './Body';

  const canvasWidth = 640;
  const canvasHeight = 360;
  const fps = 60;

  function sketch(p: p5) {
    const bodies: Body[] = [];

    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);

      bodies[0] = new Body(p, 320, 40, 3);
      bodies[1] = new Body(p, 320, 320, 3);
      bodies[2] = new Body(p, 100, 180, 3);

      bodies[0].velocity = p.createVector(1, 0);
      bodies[1].velocity = p.createVector(-1, 0);
      bodies[2].velocity = p.createVector(0, 0);
    };

    p.draw = () => {
      p.background(55);

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
  <span>completes exercise 2.14 adding a third body</span>
</p>
