import { parseCookies, setCookie } from 'nookies'

import type { Accent, Mode } from '@ensdomains/thorin'

export const accentKey = 'accent'
export const modeKey = 'mode'

export const setThemeAccent = (accent: string) =>
  setCookie({}, accentKey, accent, {
    path: '/',
  })

export const setThemeMode = (mode: string) =>
  setCookie({}, modeKey, mode, {
    path: '/',
  })

export const getThemeAccent = (): Accent | 'foreground' | undefined =>
  parseCookies({})?.[accentKey] as Accent | 'foreground' | undefined

export const getThemeMode = (): Mode | undefined =>
  parseCookies({})?.[modeKey] as Mode | undefined
