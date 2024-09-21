import { type Hue, PRIMARY_COLORS, lightColors, darkColors } from './color'

const GRADIENT_COLORS = [
  'accent',
  'blue',
  'purple',
  'red',
  'green',
  'grey',
] as const

type GradientColor = (typeof GRADIENT_COLORS)[number]

export type ColorStyleBase = `${Hue}Primary` | `${Hue}Secondary` | 'transparent' | 'disabled' | 'background'

type ColorStyleType = 'Text' | 'Background' | 'Border' | 'Hover'

type ColorStyles = `${ColorStyleBase}${ColorStyleType}`

const makeColorStyles = (colors: typeof lightColors): { [key in ColorStyles]: string } => {
  const colorStyles = PRIMARY_COLORS.flatMap((color) => {
    return [
      [`${color}PrimaryText`, colors.backgroundPrimary],
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

const makeColorStyleMap = () => {
  const primaryStyles = Object.fromEntries(
    PRIMARY_COLORS.map(color => [
      `${color}Primary`,
      {
        text: `$backgroundPrimary`,
        background: `$${color}Primary`,
        border: 'transparent',
        hover: `$${color}Bright`,
      },
    ]),
  ) as {
    [key in `${Hue}Primary`]: any
  }
  const secondaryStyles = Object.fromEntries(
    PRIMARY_COLORS.map(color => [
      `${color}Secondary`,
      {
        text: `$${color}Primary`,
        background: `$${color}Surface`,
        border: 'transparent',
        hover: `$${color}Light`,
      },
    ]),
  ) as {
    [key in `${Hue}Secondary`]: any
  }

  const gradientValues = Object.fromEntries(
    GRADIENT_COLORS.map(color => [
      `${color}Gradient`,
      {
        text: `$backgroundPrimary`,
        background: `$${color}Gradient`,
        border: 'transparent',
        hover: `$${color}Gradient`,
      },
    ]),
  ) as {
    [key in `${GradientColor}Gradient`]: any
  }

  const transparent = {
    text: 'initial',
    background: 'transparent',
    border: 'transparent',
    hover: 'greyLight',
  } as const

  const disabled = {
    text: 'greyPrimary',
    background: 'greyLight',
    border: 'greyLight',
    hover: 'greyLight',
  } as const

  const background = {
    text: 'textPrimary',
    background: 'backgroundPrimary',
    border: 'border',
    hover: 'backgroundSecondary',
  } as const

  return {
    ...primaryStyles,
    ...secondaryStyles,
    ...gradientValues,
    transparent,
    disabled,
    background,
  }
}

const colorStyleMap = makeColorStyleMap()

type ColorStyle = keyof ReturnType<typeof makeColorStyleMap>
type ColorStyleProperty = 'text' | 'background' | 'border' | 'hover'
export const getColorStyle = (
  colorStyle: ColorStyle,
  property: ColorStyleProperty,
) => colorStyleMap[colorStyle]?.[property] || 'redPrimary'

export const lightColorStyles = makeColorStyles(lightColors)
export const darkColorStyles = makeColorStyles(darkColors)

export const colorStyles = {
  light: lightColorStyles,
  dark: darkColorStyles,
}
