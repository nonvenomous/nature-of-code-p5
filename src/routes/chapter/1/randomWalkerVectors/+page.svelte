<script lang="ts">
  import type p5 from 'p5';
  import Sketch from '$lib/Sketch.svelte';
  import { Walker } from './walker';

  const width = 400;
  const height = 200;
  const fps = 120;

  function sketch(p: p5) {
    let walker: Walker;

    p.setup = () => {
      p.createCanvas(width, height);
      p.frameRate(fps);
      p.background(55);
      p.stroke(155, 100);
      p.strokeWeight(1.5);

      walker = new Walker(p, width / 2, height / 2);
    };

    p.draw = () => {
      walker.show();
      walker.step();
    };
  }

  let sketchData = $state({});
</script>

<h2>Random Walker with Vectors</h2>

<Sketch sketchFunction={sketch} data={sketchData} />
