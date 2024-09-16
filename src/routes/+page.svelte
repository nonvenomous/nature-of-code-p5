<script lang="ts">
  import type { GaussSplatterData } from '$lib/sketches/00gaussPaintSlatter';
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
</script>

<main class="mx-auto max-w-[none] text-center">
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
