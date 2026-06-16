<script setup lang="ts">
const amount = defineModel<number>('amount', { required: true })

defineProps<{
  currency: string
}>()
</script>

<template>
  <div
    class="flex w-full items-center justify-between focus-within:outline-1 focus-within:outline-red-300 border border-neutral-700 bg-neutral-900 rounded-xl overflow-hidden relative"
  >
    <div class="w-2/5">
      <input type="number" v-model="amount" class="mr-2 outline-none w-full" />
    </div>
    <div class="currency-select-wrapper flex-1 relative">
      <select
        class="currency-select w-full text-right outline-none focus:bg-neutral-950 appearance-none"
      >
        <option :value="currency" class="text-neutral-400">{{ currency }}</option>
      </select>
    </div>
  </div>
</template>

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
