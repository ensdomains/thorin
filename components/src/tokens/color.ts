/** PRIMARY COLORS */

export type Mode = 'light' | 'dark'

export type Hue =
  | 'accent'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'orange'
  | 'indigo'
  | 'pink'
  | 'purple'
  | 'grey'

const RAW_PRIMARY_COLORS: { [key in Hue]: string } = {
  accent: 'rgb(56, 137, 255)',
  blue: 'rgb(56, 137, 255)',
  green: 'rgb(25, 156, 117)',
  yellow: 'rgb(233, 185, 17)',
  red: 'rgb(198, 48, 27)',
  orange: 'rgb(243, 147, 11)',
  indigo: 'rgb(88, 84, 214)',
  pink: 'rgb(213, 46, 126)',
  purple: 'rgb(163, 67, 211)',
  grey: 'rgb(155, 155, 167)',
} as const

export const PRIMARY_COLORS = Object.keys(RAW_PRIMARY_COLORS) as Hue[]

export const validatePrimaryColor = (
  colour: unknown,
  fallback: Hue = 'accent',
): Hue => {
  return PRIMARY_COLORS.includes(colour as Hue)
    ? (colour as Hue)
    : fallback
}

/** PALETTE COLOR */

export type Shade =
  | 'active'
  | 'dim'
  | 'primary'
  | 'bright'
  | 'light'
  | 'surface'

export type Shades = { [key in Shade]: string }

export type Palette = { [key in Hue]: Shades }

export const RAW_PALETTE_LIGHT: Palette = {
  accent: {
    active: 'rgb(0, 54, 133)',
    dim: 'rgb(5, 106, 255)',
    primary: RAW_PRIMARY_COLORS.blue,
    bright: 'rgb(86, 154, 255)',
    light: 'rgb(209, 228, 255)',
    surface: 'rgb(238, 245, 255)',
  },
  blue: {
    active: 'rgb(0, 54, 133)',
    dim: 'rgb(5, 106, 255)',
    primary: RAW_PRIMARY_COLORS.blue,
    bright: 'rgb(86, 154, 255)',
    light: 'rgb(209, 228, 255)',
    surface: 'rgb(238, 245, 255)',
  },
  green: {
    active: 'rgb(7, 44, 33)',
    dim: 'rgb(21, 132, 99)',
    primary: RAW_PRIMARY_COLORS.green,
    bright: 'rgb(30, 183, 137)',
    light: 'rgb(203, 231, 220)',
    surface: 'rgb(231, 244, 239)',
  },
  yellow: {
    active: 'rgb(66, 53, 5)',
    dim: 'rgb(185, 147, 14)',
    primary: RAW_PRIMARY_COLORS.yellow,
    bright: 'rgb(240, 201, 60)',
    light: 'rgb(255, 239, 173)',
    surface: 'rgb(255, 245, 205)',
  },
  red: {
    active: 'rgb(40, 10, 6)',
    dim: 'rgb(153, 37, 21)',
    primary: RAW_PRIMARY_COLORS.red,
    bright: 'rgb(227, 70, 49)',
    light: 'rgb(240, 194, 194)',
    surface: 'rgb(249, 231, 231)',
  },
  orange: {
    active: 'rgb(73, 44, 3)',
    dim: 'rgb(195, 118, 9)',
    primary: RAW_PRIMARY_COLORS.orange,
    bright: 'rgb(246, 169, 60)',
    light: 'rgb(251, 225, 188)',
    surface: 'rgb(253, 240, 221)',
  },
  indigo: {
    active: 'rgb(25, 23, 95)',
    dim: 'rgb(52, 47, 197)',
    primary: RAW_PRIMARY_COLORS.indigo,
    bright: 'rgb(126, 123, 223)',
    light: 'rgb(199, 197, 241)',
    surface: 'rgb(227, 226, 248)',
  },
  pink: {
    active: 'rgb(68, 14, 40)',
    dim: 'rgb(174, 35, 102)',
    primary: RAW_PRIMARY_COLORS.pink,
    bright: 'rgb(222, 89, 153)',
    light: 'rgb(244, 205, 224)',
    surface: 'rgb(250, 232, 241)',
  },
  purple: {
    active: 'rgb(61, 19, 83)',
    dim: 'rgb(138, 43, 186)',
    primary: RAW_PRIMARY_COLORS.purple,
    bright: 'rgb(184, 110, 221)',
    light: 'rgb(227, 198, 241)',
    surface: 'rgb(235, 214, 245)',
  },
  grey: {
    active: 'rgb(30, 33, 34)',
    dim: 'rgb(89, 89, 89)',
    primary: RAW_PRIMARY_COLORS.grey,
    bright: 'rgb(182, 182, 191)',
    light: 'rgb(232, 232, 232)',
    surface: 'rgb(246, 246, 246)',
  },
} as const

