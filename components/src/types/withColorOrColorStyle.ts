import { Colors } from '../tokens'
import { colors as colorObj } from '../tokens/color'
import { DefaultTheme } from './index'

type ColorObj = typeof colorObj.light

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never

type Leaves<T> = T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K]>> }[keyof T]
  : ''

type ColorPath = Leaves<ColorObj> | 'transparent' | 'initial' | 'inherit'

const makeColorMap = (colorObj: ColorObj) => {
  const gradientValues = Object.fromEntries(
    Object.keys(colorObj.gradients).map((color) => [
      `${color}Gradient`,
      `gradients.${color}`,
    ]),
  ) as {
    [key in Exclude<
      keyof ColorObj['gradients'],
      symbol
    > as `${key}Gradient`]: ColorPath
  }

  const colorValues = Object.fromEntries(
    Object.keys(colorObj)
      .filter(([color]) => color !== 'gradients' && color !== 'raw')
      .map((color) => [color, color]),
  ) as { [key in Colors]: ColorPath }
  return {
    ...gradientValues,
    ...colorValues,
    tranparent: 'transparent',
    initial: 'initial',
    inherit: 'inherit',
  }
}

export const colorMap = makeColorMap(colorObj.light)

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

type BaseColor = typeof BASE_COLORS[number]

type ColorStyleItem = {
  text: ColorPath
  background: ColorPath
  border: ColorPath
  hoverFilter: string
  hover: ColorPath
}

type ColorAttribute = keyof ColorStyleItem

const makeColorStyleMap = (colorObj: ColorObj) => {
  const primaryStyles = Object.fromEntries(
    BASE_COLORS.map((color) => [
      `${color}Primary`,
      {
        text: `backgroundPrimary`,
        background: `${color}Primary`,
        border: 'transparent',
        hoverFilter: 'brightness(1.1)',
        hover: `${color}Primary`,
      },
    ]),
  ) as {
    [key in Exclude<BaseColor, symbol> as `${key}Primary`]: ColorStyleItem
  }
  const secondaryStyles = Object.fromEntries(
    BASE_COLORS.map((color) => [
      `${color}Secondary`,
      {
        text: `${color}Primary`,
        background: `${color}Surface`,
        border: 'transparent',
        hoverFilter: 'contrast(0.95)',
        hover: `${color}Surface`,
      },
    ]),
  ) as {
    [key in Exclude<BaseColor, symbol> as `${key}Secondary`]: ColorStyleItem
  }

  const gradientValues = Object.fromEntries(
    Object.keys(colorObj.gradients).map((color) => [
      `${color}Gradient`,
      {
        text: `backgroundPrimary`,
        background: `gradients.${color}`,
        border: 'transparent',
        hoverFilter: 'contrast(0.95)',
        hover: `gradients.${color}`,
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
    hoverFilter: 'contrast(0.95)',
    hover: 'greyBright',
  }

  const disabled: ColorStyleItem = {
    text: 'greyPrimary',
    background: 'greyBright',
    border: 'transparent',
    hoverFilter: 'initial',
    hover: 'greyBright',
  }

  const background: ColorStyleItem = {
    text: 'textPrimary',
    background: 'backgroundPrimary',
    border: 'border',
    hoverFilter: 'initial',
    hover: 'backgroundSecondary',
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

const colorStyleMap = makeColorStyleMap(colorObj.light)

export type ColorStyle = keyof typeof colorStyleMap

export type WithColorStyle = {
  /** The color style to style the component */
  colorStyle?: ColorStyle
}

// If method fails to find a color, return the path instead.
const getColorFromPath = (theme: DefaultTheme, path = '') => {
  return (
    path
      .split('.')
      .reduce(
        (currentObj: any, currentPath: keyof typeof currentObj) =>
          currentObj?.[currentPath],
        theme.colors as object,
      ) || path
  )
}

export const getColor = (theme: DefaultTheme, color: Color) => {
  const path = colorMap[color]
  return getColorFromPath(theme, path)
}

export const getColorStyle = (
  theme: DefaultTheme,
  colorStyle: ColorStyle,
  attribute: ColorAttribute,
) => {
  const path = colorStyleMap[colorStyle][attribute] as ColorPath
  return getColorFromPath(theme, path)
}
