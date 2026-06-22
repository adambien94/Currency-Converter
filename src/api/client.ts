const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

type QueryParams = Record<string, unknown>

function buildUrl(endpoint: string, params: QueryParams = {}): string {
  const searchParams = new URLSearchParams({ api_key: API_KEY })
  for (const [key, value] of Object.entries(params)) {
    searchParams.set(key, String(value))
  }

  return `${BASE_URL}${endpoint}?${searchParams}`
}

export async function apiFetch<T>(
  endpoint: string,
  params?: QueryParams,
  errorMessage = 'Request failed.',
): Promise<T> {
  const res = await fetch(buildUrl(endpoint, params))
  if (!res.ok) throw new Error(errorMessage)
  return res.json() as Promise<T>
}
