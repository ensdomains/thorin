import * as React from 'react'
import styled, { DefaultTheme, css } from 'styled-components'

import { ReactNodeNoStrings } from '../../../types'
import { Spinner } from '../Spinner'
import { Typography } from '../Typography'
import { GetCenterProps, getCenterProps } from './utils'

export type Size = 'extraSmall' | 'small' | 'medium'

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AllHTMLAttributes<HTMLAnchorElement>

type Variant = 'primary' | 'secondary' | 'action' | 'transparent'

type Tone = 'accent' | 'blue' | 'green' | 'red' | 'grey'

type BaseProps = {
  /** An alternative element type to render the component as.*/
  as?: 'a'
  /** Centers text and reserves space for icon and spinner */
  center?: boolean
  children: NativeButtonProps['children']
  /** If true, prevents user interaction with button. */
  disabled?: NativeButtonProps['disabled']
  /** Insert a ReactNode before the children */
  prefix?: ReactNodeNoStrings
  /** Shows loading spinner inside button */
  loading?: boolean
  /** Constrains button to specific shape */
  shape?: 'square' | 'rounded' | 'circle'
  /** Sets dimensions and layout  */
  size?: Size
  /** Adds ReactNode after children */
  suffix?: ReactNodeNoStrings
  /** The tabIndex attribute for button elemnt. */
  tabIndex?: NativeButtonProps['tabIndex']
  /** The type attribute for button element. */
  type?: NativeButtonProps['type']
  /** Sets the styling of the component.  */
  variant?: Variant
  /** The zIndex attribute for button element. */
  zIndex?: string
  /** If true, sets the style to indicate "on" state. Useful for toggles switches. */
  pressed?: boolean
  /** If true, removes the box-shadow */
  shadowless?: boolean
  /** If true, adds an outline to the button */
  outlined?: boolean
  /** If true, makes inner div full width*/
  fullWidthContent?: boolean
  /** The handler for click events. */
  onClick?: NativeButtonProps['onClick']
} & Omit<NativeButtonProps, 'prefix' | 'size'>

type WithTone = {
  /** Sets the color scheme when variant is 'primary', 'action', or 'secondary' */
  tone?: Tone
  variant?: 'primary' | 'action' | 'secondary'
}

type WithoutTone = {
  tone?: never
  variant?: Variant
}

type WithAnchor = {
  /** The href attribute for the anchor element. */
  href?: NativeAnchorProps['href']
  /** The rel attribute for the anchor element. */
  rel?: NativeAnchorProps['rel']
  /** The target attribute for the anchor element. */
  target?: NativeAnchorProps['target']
}

type WithoutAnchor = {
  href?: never
  rel?: never
  target?: never
}

interface ButtonElement {
  $pressed: boolean
  $shadowless: boolean
  $outlined: boolean
  $shape?: BaseProps['shape']
  $size?: BaseProps['size']
  $variant: BaseProps['variant']
  $type?: BaseProps['type']
  $center: boolean | undefined
  $tone: Tone
}

const getAccentColour = (
  theme: DefaultTheme,
  tone: Tone,
  accent:
    | 'accent'
    | 'accentText'
    | 'accentGradient'
    | 'accentSecondary'
    | 'accentSecondaryHover',
  type?: 'secondary',
): string => {
  if (tone === 'accent') {
    return theme.colors.textAccent
  }

  if (tone === 'grey') {
    switch (accent) {
      case 'accentText':
        return theme.colors.text
      case 'accentSecondary':
        return theme.colors.textSecondary
      default:
        return type === 'secondary'
          ? theme.colors.textSecondary
          : theme.colors[tone]
    }
  }

  switch (accent) {
    case 'accent':
      return theme.colors[tone]
    case 'accentText':
      return theme.colors.textAccent
    case 'accentGradient':
      return theme.colors.gradients[tone]
    case 'accentSecondary':
      return theme.colors[`${tone}Bright`]
    case 'accentSecondaryHover':
      return theme.colors[tone]
    default:
      return ``
  }
}

