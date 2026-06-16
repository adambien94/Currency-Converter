import type { Currency, CurrenciesResponse } from '@/types/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const ENDPOINT = '/currencies'
const API_KEY = import.meta.env.VITE_API_KEY

export async function getCurrencies(): Promise<Currency[]> {
  const res = await fetch(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}`)
  if (!res.ok) throw new Error('Failed to fetch currencies')
  const data = (await res.json()) as CurrenciesResponse
  return data.response.sort((a, b) => a.name.localeCompare(b.name))
}
