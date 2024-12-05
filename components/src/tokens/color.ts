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

export type RawColor = Readonly<[number, number, number]>

const RAW_PRIMARY_COLORS: { [key in Hue]: RawColor } = {
  accent: [56, 137, 255],
  blue: [56, 137, 255],
  green: [25, 156, 117],
  yellow: [233, 185, 17],
  red: [198, 48, 27],
  orange: [243, 147, 11],
  indigo: [88, 84, 214],
  pink: [213, 46, 126],
  purple: [163, 67, 211],
  grey: [155, 155, 167],
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

export type Shades = { [key in Shade]: RawColor }

export type Palette = { [key in Hue]: Shades }

export const RAW_PALETTE_LIGHT: Palette = {
  accent: {
    active: [0, 54, 133],
    dim: [5, 106, 255],
    primary: RAW_PRIMARY_COLORS.blue,
    bright: [86, 154, 255],
    light: [209, 228, 255],
    surface: [238, 245, 255],
  },
  blue: {
    active: [0, 54, 133],
    dim: [5, 106, 255],
    primary: RAW_PRIMARY_COLORS.blue,
    bright: [86, 154, 255],
    light: [209, 228, 255],
    surface: [238, 245, 255],
  },
  green: {
    active: [7, 44, 33],
    dim: [21, 132, 99],
    primary: RAW_PRIMARY_COLORS.green,
    bright: [30, 183, 137],
    light: [203, 231, 220],
    surface: [231, 244, 239],
  },
  yellow: {
    active: [66, 53, 5],
    dim: [185, 147, 14],
    primary: RAW_PRIMARY_COLORS.yellow,
    bright: [240, 201, 60],
    light: [255, 239, 173],
    surface: [255, 245, 205],
  },
  red: {
    active: [40, 10, 6],
    dim: [153, 37, 21],
    primary: RAW_PRIMARY_COLORS.red,
    bright: [227, 70, 49],
    light: [240, 194, 194],
    surface: [249, 231, 231],
  },
  orange: {
    active: [73, 44, 3],
    dim: [195, 118, 9],
    primary: RAW_PRIMARY_COLORS.orange,
    bright: [246, 169, 60],
    light: [251, 225, 188],
    surface: [253, 240, 221],
  },
  indigo: {
    active: [25, 23, 95],
    dim: [52, 47, 197],
    primary: RAW_PRIMARY_COLORS.indigo,
    bright: [126, 123, 223],
    light: [199, 197, 241],
    surface: [227, 226, 248],
  },
  pink: {
    active: [68, 14, 40],
    dim: [174, 35, 102],
    primary: RAW_PRIMARY_COLORS.pink,
    bright: [222, 89, 153],
    light: [244, 205, 224],
    surface: [250, 232, 241],
  },
  purple: {
    active: [61, 19, 83],
    dim: [138, 43, 186],
    primary: RAW_PRIMARY_COLORS.purple,
    bright: [184, 110, 221],
    light: [227, 198, 241],
    surface: [235, 214, 245],
  },
  grey: {
    active: [30, 33, 34],
    dim: [89, 89, 89],
    primary: RAW_PRIMARY_COLORS.grey,
    bright: [182, 182, 191],
    light: [232, 232, 232],
    surface: [246, 246, 246],
  },
} as const

export const RAW_PALETTE_DARK: Palette = {
  accent: {
    active: [238, 245, 255],
    dim: [209, 228, 255],
    primary: RAW_PRIMARY_COLORS.blue,
    bright: [5, 106, 255],
    light: [12, 69, 151],
    surface: [13, 40, 81],
  },
  blue: {
    active: [238, 245, 255],
    dim: [209, 228, 255],
    primary: RAW_PRIMARY_COLORS.blue,
    bright: [5, 106, 255],
    light: [12, 69, 151],
    surface: [13, 40, 81],
  },
  green: {
    active: [231, 244, 239],
    dim: [203, 231, 220],
    primary: RAW_PRIMARY_COLORS.green,
    bright: [21, 132, 99],
    light: [16, 74, 56],
    surface: [21, 60, 49],
  },
  yellow: {
    active: [255, 245, 205],
    dim: [255, 239, 173],
    primary: RAW_PRIMARY_COLORS.yellow,
    bright: [185, 147, 14],
    light: [92, 75, 12],
    surface: [55, 50, 34],
  },
  red: {
    active: [249, 231, 231],
    dim: [240, 194, 194],
    primary: RAW_PRIMARY_COLORS.red,
    bright: [167, 38, 20],
    light: [127, 19, 19],
    surface: [40, 10, 6],
  },
  orange: {
    active: [253, 240, 221],
    dim: [251, 225, 188],
    primary: RAW_PRIMARY_COLORS.orange,
    bright: [195, 118, 9],
    light: [109, 67, 8],
    surface: [88, 53, 3],
  },
  indigo: {
    active: [227, 226, 248],
    dim: [199, 197, 241],
    primary: [107, 103, 233],
    bright: [52, 47, 197],
    light: [34, 30, 144],
    surface: [35, 33, 109],
  },
  pink: {
    active: [250, 232, 241],
    dim: [244, 205, 224],
    primary: RAW_PRIMARY_COLORS.pink,
    bright: [174, 35, 102],
    light: [118, 21, 68],
    surface: [91, 17, 53],
  },
  purple: {
    active: [235, 214, 245],
    dim: [227, 198, 241],
    primary: RAW_PRIMARY_COLORS.purple,
    bright: [138, 43, 186],
    light: [94, 22, 131],
    surface: [66, 20, 90],
  },
  grey: {
    active: [255, 255, 255],
    dim: [232, 232, 232],
    primary: RAW_PRIMARY_COLORS.grey,
    bright: [93, 92, 98],
    light: [66, 67, 71],
    surface: [20, 20, 22],
  },
} as const

export type PaletteColor = `${Hue}${Capitalize<Shade>}` | Hue

const flattenPalette = (
  palette: Palette,
): { [key in PaletteColor]: RawColor } => {
  const paletteEntries = Object.entries(palette) as [
    Hue,
    { [key in Shade]: RawColor },
  ][]
  const primaryColorEntries = paletteEntries.map(([primaryColor, shades]) => [
    primaryColor,
    shades.primary,
  ])
  const paletteColorEntries = paletteEntries.reduce<[PaletteColor, RawColor][]>(
    (acc, [primaryColor, shades]) => {
      const shadeEntries = Object.entries(shades) as [Shade, RawColor][]
      const shadeMap = shadeEntries.map(([shade, rawColor]) => {
        const key = `${primaryColor}${shade
          .charAt(0)
          .toUpperCase()}${shade.slice(1)}` as PaletteColor
        return [key, rawColor] as [PaletteColor, RawColor]
      })
      return [...acc, ...shadeMap]
    },
    [],
  )
  return Object.fromEntries([
    ...primaryColorEntries,
    ...paletteColorEntries,
  ]) as {
    [key in PaletteColor]: RawColor
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

const RAW_STATIC_COLORS: { [key in 'black' | 'white']: RawColor } = {
  black: [30, 33, 34],
  white: [255, 255, 255],
}

const RAW_ADDITIONAL_COLORS_LIGHT: { [key in AdditionalColor]: RawColor } = {
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

const RAW_ADDITIONAL_COLORS_DARK: { [key in AdditionalColor]: RawColor } = {
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
  [key in Mode]: { [key in AdditionalColor]: RawColor }
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
  accentActive: 'rgb(0, 54, 133)',
  accentDim: 'rgb(5, 106, 255)',
  accentPrimary: 'rgb(56, 137, 255)',
  accentBright: 'rgb(86, 154, 255)',
  accentLight: 'rgb(209, 228, 255)',
  accentSurface: 'rgb(238, 245, 255)',
  blueActive: 'rgb(0, 54, 133)',
  blueDim: 'rgb(5, 106, 255)',
  bluePrimary: 'rgb(56, 137, 255)',
  blueBright: 'rgb(86, 154, 255)',
  blueLight: 'rgb(209, 228, 255)',
  blueSurface: 'rgb(238, 245, 255)',
  greenActive: 'rgb(7, 44, 33)',
  greenDim: 'rgb(21, 132, 99)',
  greenPrimary: 'rgb(25, 156, 117)',
  greenBright: 'rgb(30, 183, 137)',
  greenLight: 'rgb(203, 231, 220)',
  greenSurface: 'rgb(231, 244, 239)',
  yellowActive: 'rgb(66, 53, 5)',
  yellowDim: 'rgb(185, 147, 14)',
  yellowPrimary: 'rgb(233, 185, 17)',
  yellowBright: 'rgb(240, 201, 60)',
  yellowLight: 'rgb(255, 239, 173)',
  yellowSurface: 'rgb(255, 245, 205)',
  redActive: 'rgb(40, 10, 6)',
  redDim: 'rgb(153, 37, 21)',
  redPrimary: 'rgb(198, 48, 27)',
  redBright: 'rgb(227, 70, 49)',
  redLight: 'rgb(240, 194, 194)',
  redSurface: 'rgb(249, 231, 231)',
  orangeActive: 'rgb(73, 44, 3)',
  orangeDim: 'rgb(195, 118, 9)',
  orangePrimary: 'rgb(243, 147, 11)',
  orangeBright: 'rgb(246, 169, 60)',
  orangeLight: 'rgb(251, 225, 188)',
  orangeSurface: 'rgb(253, 240, 221)',
  indigoActive: 'rgb(25, 23, 95)',
  indigoDim: 'rgb(52, 47, 197)',
  indigoPrimary: 'rgb(88, 84, 214)',
  indigoBright: 'rgb(126, 123, 223)',
  indigoLight: 'rgb(199, 197, 241)',
  indigoSurface: 'rgb(227, 226, 248)',
  pinkActive: 'rgb(68, 14, 40)',
  pinkDim: 'rgb(174, 35, 102)',
  pinkPrimary: 'rgb(213, 46, 126)',
  pinkBright: 'rgb(222, 89, 153)',
  pinkLight: 'rgb(244, 205, 224)',
  pinkSurface: 'rgb(250, 232, 241)',
  purpleActive: 'rgb(61, 19, 83)',
  purpleDim: 'rgb(138, 43, 186)',
  purplePrimary: 'rgb(163, 67, 211)',
  purpleBright: 'rgb(184, 110, 221)',
  purpleLight: 'rgb(227, 198, 241)',
  purpleSurface: 'rgb(235, 214, 245)',
  greyActive: 'rgb(30, 33, 34)',
  greyDim: 'rgb(89, 89, 89)',
  greyPrimary: 'rgb(155, 155, 167)',
  greyBright: 'rgb(182, 182, 191)',
  greyLight: 'rgb(232, 232, 232)',
  greySurface: 'rgb(246, 246, 246)',
  black: 'rgb(30, 33, 34)',
  white: 'rgb(255, 255, 255)',
  text: 'rgb(30, 33, 34)',
  textPrimary: 'rgb(30, 33, 34)',
  textSecondary: 'rgb(89, 89, 89)',
  textAccent: 'rgb(255, 255, 255)',
  textDisabled: 'rgb(182, 182, 191)',
  background: 'rgb(255, 255, 255)',
  backgroundPrimary: 'rgb(255, 255, 255)',
  backgroundSecondary: 'rgb(246, 246, 246)',
  border: 'rgb(232, 232, 232)',
  ...GRADIENT_MAP,
}

export const darkColors: { [key in Color]: string } = {
  accent: 'rgb(56, 137, 255)',
  blue: 'rgb(56, 137, 255)',
  green: 'rgb(25, 156, 117)',
  yellow: 'rgb(233, 185, 17)',
  red: 'rgb(198, 48, 27)',
  orange: 'rgb(243, 147, 11)',
  indigo: 'rgb(107, 103, 233)',
  pink: 'rgb(213, 46, 126)',
  purple: 'rgb(163, 67, 211)',
  grey: 'rgb(155, 155, 167)',
  accentActive: 'rgb(238, 245, 255)',
  accentDim: 'rgb(209, 228, 255)',
  accentPrimary: 'rgb(56, 137, 255)',
  accentBright: 'rgb(5, 106, 255)',
  accentLight: 'rgb(12, 69, 151)',
  accentSurface: 'rgb(13, 40, 81)',
  blueActive: 'rgb(238, 245, 255)',
  blueDim: 'rgb(209, 228, 255)',
  bluePrimary: 'rgb(56, 137, 255)',
  blueBright: 'rgb(5, 106, 255)',
  blueLight: 'rgb(12, 69, 151)',
  blueSurface: 'rgb(13, 40, 81)',
  greenActive: 'rgb(231, 244, 239)',
  greenDim: 'rgb(203, 231, 220)',
  greenPrimary: 'rgb(25, 156, 117)',
  greenBright: 'rgb(21, 132, 99)',
  greenLight: 'rgb(16, 74, 56)',
  greenSurface: 'rgb(21, 60, 49)',
  yellowActive: 'rgb(255, 245, 205)',
  yellowDim: 'rgb(255, 239, 173)',
  yellowPrimary: 'rgb(233, 185, 17)',
  yellowBright: 'rgb(185, 147, 14)',
  yellowLight: 'rgb(92, 75, 12)',
  yellowSurface: 'rgb(55, 50, 34)',
  redActive: 'rgb(249, 231, 231)',
  redDim: 'rgb(240, 194, 194)',
  redPrimary: 'rgb(198, 48, 27)',
  redBright: 'rgb(167, 38, 20)',
  redLight: 'rgb(127, 19, 19)',
  redSurface: 'rgb(40, 10, 6)',
  orangeActive: 'rgb(253, 240, 221)',
  orangeDim: 'rgb(251, 225, 188)',
  orangePrimary: 'rgb(243, 147, 11)',
  orangeBright: 'rgb(195, 118, 9)',
  orangeLight: 'rgb(109, 67, 8)',
  orangeSurface: 'rgb(88, 53, 3)',
  indigoActive: 'rgb(227, 226, 248)',
  indigoDim: 'rgb(199, 197, 241)',
  indigoPrimary: 'rgb(107, 103, 233)',
  indigoBright: 'rgb(52, 47, 197)',
  indigoLight: 'rgb(34, 30, 144)',
  indigoSurface: 'rgb(35, 33, 109)',
  pinkActive: 'rgb(250, 232, 241)',
  pinkDim: 'rgb(244, 205, 224)',
  pinkPrimary: 'rgb(213, 46, 126)',
  pinkBright: 'rgb(174, 35, 102)',
  pinkLight: 'rgb(118, 21, 68)',
  pinkSurface: 'rgb(91, 17, 53)',
  purpleActive: 'rgb(235, 214, 245)',
  purpleDim: 'rgb(227, 198, 241)',
  purplePrimary: 'rgb(163, 67, 211)',
  purpleBright: 'rgb(138, 43, 186)',
  purpleLight: 'rgb(94, 22, 131)',
  purpleSurface: 'rgb(66, 20, 90)',
  greyActive: 'rgb(255, 255, 255)',
  greyDim: 'rgb(232, 232, 232)',
  greyPrimary: 'rgb(155, 155, 167)',
  greyBright: 'rgb(93, 92, 98)',
  greyLight: 'rgb(66, 67, 71)',
  greySurface: 'rgb(20, 20, 22)',
  black: 'rgb(30, 33, 34)',
  white: 'rgb(255, 255, 255)',
  text: 'rgb(255, 255, 255)',
  textPrimary: 'rgb(255, 255, 255)',
  textSecondary: 'rgb(155, 155, 167)',
  textAccent: 'rgb(255, 255, 255)',
  textDisabled: 'rgb(93, 92, 98)',
  background: 'rgb(30, 33, 34)',
  backgroundPrimary: 'rgb(30, 33, 34)',
  backgroundSecondary: 'rgb(20, 20, 22)',
  border: 'rgb(66, 67, 71)',
  ...GRADIENT_MAP,
}

export const colors = {
  light: lightColors,
  dark: darkColors,
}
