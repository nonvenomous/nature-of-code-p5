<script lang="ts">
  import type p5 from 'p5';
  import Sketch from '$lib/Sketch.svelte';

  const canvasWidth = 300;
  const canvasHeight = 300;
  const fps = 120;

  const boxSz = 100;
  const doubleBox = boxSz * 2;

  let theta = 0.0;

  function sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight, 'webgl');
      p.frameRate(fps);
      p.stroke(255);
    };

    const position = p.createVector(50, 50, 50);
    const velocity = p.createVector(1.1, 1.2, 1.3);

    const SIZE = 48;
    const RADIUS = SIZE / 2;

    p.draw = () => {
      p.background(55);
      p.rotateY(theta);
      theta += 0.0025;

      p.noFill();
      p.box(doubleBox);

      position.add(velocity);

      if (position.x + RADIUS > boxSz || position.x - RADIUS < -boxSz) {
        velocity.x = velocity.x * -1;
      }
      if (position.y + RADIUS > boxSz || position.y - RADIUS < -boxSz) {
        velocity.y = velocity.y * -1;
      }
      if (position.z + RADIUS > boxSz || position.z - RADIUS < -boxSz) {
        velocity.z = velocity.z * -1;
      }
      p.fill(200);

      // p.circle(position.x, position.y, SIZE);
      p.push();
      p.translate(position);
      p.rotateX(theta);
      p.rotateY(theta);
      p.rotateZ(theta);
      p.sphere(RADIUS, 10, 10);
      p.pop();
    };
  }
</script>

<h2>Exercise 1.3 - Bouncing ball in 3D</h2>

<Sketch sketchFunction={sketch} />
