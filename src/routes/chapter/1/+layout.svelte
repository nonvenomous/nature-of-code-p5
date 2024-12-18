<script lang="ts">
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
  ] as const;
</script>

<main class="mx-auto max-w-[none] text-center">
  <slot></slot>
</main>

<footer class="flex-shrink-0 bg-gray-700 p-4">
  Chapter 1 links
  <ol
    class="block list-inside list-disc rounded-lg bg-gray-800 p-4 text-left text-base font-bold text-white"
  >
    {#each chapterLinks as link}
      <li>
        <a href={`/chapter/1/${link}`}>{link}</a>
      </li>
    {/each}
  </ol>
</footer>
