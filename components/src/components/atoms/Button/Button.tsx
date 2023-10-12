import * as React from 'react'

import { P, match } from 'ts-pattern'

import { Space } from '@/src/tokens'

import { scale, translateY } from '@/src/css/utils/common'

import { WithColorStyle, getValueForColourStyle } from './utils/withColorStyle'

import { getValueForSize } from './utils/getValueForSize'

import { ReactNodeNoStrings } from '../../../types'
import { Spinner } from '../Spinner'
import { Box, BoxProps } from '../Box/Box'

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
  shape?: 'rectangle' | 'square' | 'rounded' | 'circle'
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

type ButtonBoxProps = {
  $pressed: boolean
  $shadow: boolean
  $shape?: BaseProps['shape']
  $size?: BaseProps['size']
  $type?: BaseProps['type']
  $center: boolean | undefined
  $colorStyle: WithColorStyle['colorStyle']
  $hasCounter?: boolean
  $width: any
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
      $width = '$full',
      as,
      ...props
    },
    ref,
  ) => (
    <Box
      alignItems="center"
      as={as ?? 'button'}
      backgroundColor={{
        base: getValueForColourStyle(
          $colorStyle,
          $pressed ? 'hover' : 'background',
        ),
        hover: getValueForColourStyle($colorStyle, 'hover'),
        disabled: getValueForColourStyle('disabled', 'background'),
      }}
      borderColor={{
        base: getValueForColourStyle($colorStyle, 'border'),
        disabled: getValueForColourStyle('disabled', 'border'),
      }}
      borderRadius={['circle', 'rounded'].includes($shape) ? '$full' : '$large'}
      borderStyle="solid"
      borderWidth="$1x"
      boxShadow={$shadow ? '$0.25 $grey' : 'none'}
      color={{
        base: getValueForColourStyle($colorStyle, 'content'),
        disabled: getValueForColourStyle('disabled', 'content'),
      }}
      cursor={{ base: 'pointer', disabled: 'not-allowed' }}
      display="flex"
      fill={getValueForColourStyle($colorStyle, 'content')}
      fontWeight="$bold"
      gap="$2"
      height={getValueForSize($size, 'height')}
      justifyContent="center"
      position="relative"
      px={$hasCounter ? '$12' : getValueForSize($size, 'px')}
      ref={ref}
      transform={{
        base: translateY(0),
        hover: translateY(-1),
        active: translateY(-1),
        disabled: translateY(0),
      }}
      transitionDuration="$150"
      transitionProperty="all"
      transitionTimingFunction="$inOut"
      width={
        ['square', 'circle'].includes($shape)
          ? getValueForSize($size, 'height')
          : $width
      }
      {...props}
    />
  ),
)

const SVGBox = ({
  $size,
  $colorStyle,
  ...props
}: BoxProps & { $size: 'small' | 'medium' | 'flexible'; $colorStyle: any }) => (
  <Box
    color={getValueForColourStyle($colorStyle, 'content')}
    display="block"
    wh={getValueForSize($size, 'svgSize')}
    {...props}
  />
)

const ContentBox = ({
  $fullWidth,
  ...props
}: BoxProps & { $fullWidth?: boolean }) => (
  <Box
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    width={$fullWidth ? '$full' : undefined}
    {...props}
  />
)

const CounterBox = (props: BoxProps) => (
  <Box
    alignItems="center"
    display="flex"
    height="$full"
    justifyContent="flex-end"
    pointerEvents="none"
    position="absolute"
    pr="$3"
    right="0"
    top="0"
    {...props}
  />
)

const CounterIconBox = ({
  $visible,
  $colourStyle,
  ...props
}: BoxProps & {
  $visible: boolean
  $colourStyle: WithColorStyle['colorStyle']
}) => (
  <Box
    alignItems="center"
    borderColor={getValueForColourStyle($colourStyle, 'content')}
    borderRadius="$full"
    borderStyle="solid"
    borderWidth="$2x"
    boxSizing="border-box"
    color={getValueForColourStyle($colourStyle, 'content')}
    display="flex"
    fontSize="$extraSmall"
    height="$6"
    justifyContent="center"
    minWidth="$6"
    opacity={$visible ? 1 : 0}
    pointerEvents="none"
    px="$1"
    transform={$visible ? scale(1) : scale(0.3)}
    transitionDuration="$300"
    transitionProperty="all"
    transitionTimingFunction="$inOut"
    {...props}
  />
)

const TooltipIndicatorBox = (props: BoxProps) => (
  <Box
    alignItems="center"
    backgroundColor="$yellowPrimary"
    borderRadius="$full"
    color="$backgroundPrimary"
    display="flex"
    justifyContent="center"
    position="absolute"
    right="-10px"
    top="-10px"
    wh="$6"
    {...props}
  />
)

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
      colorStyle: colourStyle = 'accent',
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
      <ContentBox $fullWidth={fullWidthContent}>{children}</ContentBox>
    )

    let childContent: ReactNodeNoStrings
    if (shape === 'circle' || shape === 'square') {
      childContent = loading ? <Spinner /> : labelContent
    } else {
      const prefixOrLoading = match([loading, !!prefix, !!suffix])
        .with([true, true, P._], () => <Spinner />)
        .with([true, false, false], () => <Spinner />)
        .with([P._, true, P._], () =>
          React.isValidElement(prefix) ? (
            <SVGBox $colorStyle={colourStyle} $size={size} as={prefix} />
          ) : null,
        )
        .otherwise(() => null)

      const suffixOrLoading = match([loading, !!prefix, !!suffix])
        .with([true, false, true], () => <Spinner />)
        .with([P._, P._, true], () =>
          React.isValidElement(suffix) ? (
            <SVGBox $colorStyle={colourStyle} $size={size} as={suffix} />
          ) : null,
        )
        .otherwise(() => null)

      childContent = (
        <>
          {!!prefixOrLoading && prefixOrLoading}
          {labelContent}
          {!!suffixOrLoading && (
            <SVGBox
              $colorStyle={colourStyle}
              $size={size}
              as={suffixOrLoading as any}
            />
          )}
        </>
      )
    }

    return (
      <ButtonBox
        {...props}
        $center
        $colorStyle={colourStyle}
        $hasCounter={!!count}
        $pressed={pressed}
        $shadow={shadow}
        $shape={shape}
        $size={size}
        $width={width}
        as={asProp as any}
        disabled={disabled}
        rel={rel}
        tabIndex={tabIndex}
        target={target}
        type={type}
        zIndex={zIndex}
        //eslint-disable-next-line react/jsx-sort-props
        onClick={onClick}
        href={href}
        // position={zIndex && 'relative'}
        ref={ref}
      >
        {shouldShowTooltipIndicator && (
          <TooltipIndicatorBox data-testid="tooltip-indicator">
            ?
          </TooltipIndicatorBox>
        )}

        {childContent}
        <CounterBox>
          <CounterIconBox $colourStyle={colourStyle} $visible={!!count}>
            {count}
          </CounterIconBox>
        </CounterBox>
      </ButtonBox>
    )
  },
)

Button.displayName = 'Button'
