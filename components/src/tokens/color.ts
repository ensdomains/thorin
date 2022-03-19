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
    blue: 'rgb(82, 152, 255)',
    green: 'rgb(73, 179, 147)',
    indigo: 'rgb(88, 84, 214)',
    orange: 'rgb(255, 149, 0)',
    pink: 'rgb(255, 45, 85)',
    purple: 'rgb(175, 82, 222)',
    red: 'rgb(213, 85, 85)',
    teal: 'rgb(90, 200, 250)',
    yellow: 'rgb(255, 204, 0)',
    grey: 'rgb(232, 232, 235)',
  },
  dark: {
    blue: 'rgb(82, 152, 255)',
    green: 'rgb(73, 179, 147)',
    indigo: 'rgb(94, 92, 230)',
    orange: 'rgb(255, 159, 10)',
    pink: 'rgb(255, 55, 95)',
    purple: 'rgb(191, 90, 242)',
    red: 'rgb(213, 85, 85)',
    teal: 'rgb(100, 210, 255)',
    yellow: 'rgb(255, 214, 10)',
    grey: 'rgb(59, 59, 61)',
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
    accentSecondary: `${accents.light.blue}, ${shades.light.accentSecondary}`,
    accentTertiary: `${accents.light.blue}, calc(${shades.light.accentSecondary} * 0.5)`,
    accentText: 'rgb(0, 0, 0)',
    background: 'rgb(255, 255, 255)',
    backgroundHide: `rgba(0,0,0, ${shades.light.backgroundHide})`,
    backgroundSecondary: 'rgb(246, 246, 248)',
    backgroundTertiary: '246, 246, 248',
    border: `rgb(0,0,0, ${shades.light.border})`,
    borderSecondary: `rgb(0,0,0, ${shades.light.borderSecondary})`,
    foreground: 'rgb(0, 0, 0)',
    foregroundSecondary: `rgba(0,0,0, ${shades.light.foregroundSecondary})`,
    foregroundSecondaryHover: `rgba(0,0,0, ${shades.light.foregroundSecondaryHover})`,
    foregroundTertiary: `rgba(0,0,0, ${shades.light.foregroundTertiary})`,
    groupBackground: 'rgb(253, 253, 255)',
    groupBorder: 'rgb(0, 0, 0)',
    gradients: gradients.light,
    text: `rgb(0,0,0, ${shades.light.text})`,
    textPlaceholder: `rgb(0, 0, 0, ${shades.light.textPlaceholder})`,
    textSecondary: `rgb(0, 0, 0, ${shades.light.textSecondary})`,
    textTertiary: `rgb(0, 0, 0, ${shades.light.textTertiary})`,
    ...accents.light,
  },
  dark: {
    accent: `${accents.dark.blue}`,
    accentSecondary: `${accents.dark.blue}, ${shades.dark.accentSecondary}`,
    accentTertiary: `${accents.dark.blue}, calc(${shades.dark.accentSecondary} * 0.5)`,
    accentText: 'rgb(255, 255, 255)',
    background: 'rgb(20, 20, 20)',
    backgroundHide: `rgba(255,255,255, ${shades.dark.backgroundHide})`,
    backgroundSecondary: 'rgb(10, 10, 10)',
    backgroundTertiary: 'rgb(20, 20, 20)',
    border: `rgb(255,255,255, ${shades.dark.border})`,
    borderSecondary: `rgb(255,255,255, ${shades.dark.borderSecondary})`,
    foreground: 'rgb(255, 255, 255)',
    foregroundSecondary: `rgba(255,255,255, ${shades.dark.foregroundSecondary})`,
    foregroundSecondaryHover: `rgba(255,255,255, ${shades.dark.foregroundSecondaryHover})`,
    foregroundTertiary: `rgba(255,255,255, ${shades.dark.foregroundTertiary})`,
    groupBackground: 'rgb(10, 10, 10)',
    groupBorder: 'rgb(255, 255, 255)',
    gradients: gradients.dark,
    text: `rgb(255,255,255, ${shades.dark.text})`,
    textPlaceholder: `rgb(255, 255, 255, ${shades.dark.textPlaceholder})`,
    textSecondary: `rgb(255, 255, 255, ${shades.dark.textSecondary})`,
    textTertiary: `rgb(255, 255, 255, ${shades.light.textTertiary})`,
    ...accents.dark,
  },
}
