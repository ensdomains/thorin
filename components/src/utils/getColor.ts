import { DefaultTheme, WithColor } from '../types/index'

const GRADIENT_SUPPORT = ['blue', 'green', 'red', 'purple', 'grey'] as const

type GradientColor = typeof GRADIENT_SUPPORT[number]

type ColorFunc = (
  theme: DefaultTheme,
  color: WithColor['color'],
  chroma?: WithColor['chroma'],
  type?: 'text' | 'background' | 'border' | 'hover',
) => string

const getBackgroundColor: ColorFunc = (
  theme,
  color = 'blue',
  chroma = 'primary',
) => {
  if (chroma === 'transparent') return 'transparent'
  if (color === 'background') return theme.colors.background
  if (
    chroma === 'gradient' &&
    GRADIENT_SUPPORT.includes(color as GradientColor)
  ) {
    const gradientColor = color as GradientColor
    return theme.colors.gradients[gradientColor]
  }
  if (chroma === 'secondary') return theme.colors[`${color}Surface`]
  return theme.colors[`${color}Primary`]
}

const getTextColor: ColorFunc = (theme, color = 'blue', chroma = 'primary') => {
  if (color === 'background') return theme.colors[`greyPrimary`]
  if (chroma === 'primary') return theme.colors.textAccent
  if (chroma === 'secondary') return theme.colors[`${color}Primary`]
  return theme.colors.textAccent
}

const getBorderColor: ColorFunc = (theme, color = 'blue') => {
  if (color === 'background') return theme.colors.border
  return 'transparent'
}

const getHoverColor: ColorFunc = (
  theme,
  color = 'blue',
  chroma = 'primary',
) => {
  if (color === 'background')
    return chroma === 'secondary'
      ? theme.colors.backgroundPrimary
      : theme.colors.backgroundSecondary
  return theme.colors[`${color}Bright`]
}

export const getColor = (
  theme: DefaultTheme,
  color: WithColor['color'],
  chroma: WithColor['chroma'],
  type: 'text' | 'background' | 'border' | 'hover',
) => {
  if (type === 'text') return getTextColor(theme, color, chroma)
  if (type === 'border') return getBorderColor(theme, color, chroma)
  if (type === 'hover') return getHoverColor(theme, color, chroma)
  return getBackgroundColor(theme, color, chroma)
}

// export const getPresetColor = (theme: DefaultTheme, preset: '', type: '') => {
//   if (preset === 'primary') return getColor(theme, 'blue', 'primary', type)
//   if (preset === 'primarySecondary')
//     return getColor(theme, 'blue', 'secondary', type)
//   if (preset === 'error') return getColor(theme, 'red', 'primary', type)
//   if (preset === 'errorSecondary')
//     return getColor(theme, 'red', 'secondary', type)
//   if (preset === 'subtle') return getColor(theme, 'grey', 'primary', type)
//   return getColor(theme, 'grey', 'secondary', type)
// }
