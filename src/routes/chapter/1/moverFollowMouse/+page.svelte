<script lang="ts">
  import Sketch from '$lib/Sketch.svelte';
  import p5 from 'p5';

  const canvasWidth = 600;
  const canvasHeight = 300;
  const fps = 60;

  class Mover {
    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;
    topSpeed: number;

    constructor(p: p5) {
      this.position = p.createVector(canvasWidth / 2, canvasHeight / 2);
      this.velocity = p.createVector(0, 0);
      this.acceleration = p.createVector();
      this.topSpeed = 5;
    }

    private getConstantAcceleration(_p: p5, v: p5.Vector) {
      const constantDirection = p5.Vector.sub(v, this.position);
      constantDirection.setMag(0.03);
      return constantDirection;
    }

    // Linear inverse relationship
    private getInverseToDistance(p: p5, v: p5.Vector) {
      const gravitationalDirection = p5.Vector.sub(v, this.position);

      let distance = gravitationalDirection.mag();
      distance = p.constrain(distance, 100, 300);

      const adjusted = 50 / distance;
      gravitationalDirection.setMag(adjusted);

      return gravitationalDirection;
    }

    // Propotional to Distance
    private getPropotionalToDistance(p: p5, v: p5.Vector) {
      const gravitationalDirection = p5.Vector.sub(v, this.position);

      let distance = gravitationalDirection.mag();
      distance = p.constrain(distance, 100, 300);

      const adjusted = (distance - 100) / 200;
      gravitationalDirection.setMag(adjusted);

      return gravitationalDirection;
    }

    update(p: p5) {
      let mouse = p.createVector(p.mouseX, p.mouseY);

      // this.acceleration = this.getConstantAcceleration(p, mouse);
      // this.acceleration = this.getInverseToDistance(p, mouse);
      this.acceleration = this.getPropotionalToDistance(p, mouse);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.topSpeed);
      this.position.add(this.velocity);
    }

    show(p: p5) {
      p.stroke(0);
      p.fill(175);
      p.circle(this.position.x, this.position.y, 48);
    }
  }

  let mover: Mover;

  function sketch(p: p5) {
    p.setup = () => {
      p.createCanvas(canvasWidth, canvasHeight);
      p.frameRate(fps);
      mover = new Mover(p);
    };

    p.draw = () => {
      p.background(55);

      mover.update(p);
      mover.show(p);
    };
  }
</script>

<h2>Mover following mouse</h2>

<Sketch sketchFunction={sketch} />
