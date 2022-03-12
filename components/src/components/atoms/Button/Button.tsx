import * as React from 'react'
import styled from 'styled-components'

import { ReactNodeNoStrings } from '../../../types'
import { Spinner } from '../Spinner'
import { Typography } from '../Typography'
import { GetCenterProps, getCenterProps } from './utils'
import { tokens } from '@/src/tokens'

export type Size = 'small' | 'medium'

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AllHTMLAttributes<HTMLAnchorElement>

type Variant = 'primary' | 'secondary' | 'action' | 'transparent'

type Tone = 'accent' | 'bule' | 'green' | 'red'

type BaseProps = {
  /** Centers text and reserves space for icon and spinner */
  center?: boolean
  children: NativeButtonProps['children']
  /** Marks as unusable */
  disabled?: boolean
  /** Adds ReactNode before children */
  prefix?: ReactNodeNoStrings
  /** Shows loading spinner inside button */
  loading?: boolean
  /** Constrains button to specific shape */
  shape?: 'square' | 'circle'
  /** Sets dimensions and layout  */
  size?: Size
  /** Adds ReactNode after children */
  suffix?: ReactNodeNoStrings
  tabIndex?: NativeButtonProps['tabIndex']
  type?: NativeButtonProps['type']
  variant?: Variant
  width?: string
  zIndex?: string
  pressed?: boolean
  shadowless?: boolean
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
}

type WithTone = {
  tone?: Tone
  variant?: 'primary' | 'secondary'
}

type WithoutTone = {
  tone?: never
  variant?: Variant
}

type WithAnchor = {
  as?: 'a'
  href?: string
  rel?: NativeAnchorProps['rel']
  target?: NativeAnchorProps['target']
}

type WithoutAnchor = {
  as?: 'button'
  href?: never
  rel?: never
  target?: never
}

interface ButtonElement {
  pressed: boolean
  shadowless: boolean
  shape?: 'circle' | 'square'
  size?: 'extraSmall' | 'small' | 'medium'
  variant: 'primary' | 'secondary' | 'action' | 'transparent'
  type?: NativeButtonProps['type']
  center: boolean | undefined
}

const ButtonElement = styled.button<ButtonElement>`
  ${(p) => {
    switch (p.shape) {
      case 'circle':
        return `
          border-radius: ${tokens.radii.full};
        `
      default:
        return ``
    }
  }}
  ${(p) => {
    switch (p.size) {
      case 'extraSmall':
        return `
          border-radius: ${tokens.radii.large};
          font-size: ${tokens.fontSizes.small};
          padding: ${tokens.space['2']};
        `
      case 'small':
        return `
          border-radius: ${tokens.radii.large};
          font-size: ${tokens.fontSizes.small};
          height: ${tokens.space['10']};
          padding: ${tokens.space['4']};
        `
      case 'medium':
        return `
          border-radius: ${tokens.radii.extraLarge};
          font-size: ${tokens.fontSizes.large};
          height: ${tokens.space['10']};
          padding: ${tokens.space['4']};
        `
      default:
        return ``
    }
  }}
  ${(p) => {
    switch (p.variant) {
      case 'primary':
        return `
          color: rgb(${tokens.colors[p.theme.mode].foreground});
          background: rgb(${tokens.shades[p.theme.mode].accent});
        `
      case 'secondary':
        return `
          color: rgb(${tokens.shades[p.theme.mode].textSecondary});
          background: rgb(${tokens.colors[p.theme.mode].grey});
        `
      case 'action':
        return `
          color: rgb(${tokens.colors[p.theme.mode].foreground});
          background: rgb(${tokens.colors[p.theme.mode].foreground});
        `
      case 'transparent':
        return `
          color: rgb(${tokens.shades[p.theme.mode].textTertiary});
          
          &:hover {
              background-color: rgb(${
                tokens.shades[p.theme.mode].foregroundTertiary
              });
          }
          
          &:active {
              background-color: rgb(${
                tokens.shades[p.theme.mode].foregroundTertiary
              });
          }
        `
      default:
        return ``
    }
  }}
  ${(p) => `
    ${p.disabled && `cursor: not-allowed`};
    ${p.center && `position: relative`};
    ${p.pressed && `brightness(0.95)`};
    ${p.shadowless && `box-shadow: none !important`};
  `}
`

const PrefixContainer = styled.div<GetCenterProps>`
  ${getCenterProps}
`

const LoadingContainer = styled.div``

const LabelContainer = styled(Typography)`
  color: inherit;
  font-size: inherit;
  font-weight: ${tokens.fontWeights['semiBold']};
`

export type Props = BaseProps &
  (WithTone | WithoutTone) &
  (WithAnchor | WithoutAnchor)

export const Button = React.forwardRef(
  (
    {
      center,
      children,
      disabled,
      href,
      prefix,
      loading,
      rel,
      shape,
      size = 'medium',
      suffix,
      tabIndex,
      target,
      tone = 'accent',
      type,
      variant = 'primary',
      width,
      zIndex,
      onClick,
      pressed = false,
      shadowless = false,
    }: Props,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const labelContent = <LabelContainer ellipsis>{children}</LabelContainer>

    let childContent: ReactNodeNoStrings
    if (shape) {
      childContent = loading ? <Spinner /> : labelContent
    } else {
      childContent = (
        <>
          {prefix && (
            <PrefixContainer {...{ center, size, side: 'left' }}>
              {prefix}
            </PrefixContainer>
          )}
          {labelContent}

          {(loading || suffix) && (
            <LoadingContainer {...{ center, size, side: 'right' }}>
              {loading ? <Spinner /> : suffix}
            </LoadingContainer>
          )}
        </>
      )
    }

    return (
      <ButtonElement
        {...{
          variant,
          tone,
          size,
          shape,
          shadowless,
          pressed,
          center,
          disabled,
          href,
          ref,
          rel,
          tabIndex,
          target,
          type,
          onClick,
          zIndex,
          position: zIndex && 'relative',
          width: width ?? '100%',
        }}
      >
        {childContent}
      </ButtonElement>
    )
  },
)

Button.displayName = 'Button'
