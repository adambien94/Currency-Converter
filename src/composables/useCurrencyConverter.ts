import { ref, computed } from 'vue'
import { getCurrencies } from '@/api/getCurrencies'
import { convertCurrencies } from '@/api/convertCurrencies'
import { roundAdaptive } from '@/composables/useAdaptiveNumberFormat'
import type { Currency } from '@/types/api'

const INIT_FROM_CURRENCY_CODE = 'EUR'
const INIT_TO_CURRENCY_CODE = 'USD'

export function useCurrencyConverter() {
  const fromCurrency = ref<Currency>()
  const toCurrency = ref<Currency>()
  const fromAmount = ref<number>(1)
  const toAmount = ref<number>(0)
  const multiplier = ref<number>(0)
  const currencies = ref<Currency[]>([])
  const error = ref<string | null>(null)

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
    fromCurrency.value = currencies.value.find(
      ({ short_code }) => short_code === INIT_FROM_CURRENCY_CODE,
    )
    toCurrency.value = currencies.value.find(
      ({ short_code }) => short_code === INIT_TO_CURRENCY_CODE,
    )
  }

  const fetchCurrencies = async () => {
    const res = await getCurrencies()
    currencies.value = res
    setInitCurrencies()
  }

  const updateFromCurrency = async (currencyId: number) => {
    const currency = currencies.value.find(({ id }) => id === currencyId)
    if (!currency) return
    try {
      await fetchCurriencyConvertion(currency, toCurrency.value!)
      fromCurrency.value = currency
      error.value = null
    } catch (e) {
      error.value = handleError(e)
    }
  }

  const uppdateToCurrency = async (currencyId: number) => {
    const currency = currencies.value.find(({ id }) => id === currencyId)
    if (!currency) return
    try {
      await fetchCurriencyConvertion(fromCurrency.value!, currency)
      toCurrency.value = currency
      error.value = null
    } catch (e) {
      error.value = handleError(e)
    }
  }

  const init = async () => {
    try {
      await fetchCurrencies()
      await fetchCurriencyConvertion(fromCurrency.value!, toCurrency.value!)
    } catch (e) {
      error.value = handleError(e)
    }
  }

  const handleError = (e: unknown) => {
    return e instanceof Error ? e.message : 'An unexpected error occurred.'
  }

  return {
    currencies,
    fromCurrency,
    toCurrency,
    multiplier,
    convertedFromAmount,
    convertedToAmount,
    error,
    updateFromCurrency,
    uppdateToCurrency,
    init,
  }
}
