<template>
  <main
    v-if="Array.isArray(currencies) && currencies.length > 0 && !!multiplier"
    class="flex h-screen flex-col items-center justify-center p-4"
    aria-label="Przelicznik walut"
  >
    <div class="lg:w-94 w-full max-w-94">
      <ConverterHeader
        :multiplier="multiplier"
        :fromCurrencyName="fromCurrency?.name"
        :toCurrencyName="toCurrency?.name"
      />
      <div
        class="flex flex-col items-start justify-center gap-3"
        role="group"
        aria-label="Pola konwersji walut"
      >
        <CoverterInput
          field-prefix="from"
          v-model:amount="convertedFromAmount"
          :currency="fromCurrency"
          :currencies="currencies"
          group-aria-label="Kwota źródłowa"
          amount-aria-label="Kwota do przeliczenia"
          currency-aria-label="Waluta źródłowa"
          @updateCurrency="uppdateFromCurrency"
        />
        <CoverterInput
          field-prefix="to"
          v-model:amount="convertedToAmount"
          :currency="toCurrency"
          :currencies="currencies"
          group-aria-label="Kwota docelowa"
          amount-aria-label="Przeliczona kwota"
          currency-aria-label="Waluta docelowa"
          @updateCurrency="uppdateToCurrency"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CoverterInput from './components/CoverterInput.vue'
import ConverterHeader from './components/ConverterHeader.vue'
import { useCurrencyConverter } from '@/composables/useCurrencyConverter'

const {
  currencies,
  fromCurrency,
  toCurrency,
  multiplier,
  convertedFromAmount,
  convertedToAmount,
  uppdateFromCurrency,
  uppdateToCurrency,
  init,
} = useCurrencyConverter()

init()
</script>
