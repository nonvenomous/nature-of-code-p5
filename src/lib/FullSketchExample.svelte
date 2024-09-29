<script lang="ts">
  import type p5 from 'p5';
  import Sketch from '$lib/Sketch.svelte';

  const canvasWidth = 400;
  const canvasHeight = 200;

  function sketch(p: p5, p5Canvas: typeof p5, data: typeof sketchData) {
    p.setup = () => {
      const canvas = p.createCanvas(canvasWidth, canvasHeight);
      p.background(55);

      canvas.mousePressed(() => {
        data.x = p.mouseX;
        data.y = p.mouseY;
      });
    };

    p.draw = () => {
      p.background(55);
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(data.color);
      p.ellipse(data.x, data.y, 20);
    };
  }

  let sketchData = $state({
    color: 'red',
    x: 0,
    y: 0,
  });
</script>

<Sketch sketchFunction={sketch} data={sketchData} />

<input type="range" min="0" max={canvasWidth} bind:value={sketchData.x} />
<input type="range" min="0" max={canvasHeight} bind:value={sketchData.y} />
<p>(x,y): ({sketchData.x},{sketchData.y})</p>
<label>
  Color:
  <input type="color" bind:value={sketchData.color} />
</label>
