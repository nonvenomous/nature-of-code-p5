<script lang="ts">
  export let chapterNumber: number;
  export let links: string[];
</script>

<footer class="mt-8 w-full rounded-lg bg-neutral-800 p-6 text-center text-neutral-300">
  <h2 class="text-lg font-semibold text-neutral-100">Chapter {chapterNumber} Navigation</h2>
  <nav class="mt-4 flex flex-wrap justify-center gap-4">
    {#each links as link}
      <a
        href={`/chapter/${chapterNumber}/${link}`}
        class="rounded-lg bg-neutral-700 px-3 py-2 text-neutral-300 transition hover:bg-neutral-600"
      >
        {link.replace(/([a-z])([A-Z])/g, '$1 $2')}
      </a>
    {/each}
  </nav>
</footer>
