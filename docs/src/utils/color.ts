import type { RawColor } from '@ensdomains/thorin'

export const rawColorToRGBA = (color: RawColor, opacity = 1): string =>
  `rgba(${[...color, opacity].join(', ')})`

export const rawColorToHex = (color: RawColor): string => {
  return `#${color.map(c => c.toString(16)).join('')}`
}

export const rawColorToHSL = ([r, g, b]: RawColor): string => {
  r /= 255
  g /= 255
  b /= 255
  const l = Math.max(r, g, b)
  const s = l - Math.min(r, g, b)
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
    : 0
  const rawHsl = [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ]

  return `hsl(${rawHsl[0].toFixed(0)}, ${rawHsl[1].toFixed(
    0,
  )}%, ${rawHsl[2].toFixed(0)}%)`
}
