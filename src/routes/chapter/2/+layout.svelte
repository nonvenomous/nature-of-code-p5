<script lang="ts">
  const chapterLinks = ['exercise2.1', 'example2.2', 'example2.4'] as const;
</script>

<main class="mx-auto max-w-[none] text-center">
  <slot></slot>
</main>

<footer class="flex-shrink-0 bg-gray-700 p-4">
  Chapter 2 links
  <ol
    class="block list-inside list-disc rounded-lg bg-gray-800 p-4 text-left text-base font-bold text-white"
  >
    {#each chapterLinks as link}
      <li>
        <a href={`/chapter/2/${link}`}>{link}</a>
      </li>
    {/each}
  </ol>
</footer>
