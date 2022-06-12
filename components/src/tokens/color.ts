export type Mode = 'light' | 'dark'

export type Accent =
  | 'blue'
  | 'green'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow'
  | 'grey'

export type Gradients = 'blue' | 'green' | 'red'

export const accentsRaw: { [key in Mode]: { [key in Accent]: string } } = {
  light: {
    blue: '82, 152, 255',
    green: '73, 179, 147',
    indigo: '88, 84, 214',
    orange: '255, 149, 0',
    pink: '255, 45, 85',
    purple: '175, 82, 222',
    red: '213, 85, 85',
    teal: '90, 200, 250',
    yellow: '255, 204, 0',
    grey: '232, 232, 235',
  },
  dark: {
    blue: '82, 152, 255',
    green: '73, 179, 147',
    indigo: '94, 92, 230',
    orange: '255, 159, 10',
    pink: '255, 55, 95',
    purple: '191, 90, 242',
    red: '213, 85, 85',
    teal: '100, 210, 255',
    yellow: '255, 214, 10',
    grey: '59, 59, 61',
  },
}

export const accents: { [key in Mode]: { [key in Accent]: string } } = {
  light: {
    blue: `rgb(${accentsRaw.light.blue})`,
    green: `rgb(${accentsRaw.light.green})`,
    indigo: `rgb(${accentsRaw.light.indigo})`,
    orange: `rgb(${accentsRaw.light.orange})`,
    pink: `rgb(${accentsRaw.light.pink})`,
    purple: `rgb(${accentsRaw.light.purple})`,
    red: `rgb(${accentsRaw.light.red})`,
    teal: `rgb(${accentsRaw.light.teal})`,
    yellow: `rgb(${accentsRaw.light.yellow})`,
    grey: `rgb(${accentsRaw.light.grey})`,
  },
  dark: {
    blue: `rgb(${accentsRaw.dark.blue})`,
    green: `rgb(${accentsRaw.dark.green})`,
    indigo: `rgb(${accentsRaw.dark.indigo})`,
    orange: `rgb(${accentsRaw.dark.orange})`,
    pink: `rgb(${accentsRaw.dark.pink})`,
    purple: `rgb(${accentsRaw.dark.purple})`,
    red: `rgb(${accentsRaw.dark.red})`,
    teal: `rgb(${accentsRaw.dark.teal})`,
    yellow: `rgb(${accentsRaw.dark.yellow})`,
    grey: `rgb(${accentsRaw.dark.grey})`,
  },
}

export const shadesRaw = {
  light: {
    background: '255, 255, 255',
    backgroundSecondary: '246, 246, 248',
    backgroundTertiary: '246, 246, 248',
    foreground: '0, 0, 0',
    groupBackground: '253, 253, 253',
  },
  dark: {
    background: '20, 20, 20',
    backgroundSecondary: '10, 10, 10',
    backgroundTertiary: '20, 20, 20',
    foreground: '255, 255, 255',
    groupBackground: '10, 10, 10',
  },
}

const gradients: { [key in Mode]: { [key in Gradients]: string } } = {
  light: {
    blue: 'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
    green:
      'linear-gradient(90deg, rgba(68,240,127,1) 4.54%, rgba(114,248,176,1) 59.2%, rgba(153,202,255,1) 148.85%)',
    red: 'linear-gradient(90deg, rgba(240,68,87,1) 4.54%, rgba(248,114,149,1) 59.2%, rgba(212,153,255,1) 148.85%)',
  },
  dark: {
    blue: 'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
    green:
      'linear-gradient(90deg, rgba(68,240,127,1) 4.54%, rgba(114,248,176,1) 59.2%, rgba(153,202,255,1) 148.85%)',
    red: 'linear-gradient(90deg, rgba(240,68,87,1) 4.54%, rgba(248,114,149,1) 59.2%, rgba(212,153,255,1) 148.85%)',
  },
}

export const shades = {
  light: {
    accent: '0.7',
    accentSecondary: '0.15',
    accentSecondaryHover: '0.2',
    backgroundHide: '0.1',
    backgroundHideFallback: '0.5',
    foregroundSecondary: '0.05',
    foregroundSecondaryHover: '0.035',
    foregroundTertiary: '0.033',
    groupBorder: '0.075',
    border: '0.3',
    borderSecondary: '0.12',
    borderTertiary: '0.05',
    text: '0.8',
    textSecondary: '0.65',
    textSecondaryHover: '0.7',
    textTertiary: '0.4',
    textTertiaryHover: '0.5',
    textPlaceholder: '0.25',
  },
  dark: {
    accent: '0.66',
    accentSecondary: '0.2',
    accentSecondaryHover: '0.25',
    backgroundHide: '0.1',
    backgroundHideFallback: '0.5',
    foregroundSecondary: '0.1',
    foregroundSecondaryHover: '0.15',
    foregroundTertiary: '0.04',
    groupBorder: '0',
    border: '0.3',
    borderSecondary: '0.12',
    borderTertiary: '0.05',
    text: '0.7',
    textSecondary: '0.5',
    textSecondaryHover: '0.65',
    textTertiary: '0.35',
    textTertiaryHover: '0.4',
    textPlaceholder: '0.25',
  },
}