export const RAW_PALETTE_DARK: Palette = {
  accent: {
    active: 'rgb(238, 245, 255)',
    dim: 'rgb(209, 228, 255)',
    primary: RAW_PRIMARY_COLORS.blue,
    bright: 'rgb(5, 106, 255)',
    light: 'rgb(12, 69, 151)',
    surface: 'rgb(13, 40, 81)',
  },
  blue: {
    active: 'rgb(238, 245, 255)',
    dim: 'rgb(209, 228, 255)',
    primary: RAW_PRIMARY_COLORS.blue,
    bright: 'rgb(5, 106, 255)',
    light: 'rgb(12, 69, 151)',
    surface: 'rgb(13, 40, 81)',
  },
  green: {
    active: 'rgb(231, 244, 239)',
    dim: 'rgb(203, 231, 220)',
    primary: RAW_PRIMARY_COLORS.green,
    bright: 'rgb(21, 132, 99)',
    light: 'rgb(16, 74, 56)',
    surface: 'rgb(21, 60, 49)',
  },
  yellow: {
    active: 'rgb(255, 245, 205)',
    dim: 'rgb(255, 239, 173)',
    primary: RAW_PRIMARY_COLORS.yellow,
    bright: 'rgb(185, 147, 14)',
    light: 'rgb(92, 75, 12)',
    surface: 'rgb(55, 50, 34)',
  },
  red: {
    active: 'rgb(249, 231, 231)',
    dim: 'rgb(240, 194, 194)',
    primary: RAW_PRIMARY_COLORS.red,
    bright: 'rgb(167, 38, 20)',
    light: 'rgb(127, 19, 19)',
    surface: 'rgb(40, 10, 6)',
  },
  orange: {
    active: 'rgb(253, 240, 221)',
    dim: 'rgb(251, 225, 188)',
    primary: RAW_PRIMARY_COLORS.orange,
    bright: 'rgb(195, 118, 9)',
    light: 'rgb(109, 67, 8)',
    surface: 'rgb(88, 53, 3)',
  },
  indigo: {
    active: 'rgb(227, 226, 248)',
    dim: 'rgb(199, 197, 241)',
    primary: 'rgb(107, 103, 233)',
    bright: 'rgb(52, 47, 197)',
    light: 'rgb(34, 30, 144)',
    surface: 'rgb(35, 33, 109)',
  },
  pink: {
    active: 'rgb(250, 232, 241)',
    dim: 'rgb(244, 205, 224)',
    primary: RAW_PRIMARY_COLORS.pink,
    bright: 'rgb(174, 35, 102)',
    light: 'rgb(118, 21, 68)',
    surface: 'rgb(91, 17, 53)',
  },
  purple: {
    active: 'rgb(235, 214, 245)',
    dim: 'rgb(227, 198, 241)',
    primary: RAW_PRIMARY_COLORS.purple,
    bright: 'rgb(138, 43, 186)',
    light: 'rgb(94, 22, 131)',
    surface: 'rgb(66, 20, 90)',
  },
  grey: {
    active: 'rgb(255, 255, 255)',
    dim: 'rgb(232, 232, 232)',
    primary: RAW_PRIMARY_COLORS.grey,
    bright: 'rgb(93, 92, 98)',
    light: 'rgb(66, 67, 71)',
    surface: 'rgb(20, 20, 22)',
  },
} as const

export type PaletteColor = `${Hue}${Capitalize<Shade>}` | Hue

const flattenPalette = (
  palette: Palette,
): { [key in PaletteColor]: string } => {
  const paletteEntries = Object.entries(palette) as [
    Hue,
    { [key in Shade]: string },
  ][]
  const primaryColorEntries = paletteEntries.map(([primaryColor, shades]) => [
    primaryColor,
    shades.primary,
  ])
  const paletteColorEntries = paletteEntries.reduce<[PaletteColor, string][]>(
    (acc, [primaryColor, shades]) => {
      const shadeEntries = Object.entries(shades) as [Shade, string][]
      const shadeMap = shadeEntries.map(([shade, rawColor]) => {
        const key = `${primaryColor}${shade
          .charAt(0)
          .toUpperCase()}${shade.slice(1)}` as PaletteColor
        return [key, rawColor] as [PaletteColor, string]
      })
      return [...acc, ...shadeMap]
    },
    [],
  )
  return Object.fromEntries([
    ...primaryColorEntries,
    ...paletteColorEntries,
  ]) as {
    [key in PaletteColor]: string
  }
}

