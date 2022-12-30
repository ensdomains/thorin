import { DefaultTheme, WithColor } from '../types/index'

const GRADIENT_SUPPORT = [
  'accent',
  'blue',
  'green',
  'red',
  'purple',
  'grey',
] as const

type GradientColor = typeof GRADIENT_SUPPORT[number]

type ColorType =
  | 'text'
  | 'background'
  | 'border'
  | 'hover'
  | 'hoverFilter'
  | 'active'

type ColorFunc = (
  theme: DefaultTheme,
  scheme?: WithColor['colorScheme'],
  color?: WithColor['color'],
  type?: ColorType,
) => string

type PresetColorFunc = (
  theme: DefaultTheme,
  preset: 'disabled',
  type?: ColorType,
) => string

const getBackgroundColor: ColorFunc = (
  theme,
  scheme = 'primary',
  color = 'blue',
) => {
  if (scheme === 'transparent') return 'transparent'
  if (color === 'background') return theme.colors.background
  if (
    scheme === 'gradient' &&
    GRADIENT_SUPPORT.includes(color as GradientColor)
  ) {
    const gradientColor = color as GradientColor
    return theme.colors.gradients[gradientColor]
  }
  if (scheme === 'secondary') return theme.colors[`${color}Surface`]
  return theme.colors[`${color}Primary`]
}

const getTextColor: ColorFunc = (theme, scheme = 'primary', color = 'blue') => {
  if (color === 'background') return theme.colors[`greyPrimary`]
  if (scheme === 'text') return theme.colors[`${color}Primary`]
  if (scheme === 'primary') return theme.colors.textAccent
  if (scheme === 'secondary') return theme.colors[`${color}Primary`]
  if (scheme === 'transparent') return 'initial'
  if (scheme === 'gradient') return theme.colors.textAccent
  return theme.colors.textPrimary
}

const getBorderColor: ColorFunc = (theme, _, color = 'blue') => {
  if (color === 'background') return theme.colors.border
  return 'transparent'
}

const getHoverColor: ColorFunc = (theme, scheme, color) => {
  if (scheme === 'transparent') return theme.colors.greyBright
  return getBackgroundColor(theme, scheme, color)
}

const getHoverFilter: ColorFunc = (_, scheme = 'primary', color = 'blue') => {
  if (color === 'background') return 'contrast(0.95)'
  if (scheme === 'transparent') return 'contrast(0.95)'
  if (scheme === 'secondary') return 'contrast(0.95)'
  return 'brightness(1.05)'
}

const getTextScheme: ColorFunc = (theme, _, color) => {
  if (color) return theme.colors[`${color}Primary`]
  return 'inherit'
}

export const getColor: ColorFunc = (theme, scheme, color, type) => {
  if (scheme === 'text') return getTextScheme(theme, scheme, color)
  if (type === 'text') return getTextColor(theme, scheme, color)
  if (type === 'border') return getBorderColor(theme, scheme, color)
  if (type === 'hoverFilter') return getHoverFilter(theme, scheme, color)
  if (type === 'active') return getHoverFilter(theme, scheme, color)
  if (type === 'hover') return getHoverColor(theme, scheme, color)
  return getBackgroundColor(theme, scheme, color)
}

/** Current preset is only disabled */
export const getPresetColor: PresetColorFunc = (theme, _, type) => {
  if (type === 'text') return theme.colors.greyPrimary
  if (type === 'background') return theme.colors.greyBright
  return 'initial'
}
