<script lang="ts">
  import type { PerlinElevationsData } from '$lib/sketches/00-3DperlinElevations';
  import Sketch from '../../../Sketch.svelte';

  const perlin3DData: PerlinElevationsData = $state({});
</script>

<main class="mx-auto max-w-[none] text-center">
  <article>
    <Sketch name="00-3DperlinElevations" data={perlin3DData} />
  </article>
</main>
