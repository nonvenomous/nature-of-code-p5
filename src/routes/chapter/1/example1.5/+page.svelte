<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';

  const canvasWidth = 300;
  const canvasHeight = 300;
  const fps = 120;

  function sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);
    };

    p.draw = () => {
      p.background(55);
      p.stroke(200);

      let mouse = p.createVector(p.mouseX, p.mouseY);
      let center = p.createVector(p.width / 2, p.height / 2);
      mouse.sub(center); // move origin to center

      let magnitude = mouse.mag();

      p.fill(0);
      p.rect(0, 0, magnitude, 10);
      p.translate(p.width / 2, p.height / 2);
      p.line(0, 0, mouse.x, mouse.y);
    };
  }
</script>

<h2>Example 1.5</h2>

<Sketch sketchFunction={sketch} />
