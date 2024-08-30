import type * as React from 'react'

import type { Hue as TokenHue, Mode as TokenMode, Tokens } from '@/src/tokens'

export type AllOrNone<T> = T | { [K in keyof T]?: never }

export type {
  Color,
  ColorStyle,
  WithColor,
  WithColorStyle,
} from './withColorOrColorStyle'

export type { FontVariant, WithTypography } from './withTypography'

/*
 * Disallow string from React.ReactNode
 */
export type ReactNodeNoStrings =
  | React.ReactElement
  | React.ReactNode[]
  | boolean
  | null
  | undefined

/* Basic empty type instead of using `{}`
 * https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
 */
export type EmptyObject = { [k: string]: unknown }

export type Accent = TokenHue | 'foreground'

export type Mode = TokenMode

export type DefaultTheme = Tokens

export type Size = 'small' | 'medium' | 'extraSmall' | undefined

export type OptionalTitle = AllOrNone<{
  title: string
  titleId: string
}>
export type IconProps = React.SVGProps<SVGSVGElement> & OptionalTitle

export type Alert = 'error' | 'warning' | 'info'
export type WithAlert = {
  alert?: Alert
}

export type Icon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>

export type WithIcon = {
  /** An svg to be used by the component */
  icon?: React.ReactNode
}

export type Neverable<TNever, TOmit> = {
  [P in keyof Omit<TNever, keyof TOmit>]?: never
}
