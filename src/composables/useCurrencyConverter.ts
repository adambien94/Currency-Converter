import { ref, computed } from 'vue'
import { getCurrencies } from '@/api/getCurrencies'
import { convertCurrencies } from '@/api/convertCurrencies'
import { roundAdaptive } from '@/composables/useAdaptiveNumberFormat'
import type { Currency } from '@/types/api'

const INIT_FROM_CURRENCY_ID = 147
const INIT_TO_CURRENCY_ID = 46

export function useCurrencyConverter() {
  const fromCurrency = ref<Currency>()
  const toCurrency = ref<Currency>()
  const fromAmount = ref<number>(1)
  const toAmount = ref<number>(0)
  const multiplier = ref<number>(0)
  const currencies = ref<Currency[]>([])

  const convertedFromAmount = computed({
    get: () => fromAmount.value || undefined,
    set: (newVal) => {
      if (newVal === undefined) return
      fromAmount.value = newVal
      toAmount.value = roundAdaptive(newVal * multiplier.value)
    },
  })

  const convertedToAmount = computed({
    get: () => toAmount.value || undefined,
    set: (newVal) => {
      if (newVal === undefined) return
      toAmount.value = newVal
      fromAmount.value = roundAdaptive(newVal / multiplier.value)
    },
  })

  const fetchCurriencyConvertion = async (from: Currency, to: Currency) => {
    const res = await convertCurrencies(from?.short_code!, to?.short_code!, fromAmount.value)
    multiplier.value = res.value / res.amount
    toAmount.value = roundAdaptive(res.value)
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

  const init = async () => {
    await fetchCurrencies()
    await fetchCurriencyConvertion(fromCurrency.value!, toCurrency.value!)
  }

  return {
    currencies,
    fromCurrency,
    toCurrency,
    multiplier,
    convertedFromAmount,
    convertedToAmount,
    uppdateFromCurrency,
    uppdateToCurrency,
    init,
  }
}