const ButtonElement = styled.button<ButtonElement>(
  ({
    theme,
    disabled,
    $center,
    $pressed,
    $shadowless,
    $outlined,
    $size,
    $variant,
    $tone,
    $shape,
  }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition-property: all;

    gap: ${theme.space['4']};
    transition-duration: ${theme.transitionDuration['150']};
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    letter-spacing: ${theme.letterSpacings['-0.01']};
    width: 100%;

    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.05);
    }

    &:active {
      transform: translateY(0px);
      filter: brightness(1);
    }

    ${disabled
      ? css`
          cursor: not-allowed;
        `
      : ``};
    ${$center
      ? css`
          position: relative;
        `
      : ``};
    ${$pressed
      ? css`
          filter: brightness(0.95);
        `
      : ``};
    ${$shadowless
      ? css`
          box-shadow: none !important;
        `
      : ``};

    ${$outlined
      ? css`
          border: ${theme.borderWidths.px} ${theme.borderStyles.solid}
            ${theme.colors.border};
        `
      : ``}

    box-shadow: ${theme.shadows['0.25']} ${theme.colors.grey};

    border-radius: ${theme.radii.extraLarge};
    font-size: ${theme.fontSizes.large};
    padding: ${theme.space['3.5']} ${theme.space['4']};

    ${() => {
      switch ($size) {
        case 'extraSmall':
          return css`
            border-radius: ${theme.radii.large};
            font-size: ${theme.fontSizes.small};
            padding: ${theme.space['2']};
          `
        case 'small':
          return css`
            border-radius: ${theme.radii.large};
            font-size: ${theme.fontSizes.small};
            height: ${theme.space['10']};
            padding: 0 ${theme.space['4']};
          `
        case 'medium':
          return ``
        default:
          return ``
      }
    }}

    ${() => {
      switch ($variant) {
        case 'primary':
          return css`
            color: ${getAccentColour(theme, $tone, 'accentText')};
            background: ${getAccentColour(theme, $tone, 'accent')};
          `
        case 'secondary':
          return css`
            color: ${getAccentColour(theme, $tone, 'accent', 'secondary')};
            background: ${getAccentColour(theme, $tone, 'accentSecondary')};
          `
        case 'action':
          return css`
            color: ${getAccentColour(theme, $tone, 'accentText')};
            background: ${getAccentColour(theme, $tone, 'accentGradient')};
          `
        case 'transparent':
          return css`
            color: ${theme.colors.text};

            &:hover,
            &:active {
              background-color: ${theme.colors.textSecondary};
            }
          `
        default:
          return ``
      }
    }}
    
  ${() => {
      switch ($shape) {
        case 'circle':
          return css`
            border-radius: ${theme.radii.full};
          `
        case 'square':
          return css`
            border-radius: ${$size === 'small'
              ? theme.radii['large']
              : theme.radii['2xLarge']};
          `
        case 'rounded':
          return css`
            border-radius: ${theme.radii.extraLarge};
          `
        default:
          return ``
      }
    }}

  ${() => {
      if ($size === 'medium' && $center) {
        return css`
          padding-left: ${theme.space['14']};
          padding-right: ${theme.space['14']};
        `
      }
      return ''
    }}

  ${() => {
      if ($shadowless && $pressed && $variant === 'transparent') {
        return css`
          background-color: ${theme.colors.backgroundSecondary};
        `
      }
      return ''
    }}

    &:disabled {
      background-color: ${theme.colors.grey};
      ${$variant !== 'transparent' &&
      css`
        color: ${theme.colors.background};
      `}
      transform: translateY(0px);
      filter: brightness(1);
    }
  `,
)

const PrefixContainer = styled.div<GetCenterProps>(
  () => css`
    ${getCenterProps}
  `,
)

const LoadingContainer = styled.div(() => css``)

const LabelContainer = styled(Typography)<{
  $fullWidthContent: boolean
}>(
  ({ theme, $fullWidthContent }) => css`
    color: inherit;
    font-size: inherit;
    font-weight: ${theme.fontWeights['semiBold']};
    ${$fullWidthContent && `width: 100%;`}
  `,
)

export type Props = BaseProps &
  (WithTone | WithoutTone) &
  (WithoutAnchor | WithAnchor)

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
      type = 'button',
      variant = 'primary',
      zIndex,
      onClick,
      pressed = false,
      shadowless = false,
      outlined = false,
      fullWidthContent = false,
      as: asProp,
      ...props
    }: Props,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const labelContent = (
      <LabelContainer $fullWidthContent={fullWidthContent} ellipsis>
        {children}
      </LabelContainer>
    )
    let childContent: ReactNodeNoStrings
    if (shape) {
      childContent = loading ? (
        <Spinner color="backgroundPrimary" />
      ) : (
        labelContent
      )
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
              {loading ? <Spinner color="backgroundPrimary" /> : suffix}
            </LoadingContainer>
          )}
        </>
      )
    }

    return (
      <ButtonElement
        {...props}
        $center={center}
        $fullWidthContent={fullWidthContent}
        $outlined={outlined}
        $pressed={pressed}
        $shadowless={shadowless}
        $shape={shape}
        $size={size}
        $tone={tone}
        $variant={variant}
        as={asProp as any}
        disabled={disabled}
        href={href}
        position={zIndex && 'relative'}
        ref={ref}
        rel={rel}
        tabIndex={tabIndex}
        target={target}
        type={type}
        zIndex={zIndex}
        onClick={onClick}
      >
        {childContent}
      </ButtonElement>
    )
  },
)

Button.displayName = 'Button'
