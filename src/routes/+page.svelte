<script lang="ts">
  import type { PerlinElevationsData } from '$lib/sketches/00-3DperlinElevations';
  import type { PerlinMandalaData } from '$lib/sketches/00perlinMandala';
  import Sketch from '$lib/SketchLegacy.svelte';

  const perlinMandala: PerlinMandalaData = $state({
    frameRate: 60,
    amount: 8,
    strokeWeight: 0.1,
    enableDarken: true,
    enableTurning: true,
    height: 400,
    width: 400,
  });

  const perlin3DData: PerlinElevationsData = $state({
    height: 400,
    width: 400,
  });
</script>

<main
  class="flex min-h-full flex-col items-center justify-center bg-neutral-900 p-8 text-neutral-200"
>
  <header class="mb-12 text-center">
    <h1 class="text-4xl font-bold tracking-wide text-neutral-100">
      Nature of Code - p5.js Experiments
    </h1>
    <p class="mt-2 text-lg text-neutral-400">
      Creative coding inspired by <a
        href="https://natureofcode.com/"
        class="text-neutral-300 hover:underline">Nature of Code</a
      >.
    </p>
  </header>

  <section class="flex max-w-6xl flex-wrap justify-center gap-6">
    <div class="rounded-xl bg-neutral-800 p-4 shadow-md">
      <Sketch omitControls name="00perlinMandala" data={perlinMandala} />
      <p class="mt-2 text-sm text-neutral-400">Perlin Mandala</p>
    </div>

    <div class="rounded-xl bg-neutral-800 p-4 shadow-md">
      <Sketch omitControls name="00-3DperlinElevations" data={perlin3DData} />
      <p class="mt-2 text-sm text-neutral-400">3D Perlin Elevations</p>
    </div>
  </section>

  <div class="mt-12 text-sm text-neutral-500">
    <p>
      🚀 Built with SvelteKit & Tailwind | <a
        href="https://github.com/nonvenomous/nature-of-code-p5"
        target="_blank"
        rel="noopener noreferrer">Github Repo</a
      >
    </p>
  </div>
</main>
