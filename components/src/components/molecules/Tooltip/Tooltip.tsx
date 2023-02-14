import * as React from 'react'
import styled, { css } from 'styled-components'

import {
  DynamicPopover,
  DynamicPopoverProps,
  DynamicPopoverSide,
  PopoverProps,
} from '@/src/components/atoms/DynamicPopover'
import { mq } from '@/src/utils/responsiveHelpers'

const injectedCss = {
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
      border-top-color: white;
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
      border-bottom-color: white;
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
      border-left-color: white;
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
      border-right-color: white;
    }
  `,
}

const TooltipPopoverElement = styled.div<{
  $placement: DynamicPopoverSide
  $mobilePlacement: DynamicPopoverSide
}>(
  ({ theme, $placement, $mobilePlacement }) => css`
    position: relative;
    pointer-events: none;
    box-sizing: border-box;
    filter: drop-shadow(0px 0px 1px #e8e8e8)
      drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
    border-radius: ${theme.radii.large};
    padding: ${theme.space['2.5']} ${theme.space['2.5']} ${theme.space['2.5']}
      ${theme.space['3.5']};
    /* border-color: ${theme.colors.border}; */
    background: ${theme.colors.background};

    ${injectedCss[$mobilePlacement]}
    ${mq.md.min(css`
      &:before {
        display: none;
      }
      &:after {
        display: none;
      }
      ${injectedCss[$placement]}
    `)}
  `,
)

const TooltipPopover = ({
  placement,
  mobilePlacement,
  children,
}: PopoverProps) => {
  return (
    <TooltipPopoverElement
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
  /** The anchor element for the popover */
  children: React.ReactElement
}

export const Tooltip = ({
  content,
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
    <TooltipPopover mobilePlacement={mobilePlacement} placement={placement}>
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
