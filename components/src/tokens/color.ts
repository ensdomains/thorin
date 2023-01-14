/**
 * Color Variables
 *
 * All the following variables are used to generate color tokens.
 * Changes made to these variables will be reflected throughout the library.
 */

// The Mode type contains all possible theme modes.
export type Mode = 'light' | 'dark'

const shades = [50, 100, 300, 400, 500, 750] as const

const namedShadeMap = {
  Surface: 50,
  Light: 100,
  Bright: 300,
  Primary: 400,
  Dim: 500,
  Active: 750,
} as const

// The hues object is a map of HSL colors, with optional overrides for each shade.
const hues = {
  blue: [216, 100, 61, { 50: [215, 100, 97] }],
  indigo: [242, 61, 58],
  purple: [280, 62, 55],
  pink: [331, 67, 51, { 100: [331, 64, 88] }],
  red: [7, 76, 44, { 50: [0, 60, 94], 100: [360, 60, 85] }],
  orange: [35, 91, 50, { 100: [36, 89, 86] }],
  yellow: [47, 86, 49, { 50: [48, 100, 90], 100: [48, 100, 85] }],
  green: [162, 72, 40, { 50: [157, 37, 93], 100: [157, 37, 85] }],
  teal: [199, 66, 49],
  grey: [
    240,
    6,
    63,
    {
      50: [0, 0, 96],
      100: [0, 0, 91],
      500: [0, 0, 35],
      750: [0, 0, 15],
    },
  ],
} satisfies Record<string, HueItem>

const backgroundColor = {
  light: '0 0% 100%',
  dark: '0 0% 8%',
}

// The categories object is a map of categorised colors, which can each have their own custom values.
const categories = {
  background: {
    hue: 'grey',
    items: {
      primary: backgroundColor,
      secondary: 'Surface',
    },
  },
  text: {
    hue: 'grey',
    items: {
      primary: 'Active',
      secondary: 'Dim',
      tertiary: 'Primary',
      accent: {
        light: backgroundColor.light,
        dark: backgroundColor.light,
      },
    },
  },
  border: {
    hue: 'grey',
    items: {
      primary: 'Light',
    },
  },
} satisfies Record<string, CategoryItem>

const gradients = {
  blue: 'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
  green:
    'linear-gradient(90deg, rgba(68,240,127,1) 4.54%, rgba(114,248,176,1) 59.2%, rgba(153,202,255,1) 148.85%)',
  red: 'linear-gradient(90deg, rgba(240,68,87,1) 4.54%, rgba(248,114,149,1) 59.2%, rgba(212,153,255,1) 148.85%)',
  purple: 'linear-gradient(323.31deg, #DE82FF -15.56%, #7F6AFF 108.43%)',
  grey: 'linear-gradient(330.4deg, #DFDFDF 4.54%, #959595 59.2%, #474747 148.85%)',
}

/**
 * END COLOR VARIABLES
 */

export type NamedShade = keyof typeof namedShadeMap
export type Shade = typeof shades[number]
export type Hue = keyof typeof hues
export type Category = keyof Categories | 'accent'
export type Gradient = keyof typeof gradients

type HSLColor = [hue: number, saturation: number, lightness: number]

type HueItem = [
  ...hsl: HSLColor,
  overrides?: {
    [key in Shade]?: HSLColor
  },
]

type Categories = typeof categories

