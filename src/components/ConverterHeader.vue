<script setup lang="ts">
defineProps<{
  multiplier: number
}>()
</script>

<template>
  <div class="mb-5">
    <p class="text-base">1 Złoty to w przeliczeniu</p>
    <h1 class="text-3xl font-semibold mt-2 mb-3">
      {{ multiplier.toFixed(2).replace('.', ',') }} Euro
    </h1>
  </div>
</template>
