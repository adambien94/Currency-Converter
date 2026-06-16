<template>
  <div class="mb-5">
    <p class="text-base">1 {{ fromCurrencyName }} to w przeliczeniu</p>
    <h1 class="text-3xl font-semibold mt-2 mb-3">
      {{ multiplier.toFixed(2).replace('.', ',') }} {{ toCurrencyName }}
    </h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  multiplier: number
  fromCurrencyName: string | undefined
  toCurrencyName: string | undefined
}>()
</script>
