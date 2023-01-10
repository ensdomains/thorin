import * as React from 'react'

import 'styled-components'
import { Hue, Hue as TokenHue, Mode as TokenMode, Tokens } from '@/src/tokens'

import { Typography } from '../components/atoms/Typography/Typography'

export type AllOrNone<T> = T | { [K in keyof T]?: never }

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

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Tokens {}
}

export type OptionalTitle = AllOrNone<{
  title: string
  titleId: string
}>
export type IconProps = React.SVGProps<SVGSVGElement> & OptionalTitle

export type WithColor = {
  /** The base color of the component */
  color?: Hue | 'background' | 'accent'
  /** The styling of the color of the component */
  colorScheme?: 'primary' | 'secondary' | 'gradient' | 'transparent' | 'text'
}

export type WithAlert = {
  alert?: 'error' | 'warning' | 'info'
}

type LegacyTypography =
  | 'small'
  | 'large'
  | 'extraLarge'
  | 'label'
  | 'labelHeading'

export type Typography =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'extraLarge'
  | 'extraLargeBold'
  | 'large'
  | 'largeBold'
  | 'regular'
  | 'regularBold'
  | 'small'
  | 'smallBold'
  | 'extraSmall'
  | 'extraSmallBold'

export type WithTypography = {
  fontVariant?: Typography | LegacyTypography
}

export type Icon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>

export type WithIcon = {
  /** An svg to be used by the component */
  icon?: Icon
}
