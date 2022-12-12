import * as React from 'react'
import styled, { css } from 'styled-components'

import {
  DynamicPopover,
  DynamicPopoverProps,
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

const TooltipPopover = styled.div(
  ({ theme, $placement, $mobilePlacement }) => css`
    box-sizing: border-box;
    position: relative;
    pointer-events: none;

    filter: drop-shadow(0px 0px 1px #e8e8e8)
      drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));

    border-radius: ${theme.radii.large};
    padding: ${theme.space['2.5']} ${theme.space['2.5']} ${theme.space['2.5']}
      ${theme.space['2.5']};
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

export interface TooltipProps
  extends Omit<DynamicPopoverProps, 'popover' | 'animationFn'> {
  /** A text or component containg the content of the popover. */
  content?: React.ReactNode
}

export const Tooltip = ({
  content,
  placement,
  mobilePlacement,
  ...props
}: TooltipProps) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null)
  const popover = (
    <TooltipPopover
      $mobilePlacement={mobilePlacement}
      $placement={placement}
      ref={tooltipRef}
    >
      {content}
    </TooltipPopover>
  )
  return DynamicPopover({
    popover,
    tooltipRef,
    placement,
    mobilePlacement,
    ...props,
  })
}

Tooltip.displayName = 'Tooltip'
