import * as React from 'react'

import type {
  DynamicPopoverProps,
  DynamicPopoverSide,
  PopoverProps } from '@/src/components/atoms/DynamicPopover/DynamicPopover'
import {
  DynamicPopover,
} from '@/src/components/atoms/DynamicPopover/DynamicPopover'
import type { Colors } from '@/src/tokens'

import type { BoxProps } from '../../atoms/Box/Box'
import { Box } from '../../atoms/Box/Box'
import { getValueForPlacement } from './utils/getValueForPlacement'
import * as styles from './styles.css'
import clsx from 'clsx'
import type { Color } from '@/src/tokens/color'

type TooltipPopoverElementProps = {
  // $background: Color
  // $placement: DynamicPopoverSide
  // $mobilePlacement: DynamicPopoverSide
}

const TooltipPopoverElement = ({
  // $background = 'backgroundPrimary',
  // $placement,
  // $mobilePlacement,
  children,
  className,
  ...props
}: BoxProps & TooltipPopoverElementProps) => (
  <Box
    {...props}
    // backgroundColor={$background}
    borderRadius="large"
    boxSizing="border-box"
    className={clsx(className, styles.popover)}
    overflow="visible"
    padding="2.5"
    position="relative"
  >
    {children}
    <Box
      // borderBottomColor={{
      //   base: getValueForPlacement(
      //     $mobilePlacement,
      //     'borderBottomColorFunction',
      //   )($background),
      //   sm: getValueForPlacement(
      //     $placement,
      //     'borderBottomColorFunction',
      //   )($background),
      // }}
      // borderLeftColor={{
      //   base: getValueForPlacement(
      //     $mobilePlacement,
      //     'borderLeftColorFunction',
      //   )($background),
      //   sm: getValueForPlacement(
      //     $placement,
      //     'borderLeftColorFunction',
      //   )($background),
      // }}
      // borderRightColor={{
      //   base: getValueForPlacement(
      //     $mobilePlacement,
      //     'borderRightColorFunction',
      //   )($background),
      //   sm: getValueForPlacement(
      //     $placement,
      //     'borderRightColorFunction',
      //   )($background),
      // }}
      borderStyle="solid"
      // borderTopColor={{
      //   base: getValueForPlacement(
      //     $mobilePlacement,
      //     'borderTopColorFunction',
      //   )($background),
      //   sm: getValueForPlacement(
      //     $placement,
      //     'borderTopColorFunction',
      //   )($background),
      // }}
      borderWidth="10x"
      // bottom={{
      //   base: getValueForPlacement($mobilePlacement, 'bottom'),
      //   sm: getValueForPlacement($placement, 'bottom'),
      // }}
      display="initial"
      height="0"
      // left={{
      //   base: getValueForPlacement($mobilePlacement, 'left'),
      //   sm: getValueForPlacement($placement, 'left'),
      // }}
      // margin={{
      //   xs: getValueForPlacement($mobilePlacement, 'margin'),
      //   sm: getValueForPlacement($placement, 'margin'),
      // }}
      position="absolute"
      // right={{
      //   base: getValueForPlacement($mobilePlacement, 'right'),
      //   sm: getValueForPlacement($placement, 'right'),
      // }}
      // top={{
      //   base: getValueForPlacement($mobilePlacement, 'top'),
      //   sm: getValueForPlacement($placement, 'top'),
      // }}
      width="0"
    />
  </Box>
)

type TooltipPopoverProps = PopoverProps & { background: `$${Colors}` }

const TooltipPopover = ({
  placement = 'top',
  mobilePlacement = 'top',
  background,
  children,
}: TooltipPopoverProps) => {
  return (
    <TooltipPopoverElement
      // $background={background}
      // $mobilePlacement={mobilePlacement}
      // $placement={placement}
      data-testid="tooltip-popover"
    >
      {children}
    </TooltipPopoverElement>
  )
}

export interface TooltipProps
  extends Omit<DynamicPopoverProps, 'popover' | 'animationFn' | 'anchorRef'> {
  /** A text or component containg the content of the popover. */
  content?: React.ReactNode
  /** The background color for the tooltip */
  background?: Colors
  /** The anchor element for the popover */
  children: React.ReactElement
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  background = 'background',
  placement = 'top',
  mobilePlacement = 'top',
  children,
  ...props
}) => {
  // Setup anchor element
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const child = React.Children.only(children)
  const AnchorElement = React.cloneElement(child, { ref: anchorRef })

  const popover = (
    <TooltipPopover
      background={`$${background}`}
      mobilePlacement={mobilePlacement}
      placement={placement}
    >
      {content}
    </TooltipPopover>
  )

  return (
    <>
      <DynamicPopover
        anchorRef={anchorRef}
        mobilePlacement={mobilePlacement}
        placement={placement}
        popover={popover}
        {...props}
      />
      {AnchorElement}
    </>
  )
}

Tooltip.displayName = 'Tooltip'