type CamelCaseNested<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${Capitalize<
          CamelCaseNested<T[K]>
        >}`
      }[Exclude<keyof T, symbol>]
    : ''
) extends infer D
  ? Extract<D, string>
  : never

type DotNestedCategoryKeys = CamelCaseNested<{
  [item in keyof Categories]: {
    [key in keyof Categories[item]['items']]: string
  } & {
    '': string
  }
}>
type DotNestedCategories = { [K in DotNestedCategoryKeys]: string }

type GeneratedCategories = WithRaw<DotNestedCategories>

type CategoryItem = {
  hue: Hue
  items: {
    [key: string]:
      | {
          [key in Mode]: string
        }
      | NamedShade
  }
}

type WithRaw<T> = Omit<T, 'raw'> & { raw: Omit<T, 'raw'> }

type ShadeColor = { [key in Shade]: string }
type NameColor = { [key in NamedShade]: string }
type ColorItem<
  TObject extends Record<string, string>,
  TName extends string,
> = TObject extends object
  ? {
      [key in Exclude<keyof TObject, symbol> as `${TName}${key}`]: string
    } & {
      [T in `${TName}`]: string
    }
  : never
type CalculatedColors = WithRaw<ColorItem<NameColor, Hue | 'accent'>>
type AllColors = WithRaw<CalculatedColors & GeneratedCategories>

const makeColorObject = <THue extends Hue>(
  mode: Mode,
  name: THue,
  color: ShadeColor,
) => {
  if (mode === 'dark') {
    color = Object.fromEntries(
      Object.entries(color).map(([key], index, arr) => [
        key,
        arr[arr.length - index - 1][1],
      ]),
    ) as ShadeColor
  }

  const values = Object.fromEntries(
    Object.entries(namedShadeMap).map(([key, value]) => [
      `${name}${key}`,
      color[value],
    ]),
  )

  return { ...values, [name]: values[`${name}Primary`] } as ColorItem<
    NameColor,
    THue
  >
}

const makeCSSHSL = (hsl: HSLColor) => `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`

const makeColorRange = <THue extends Hue>(
  mode: Mode,
  name: THue,
  hue: HueItem,
) => {
  const color = Object.fromEntries(
    shades.map((shade) => {
      if (hue[3]?.[shade]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return [shade, makeCSSHSL(hue[3]![shade]!)]
      }
      const hsl = hue.slice(0, 3) as HSLColor
      hsl[2] = hsl[2] + (400 - shade) / 10
      return [shade, makeCSSHSL(hsl)]
    }),
  ) as ShadeColor
  return {
    normal: makeColorObject(
      mode,
      name,
      Object.fromEntries(
        Object.entries(color).map(([key, value]) => [key, `hsl(${value})`]),
      ) as ShadeColor,
    ),
    raw: makeColorObject(mode, name, color),
  }
}

const makeGradients = (accent: unknown, colors: AllColors) => {
  return {
    ...gradients,
    accent: gradients[accent as Gradient] || colors[accent as Hue],
  }
}

const makeMode = (accent: Hue, mode: Mode) => {
  const calculatedColors = Object.entries({
    ...hues,
    accent: hues[accent],
  }).reduce((prev, curr) => {
    const [key, value] = curr
    const colorRange = makeColorRange(mode, key as Hue, value)
    return {
      ...prev,
      ...colorRange.normal,
      raw: {
        ...prev.raw,
        ...colorRange.raw,
      },
    }
  }, {} as CalculatedColors)

  const allColours = Object.entries(categories).reduce((prev, curr) => {
    const [category, value] = curr
    for (const [name, shade] of Object.entries(value.items)) {
      const itemKey = `${category}${name.replace(/^[a-z]/, (l) =>
        l.toUpperCase(),
      )}` as DotNestedCategoryKeys
      const newItem =
        typeof shade === 'string'
          ? calculatedColors.raw[`${value.hue}${shade as NamedShade}`]
          : shade[mode]

      prev[itemKey] = `hsl(${newItem})`
      prev.raw[itemKey] = newItem

      if (name === 'primary') {
        const categoryKey = category as keyof typeof categories
        prev[categoryKey] = `hsl(${newItem})`
        prev.raw[categoryKey] = newItem
      }
    }
    return prev
  }, calculatedColors as AllColors)

  return {
    ...allColours,
    gradients: makeGradients(accent, allColours),
  }
}

export const makeColors = (accent: Hue) => ({
  light: makeMode(accent, 'light'),
  dark: makeMode(accent, 'dark'),
})

export const colors = makeColors('blue')
