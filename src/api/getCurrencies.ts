import { apiFetch } from './client'
import type { Currency, CurrenciesResponse } from '@/types/api'

const ENDPOINT = '/currencies'

export async function getCurrencies(): Promise<Currency[]> {
  const data = await apiFetch<CurrenciesResponse>(
    ENDPOINT,
    undefined,
    'Failed to fetch currencies.',
  )
  return data.response
}
