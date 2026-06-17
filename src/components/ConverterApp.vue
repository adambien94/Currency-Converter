<template>
  <div
    v-if="error && !isDataFetched"
    class="flex h-screen flex-col items-center justify-center p-4"
    role="alert"
    aria-live="assertive"
  >
    <p class="text-center text-red-400">{{ error }}</p>
  </div>
  <div
    v-else-if="isDataFetched"
    class="flex h-screen flex-col items-center justify-center p-4"
    aria-label="Currency converter"
  >
    <div class="lg:w-94 w-full max-w-94">
      <p v-if="error" class="mb-4 text-center text-red-400" role="alert" aria-live="assertive">
        {{ error }}
      </p>
      <ConverterHeader
        :multiplier="multiplier"
        :fromCurrency="fromCurrency!"
        :toCurrency="toCurrency!"
      />
      <div
        class="flex flex-col items-start justify-center gap-4"
        role="group"
        aria-label="Currency conversion fields"
      >
        <ConverterInput
          field-prefix="from"
          v-model:amount="convertedFromAmount"
          :currency="fromCurrency"
          :currencies="currencies"
          group-aria-label="Source amount"
          amount-aria-label="Amount to convert"
          currency-aria-label="Source currency"
          @updateCurrency="setFromCurrency"
        />
        <ConverterInput
          field-prefix="to"
          v-model:amount="convertedToAmount"
          :currency="toCurrency"
          :currencies="currencies"
          group-aria-label="Target amount"
          amount-aria-label="Converted amount"
          currency-aria-label="Target currency"
          @updateCurrency="setToCurrency"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ConverterInput from './ConverterInput.vue'
import ConverterHeader from './ConverterHeader.vue'
import { useCurrencyConverter } from '@/composables/useCurrencyConverter'

const {
  currencies,
  fromCurrency,
  toCurrency,
  multiplier,
  convertedFromAmount,
  convertedToAmount,
  error,
  setFromCurrency,
  setToCurrency,
  init,
} = useCurrencyConverter()

const isDataFetched = computed(
  () => Array.isArray(currencies.value) && currencies.value.length > 0 && !!multiplier.value,
)

await init()
</script>
