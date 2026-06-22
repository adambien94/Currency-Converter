import { apiFetch } from './client'
import type { ConvertResponse, ConvertResult } from '@/types/api'

const ENDPOINT = '/convert'

export async function convertCurrencies(
  from: string,
  to: string,
  amount: number,
): Promise<ConvertResult> {
  const data = await apiFetch<ConvertResponse>(
    ENDPOINT,
    { from, to, amount },
    'Failed to convert currencies.',
  )
  return data.response
}
