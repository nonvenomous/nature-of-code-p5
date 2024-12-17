import type p5 from 'p5';

// This sketch illustrates a possible way of interactions between the Svelte app and the P5 scripts

export type SketchData = {
  x: number;
  y: number;
  color: string;
};

/**
 * P5JS Sketch
 * @param p Instance mode
 * @param P5 Global mode
 * @param data Reactive properties (One way bindings)
 * @param onUpdate Callback function (The other way bindings)
 */
export default function sketch(
  p: p5,
  P5: p5,
  data: SketchData,
  onUpdate: (data: SketchData) => void,
) {
  p.setup = function () {
    const canvas = p.createCanvas(600, 100);

    canvas.mousePressed(() => {
      data.x = p.mouseX;
      data.y = p.mouseY;
      onUpdate(data);
    });
  };

  p.draw = function () {
    p.background(220);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
    p.text('Two way bindings, click anywhere on the canvas', p.width / 2, p.height / 2);
    p.fill(data.color);
    p.ellipse(data.x, data.y, 20);
  };
}
