<script lang="ts">
  import type p5 from 'p5';
  import Sketch from '$lib/Sketch.svelte';

  const canvasWidth = 300;
  const canvasHeight = 300;
  const fps = 120;

  function sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);
      p.strokeWeight(4);
    };
    const halfWidth = canvasWidth / 2;
    const halfHeight = canvasHeight / 2;

    p.draw = () => {
      p.background(55);
      p.stroke(200);

      const center = p.createVector(halfWidth, halfHeight);
      p.line(0, 0, center.x, center.y);

      const mouseVector = p.createVector(p.mouseX, p.mouseY);
      p.line(0, 0, mouseVector.x, mouseVector.y);

      p.stroke(0);
      p.translate(center.x, center.y); // move the origin;
      mouseVector.sub(center);
      // Draw a line to represent the result of subtraction
      p.line(0, 0, mouseVector.x, mouseVector.y);
    };
  }
</script>

<h2>Example 1.3</h2>

<Sketch sketchFunction={sketch} />
