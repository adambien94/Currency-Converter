import type { ConvertResponse, ConvertResult } from '@/types/api'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY
const ENDPOINT = '/convert'

export async function convertCurrencies(
  from: string,
  to: string,
  amount: number,
): Promise<ConvertResult> {
  const res = await fetch(
    `${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`,
  )
  if (!res.ok) throw new Error('Failed to convert currencies.')
  const data = (await res.json()) as ConvertResponse
  return data.response
}
