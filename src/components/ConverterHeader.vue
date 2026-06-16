<template>
  <div class="mb-5">
    <p class="text-base">{{ fromCurrencyInfo }}</p>
    <h1 class="text-3xl font-semibold mt-2 mb-3">
      {{ toCurrencyInfo }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Currency } from '@/types/api'

const props = defineProps<{
  multiplier: number
  fromCurrency: Currency
  toCurrency: Currency
}>()

const fromCurrencyInfo = computed(() => {
  const currency = props.fromCurrency
  if (currency.symbol_first) {
    return `${currency.symbol}1 to w przeliczeniu`
  }
  return `1${currency.symbol} to w przeliczeniu`
})

const toCurrencyInfo = computed(() => {
  const currency = props.toCurrency
  if (currency.symbol_first) {
    return `${currency.symbol}${props.multiplier.toFixed(2).replace('.', ',')}`
  }
  return `${props.multiplier.toFixed(2).replace('.', ',')}${currency.symbol} `
})
</script>
