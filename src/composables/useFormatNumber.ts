const SMALL_VALUE_THRESHOLD = 0.01

export function useFormatNumber() {
  const getDecimals = (value: number): number => {
    const abs = Math.abs(value)
    if (abs > 0 && abs < SMALL_VALUE_THRESHOLD) {
      return 3
    }
    return 2
  }

  const roundNumber = (value: number): number => {
    return Number(value.toFixed(getDecimals(value)))
  }

  const formatStrNumber = (value: number): string => {
    return value.toFixed(getDecimals(value)).replace('.', ',')
  }

  return {
    roundNumber,
    formatStrNumber,
  }
}
