<!-- Sketch.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import p5 from 'p5';

  export let name: string;
  export let data: { [key: string]: any } = {};
  export let onUpdate: (data: { [key: string]: any }) => void = () => {};

  let p5Instance: p5;
  let sketchId: string = Math.random().toString(36).substring(7); // You can change this for a uuidv4 !
  let isRunning: boolean = true;
  let isPaused: boolean = false;

  onMount(async () => await getInstance());

  onDestroy(() => p5Instance.remove());

  let getInstance = async () => {
    // get sketch to render
    const sketches = import.meta.glob(`$lib/sketches/*.ts`, { eager: true });
    // console.log('🚀 ~ getInstance ~ sketches:', sketches);
    // console.log(`Loading: ${`/src/lib/sketches/${name}.ts`}`);
    // @ts-ignore
    const sketch = sketches[`/src/lib/sketches/${name}.ts`].default;

    const sketchCanvas = document.getElementById(`canvas-${sketchId}`);
    if (!sketchCanvas) throw new Error('sketchCanvas missing');

    // console.log('sketch', sketch);
    p5Instance = new p5((p: p5) => sketch(p, p5, data, onUpdate), sketchCanvas);
  };

  let togglePause = () => {
    isPaused = !isPaused;
    if (isRunning && !isPaused) {
      p5Instance.loop();
      return;
    }
    p5Instance.noLoop();
  };

  let resetSketch = () => {
    isRunning = false;
    isPaused = false;
    p5Instance.remove();
    getInstance();
    setTimeout(() => (isRunning = true), 0);
  };
</script>

<div>
  <p>{name}</p>

  <div class="mb-1 flex justify-center" id={`canvas-${sketchId}`}></div>
  <div>
    <button class="bg-gray-800 text-gray-100" on:click={togglePause}>
      {isPaused ? 'Resume' : 'Pause'}
    </button>
    <button class="bg-gray-800 text-gray-100" on:click={resetSketch}>Reset</button>
  </div>
</div>
