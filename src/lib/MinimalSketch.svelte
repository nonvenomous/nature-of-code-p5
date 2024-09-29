<script lang="ts">
  import type p5 from 'p5';
  import Sketch from '$lib/Sketch.svelte';

  const canvasWidth = 400;
  const canvasHeight = 200;

  function sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.background(55);
    };

    p.draw = () => {};
  }

  let sketchData = $state({});
</script>

<Sketch sketchFunction={sketch} data={sketchData} />