const RAW_PALETTE_COLORS_LIGHT = flattenPalette(RAW_PALETTE_LIGHT)

export const PALETTE_COLORS = Object.keys(
  RAW_PALETTE_COLORS_LIGHT,
) as PaletteColor[]

export type RawPalettes = { [key in Mode]: Palette }

export const RAW_PALETTE_COLORS: RawPalettes = {
  light: RAW_PALETTE_LIGHT,
  dark: RAW_PALETTE_DARK,
}

/** ADDITIONAL COLORS */

export type AdditionalColor =
  | 'black'
  | 'white'
  | 'text'
  | 'textPrimary'
  | 'textSecondary'
  | 'textAccent'
  | 'textDisabled'
  | 'background'
  | 'backgroundPrimary'
  | 'backgroundSecondary'
  | 'border'

const RAW_STATIC_COLORS: { [key in 'black' | 'white']: string } = {
  black: 'rgb(30, 33, 34)',
  white: 'rgb(255, 255, 255)',
}

const RAW_ADDITIONAL_COLORS_LIGHT: { [key in AdditionalColor]: string } = {
  black: RAW_STATIC_COLORS.black,
  white: RAW_STATIC_COLORS.white,
  text: RAW_STATIC_COLORS.black,
  textPrimary: RAW_STATIC_COLORS.black,
  textSecondary: RAW_PALETTE_LIGHT.grey.dim,
  textAccent: RAW_STATIC_COLORS.white,
  textDisabled: RAW_PALETTE_LIGHT.grey.bright,
  background: RAW_STATIC_COLORS.white,
  backgroundPrimary: RAW_STATIC_COLORS.white,
  backgroundSecondary: RAW_PALETTE_LIGHT.grey.surface,
  border: RAW_PALETTE_LIGHT.grey.light,
}

const RAW_ADDITIONAL_COLORS_DARK: { [key in AdditionalColor]: string } = {
  black: RAW_STATIC_COLORS.black,
  white: RAW_STATIC_COLORS.white,
  text: RAW_STATIC_COLORS.white,
  textPrimary: RAW_STATIC_COLORS.white,
  textSecondary: RAW_PALETTE_DARK.grey.primary,
  textAccent: RAW_STATIC_COLORS.white,
  textDisabled: RAW_PALETTE_DARK.grey.bright,
  background: RAW_STATIC_COLORS.black,
  backgroundPrimary: RAW_STATIC_COLORS.black,
  backgroundSecondary: RAW_PALETTE_DARK.grey.surface,
  border: RAW_PALETTE_DARK.grey.light,
}

export const ADDITIONAL_COLORS = Object.keys(
  RAW_ADDITIONAL_COLORS_LIGHT,
) as AdditionalColor[]

export type RawAdditionalColors = {
  [key in Mode]: { [key in AdditionalColor]: string }
}

export const RAW_ADDITIONAL_COLORS: RawAdditionalColors = {
  light: RAW_ADDITIONAL_COLORS_LIGHT,
  dark: RAW_ADDITIONAL_COLORS_DARK,
}

/** GRADIENTS */
type Gradient =
  | 'blueGradient'
  | 'greenGradient'
  | 'redGradient'
  | 'purpleGradient'
  | 'greyGradient'

const GRADIENT_MAP: { [key in Gradient]: string } = {
  blueGradient:
    'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
  greenGradient:
    'linear-gradient(90deg, rgba(68,240,127,1) 4.54%, rgba(114,248,176,1) 59.2%, rgba(153,202,255,1) 148.85%)',
  redGradient:
    'linear-gradient(90deg, rgba(240,68,87,1) 4.54%, rgba(248,114,149,1) 59.2%, rgba(212,153,255,1) 148.85%)',
  purpleGradient:
    'linear-gradient(323.31deg, #DE82FF -15.56%, #7F6AFF 108.43%)',
  greyGradient:
    'linear-gradient(330.4deg, #DFDFDF 4.54%, #959595 59.2%, #474747 148.85%)',
}

export type Color = PaletteColor | AdditionalColor | Gradient

export const lightColors: { [key in Color]: string } = {
  ...RAW_PALETTE_COLORS_LIGHT,
  ...RAW_ADDITIONAL_COLORS_LIGHT,
  ...GRADIENT_MAP,
}

export const darkColors: { [key in Color]: string } = {
  ...RAW_PALETTE_COLORS_LIGHT,
  ...RAW_ADDITIONAL_COLORS_DARK,
  ...GRADIENT_MAP,
}

export const colors = {
  light: lightColors,
  dark: darkColors,
}
