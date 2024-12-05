import * as React from 'react'

import { P, match } from 'ts-pattern'

import { scale } from '@/src/css/utils/common'

import { removeNullishProps } from '@/src/utils/removeNullishProps'

import { getValueForSize } from './utils/getValueForSize'

import type { ReactNodeNoStrings } from '../../../types'
import { Spinner } from '../Spinner/Spinner'
import type { AsProp, BoxProps } from '../Box/Box'
import { Box } from '../Box/Box'
import * as styles from './Button.css'
import clsx from 'clsx'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ColorStyles, Hue } from '@/src/tokens'

export type Size = 'small' | 'medium' | 'flexible'

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AllHTMLAttributes<HTMLAnchorElement>

type BaseProps = {
  /** An alternative element type to render the component as. */
  as?: 'a'
  children: NativeButtonProps['children']
  /** If true, prevents user interaction with button. */
  disabled?: NativeButtonProps['disabled']
  /** Insert a ReactNode before the children */
  prefix?: AsProp
  /** Shows loading spinner inside button */
  loading?: boolean
  /** Constrains button to specific shape */
  shape?: 'rectangle' | 'square' | 'rounded' | 'circle'
  /** Sets dimensions and layout  */
  size?: Size
  /** Adds ReactNode after children */
  suffix?: AsProp
  /** The zIndex attribute for button element. */
  zIndex?: string
  /** If true, sets the style to indicate "on" state. Useful for toggles switches. */
  pressed?: boolean
  /** If true, adds a box-shadow */
  shadow?: boolean
  /** If true, makes inner div full width */
  fullWidthContent?: boolean
  /** When set, shows a count indicator on the button */
  count?: number
  /** The handler for click events. */
  onClick?: NativeButtonProps['onClick']
  /** Show indicator that button has extra info via tooltip. */
  shouldShowTooltipIndicator?: boolean
  color?: Hue
  colorStyle?: ColorStyles
} & Omit<BoxProps, 'size' | 'prefix'>

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

type ButtonBoxProps = {
  $pressed: boolean
  $shadow: boolean
  $shape?: BaseProps['shape']
  $size?: BaseProps['size']
  $type?: BaseProps['type']
  $colorStyle: ColorStyles
  $color?: Hue
  $hasCounter?: boolean
}
const ButtonBox = React.forwardRef<
  HTMLButtonElement,
  BoxProps & ButtonBoxProps
>(
  (
    {
      $pressed,
      $shadow,
      $shape = 'rectangle',
      $size = 'medium',
      $colorStyle = 'accentPrimary',
      $hasCounter,
      $color,
      as,
      className,
      style,
      ...props
    },
    ref,
  ) => (
    <Box
      alignItems="center"
      as={as ?? 'button'}
      backgroundColor={{
        base: $pressed ? `${$colorStyle}Hover` : `${$colorStyle}Background`,
        hover: `${$colorStyle}Hover`,
        disabled: `disabledBackground`,
      }}
      borderColor={{
        base: `${$colorStyle}Border`,
        disabled: `disabledBorder`,
        hover: `${$colorStyle}Hover`,
      }}
      borderRadius={['circle', 'rounded'].includes($shape) ? 'full' : 'large'}
      borderStyle="solid"
      borderWidth="1x"
      className={clsx(styles.buttonBox, className)}
      style={{ ...style, ...assignInlineVars({ [styles.hasShadow]: $shadow ? '0.25 grey' : 'none' }) }}
      color={{
        base: $color || `${$colorStyle}Text`,
        disabled: 'disabledText',
      }}
      cursor={{ base: 'pointer', disabled: 'not-allowed' }}
      display="flex"
      fill={`${$colorStyle}Text`}
      fontSize={getValueForSize($size, 'fontSize')}
      fontWeight="bold"
      gap="2"
      height={getValueForSize($size, 'height')}
      justifyContent="center"
      position="relative"
      // px={$hasCounter ? '12' : getValueForSize($size, 'px')}
      ref={ref}
      transitionDuration={150}
      transitionProperty="all"
      transitionTimingFunction="inOut"
      width={
        ['square', 'circle'].includes($shape)
          ? getValueForSize($size, 'height')
          : 'full'
      }
      {...{
        px: $hasCounter ? '12' : getValueForSize($size, 'px'),
        ...props,
      }}
    />
  ),
)

