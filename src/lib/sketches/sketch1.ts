import type p5 from 'p5';

// This sketch illustrates the use of p5 global, and TypeScript for the definition of a class

// p : instance mode, P5 : Global mode
export default function sketch(p: p5, P5: p5) {
  let ball: Ball;

  p.setup = function () {
    p.createCanvas(600, 100);
    ball = new Ball(p.width / 2, p.height / 2);
  };

  p.draw = function () {
    p.background(220);
    ball.update();
    ball.checkEdges();
    ball.display();
  };
  class Ball {
    position: p5.Vector;
    velocity: p5.Vector;
    radius: number;

    constructor(x: number, y: number) {
      this.position = p.createVector(x, y);
      this.velocity = P5.Vector.random2D().mult(2);
      this.radius = 10;
    }

    update() {
      this.position.add(this.velocity);
    }

    checkEdges() {
      if (this.position.x < this.radius || this.position.x > p.width - this.radius) {
        this.velocity.x *= -1;
      }

      if (this.position.y < this.radius || this.position.y > p.height - this.radius) {
        this.velocity.y *= -1;
      }
    }

    display() {
      p.ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    }
  }
}
