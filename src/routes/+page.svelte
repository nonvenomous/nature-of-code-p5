<script lang="ts">
  import Sketch from './Sketch.svelte';

  // Sketch 3 lets you update the circle's position and color with HTML controls
  let sketch3ControlsData: { [key: string]: any } = {
    x: 50,
    y: 50,
    color: 'rgba(255, 0, 0, 0.5)',
  };

  let sketch: any;

  // Sketch 3 lets you update the HTML controls values from the running P5JS script
  const updateSketch3Controls = (data: { [key: string]: any }) => {
    sketch3ControlsData.x = data.x;
    sketch3ControlsData.y = data.y;
  };
</script>

<main class="relative">
  <h1>SVELTE + P5JS <small>Sketchs</small></h1>
  <p>P5JS Component within a Svelte App, including TypeScript.</p>

  <Sketch name="sketch1" />
  <Sketch name="sketch2" />
  <Sketch name="sketch3" data={sketch3ControlsData} onUpdate={updateSketch3Controls} />
  <input type="range" min="0" max="600" bind:value={sketch3ControlsData.x} />
  <input type="range" min="0" max="100" bind:value={sketch3ControlsData.y} />
  <p>(x,y): ({sketch3ControlsData.x},{sketch3ControlsData.y})</p>
  <label>
    Color:
    <input type="color" bind:value={sketch3ControlsData.color} />
  </label>

  <notice>P5 Instance mode with access to P5 Global mode functions</notice>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  notice {
    color: #ff3e00;
    font-size: 0.9em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
