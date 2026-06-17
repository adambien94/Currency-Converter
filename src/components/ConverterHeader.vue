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
import { useFormatNumber } from '@/composables/useFormatNumber'
import type { Currency } from '@/types/api'

const { formatStrNumber } = useFormatNumber()

const props = defineProps<{
  multiplier: number
  fromCurrency: Currency
  toCurrency: Currency
}>()

const fromCurrencyInfo = computed(() => {
  const currency = props.fromCurrency

  return currency.symbol_first
    ? `${currency.symbol}1 is equivalent`
    : `1${currency.symbol} is equivalent`
})

const toCurrencyInfo = computed(() => {
  const currency = props.toCurrency
  const formattedAmount = formatStrNumber(props.multiplier)

  return currency.symbol_first
    ? `${currency.symbol}${formattedAmount}`
    : `${formattedAmount}${currency.symbol}`
})
</script>
