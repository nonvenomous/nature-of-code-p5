<script lang="ts">
  import ChapterNav from '$lib/ChapterNav.svelte';

  const chapterNumber = 2;
  const chapterLinks = [
    'exercise2.1',
    'example2.2',
    'example2.4',
    'example2.5',
    'gravitationalAttractors',
    'twoBodyAttraction',
    'exercise2.15',
    'spiralGalaxy',
  ];
</script>

<main class="mx-auto max-w-4xl px-6 py-8 text-center text-neutral-200">
  <slot />
</main>

<ChapterNav {chapterNumber} links={chapterLinks} />
