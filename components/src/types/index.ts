import * as React from 'react'

import 'styled-components'
import { Accent as TokenAccent, Mode as TokenMode } from '@/src/tokens'

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

export type Accent = TokenAccent | 'foreground'

export type Mode = TokenMode

export interface DefaultTheme {
  mode: 'light' | 'dark'
  defaultAccent?: Accent
  /** Default mode name. */
  defaultMode?: TokenMode
  /** Element to bind theme */
  element?: string | HTMLElement
  /** Forced accent name */
  forcedAccent?: Accent
  /** Forced mode name */
  forcedMode?: TokenMode
}

export type Size = 'small' | 'medium' | 'extraSmall' | undefined

declare module 'styled-components' {
  interface DefaultTheme {
    mode: 'light' | 'dark'
    defaultAccent?: Accent
    /** Default mode name. */
    defaultMode?: TokenMode
    /** Element to bind theme */
    element?: string | HTMLElement
    /** Forced accent name */
    forcedAccent?: Accent
    /** Forced mode name */
    forcedMode?: TokenMode
  }
}

export type OptionalTitle = AllOrNone<{
  title: string
  titleId: string
}>
export type IconProps = React.SVGProps<SVGSVGElement> & OptionalTitle
