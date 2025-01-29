<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import p5 from 'p5';

  export let name: string;
  export let omitControls = false;
  export let data: { [key: string]: any } = {};
  export let onUpdate: (data: { [key: string]: any }) => void = () => {};

  let p5Instance: p5;
  let sketchId: string = Math.random().toString(36).substring(7);
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
  {#if !omitControls}
    <p>{name}</p>
  {/if}

  <div class="mb-1 flex justify-center" id={`canvas-${sketchId}`}></div>
  {#if !omitControls}
    <button
      class="rounded-lg bg-neutral-700 px-4 py-2 font-semibold text-neutral-100 transition
       hover:bg-neutral-600 focus:ring-2 focus:ring-neutral-500 active:scale-95"
      onclick={togglePause}
    >
      {isPaused ? 'Resume' : 'Pause'}
    </button>

    <button
      class="rounded-lg bg-red-700 px-4 py-2 font-semibold text-neutral-100 transition
       hover:bg-red-600 focus:ring-2 focus:ring-red-500 active:scale-95"
      onclick={resetSketch}
    >
      Reset
    </button>
  {/if}
</div>
