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
const INIT_FROM_CURRENCY_ID = 114
const INIT_TO_CURRENCY_ID = 46

import { ref, computed } from 'vue'
import CoverterInput from './components/CoverterInput.vue'
import ConverterHeader from './components/ConverterHeader.vue'
import { getCurrencies } from './api/getCurrencies'
import { convertCurrencies } from './api/convertCurrencies'
import type { Currency } from './types/api'

const fromCurrency = ref<Currency>()
const toCurrency = ref<Currency>()
const fromAmount = ref<number>(1)
const toAmount = ref<number>(0)
const multiplier = ref<number>(0)
const currencies = ref<Currency[]>([])

const convertedFromAmount = computed({
  get: () => fromAmount.value,
  set: (newVal) => {
    fromAmount.value = newVal
    toAmount.value = Number((newVal * multiplier.value).toFixed(2))
  },
})

const convertedToAmount = computed({
  get: () => toAmount.value,
  set: (newVal) => {
    toAmount.value = newVal
    fromAmount.value = Number((newVal / multiplier.value).toFixed(2))
  },
})

const uppdateFromCurrency = async (currencyId: number) => {
  const currency = currencies.value.find(({ id }) => id === currencyId)
  await fetchCurriencyConvertion(currency!, toCurrency.value!)
  fromCurrency.value = currency
}

const uppdateToCurrency = async (currencyId: number) => {
  const currency = currencies.value.find(({ id }) => id === currencyId)
  await fetchCurriencyConvertion(fromCurrency.value!, currency!)
  toCurrency.value = currency
}

const setInitCurrencies = () => {
  fromCurrency.value = currencies.value.find(({ id }) => id === INIT_FROM_CURRENCY_ID)
  toCurrency.value = currencies.value.find(({ id }) => id === INIT_TO_CURRENCY_ID)
}

const fetchCurrencies = async () => {
  const res = await getCurrencies()
  currencies.value = res
  setInitCurrencies()
}

const fetchCurriencyConvertion = async (from: Currency, to: Currency) => {
  const res = await convertCurrencies(from?.short_code!, to?.short_code!, fromAmount.value)
  multiplier.value = res.value / res.amount
  toAmount.value = Number(res.value.toFixed(2))
}

const init = async () => {
  await fetchCurrencies()
  await fetchCurriencyConvertion(fromCurrency.value!, toCurrency.value!)
}

init()
</script>
