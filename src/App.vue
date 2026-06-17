<template>
  <Suspense>
    <ConverterApp />
    <template #fallback>
      <div
        class="flex h-screen flex-col items-center justify-center p-4"
        aria-busy="true"
        aria-label="Loading currency converter"
      >
        <p>Loading…</p>
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import ConverterApp from './components/ConverterApp.vue'
</script>
