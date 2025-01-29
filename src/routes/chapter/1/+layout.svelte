<script lang="ts">
  import ChapterNav from '$lib/ChapterNav.svelte';

  const chapterNumber = 1;
  const chapterLinks = [
    'bouncingBall',
    'randomWalkerVectors',
    'bouncingBall3D',
    'example1.3',
    'example1.5',
    'example1.6',
    'mover',
    'exercise1.5',
    'moverFollowMouse',
    'exercise1.6',
  ];
</script>

<main class="mx-auto max-w-4xl px-6 py-8 text-center text-neutral-200">
  <slot />
</main>

<ChapterNav {chapterNumber} links={chapterLinks} />
