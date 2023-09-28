const BASE_COLORS = [
  'accent',
  'blue',
  'indigo',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'grey',
] as const

type BaseColor = typeof BASE_COLORS[number]

const GRADIENT_COLORS = ['blue', 'purple', 'red', 'green', 'grey'] as const

type GradientColor = typeof GRADIENT_COLORS[number]

const makeColorStyleMap = () => {
  const primaryStyles = Object.fromEntries(
    BASE_COLORS.map((color) => [
      `${color}Primary`,
      {
        text: `$backgroundPrimary`,
        background: `$${color}Primary`,
        border: 'transparent',
        hover: `$${color}Bright`,
      },
    ]),
  ) as {
    [key in `${BaseColor}Primary`]: any
  }
  const secondaryStyles = Object.fromEntries(
    BASE_COLORS.map((color) => [
      `${color}Secondary`,
      {
        text: `$${color}Primary`,
        background: `$${color}Surface`,
        border: 'transparent',
        hover: `$${color}Light`,
      },
    ]),
  ) as {
    [key in `${BaseColor}Secondary`]: any
  }

  const gradientValues = Object.fromEntries(
    GRADIENT_COLORS.map((color) => [
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

  const transparent: any = {
    text: 'initial',
    background: 'transparent',
    border: 'transparent',
    hover: '$greyLight',
  } as const

  const disabled: any = {
    text: '$greyPrimary',
    background: '$greyLight',
    border: '$greyLight',
    hover: '$greyLight',
  } as const

  const background: any = {
    text: '$textPrimary',
    background: '$backgroundPrimary',
    border: '$border',
    hover: '$backgroundSecondary',
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
) => colorStyleMap[colorStyle][property]
