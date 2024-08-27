import { Colors } from '../tokens'
import { colors as colorObj } from '../tokens/color'

type ColorObj = typeof colorObj.light

type ColorMode = keyof typeof colorObj

type ColorGradient = keyof typeof colorObj.light.gradients

const makeColorMap = (mode: ColorMode) => {
  const gradientKeys = Object.keys(
    colorObj[mode]['gradients'],
  ) as ColorGradient[]

  const gradientValues = Object.fromEntries(
    gradientKeys.map((color: ColorGradient) => [
      `${color}Gradient`,
      colorObj[mode]['gradients'][color],
    ]),
  ) as {
    [key in `${ColorGradient}Gradient`]: string
  }

  const colorKeys = Object.keys(colorObj[mode]).filter(
    ([color]) => color !== 'gradients' && color !== 'raw',
  ) as Colors[]

  const colorValues = Object.fromEntries(
    colorKeys.map(color => [color, colorObj[mode][color]]),
  ) as { [key in Colors]: string }

  return {
    ...gradientValues,
    ...colorValues,
    tranparent: 'transparent',
    initial: 'initial',
    inherit: 'inherit',
  }
}

export const colorMap = makeColorMap('light')

export type Color = keyof typeof colorMap

export type WithColor = {
  /** The color to style the component */
  color?: Color
}

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

type BaseColor = (typeof BASE_COLORS)[number]

type ColorStyleItem = {
  text: string
  background: string
  border: string
  hover: string
}

type ColorAttribute = keyof ColorStyleItem

const makeColorStyleMap = (mode: ColorMode) => {
  const primaryStyles = Object.fromEntries(
    BASE_COLORS.map(color => [
      `${color}Primary`,
      {
        text: colorObj[mode][`backgroundPrimary`],
        background: colorObj[mode][`${color}Primary`],
        border: 'transparent',
        hover: colorObj[mode][`${color}Bright`],
      },
    ]),
  ) as {
    [key in `${BaseColor}Primary`]: ColorStyleItem
  }
  const secondaryStyles = Object.fromEntries(
    BASE_COLORS.map(color => [
      `${color}Secondary`,
      {
        text: colorObj[mode][`${color}Primary`],
        background: colorObj[mode][`${color}Surface`],
        border: 'transparent',
        hover: colorObj[mode][`${color}Light`],
      },
    ]),
  ) as {
    [key in `${BaseColor}Secondary`]: ColorStyleItem
  }

  const gradientKeys = Object.keys(
    colorObj[mode]['gradients'],
  ) as ColorGradient[]
  const gradientValues = Object.fromEntries(
    gradientKeys.map(color => [
      `${color}Gradient`,
      {
        text: colorObj[mode][`backgroundPrimary`],
        background: colorObj[mode]['gradients'][color],
        border: 'transparent',
        hover: colorObj[mode]['gradients'][color],
      },
    ]),
  ) as {
    [key in Exclude<
      keyof ColorObj['gradients'],
      symbol
    > as `${key}Gradient`]: ColorStyleItem
  }

  const transparent: ColorStyleItem = {
    text: 'initial',
    background: 'transparent',
    border: 'transparent',
    hover: colorObj[mode]['greyLight'],
  }

  const disabled: ColorStyleItem = {
    text: colorObj[mode]['greyPrimary'],
    background: colorObj[mode]['greyLight'],
    border: colorObj[mode]['greyLight'],
    hover: colorObj[mode]['greyLight'],
  }

  const background: ColorStyleItem = {
    text: colorObj[mode]['textPrimary'],
    background: colorObj[mode]['backgroundPrimary'],
    border: colorObj[mode]['border'],
    hover: colorObj[mode]['backgroundSecondary'],
  }

  return {
    ...primaryStyles,
    ...secondaryStyles,
    ...gradientValues,
    transparent,
    disabled,
    background,
  }
}

const colorStyleMap = makeColorStyleMap('light')

export type ColorStyle = keyof typeof colorStyleMap

export type WithColorStyle = {
  /** The color style to style the component */
  colorStyle?: ColorStyle
}

export const getColor = (color: Color) => {
  return colorMap[color]
}

export const getColorStyle = (
  colorStyle: ColorStyle,
  attribute: ColorAttribute,
) => {
  return colorStyleMap[colorStyle]?.[attribute]
}
