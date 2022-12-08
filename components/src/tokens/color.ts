/**
 * Color Variables
 *
 * All the following variables are used to generate color tokens.
 * Changes made to these variables will be reflected throughout the library.
 */

// The Mode type contains all possible theme modes.
export type Mode = 'light' | 'dark'

const shades = [50, 300, 400, 500, 750] as const

const namedColorMap = {
  surface: 50,
  bright: 300,
  primary: 400,
  dim: 500,
  active: 750,
} as const

// The hues object is a map of HSL colors, with optional overrides for each shade.
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

const backgroundColor = {
  light: '0,0,100',
  dark: '0,0,8',
}

// The categories object is a map of categorised colors, which can each have their own custom values.
const categories = {
  background: {
    hue: 'grey',
    items: {
      primary: backgroundColor,
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
        light: backgroundColor.light,
        dark: backgroundColor.light,
      },
    },
  },
  border: {
    hue: 'grey',
    items: {
      primary: 300,
    },
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
      | Shade
  }
}

type WithRaw<T> = Omit<T, 'raw'> & { raw: Omit<T, 'raw'> }

type ShadeColor = { [key in Shade]: string }
type NameColor = { [key in keyof typeof namedColorMap]: string }
type BaseColorItem = ShadeColor & NameColor
type ColorItem<
  TObject extends Record<string, string>,
  TName extends string,
> = TObject extends object
  ? {
      [key in Exclude<keyof TObject, symbol> as `${TName}${key extends string
        ? Capitalize<key>
        : key}`]: string
    } & {
      [T in `${TName}`]: string
    }
  : never
type CalculatedColors = WithRaw<ColorItem<BaseColorItem, Hue | 'accent'>>
type AllColors = WithRaw<CalculatedColors & GeneratedCategories>

const makeColorObject = <THue extends Hue>(
  mode: Mode,
  name: THue,
  color: ColorItem<ShadeColor, THue>,
) => {
  if (mode === 'dark') {
    color = Object.fromEntries(
      Object.entries(color).map(([key], index, arr) => [
        key,
        arr[arr.length - index - 1][1],
      ]),
    ) as ColorItem<ShadeColor, THue>
  }

  return {
    ...color,
    [name]: color[`${name}400`],
    [`${name}Surface`]: color[`${name}50`],
    [`${name}Bright`]: color[`${name}300`],
    [`${name}Primary`]: color[`${name}400`],
    [`${name}Dim`]: color[`${name}500`],
    [`${name}Active`]: color[`${name}750`],
  } as unknown as ColorItem<BaseColorItem, THue>
}

const makeColorRange = <THue extends Hue>(
  mode: Mode,
  name: THue,
  hue: HueItem,
) => {
  const color = Object.fromEntries(
    shades.map((shade) => {
      if (hue[3]?.[shade]) {
        return [`${name}.${shade}`, hue[3]?.[shade]?.join(',')]
      }
      const hsl = hue.slice(0, 3) as HSLColor
      hsl[2] = hsl[2] + (400 - shade) / 10
      return [shade, hsl.join(',')]
    }),
  ) as ColorItem<ShadeColor, THue>
  return {
    normal: makeColorObject(
      mode,
      name,
      Object.fromEntries(
        Object.entries(color).map(([key, value]) => [key, `hsl(${value})`]),
      ) as ColorItem<ShadeColor, THue>,
    ),
    raw: makeColorObject(mode, name, color),
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
        typeof shade === 'number'
          ? calculatedColors.raw[`${value.hue}${shade as Shade}`]
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
    gradients,
  }
}

export const makeColors = (accent: Hue) => ({
  light: makeMode(accent, 'light'),
  dark: makeMode(accent, 'dark'),
})

export const colors = makeColors('blue')
