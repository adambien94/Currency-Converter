<script setup lang="ts">
import { ref, computed } from 'vue'
import CoverterInput from './components/CoverterInput.vue'

const fromCurrency = ref<string>('Złoty')
const toCurrency = ref<string>('Euro')
const amount = ref<number>(1)
const convertedAmount = ref<number>(0.24)
const multiplier = ref<number>(0.24)

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
</script>

<template>
  <div class="flex h-screen flex-col items-center justify-center p-4">
    <div class="lg:w-94 w-full max-w-94">
      <div class="mb-5">
        <p class="text-base">1 Złoty to w przeliczeniu</p>
        <h1 class="text-3xl font-semibold mt-2 mb-3">{{ multiplier }} Euro</h1>
      </div>

      <div class="flex flex-col items-start justify-center gap-3">
        <CoverterInput v-model:amount="fromAmount" :currency="fromCurrency" />
        <CoverterInput v-model:amount="toAmount" :currency="toCurrency" />
      </div>
    </div>
  </div>
</template>
