const base = (
  functionName: string,
  value: number | string,
  decimals: number,
  unit = '',
) => {
  const _value
    = typeof value === 'number'
      ? `${value.toFixed(decimals)}${unit}`
      : (value as string)
  return `${functionName}(${_value})`
}

export const scale = (value: number | string) => base('scale', value, 1)

export const translateY = (value: number | string) =>
  base('translateY', value, 0, 'px')

export const translateX = (value: number | string) =>
  base('translateX', value, 0, 'px')

export const brightness = (value: number | string) =>
  base('brightness', value, 2)

export const rotate = (value: number | string) =>
  base('rotate', value, 0, 'deg')
