import * as React from 'react'
import styled, { css } from 'styled-components'

import { Space } from '@/src/tokens'

import {
  WithColorStyle,
  getColorStyle,
} from '@/src/types/withColorOrColorStyle'

import { ReactNodeNoStrings } from '../../../types'
import { Spinner } from '../Spinner'

export type Size = 'small' | 'medium' | 'flexible'

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AllHTMLAttributes<HTMLAnchorElement>

type BaseProps = {
  /** An alternative element type to render the component as.*/
  as?: 'a'
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
  /** The zIndex attribute for button element. */
  zIndex?: string
  /** If true, sets the style to indicate "on" state. Useful for toggles switches. */
  pressed?: boolean
  /** If true, adds a box-shadow */
  shadow?: boolean
  /** A space value for the width of the button */
  width?: Space
  /** If true, makes inner div full width */
  fullWidthContent?: boolean
  /** When set, shows a count indicator on the button */
  count?: number
  /** The handler for click events. */
  onClick?: NativeButtonProps['onClick']
  /** Show indicator that button has extra info via tooltip. */
  shouldShowTooltipIndicator?: boolean
} & Omit<NativeButtonProps, 'prefix' | 'size'>

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
  $shadow: boolean
  $outlined: boolean
  $shape?: BaseProps['shape']
  $size?: BaseProps['size']
  $type?: BaseProps['type']
  $center: boolean | undefined
  $colorStyle: WithColorStyle['colorStyle']
  $hasCounter?: boolean
  $width: BaseProps['width']
}

const ButtonElement = styled.button<ButtonElement>(
  ({
    theme,
    $pressed,
    $shadow,
    $size,
    $colorStyle = 'accentPrimary',
    $shape,
    $hasCounter,
    $width,
  }) => css`
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.space['2']};

    transition-property: all;
    transition-duration: ${theme.transitionDuration['150']};
    transition-timing-function: ${theme.transitionTimingFunction['inOut']};
    width: 100%;
    border-radius: ${theme.radii.large};
    font-weight: ${theme.fontWeights.bold};
    border-width: ${theme.borderWidths.px};
    border-style: ${theme.borderStyles.solid};

    background: ${getColorStyle($colorStyle, 'background')};
    color: ${getColorStyle($colorStyle, 'text')};
    border-color: ${getColorStyle($colorStyle, 'border')};

    &:hover {
      transform: translateY(-1px);
      background: ${getColorStyle($colorStyle, 'hover')};
    }

    &:active {
      transform: translateY(0px);
    }

    &:disabled {
      cursor: not-allowed;
      background: ${getColorStyle('disabled', 'background')};
      transform: none;
      color: ${getColorStyle('disabled', 'text')};
      border-color: transparent;
    }

    ${$pressed &&
    css`
      background: ${getColorStyle($colorStyle, 'hover')};
    `};

    ${$shadow &&
    css`
      box-shadow: ${theme.shadows['0.25']} ${theme.colors.grey};
    `};

    ${$size === 'small' &&
    css`
      font-size: ${theme.fontSizes.small};
      line-height: ${theme.lineHeights.small};
      height: ${theme.space['10']};
      padding: 0 ${theme.space['3.5']};
      svg {
        display: block;
        width: ${theme.space['3']};
        height: ${theme.space['3']};
        color: ${getColorStyle($colorStyle, 'text')};
      }
    `}

    ${$size === 'medium' &&
    css`
      font-size: ${theme.fontSizes.body};
      line-height: ${theme.lineHeights.body};
      height: ${theme.space['12']};
      padding: 0 ${theme.space['4']};
      svg {
        display: block;
        width: ${theme.space['4']};
        height: ${theme.space['4']};
        color: ${getColorStyle($colorStyle, 'text')};
      }
    `}

    &:disabled svg {
      color: ${getColorStyle('disabled', 'text')};
    }

    ${($shape === 'circle' || $shape === 'rounded') &&
    css`
      border-radius: ${theme.radii.full};
    `}

    ${($shape === 'circle' || $shape === 'square') &&
    $size === 'small' &&
    css`
      width: ${theme.space['10']};
    `}

    ${($shape === 'circle' || $shape === 'square') &&
    $size === 'medium' &&
    css`
      width: ${theme.space['12']};
    `}

    ${$hasCounter &&
    css`
      padding: 0 ${theme.space['12']};
    `}

    ${$width &&
    css`
      width: ${theme.space[$width]};
    `}
  `,
)

