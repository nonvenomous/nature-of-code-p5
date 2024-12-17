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

      let mouse = p.createVector(p.mouseX, p.mouseY);
      let center = p.createVector(canvasWidth / 2, canvasHeight / 2);
      mouse.sub(center);

      p.translate(canvasWidth / 2, canvasHeight / 2);
      p.strokeWeight(2);
      p.stroke(200);
      p.line(0, 0, mouse.x, mouse.y);

      // In this example, after the vector is normalized, it’s multiplied by 50. Note that no matter where the mouse is, the vector always has the same length (50) because of the normalization process.
      mouse.normalize();
      mouse.mult(50);
      p.stroke(0);
      p.strokeWeight(8);
      p.line(0, 0, mouse.x, mouse.y);
    };
  }
</script>

<h2>Example 1.6</h2>

<Sketch sketchFunction={sketch} />

<p>Normalizing a vector</p>
