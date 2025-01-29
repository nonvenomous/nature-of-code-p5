<script>
  import '../app.css';
</script>

<div class="flex min-h-screen flex-col bg-neutral-900 text-neutral-200">
  <!-- Navbar -->
  <nav class="flex items-center justify-between bg-neutral-800 px-6 py-4 shadow-md">
    <a href="/" class="text-2xl font-bold text-neutral-300 hover:underline">Nature of Code</a>
    <div class="space-x-4">
      <a href="/chapter/0/unsorted" class="text-neutral-400 hover:text-neutral-100">Unsorted</a>
      <a href="/chapter/0/perlinElevation" class="text-neutral-400 hover:text-neutral-100"
        >Perlin Elevation</a
      >
      <a href="/chapter/1" class="text-neutral-400 hover:text-neutral-100">Chapter 1</a>
      <a href="/chapter/2" class="text-neutral-400 hover:text-neutral-100">Chapter 2</a>
    </div>
  </nav>

  <!-- Page Content -->
  <main class="flex-1">
    <slot />
  </main>
</div>
