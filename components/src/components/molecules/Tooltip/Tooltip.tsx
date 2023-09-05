import * as React from 'react'
import styled, { css } from 'styled-components'

import {
  DynamicPopover,
  DynamicPopoverProps,
  DynamicPopoverSide,
  PopoverProps,
} from '@/src/components/atoms/DynamicPopover'
import { mq } from '@/src/utils/responsiveHelpers'
import { Colors } from '@/src/tokens'

const injectedCss = (color: string) => ({
  top: `
    &:after {
      display: initial;
      content: '';
      position: absolute;
      bottom: -18px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-top-color: ${color};
    }
  `,
  bottom: `
    &:after {
      display: initial;
      content: '';
      position: absolute;
      top: -18px;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-bottom-color: ${color};
    }
  `,
  left: `
    display: flex;
    align-items: center;
    &:before {
      display: initial;
      content: '';
      position: absolute;
      right: -18px;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-left-color: ${color};
    }
  `,
  right: `
    display: flex;
    align-items: center;
    &:before {
      display: initial;
      content: '';
      position: absolute;
      left: -18px;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-right-color: ${color};
    }
  `,
})

const TooltipPopoverElement = styled.div<{
  $background: Colors
  $placement: DynamicPopoverSide
  $mobilePlacement: DynamicPopoverSide
}>(
  ({ theme, $background, $placement, $mobilePlacement }) => css`
    position: relative;
    pointer-events: none;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 1px #e8e8e8)
      drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
    border-radius: ${theme.radii.large};
    padding: ${theme.space['2.5']};
    padding-left: ${theme.space['3.5']};
    background: ${theme.colors[$background] || theme.colors.background};

    ${injectedCss(theme.colors[$background] || theme.colors.background)[
      $mobilePlacement
    ]}
    ${mq.sm.min(css`
      &:before {
        display: none;
      }
      &:after {
        display: none;
      }
      ${injectedCss(theme.colors[$background] || theme.colors.background)[
        $placement
      ]}
    `)}
  `,
)

type TooltipPopoverProps = PopoverProps & { background: Colors }

const TooltipPopover = ({
  placement,
  mobilePlacement,
  background,
  children,
}: TooltipPopoverProps) => {
  return (
    <TooltipPopoverElement
      $background={background}
      $mobilePlacement={mobilePlacement}
      $placement={placement}
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

export const Tooltip = ({
  content,
  background = 'background',
  placement = 'top',
  mobilePlacement = 'top',
  children,
  ...props
}: TooltipProps) => {
  // Setup anchor element
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const child = React.Children.only(children)
  const AnchorElement = React.cloneElement(child, { ref: anchorRef })

  const popover = (
    <TooltipPopover
      background={background}
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
