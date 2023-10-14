const BASE_COLOUR_MAP = {
  accent: 'rgb(56,137,255)',
  blue: 'rgb(56,137,255)',
  green: 'rgb(25,156,117)',
  yellow: 'rgb(233,185,17)',
  red: 'rgb(198,48,27)',
  orange: 'rgb(243,147,11)',
  indigo: 'rgb(107,103,233)',
  pink: 'rgb(213,46,126)',
  purple: 'rgb(163,67,211)',
  grey: 'rgb(155,155,167)',
} as const

export type BaseColour = keyof typeof BASE_COLOUR_MAP

export const BASE_COLOURS = Object.keys(BASE_COLOUR_MAP) as BaseColour[]

export const validateBaseColour = (
  colour: unknown,
  fallback: BaseColour = 'accent',
): BaseColour => {
  return BASE_COLOURS.includes(colour as BaseColour)
    ? (colour as BaseColour)
    : fallback
}

const shades = [
  'active',
  'dim',
  'primary',
  'bright',
  'light',
  'surface',
] as const

export type Shade = typeof shades[number]

export type ShadedColor = `${BaseColour}${Capitalize<Shade>}`

const lightShadedColors: { [key in ShadedColor]: string } = {
  accentActive: 'rgb(0,54,133)',
  accentDim: 'rgb(5,106,255)',
  accentPrimary: BASE_COLOUR_MAP.blue,
  accentBright: 'rgb(86,154,255)',
  accentLight: 'rgb(209,228,255)',
  accentSurface: 'rgb(238,245,255)',
  blueActive: 'rgb(0,54,133)',
  blueDim: 'rgb(5,106,255)',
  bluePrimary: BASE_COLOUR_MAP.blue,
  blueBright: 'rgb(86,154,255)',
  blueLight: 'rgb(209,228,255)',
  blueSurface: 'rgb(238,245,255)',
  greenActive: 'rgb(7,44,33)',
  greenDim: 'rgb(21,132,99)',
  greenPrimary: BASE_COLOUR_MAP.green,
  greenBright: 'rgb(30,183,137)',
  greenLight: 'rgb(203,231,220)',
  greenSurface: 'rgb(231,244,239)',
  yellowActive: 'rgb(66,53,5)',
  yellowDim: 'rgb(185,147,14)',
  yellowPrimary: BASE_COLOUR_MAP.yellow,
  yellowBright: 'rgb(240,201,60)',
  yellowLight: 'rgb(255,239,173)',
  yellowSurface: 'rgb(255,245,205)',
  redActive: 'rgb(40,10,6)',
  redDim: 'rgb(153,37,21)',
  redPrimary: BASE_COLOUR_MAP.red,
  redBright: 'rgb(227,70,49)',
  redLight: 'rgb(240,194,194)',
  redSurface: 'rgb(249,231,231)',
  orangeActive: 'rgb(73,44,3)',
  orangeDim: 'rgb(195,118,9)',
  orangePrimary: BASE_COLOUR_MAP.orange,
  orangeBright: 'rgb(246,169,60)',
  orangeLight: 'rgb(251,225,188)',
  orangeSurface: 'rgb(253,240,221)',
  indigoActive: 'rgb(25,23,95)',
  indigoDim: 'rgb(52,47,197)',
  indigoPrimary: BASE_COLOUR_MAP.indigo,
  indigoBright: 'rgb(126,123,223)',
  indigoLight: 'rgb(199,197,241)',
  indigoSurface: 'rgb(227,226,248)',
  pinkActive: 'rgb(68,14,40)',
  pinkDim: 'rgb(174,35,102)',
  pinkPrimary: BASE_COLOUR_MAP.pink,
  pinkBright: 'rgb(222,89,153)',
  pinkLight: 'rgb(244,205,224)',
  pinkSurface: 'rgb(250,232,241)',
  purpleActive: 'rgb(61,19,83)',
  purpleDim: 'rgb(138,43,186)',
  purplePrimary: BASE_COLOUR_MAP.purple,
  purpleBright: 'rgb(184,110,221)',
  purpleLight: 'rgb(227,198,241)',
  purpleSurface: 'rgb(235,214,245)',
  greyActive: 'rgb(38,38,38)',
  greyDim: 'rgb(89,89,89)',
  greyPrimary: BASE_COLOUR_MAP.grey,
  greyBright: 'rgb(182,182,191)',
  greyLight: 'rgb(232,232,232)',
  greySurface: 'rgb(246,246,246)',
}

