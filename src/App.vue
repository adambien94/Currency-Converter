<script setup lang="ts">
import { ref, computed } from 'vue'
import CoverterInput from './components/CoverterInput.vue'
import ConverterHeader from './components/ConverterHeader.vue'
import { getCurrencies } from './api/getCurrencies'
import type { Currency } from './types/api'

const fromCurrency = ref<Currency>()
const toCurrency = ref<Currency>()
const amount = ref<number>(1)
const convertedAmount = ref<number>(0.24)
const multiplier = ref<number>(0.24)
const currencies = ref<Currency[]>([])

const fromAmount = computed({
  get: () => amount.value,
  set: (newVal) => {
    amount.value = newVal
    convertedAmount.value = Number((newVal * multiplier.value).toFixed(2))
  },
})

const toAmount = computed({
  get: () => convertedAmount.value,
  set: (newVal) => {
    convertedAmount.value = newVal
    amount.value = Number((newVal / multiplier.value).toFixed(2))
  },
})

const setDefaultCurrencies = () => {
  fromCurrency.value = currencies.value.find(({ name }) => name === 'Zloty')
  toCurrency.value = currencies.value.find(({ name }) => name === 'Euro')
}

const fetchCurrencies = async () => {
  const res = await getCurrencies()
  currencies.value = res
  setDefaultCurrencies()
}

fetchCurrencies()
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center p-4">
    <div class="lg:w-94 w-full max-w-94">
      <ConverterHeader :multiplier="multiplier" />
      <div class="flex flex-col items-start justify-center gap-3">
        <CoverterInput
          v-model:amount="fromAmount"
          :currency="fromCurrency"
          :currencies="currencies"
        />
        <CoverterInput v-model:amount="toAmount" :currency="toCurrency" :currencies="currencies" />
      </div>
    </div>
  </div>
</template>
