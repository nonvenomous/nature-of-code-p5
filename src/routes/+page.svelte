<script lang="ts">
  import type { Perlin2DNoiseData } from '$lib/sketches/00-2DperlinNoise';
  import type { GaussSplatterData } from '$lib/sketches/00gaussPaintSlatter';
  import type { PerlinMandalaData } from '$lib/sketches/00perlinMandala';
  import type { SketchData } from '$lib/sketches/sketch3';
  import Sketch from './Sketch.svelte';

  let sketch3ControlsData: SketchData = $state({
    x: 50,
    y: 50,
    color: 'rgba(255, 0, 0, 0.5)',
  });

  // Sketch 3 lets you update the HTML controls values from the running P5JS script
  const updateSketch3Controls = (data: SketchData) => {
    sketch3ControlsData.x = data.x;
    sketch3ControlsData.y = data.y;
  };

  const gausPaintSplatterData: GaussSplatterData = $state({ colorSd: 30, coordinateSd: 60 });
  const perlinMandala: PerlinMandalaData = $state({
    frameRate: 120,
    amount: 1,
    strokeWeight: 0.1,
    enableDarken: true,
    enableTurning: false,
  });

  const perlin2DData: Perlin2DNoiseData = $state({
    xoffIncrementSize: 0.1,
    yoffIncrementSize: 0.1,
    lod: 6,
    falloff: 0.25,
    zoffIncrementSize: 0.1,
  });
</script>

<main class="mx-auto max-w-[none] text-center">
  <article>
    <Sketch name="00-2DperlinNoise" data={perlin2DData} />
    <input
      type="range"
      min="0.001"
      max="1"
      step="0.001"
      bind:value={perlin2DData.xoffIncrementSize}
    />
    <input
      type="range"
      min="0.001"
      max="1"
      step="0.001"
      bind:value={perlin2DData.yoffIncrementSize}
    />
    <input type="range" min="0" max="20" step="0.1" bind:value={perlin2DData.lod} />
    <input type="range" min="0" max="3" step="0.025" bind:value={perlin2DData.falloff} />
    <input type="range" min="0" max="1" step="0.02" bind:value={perlin2DData.zoffIncrementSize} />
  </article>

  <article>
    <Sketch name="00perlinMandala" data={perlinMandala} />

    <input type="range" min="1" max="120" bind:value={perlinMandala.frameRate} />
    <input type="range" min="1" max="100" bind:value={perlinMandala.amount} />
    <input type="range" min="0" max="1" step="0.05" bind:value={perlinMandala.strokeWeight} />
    <input type="checkbox" bind:checked={perlinMandala.enableDarken} />
    <input type="checkbox" bind:checked={perlinMandala.enableTurning} />
    <div>FrameRate: {perlinMandala.frameRate}</div>
    <div>Amount: {perlinMandala.amount}</div>
    <div>strokeWeight: {perlinMandala.strokeWeight}</div>
    <div>enableDarken: {perlinMandala.enableDarken}</div>
    <div>enableTurning: {perlinMandala.enableTurning}</div>
  </article>

  <article class="py-3">
    <Sketch name="00gaussPaintSlatter" data={gausPaintSplatterData} />
    <input type="range" min="0" max="300" bind:value={gausPaintSplatterData.coordinateSd} />
    <input type="range" min="0" max="200" bind:value={gausPaintSplatterData.colorSd} />
    <div>
      Coordinate Standard Deviation: {gausPaintSplatterData.coordinateSd}
    </div>
    <div>
      Color Standard Deviation: {gausPaintSplatterData.colorSd}
    </div>
  </article>

  <article>
    <Sketch name="00gaussiandistribution" />
  </article>

  <article>
    <Sketch name="00randomNumberDistribution" />
  </article>

  <article>
    <Sketch name="00randomwalker" data={sketch3ControlsData} />
  </article>

  <article>
    <Sketch
      name="sketch3"
      data={sketch3ControlsData}
      onUpdate={updateSketch3Controls as (data: { [key: string]: any }) => void}
    />
    <input type="range" min="0" max="600" bind:value={sketch3ControlsData.x} />
    <input type="range" min="0" max="100" bind:value={sketch3ControlsData.y} />
    <p>(x,y): ({sketch3ControlsData.x},{sketch3ControlsData.y})</p>
    <label>
      Color:
      <input type="color" bind:value={sketch3ControlsData.color} />
    </label>
  </article>

  <h1 class="text-7xl font-thin uppercase">SVELTE + P5JS <small>Examples</small></h1>
  <p>P5JS Component within a Svelte App, including TypeScript.</p>

  <!-- <Sketch name="sketch1" />
  <Sketch name="sketch2" /> -->
</main>
