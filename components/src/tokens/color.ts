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

const accents: { [key in Mode]: { [key in Accent]: string } } = {
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

export const colors = {
  base: {
    black: 'rgb(0, 0, 0)',
    white: 'rgb(255, 255, 255)',
    current: 'currentColor',
    inherit: 'inherit',
    transparent: 'transparent',
  },
  light: {
    background: '246, 246, 248',
    backgroundSecondary: '246, 246, 248',
    backgroundTertiary: '246, 246, 248',
    foreground: '0, 0, 0',
    groupBackground: '253, 253, 255',
    groupBorder: '0, 0, 0',
    gradients: gradients.light,
    ...accents.light,
  },
  dark: {
    background: '20, 20, 20',
    backgroundSecondary: '10, 10, 10',
    backgroundTertiary: '20, 20, 20',
    foreground: '255, 255, 255',
    groupBackground: '10, 10, 10',
    groupBorder: '255, 255, 255',
    gradients: gradients.dark,
    ...accents.dark,
  },
}

export const shades = {
  light: {
    accent: '0.7',
    accentSecondary: '0.15',
    accentSecondaryHover: '0.2',
    backgroundHide: '0.1',
    backgroundHideFallback: '0.5',
    foregroundSecondary: '0.02',
    foregroundSecondaryHover: '0.01',
    foregroundTertiary: '0.033',
    groupBorder: '0.075',
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
    text: '0.7',
    textSecondary: '0.5',
    textSecondaryHover: '0.65',
    textTertiary: '0.35',
    textTertiaryHover: '0.4',
    textPlaceholder: '0.25',
  },
}
