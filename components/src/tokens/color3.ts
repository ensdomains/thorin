/** PRIMARY COLORS */

export type Mode = 'light' | 'dark'

export type PrimaryColor =
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

const RAW_PRIMARY_COLORS: { [key in PrimaryColor]: RawColor } = {
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

export const PRIMARY_COLORS = Object.keys(RAW_PRIMARY_COLORS) as PrimaryColor[]

export const validatePrimaryColor = (
  colour: unknown,
  fallback: PrimaryColor = 'accent',
): PrimaryColor => {
  return PRIMARY_COLORS.includes(colour as PrimaryColor)
    ? (colour as PrimaryColor)
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

export type Palette = { [key in PrimaryColor]: Shades }

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

export type PaletteColor = `${PrimaryColor}${Capitalize<Shade>}` | PrimaryColor

const flattenPalette = (
  palette: Palette,
): { [key in PaletteColor]: RawColor } => {
  const paletteEntries = Object.entries(palette) as [
    PrimaryColor,
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
const RAW_PALETTE_COLORS_DARK = flattenPalette(RAW_PALETTE_DARK)

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
  textSecondary: RAW_PALETTE_LIGHT.grey.primary,
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

export const rawColorToRGB = (color: RawColor): string =>
  `rgb(${color.join(', ')})`

export const rawColorToRGBA = (color: RawColor, opacity = 1): string =>
  `rgba(${[...color, opacity].join(', ')})`

export const rawColorToHex = (color: RawColor): string => {
  return `#${color.map((c) => c.toString(16)).join('')}`
}

export const rawColorToHSL = ([r, g, b]: RawColor): string => {
  r /= 255
  g /= 255
  b /= 255
  const l = Math.max(r, g, b)
  const s = l - Math.min(r, g, b)
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0
  const rawHsl = [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ]

  return `hsl(${rawHsl[0].toFixed(0)}, ${rawHsl[1].toFixed(
    0,
  )}%, ${rawHsl[2].toFixed(0)}%)`
}

const convertMapColors = <T extends PaletteColor | AdditionalColor>(
  map: { [key in T]: RawColor },
  converter: (color: RawColor) => string,
): { [key in T]: string } => {
  return Object.fromEntries(
    Object.entries<RawColor>(map).map(([key, color]: [string, RawColor]) => [
      key,
      converter(color),
    ]),
  ) as { [key in T]: string }
}

export const lightColors: { [key in Color]: string } = {
  ...convertMapColors(RAW_PALETTE_COLORS_LIGHT, rawColorToRGB),
  ...convertMapColors(RAW_ADDITIONAL_COLORS_LIGHT, rawColorToRGB),
  ...GRADIENT_MAP,
}

export const darkColors: { [key in Color]: string } = {
  ...convertMapColors(RAW_PALETTE_COLORS_DARK, rawColorToRGB),
  ...convertMapColors(RAW_ADDITIONAL_COLORS_DARK, rawColorToRGB),
  ...GRADIENT_MAP,
}
