import type p5 from 'p5';

// This sketch illustrates the use of p5 global, and TypeScript for the definition of a class

// p : instance mode, P5 : Global mode
export default function sketch(p: p5) {
  let walker: Walker;
  const targetFrameRate = 120;
  const lastCoordinates = { x: 0, y: 0 };
  const canvasHeight = 400;
  const canvasWidth = 800;

  p.setup = function () {
    p.frameRate(targetFrameRate);

    p.createCanvas(canvasWidth, canvasHeight);
    walker = new Walker(p.width, p.height);
    p.background(55);
  };

  p.draw = function () {
    walker.show();
    walker.step();
  };

  // TODO add constraints p.constrain
  class Walker {
    x: number;
    y: number;
    timeX: number;
    timeY: number;

    constructor(width: number, height: number) {
      this.x = width / 2;
      this.y = height / 2;
      this.timeX = Math.random() * 1000;
      this.timeY = Math.random() * 1000;
    }

    show() {
      p.stroke(230);
      p.point(this.x, this.y);
    }

    step() {
      // strategy
      this.perlinNoise();
    }

    // Exercise 0-7
    perlinNoise() {
      const xNoise = p.noise(this.timeX);
      const yNoise = p.noise(this.timeY);

      this.timeX += 0.005;
      this.timeY += 0.005;

      const xMapped = p.map(xNoise, 0, 1, 0, canvasWidth);
      // console.log('🚀 ~ Walker ~ perlinNoise ~ xMapped:', xMapped);
      const yMapped = p.map(yNoise, 0, 1, 0, canvasHeight);
      // console.log('🚀 ~ Walker ~ perlinNoise ~ yMapped:', yMapped);
      this.x = xMapped;
      this.y = yMapped;
    }

    customDistribution() {
      const xStep = this.getRandomQualifiedValue();
      const yStep = this.getRandomQualifiedValue();
      // console.log({ xStep, yStep });
      this.x += p.random(-xStep, xStep);
      this.y += p.random(-yStep, yStep);
    }

    // TODO investigate this revision
    private getRandomQualifiedValue(): number {
      const maxValue = 10;
      const r1 = p.random(maxValue);
      const probability = (r1 * r1) / (maxValue * maxValue);
      const r2 = p.random();

      // console.log({
      //   r1,
      //   probability,
      //   r2,
      //   takeR1: r2 < probability,
      // });
      if (r2 < probability) {
        return r1;
      }

      return this.getRandomQualifiedValue();
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

    strategyFloat() {
      this.x += p.random(-1, 1);
      this.y += p.random(-1, 1);
    }

    strategyInteger() {
      const r = Math.floor(p.random(4));

      switch (r) {
        case 0:
          this.x += 1;
          break;
        case 1:
          this.x -= 1;
          break;
        case 2:
          this.y += 1;
          break;
        case 3:
          this.y -= 1;
          break;
        default:
          throw new Error('uncaught case');
      }
    }
  }
}
