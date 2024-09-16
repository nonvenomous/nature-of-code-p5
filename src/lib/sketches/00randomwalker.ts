import type p5 from 'p5';

// This sketch illustrates the use of p5 global, and TypeScript for the definition of a class

// p : instance mode, P5 : Global mode
export default function sketch(p: p5) {
  let walker: Walker;
  const targetFrameRate = 120;
  const lastCoordinates = { x: 0, y: 0 };

  p.setup = function () {
    p.frameRate(targetFrameRate);

    p.createCanvas(800, 400);
    walker = new Walker(p.width, p.height);
    p.background(55);
  };

  p.draw = function () {
    walker.step();
    walker.show();
  };
  class Walker {
    x: number;
    y: number;

    constructor(width: number, height: number) {
      this.x = width / 2;
      this.y = height / 2;
    }

    show() {
      p.stroke(230);
      p.point(this.x, this.y);
    }

    step() {
      this.levyFlight();
    }

    levyFlight() {
      const r = p.random();

      // 1 percent chance to take a big step
      if (r < 0.01) {
        this.x += p.random(-50, 50);
        this.y += p.random(-50, 50);
      } else {
        this.strategyNormalDistribution();
      }
    }

    strategyGaussianRandomWalk() {
      this.x += p.randomGaussian();
      this.y += p.randomGaussian();
    }

    strategyRandomFollowMouse() {
      const r = p.random(1);

      if (r > 0.5) {
        this.strategyNormalDistribution();
        return;
      }

      if (lastCoordinates.x < p.mouseX) this.x++;
      if (lastCoordinates.x > p.mouseX) this.x--;
      if (lastCoordinates.y < p.mouseY) this.y++;
      if (lastCoordinates.y > p.mouseY) this.y--;

      lastCoordinates.x = p.mouseX;
      lastCoordinates.y = p.mouseY;
    }

    strategyNormalDistribution() {
      const xstep = p.random(-1, 1);
      const ystep = p.random(-1, 1);

      this.x += xstep;
      this.y += ystep;
    }

    strategyBiasRight() {
      const r = p.random(1);
      if (r < 0.4) {
        // 40% for right
        this.x++;
      } else if (r < 0.6) {
        this.x--;
      } else if (r < 0.8) {
        this.y++;
      } else {
        this.y--;
      }
    }
  }
}
