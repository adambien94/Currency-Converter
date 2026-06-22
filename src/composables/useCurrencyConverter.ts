import { ref, computed } from 'vue'
import { getCurrencies } from '@/api/getCurrencies'
import { convertCurrencies } from '@/api/convertCurrencies'
import { useFormatNumber } from '@/composables/useFormatNumber'
import type { Currency, ConvertResult } from '@/types/api'

const INIT_FROM_CURRENCY_CODE = 'EUR'
const INIT_TO_CURRENCY_CODE = 'USD'
const INITIAL_AMOUNT = 1

export function useCurrencyConverter() {
  const fromCurrency = ref<Currency>()
  const toCurrency = ref<Currency>()
  const fromAmount = ref<number>(1)
  const toAmount = ref<number>(0)
  const multiplier = ref<number>(0)
  const currencies = ref<Currency[]>([])
  const error = ref<string | null>(null)

  const { roundNumber } = useFormatNumber()

  const convertedFromAmount = computed({
    get: () => fromAmount.value || undefined,
    set: (newVal) => {
      if (newVal === undefined) return
      fromAmount.value = newVal
      toAmount.value = roundNumber(newVal * multiplier.value)
    },
  })

  const convertedToAmount = computed({
    get: () => toAmount.value || undefined,
    set: (newVal) => {
      if (newVal === undefined) return
      toAmount.value = newVal
      fromAmount.value = roundNumber(newVal / multiplier.value)
    },
  })

  const fetchCurriencyConvertion = async (from: Currency, to: Currency) => {
    let res: ConvertResult
    try {
      if (!fromAmount.value) {
        res = await convertCurrencies(from.short_code!, to.short_code!, INITIAL_AMOUNT)
        fromAmount.value = INITIAL_AMOUNT
      } else {
        res = await convertCurrencies(from.short_code!, to.short_code!, fromAmount.value)
      }
      multiplier.value = res.value / res.amount
      toAmount.value = roundNumber(res.value)
    } catch (e) {
      error.value = handleError(e)
    }
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
    currencies.value = res.sort((a, b) => a.name.localeCompare(b.name))
    setInitCurrencies()
  }

  const setFromCurrency = async (currencyId: number) => {
    const currency = currencies.value.find(({ id }) => id === currencyId)
    if (!currency) return
    await fetchCurriencyConvertion(currency, toCurrency.value!)
    fromCurrency.value = currency
  }

  const setToCurrency = async (currencyId: number) => {
    const currency = currencies.value.find(({ id }) => id === currencyId)
    if (!currency) return
    await fetchCurriencyConvertion(fromCurrency.value!, currency)
    toCurrency.value = currency
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
    setFromCurrency,
    setToCurrency,
    init,
  }
}