export const colors = {
  base: {
    black: 'rgb(0, 0, 0)',
    white: 'rgb(255, 255, 255)',
    current: 'currentColor',
    inherit: 'inherit',
    transparent: 'transparent',
  },
  light: {
    accent: `${accents.light.blue}`,
    accentSecondary: `rgba(${accentsRaw.light.blue}, ${shades.light.accentSecondary})`,
    accentSecondaryHover: `rgba(${accentsRaw.light.blue}, ${shades.light.accentSecondary})`,
    accentTertiary: `rgba(${accentsRaw.light.blue}, calc(${shades.light.accentSecondary} * 0.5))`,
    accentText: `rgb(${shadesRaw.light.background})`,
    accentGradient: gradients.light.blue,
    background: `rgb(${shadesRaw.light.background})`,
    backgroundHide: `rgba(${shadesRaw.light.foreground}, ${shades.light.backgroundHide})`,
    backgroundSecondary: `rgb(${shadesRaw.light.backgroundSecondary})`,
    backgroundTertiary: `rgb(${shadesRaw.light.backgroundTertiary})`,
    border: `rgb(${shadesRaw.light.foreground}, ${shades.light.border})`,
    borderSecondary: `rgb(${shadesRaw.light.foreground}, ${shades.light.borderSecondary})`,
    borderTertiary: `rgb(${shadesRaw.light.foreground}, ${shades.light.borderTertiary})`,
    foreground: `rgb(${shadesRaw.light.foreground})`,
    foregroundSecondary: `rgba(${shadesRaw.light.foreground}, ${shades.light.foregroundSecondary})`,
    foregroundSecondaryHover: `rgba(${shadesRaw.light.foreground}, ${shades.light.foregroundSecondaryHover})`,
    foregroundTertiary: `rgba(${shadesRaw.light.foreground}, ${shades.light.foregroundTertiary})`,
    groupBackground: `rgb(${shadesRaw.light.groupBackground})`,
    groupBorder: `rgb(${shadesRaw.light.foreground})`,
    gradients: gradients.light,
    text: `rgb(${shadesRaw.light.foreground}, ${shades.light.text})`,
    textPlaceholder: `rgb(${shadesRaw.light.foreground}, ${shades.light.textPlaceholder})`,
    textSecondary: `rgb(${shadesRaw.light.foreground}, ${shades.light.textSecondary})`,
    textTertiary: `rgb(${shadesRaw.light.foreground}, ${shades.light.textTertiary})`,
    ...accents.light,
  },
  dark: {
    accent: `${accents.dark.blue}`,
    accentSecondary: `rgba(${accentsRaw.dark.blue}, ${shades.dark.accentSecondary})`,
    accentSecondaryHover: `rgba(${accentsRaw.dark.blue}, ${shades.dark.accentSecondary})`,
    accentTertiary: `rgba(${accentsRaw.dark.blue}, calc(${shades.dark.accentSecondary} * 0.5))`,
    accentText: `rgb(${shadesRaw.dark.background})`,
    accentGradient: gradients.dark.blue,
    background: `rgb(${shadesRaw.dark.background})`,
    backgroundHide: `rgba(${shadesRaw.dark.foreground}, ${shades.dark.backgroundHide})`,
    backgroundSecondary: `rgb(${shadesRaw.dark.backgroundSecondary})`,
    backgroundTertiary: `rgb(${shadesRaw.dark.backgroundTertiary})`,
    border: `rgb(${shadesRaw.dark.foreground}, ${shades.dark.border})`,
    borderSecondary: `rgb(${shadesRaw.dark.foreground}, ${shades.dark.borderSecondary})`,
    borderTertiary: `rgb(${shadesRaw.dark.foreground}, ${shades.dark.borderTertiary})`,
    foreground: `rgb(${shadesRaw.dark.foreground})`,
    foregroundSecondary: `rgba(${shadesRaw.dark.foreground}, ${shades.dark.foregroundSecondary})`,
    foregroundSecondaryHover: `rgba(${shadesRaw.dark.foreground}, ${shades.dark.foregroundSecondaryHover})`,
    foregroundTertiary: `rgba(${shadesRaw.dark.foreground}, ${shades.dark.foregroundTertiary})`,
    groupBackground: `rgb(${shadesRaw.dark.groupBackground})`,
    groupBorder: `rgb(${shadesRaw.dark.foreground})`,
    gradients: gradients.dark,
    text: `rgb(${shadesRaw.dark.foreground}, ${shades.dark.text})`,
    textPlaceholder: `rgb(${shadesRaw.dark.foreground}, ${shades.dark.textPlaceholder})`,
    textSecondary: `rgb(${shadesRaw.dark.foreground}, ${shades.dark.textSecondary})`,
    textTertiary: `rgb(${shadesRaw.dark.foreground}, ${shades.dark.textTertiary})`,
    ...accents.dark,
  },
}
