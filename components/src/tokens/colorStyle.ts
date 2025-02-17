import { type Hue, PRIMARY_COLORS, lightColors, darkColors } from './color'

export type ColorStyleBase = `${Hue}Primary` | `${Hue}Secondary` | 'transparent' | 'disabled' | 'background'

type ColorStyleType = 'Text' | 'Background' | 'Border' | 'Hover'

type ColorStyles = `${ColorStyleBase}${ColorStyleType}`

const makeColorStyles = (colors: typeof lightColors, theme: 'dark' | 'light'): { [key in ColorStyles]: string } => {
  const colorStyles = PRIMARY_COLORS.flatMap((color) => {
    return [
      [`${color}PrimaryText`, theme === 'dark' ? colors.textPrimary : colors.backgroundPrimary],
      [`${color}PrimaryBackground`, colors[`${color}Primary`]],
      [`${color}PrimaryBorder`, 'transparent'],
      [`${color}PrimaryHover`, colors[`${color}Bright`]],
      [`${color}SecondaryText`, colors[`${color}Primary`]],
      [`${color}SecondaryBackground`, colors[`${color}Surface`]],
      [`${color}SecondaryBorder`, 'transparent'],
      [`${color}SecondaryHover`, colors[`${color}Light`]],
    ]
  })

  const additionalColorStyles = [
    ['transparentText', 'initial'],
    ['transparentBackground', 'transparent'],
    ['transparentBorder', 'transparent'],
    ['transparentHover', colors.greyLight],
    ['disabledText', colors.greyPrimary],
    ['disabledBackground', colors.greyLight],
    ['disabledBorder', colors.greyLight],
    ['disabledHover', colors.greyLight],
    ['backgroundText', colors.textPrimary],
    ['backgroundBackground', colors.backgroundPrimary],
    ['backgroundBorder', colors.border],
    ['backgroundHover', colors.backgroundSecondary],
  ]

  return Object.fromEntries([...colorStyles, ...additionalColorStyles])
}

export const lightColorStyles = makeColorStyles(lightColors, 'light')
export const darkColorStyles = makeColorStyles(darkColors, 'dark')

export const colorStyles = {
  light: lightColorStyles,
  dark: darkColorStyles,
}
