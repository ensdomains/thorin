/**
 * Colour Variables
 *
 * All the following variables are used to generate colour tokens.
 * Changes made to these variables will be reflected throughout the library.
 */

// The Mode type contains all possible theme modes.
export type Mode = 'light' | 'dark'

const shades = [50, 300, 400, 500, 750] as const

// The hues object is a map of HSL colours, with optional overrides for each shade.
const hues = {
  blue: [216, 100, 61, { 50: [215, 100, 97] }],
  indigo: [242, 61, 58],
  purple: [280, 62, 55],
  pink: [331, 67, 51],
  red: [7, 76, 44, { 50: [0, 60, 94] }],
  orange: [35, 91, 50],
  yellow: [47, 86, 49, { 50: [48, 100, 90] }],
  green: [162, 72, 40, { 50: [157, 37, 93] }],
  teal: [199, 66, 49],
  grey: [
    240,
    6,
    63,
    { 50: [0, 0, 96], 300: [0, 0, 91], 500: [0, 0, 35], 750: [0, 0, 15] },
  ],
} satisfies Record<string, HueItem>

const backgroundColour = {
  light: '0,0,100',
  dark: '0,0,8',
}

// The categories object is a map of categorised colours, which can each have their own custom values.
const categories = {
  background: {
    hue: 'grey',
    items: {
      primary: backgroundColour,
      secondary: 50,
    },
  },
  text: {
    hue: 'grey',
    items: {
      primary: 750,
      secondary: 500,
      tertiary: 400,
      accent: {
        light: backgroundColour.light,
        dark: backgroundColour.light,
      },
    },
  },
  border: {
    hue: 'grey',
    item: 300,
  },
} satisfies Record<string, CategoryItem>

const gradients = {
  blue: 'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
  green:
    'linear-gradient(90deg, rgba(68,240,127,1) 4.54%, rgba(114,248,176,1) 59.2%, rgba(153,202,255,1) 148.85%)',
  red: 'linear-gradient(90deg, rgba(240,68,87,1) 4.54%, rgba(248,114,149,1) 59.2%, rgba(212,153,255,1) 148.85%)',
}

/**
 * END COLOR VARIABLES
 */

export type Shade = typeof shades[number]
export type Hue = keyof typeof hues
export type Category = keyof Categories | 'accent'
export type Gradient = keyof typeof gradients

type HSLColour = [hue: number, saturation: number, lightness: number]

type HueItem = [
  ...hsl: HSLColour,
  overrides?: {
    [key in Shade]?: HSLColour
  },
]

type Categories = typeof categories

type GeneratedCategories = {
  [item in keyof Categories]: Categories[item] extends { items: any }
    ? {
        normal: {
          [key in keyof Categories[item]['items']]: string
        }
        raw: {
          [key in keyof Categories[item]['items']]: string
        }
      }
    : {
        normal: string
        raw: string
      }
}

type InnerCategoryItem =
  | {
      [key in Mode]: string
    }
  | Shade

type CategoryItem = {
  hue: Hue
} & (
  | {
      items: {
        [key: string]: InnerCategoryItem
      }
    }
  | {
      item: InnerCategoryItem
    }
)

type ShadeColour = { [key in Shade]: string }
type NameColour = {
  surface: string
  bright: string
  primary: string
  dim: string
  active: string
}
type ColourItem = ShadeColour & NameColour

type CalculatedColours = { [key in Hue]: ColourItem }

const makeColourObject = (mode: Mode, colour: Record<number, string>) => {
  if (mode === 'dark') {
    colour = {
      50: colour[750],
      300: colour[500],
      400: colour[400],
      500: colour[300],
      750: colour[50],
    }
  }

  return {
    ...colour,
    surface: colour[50],
    bright: colour[300],
    primary: colour[400],
    dim: colour[500],
    active: colour[750],
  } as ColourItem
}

const makeColourRange = (mode: Mode, hue: HueItem) => {
  const colour = Object.fromEntries(
    shades.map((shade) => {
      if (hue[3]?.[shade]) {
        return [shade, hue[3]?.[shade]?.join(',')] as [Shade, string]
      }
      const hsl = hue.slice(0, 3) as HSLColour
      hsl[2] = hsl[2] + (400 - shade) / 10
      return [shade, hsl.join(',')]
    }),
  )
  return {
    normal: makeColourObject(
      mode,
      Object.fromEntries(
        Object.entries(colour).map(([key, value]) => [key, `hsl(${value})`]),
      ),
    ),
    raw: makeColourObject(mode, colour),
  }
}

const makeMode = (accent: Hue, mode: Mode) => {
  const calculatedColours = Object.fromEntries(
    Object.entries(hues).map(([key, value]) => [
      key,
      makeColourRange(mode, value),
    ]),
  )

  const generatedCategoryColours = Object.fromEntries(
    Object.entries(categories).map(([category, value]) => {
      const hue = calculatedColours[value.hue]

      if ('item' in value) {
        const item = value.item
        return [category, { normal: hue.normal[item], raw: hue.raw[item] }]
      }

      const items = Object.fromEntries(
        Object.entries(value.items).map(([name, shade]) => {
          if (typeof shade === 'number') {
            return [name, hue.normal[shade as Shade]]
          }

          return [name, shade[mode]]
        }),
      )

      return [category, items]
    }),
  ) as GeneratedCategories

  const categoryColours = {
    ...generatedCategoryColours,
    accent: calculatedColours[accent],
  }

  const splitColours = {
    ...calculatedColours,
    ...categoryColours,
  }

  type CategoryColourObject = typeof categoryColours

  type CategoryColours = {
    [key in keyof CategoryColourObject]: CategoryColourObject[key]['normal']
  }
  type AllColours = CalculatedColours & CategoryColours

  return {
    ...(Object.fromEntries(
      Object.entries(splitColours).map(([key, value]) => [key, value.normal]),
    ) as unknown as AllColours),
    gradients,
    raw: Object.fromEntries(
      Object.entries(splitColours).map(([key, value]) => [key, value.raw]),
    ) as unknown as AllColours,
  }
}

export const makeColours = (accent: Hue) => ({
  light: makeMode(accent, 'light'),
  dark: makeMode(accent, 'dark'),
})

export const colours = makeColours('blue')
