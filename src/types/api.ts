export type Currency = {
  id: number
  code: string
  short_code: string
  name: string
  symbol: string
  symbol_first: boolean
  decimal_mark: string
  thousands_separator: string
  precision: number
  subunit: number
}

export type CurrenciesResponse = {
  meta: {
    code: number
    disclaimer: string
  }
  response: Currency[]
}

export type ConvertResult = {
  timestamp: number
  date: string
  from: string
  to: string
  amount: number
  value: number
}

export type ConvertResponse = {
  meta: {
    code: number
    disclaimer: string
  }
  amount: number
  date: string
  from: string
  response: ConvertResult
}
