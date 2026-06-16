<template>
  <div
    role="group"
    :aria-label="groupAriaLabel"
    class="flex w-full items-center justify-between focus-within:outline-1 border border-neutral-700 bg-neutral-900 rounded-xl overflow-hidden relative"
  >
    <div class="w-2/5">
      <input
        :id="amountFieldId"
        :name="amountFieldId"
        type="number"
        v-model="amount"
        class="outline-none w-full"
        :aria-label="amountAriaLabel"
      />
    </div>
    <div class="currency-select-wrapper flex-1 relative">
      <select
        :id="currencyFieldId"
        :name="currencyFieldId"
        class="currency-select w-full text-right outline-none focus:bg-neutral-950 appearance-none"
        :value="selectedCurrencyId"
        :aria-label="currencyAriaLabel"
        @change="onCurrencyChange"
      >
        <option v-for="item in currencies" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Currency } from '@/types/api'

const props = defineProps<{
  fieldPrefix: string
  currency: Currency | undefined
  currencies: Currency[]
  groupAriaLabel: string
  amountAriaLabel: string
  currencyAriaLabel: string
}>()

const amount = defineModel<number | undefined>('amount', { required: true })
const emit = defineEmits<{
  (e: 'updateCurrency', currencyId: number): void
}>()

const amountFieldId = computed(() => `${props.fieldPrefix}-amount`)
const currencyFieldId = computed(() => `${props.fieldPrefix}-currency`)

const selectedCurrencyId = computed((): number | undefined => {
  return props.currency?.id
})

const onCurrencyChange = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const id = Number(select.value)

  if (selectedCurrencyId.value !== undefined) {
    select.value = String(selectedCurrencyId.value)
  }

  emit('updateCurrency', id)
}
</script>

<style scoped>
.currency-select-wrapper::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 8px;
  width: 1px;
  height: 27px;
  background: rgba(255, 255, 255, 0.1);
}

.currency-select-wrapper::after {
  content: '';
  display: block;
  position: absolute;
  right: 12px;
  top: 50%;
  width: 6px;
  height: 6px;
  border-left: 2px solid rgba(255, 255, 255, 0.5);
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  transform: translateY(-60%) rotate(-45deg);
}

.currency-select {
  padding-right: 28px;
}
</style>
