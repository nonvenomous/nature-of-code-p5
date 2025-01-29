<script lang="ts" generics="T extends Record<string, unknown>">
  import p5 from 'p5';

  const { sketchFunction, data, onUpdate } = $props<{
    sketchFunction: (p: p5, p5Instance: typeof p5, data: T, onUpdate: (data: T) => void) => void;
    data?: T;
    onUpdate?: (data: T) => void;
  }>();

  const localData = data ?? ({} as T);
  const localOnUpdate = onUpdate ?? (() => {});

  let p5Instance: p5 | null = null;
  const sketchId: string = Math.random().toString(36).substring(2);
  let isRunning = $state(true);
  let isPaused = $state(false);

  $effect(() => {
    getInstance();
    return () => {
      p5Instance?.remove();
    };
  });

  function getInstance(): void {
    const sketchCanvas = document.getElementById(`canvas-${sketchId}`);
    if (!sketchCanvas) throw new Error('Sketch canvas not found');

    p5Instance = new p5((p) => sketchFunction(p, p5, localData, localOnUpdate), sketchCanvas);
  }

  function togglePause(): void {
    if (!p5Instance) return;
    isPaused = !isPaused;
    if (isRunning && !isPaused) {
      p5Instance.loop();
    } else {
      p5Instance.noLoop();
    }
  }

  function resetSketch(): void {
    if (!p5Instance) return;
    isRunning = false;
    isPaused = false;
    p5Instance.remove();
    getInstance();
    setTimeout(() => {
      isRunning = true;
    }, 0);
  }
</script>

<div>
  <div class="mb-1 flex justify-center" id={`canvas-${sketchId}`}></div>
  <div>
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
  </div>
</div>
