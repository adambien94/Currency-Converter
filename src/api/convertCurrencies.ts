import type { ConvertResponse } from '@/types/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const ENDPOINT = '/convert'
const API_KEY = import.meta.env.VITE_API_KEY

export async function convertCurrencies(
  from: string,
  to: string,
  amount: number,
): Promise<ConvertResponse> {
  const res = await fetch(
    `${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`,
  )
  if (!res.ok) throw new Error('Failed to fetch currencies')
  return res.json() as Promise<ConvertResponse>
}