const SVGBox = ({
  $size,
  ...props
}: BoxProps & {
  $size: 'small' | 'medium' | 'flexible'
}) => <Box display="block" wh={getValueForSize($size, 'svgSize')} {...props} />

const ContentBox = ({
  $fullWidth,
  ...props
}: BoxProps & { $fullWidth?: boolean }) => (
  <Box
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    width={$fullWidth ? 'full' : undefined}
    {...props}
  />
)

const CounterBox = (props: BoxProps) => (
  <Box
    alignItems="center"
    display="flex"
    height="full"
    justifyContent="flex-end"
    pointerEvents="none"
    position="absolute"
    pr="3"
    right="0"
    top="0"
    {...props}
  />
)

const CounterIconBox = ({
  $visible,
  $colorStyle,
  className,
  style,
  ...props
}: BoxProps & {
  $visible: boolean
  $colorStyle: ColorStyles
}) => (
  <Box
    alignItems="center"
    borderColor={`${$colorStyle}Text`}
    borderRadius="full"
    borderStyle="solid"
    borderWidth="2x"
    boxSizing="border-box"
    color={`${$colorStyle}Text`}
    display="flex"
    fontSize="extraSmall"
    height="6"
    justifyContent="center"
    minWidth="6"
    opacity={$visible ? '1' : '0'}
    pointerEvents="none"
    px="1"
    transitionDuration={300}
    transitionProperty="all"
    transitionTimingFunction="inOut"
    {...props}
    className={clsx(styles.counterIconBox, className)}
    style={{ ...style, ...assignInlineVars({
      [styles.counterIconBoxTransform]: $visible ? scale(1) : scale(0.3),
    }) }}
  />
)

const TooltipIndicatorBox = (props: BoxProps) => (
  <Box
    alignItems="center"
    backgroundColor="yellowPrimary"
    borderRadius="full"
    color="backgroundPrimary"
    display="flex"
    justifyContent="center"
    position="absolute"
    right="-4.5"
    top="-4.5"
    wh="6"
    {...props}
  />
)

export type ButtonProps = BaseProps & (WithoutAnchor | WithAnchor)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
      fullWidthContent,
      count,
      color,
      shouldShowTooltipIndicator,
      as: asProp,
      ...props
    },
    ref,
  ) => {
    const labelContent = (
      <ContentBox $fullWidth={fullWidthContent}>{children}</ContentBox>
    )

    let childContent: ReactNodeNoStrings
    if (shape === 'circle' || shape === 'square') {
      childContent = loading ? <Spinner /> : labelContent
    }
    else {
      const prefixOrLoading = match([loading, !!prefix, !!suffix])
        .with([true, true, P._], () => <Spinner />)
        .with([true, false, false], () => <Spinner />)
        .with([P._, true, P._], () =>
          React.isValidElement(prefix)
            ? (
                <SVGBox $size={size} as={prefix} />
              )
            : null,
        )
        .otherwise(() => null)

      const suffixOrLoading = match([loading, !!prefix, !!suffix])
        .with([true, false, true], () => <Spinner />)
        .with([P._, P._, true], () =>
          React.isValidElement(suffix)
            ? (
                <SVGBox $size={size} as={suffix} />
              )
            : null,
        )
        .otherwise(() => null)

      childContent = (
        <>
          {prefixOrLoading}
          {labelContent}
          {suffixOrLoading}
        </>
      )
    }

    return (
      <ButtonBox
        $color={color}
        $colorStyle={colorStyle}
        $hasCounter={!!count}
        $pressed={pressed}
        $shadow={shadow}
        $shape={shape}
        $size={size}
        as={asProp}
        disabled={disabled}
        href={href}
        ref={ref}
        rel={rel}
        tabIndex={tabIndex}
        target={target}
        type={type}
        // position={zIndex && 'relative'}
        zIndex={zIndex}
        onClick={onClick}
        {...removeNullishProps(props)}
      >
        {shouldShowTooltipIndicator && (
          <TooltipIndicatorBox data-testid="tooltip-indicator">
            ?
          </TooltipIndicatorBox>
        )}

        {childContent}
        <CounterBox>
          <CounterIconBox $colorStyle={colorStyle} $visible={!!count}>
            {count}
          </CounterIconBox>
        </CounterBox>
      </ButtonBox>
    )
  },
)

Button.displayName = 'Button'
