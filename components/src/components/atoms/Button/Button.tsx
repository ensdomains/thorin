import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'

import { ReactNodeNoStrings } from '../../../types'
import { Spinner } from '../Spinner'
import { Typography } from '../Typography'
import { GetCenterProps, getCenterProps } from './utils'

export type Size = 'small' | 'medium'

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AllHTMLAttributes<HTMLAnchorElement>

type Variant = 'primary' | 'secondary' | 'action' | 'transparent'

type Tone = 'accent' | 'blue' | 'green' | 'red'

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
  tone: Tone
}

const getAccentColour = (
  mode: 'light' | 'dark',
  tone: Tone,
  accent:
    | 'accent'
    | 'accentText'
    | 'accentGradient'
    | 'accentSecondary'
    | 'accentSecondaryHover',
) => {
  if (tone === 'accent') {
    return tokens.colors[mode][accent]
  }

  if (tone === 'blue') {
    console.log('mode: ', mode)
    console.log('tone: ', tone)
    console.log('accent: ', accent)
    console.log('result: ', tokens.colors[mode][tone])
  }

  switch (accent) {
    case 'accent':
      return tokens.colors[mode][tone]
    case 'accentText':
      return tokens.colors.base.white
    case 'accentGradient':
      return tokens.colors[mode].gradients[tone]
    case 'accentSecondary':
      return `rgba(${tokens.accentsRaw[mode][tone]}, ${tokens.shades[mode][accent]})`
    case 'accentSecondaryHover':
      return `rgba(${tokens.accentsRaw[mode][tone]}, ${tokens.shades[mode][accent]})`
    default:
      return ``
  }
}

const ButtonElement = styled.button<ButtonElement>`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: ${tokens.space['4']};
  justify-content: center;
  transition-propery: all;
  transition-duration: ${tokens.transitionDuration['150']};
  transition-timing-function: ${tokens.transitionTimingFunction['inOut']};
  letter-spacing: ${tokens.letterSpacings['-0.01']};

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0px);
    filter: brightness(1);
  }

  ${(p) => `
    ${p.disabled ? `cursor: not-allowed` : ``};
    ${p.center ? `position: relative` : ``};
    ${p.pressed ? `brightness(0.95)` : ``};
    ${p.shadowless ? `box-shadow: none !important` : ``};
    
    box-shadow: ${tokens.shadows['0.25']} ${tokens.colors[p.theme.mode].grey};
    
    &:disabled {
      background-color: ${tokens.colors[p.theme.mode].grey};
      transform: translateY(0px);
      filter: brightness(1);
    }
  `}

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
          padding: 0 ${tokens.space['4']};
        `
      case 'medium':
        return `
          border-radius: ${tokens.radii.extraLarge};
          font-size: ${tokens.fontSizes.large};
          padding: ${tokens.space['3.5']} ${tokens.space['4']};
        `
      default:
        return ``
    }
  }}
  ${(p) => {
    switch (p.variant) {
      case 'primary':
        return `
          color: ${getAccentColour(p.theme.mode, p.tone, 'accentText')};
          background: ${getAccentColour(p.theme.mode, p.tone, 'accent')};
        `
      case 'secondary':
        return `
          color: ${tokens.colors[p.theme.mode].textSecondary};
          background: ${tokens.colors[p.theme.mode].grey};
        `
      case 'action':
        return `
          color: ${getAccentColour(p.theme.mode, p.tone, 'accentText')};
          background: ${getAccentColour(
            p.theme.mode,
            p.tone,
            'accentGradient',
          )};
        `
      case 'transparent':
        return `
          color: ${tokens.colors[p.theme.mode].textTertiary};
          
          &:hover {
              background-color: ${
                tokens.colors[p.theme.mode].foregroundTertiary
              };
          }
          
          &:active {
              background-color: ${
                tokens.colors[p.theme.mode].foregroundTertiary
              };
          }
        `
      default:
        return ``
    }
  }}
  
  ${({ size, shape }) => {
    if (shape === 'square') {
      return `border-radius: ${
        size === 'small' ? tokens.radii['large'] : tokens.radii['2xLarge']
      };`
    }

    return ''
  }}
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
