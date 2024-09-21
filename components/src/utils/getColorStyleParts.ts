import type { Hue } from '@/src/tokens'

export const getColorStyleParts = (colorStyle: string) => {
  const matches = colorStyle.match('^(blue|green|yellow|red|orange|indingo|pink|purple|grey)?(Primary|Secondary)?$')
  const baseColor = (matches?.[1] || 'accent') as Hue
  const baseTheme = (matches?.[2] || 'Primary') as 'Primary' | 'Secondary'
  return [baseColor, baseTheme] as [Hue, 'Primary' | 'Secondary']
}
