import type p5 from 'p5';

// uniform distribution
export default function sketch(p: p5) {
  const canvasWidth = 800;
  const canvasHeight = 400;
  const targetFrameRate = 60;

  const totalColumns = 4;
  const columnWidth = canvasWidth / totalColumns;

  const counts: number[] = [];

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(targetFrameRate);

    p.stroke(0);
    p.background(55);
    p.fill(127);

    // creating `total` columns
    for (let index = 0; index < totalColumns; index++) {
      counts[index] = 0;
    }
  };

  p.draw = () => {
    const randomCountIndex = p.floor(p.random(totalColumns));
    counts[randomCountIndex]++;

    // for (const [index, count] of counts.entries()) {
    //   const rectX = index * columnWidth;
    //   const rectY = canvasHeight - count;
    //   const width = columnWidth;
    //   const height = count;

    //   // console.log({
    //   //   index,
    //   //   count,
    //   //   rectX,
    //   //   rectY,
    //   //   width,
    //   //   height,
    //   // });

    //   p.rect(rectX, rectY, width, height);
    // }

    // console.log(`FPS: ${p.frameRate().toFixed(2)}`);

    const rectX = randomCountIndex * columnWidth;
    const rectY = canvasHeight - counts[randomCountIndex];
    const width = columnWidth; // - 1
    const height = counts[randomCountIndex];

    // console.log({
    //   randomCountIndex,
    //   count: counts[randomCountIndex],
    //   rectX,
    //   rectY,
    //   width,
    //   height,
    // });

    p.rect(rectX, rectY, width, height, 8);
  };
}
