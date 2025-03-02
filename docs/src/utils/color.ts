/* eslint-disable @typescript-eslint/no-unused-vars */
export const RGBtoRGBA = (color: string, opacity = 1): string =>
  color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`)

const colorToRgb = (color: string): [number, number, number, boolean] => {
  const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return [0, 0, 0, false]
  const [_, r, g, b] = (match).map(x => Number.parseInt(x))
  return [r, g, b, true]
}

export const RGBtoHex = (color: string): [string, boolean] => {
  const [r, g, b, isRgb] = colorToRgb(color)
  return [`#${(+r).toString(16).padStart(2, '0')}${(+g).toString(16).padStart(2, '0')}${(+b).toString(16).padStart(2, '0')}`, isRgb]
}

export const RGBToHSL = (color: string): string => {
  let [r, g, b] = colorToRgb(color)
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
