const SMALL_VALUE_THRESHOLD = 0.01

function getDecimals(value: number): number {
  const abs = Math.abs(value)
  if (abs > 0 && abs < SMALL_VALUE_THRESHOLD) {
    return 3
  }
  return 2
}

export function roundAdaptive(value: number): number {
  return Number(value.toFixed(getDecimals(value)))
}

export function formatAdaptive(value: number): string {
  return value.toFixed(getDecimals(value)).replace('.', ',')
}

export function useAdaptiveNumberFormat() {
  return {
    round: roundAdaptive,
    format: formatAdaptive,
  }
}