const darkShadedColors: { [key in ShadedColor]: string } = {
  accentActive: 'rgb(238,245,255)',
  accentDim: 'rgb(209,228,255)',
  accentPrimary: BASE_COLOUR_MAP.blue,
  accentBright: 'rgb(5,106,255)',
  accentLight: 'rgb(12,69,151)',
  accentSurface: 'rgb(32,57,95)',
  blueActive: 'rgb(238,245,255)',
  blueDim: 'rgb(209,228,255)',
  bluePrimary: BASE_COLOUR_MAP.blue,
  blueBright: 'rgb(5,106,255)',
  blueLight: 'rgb(12,69,151)',
  blueSurface: 'rgb(32,57,95)',
  greenActive: 'rgb(5,106,255)',
  greenDim: 'rgb(203,231,220)',
  greenPrimary: BASE_COLOUR_MAP.green,
  greenBright: 'rgb(21,132,99)',
  greenLight: 'rgb(16,74,56)',
  greenSurface: 'rgb(21,60,49)',
  yellowActive: 'rgb(255,245,205)',
  yellowDim: 'rgb(255,239,173)',
  yellowPrimary: BASE_COLOUR_MAP.yellow,
  yellowBright: 'rgb(185,147,14)',
  yellowLight: 'rgb(92,75,12)',
  yellowSurface: 'rgb(55,50,34)',
  redActive: 'rgb(249,231,231)',
  redDim: 'rgb(240,194,194)',
  redPrimary: BASE_COLOUR_MAP.red,
  redBright: 'rgb(167,38,20)',
  redLight: 'rgb(127, 19, 19)',
  redSurface: 'rgb(63,36,36)',
  orangeActive: 'rgb(253,240,221)',
  orangeDim: 'rgb(251,225,188)',
  orangePrimary: BASE_COLOUR_MAP.orange,
  orangeBright: 'rgb(195,118,9)',
  orangeLight: 'rgb(109,67,8)',
  orangeSurface: 'rgb(88,53,3)',
  indigoActive: 'rgb(227,226,248)',
  indigoDim: 'rgb(199,197,241)',
  indigoPrimary: BASE_COLOUR_MAP.indigo,
  indigoBright: 'rgb(52,47,197)',
  indigoLight: 'rgb(34,30,144)',
  indigoSurface: 'rgb(35,33,109)',
  pinkActive: 'rgb(250,232,241)',
  pinkDim: 'rgb(244,205,224)',
  pinkPrimary: BASE_COLOUR_MAP.pink,
  pinkBright: 'rgb(174,35,102)',
  pinkLight: 'rgb(118,21,68)',
  pinkSurface: 'rgb(91,17,53)',
  purpleActive: 'rgb(235,214,245)',
  purpleDim: 'rgb(227,198,241)',
  purplePrimary: BASE_COLOUR_MAP.purple,
  purpleBright: 'rgb(138,43,186)',
  purpleLight: 'rgb(94,22,131)',
  purpleSurface: 'rgb(66,20,90)',
  greyActive: 'rgb(246,246,246)',
  greyDim: 'rgb(232,232,232)',
  greyPrimary: BASE_COLOUR_MAP.grey,
  greyBright: 'rgb(93,92,98)',
  greyLight: 'rgb(93,92,98)',
  greySurface: 'rgb(20,20,22)',
}

export const SHADED_COLORS = Object.keys(lightShadedColors) as ShadedColor[]

export const ADDITIONAL_COLORS = [
  'background',
  'backgroundPrimary',
  'backgroundSecondary',
  'text',
  'textPrimary',
  'textSecondary',
  'textAccent',
  'textDisabled',
  'border',
] as const

export type AdditionalColour = typeof ADDITIONAL_COLORS[number]

const lightAdditionalColors: { [key in AdditionalColour]: string } = {
  background: 'rgb(255,255,255)',
  backgroundPrimary: 'rgb(255,255,255)',
  backgroundSecondary: lightShadedColors.greySurface,
  text: 'rgb(38,38,38)',
  textPrimary: 'rgb(38,38,38)',
  textSecondary: lightShadedColors.greyPrimary,
  textAccent: 'rgb(255,255,255)',
  textDisabled: lightShadedColors.greyPrimary,
  border: 'rgb(232,232,232)',
}

const darkAdditionalColors: { [key in AdditionalColour]: string } = {
  background: 'rgb(30,33,34)',
  backgroundPrimary: 'rgb(30,33,34)',
  backgroundSecondary: '',
  text: 'rgb(255,255,255)',
  textPrimary: 'rgb(255,255,255)',
  textSecondary: darkShadedColors.greyPrimary,
  textAccent: 'rgb(255,255,255)',
  textDisabled: darkShadedColors.greyPrimary,
  border: 'rgb(66,70,78)',
}

const gradients = {
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

export type Gradient = keyof typeof gradients

export type Colour = BaseColour | ShadedColor | AdditionalColour | Gradient

export const lightColors: { [key in Colour]: string } = {
  ...BASE_COLOUR_MAP,
  ...lightShadedColors,
  ...lightAdditionalColors,
  ...gradients,
}

export const darkColors: { [key in Colour]: string } = {
  ...BASE_COLOUR_MAP,
  ...darkShadedColors,
  ...darkAdditionalColors,
  ...gradients,
}