const ContentContainer = styled.div<{ $fullWidth?: boolean }>(
  ({ $fullWidth }) => css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    ${$fullWidth &&
    css`
      width: 100%;
    `}
  `,
)

const CounterWrapper = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding-right: ${theme.space[3]};

    display: flex;
    align-items: center;
    justify-content: flex-end;
    pointer-events: none;
  `,
)

const Counter = styled.div<{ $visible: boolean }>(
  ({ theme, $visible }) => css`
    display: flex;
    padding: 0 ${theme.space[1]};
    justify-content: center;
    align-items: center;
    border: 2px solid white;
    border-radius: ${theme.radii.full};
    font-size: ${theme.space[3]};
    min-width: ${theme.space[6]};
    height: ${theme.space[6]};
    box-sizing: border-box;
    transform: scale(1);
    opacity: 1;
    transition: all 0.3s ease-in-out;

    ${!$visible &&
    css`
      transform: scale(0.3);
      opacity: 0;
    `}
  `,
)

const TooltipIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e9b911;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  position: absolute;
  right: -10px;
  top: -10px;
  color: white;
`

export type Props = BaseProps & (WithoutAnchor | WithAnchor) & WithColorStyle

export const Button = React.forwardRef(
  (
    {
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
      colorStyle = 'accentPrimary',
      type = 'button',
      zIndex,
      onClick,
      pressed = false,
      shadow = false,
      width,
      fullWidthContent,
      count,
      shouldShowTooltipIndicator,
      as: asProp,
      ...props
    }: Props,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const labelContent = (
      <ContentContainer $fullWidth={fullWidthContent}>
        {children}
      </ContentContainer>
    )
    const spinnerColor = disabled ? 'greyPrimary' : 'backgroundPrimary'

    let childContent: ReactNodeNoStrings
    if (shape === 'circle' || shape === 'square') {
      childContent = loading ? <Spinner color={spinnerColor} /> : labelContent
    } else {
      const hasPrefix = !!prefix
      const hasNoPrefixNoSuffix = !hasPrefix && !suffix
      const hasSuffixNoPrefix = !hasPrefix && !!suffix

      let prefixOrLoading = prefix
      if (loading && hasPrefix)
        prefixOrLoading = <Spinner color={spinnerColor} />
      else if (loading && hasNoPrefixNoSuffix)
        prefixOrLoading = <Spinner color={spinnerColor} />

      let suffixOrLoading = suffix
      if (loading && hasSuffixNoPrefix)
        suffixOrLoading = <Spinner color={spinnerColor} />

      childContent = (
        <>
          {!!prefixOrLoading && prefixOrLoading}
          {labelContent}
          {!!suffixOrLoading && suffixOrLoading}
        </>
      )
    }

    return (
      <ButtonElement
        {...props}
        $colorStyle={colorStyle}
        $hasCounter={!!count}
        $pressed={pressed}
        $shadow={shadow}
        $shape={shape}
        $size={size}
        $width={width}
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
        {shouldShowTooltipIndicator && (
          <TooltipIndicator data-testid="tooltip-indicator">?</TooltipIndicator>
        )}

        {childContent}
        <CounterWrapper>
          <Counter $visible={!!count}>{count}</Counter>
        </CounterWrapper>
      </ButtonElement>
    )
  },
)

Button.displayName = 'Button'
