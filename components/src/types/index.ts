import * as React from 'react'

import 'styled-components'
import { Mode, Accent as TokenAccent } from '@/src/tokens'

export type AllOrNone<T> = T | { [K in keyof T]?: never }

/*
 * Disallow string from React.ReactNode
 */
export type ReactNodeNoStrings =
  | React.ReactElement
  | React.ReactNodeArray
  | boolean
  | null
  | undefined

/* Basic empty type instead of using `{}`
 * https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
 */
export type EmptyObject = { [k: string]: unknown }

type Accent = TokenAccent | 'foreground'

export interface DefaultTheme {
  mode: 'light' | 'dark'
  defaultAccent?: Accent
  /** Default mode name. */
  defaultMode?: Mode
  /** Element to bind theme */
  element?: string | HTMLElement
  /** Forced accent name */
  forcedAccent?: Accent
  /** Forced mode name */
  forcedMode?: Mode
}

export type Size = 'small' | 'medium' | 'extraSmall' | undefined

declare module 'styled-components' {
  interface DefaultTheme {
    mode: 'light' | 'dark'
    defaultAccent?: Accent
    /** Default mode name. */
    defaultMode?: Mode
    /** Element to bind theme */
    element?: string | HTMLElement
    /** Forced accent name */
    forcedAccent?: Accent
    /** Forced mode name */
    forcedMode?: Mode
  }
}
