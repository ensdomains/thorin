import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'
// import { DynamicPopoverSide } from '../../atoms/DynamicPopover/DynamicPopover'

import {
  DynamicPopover,
  DynamicPopoverProps,
} from '@/src/components/atoms/DynamicPopover'

export interface TooltipProps
  extends Omit<DynamicPopoverProps, 'popover' | 'animationFn'> {
  /** A text or component containg the content of the popover. */
  content?: React.ReactNode
}

export const Tooltip = ({ content, ...props }: TooltipProps) => {
  const popover = <TooltipPopover>{content}</TooltipPopover>
  return DynamicPopover({
    popover,
    ...props,
  })
}

const TooltipPopover = styled.div`
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.02);
  border-radius: ${tokens.space['3.5']};
  padding: ${tokens.space['2.5']} ${tokens.space['2.5']} ${tokens.space['2.5']}
    ${tokens.space['3.5']};
  width: 230px;

  ${({ theme }) => `
    border-color: ${tokens.colors[theme.mode].borderSecondary};
    background: ${tokens.colors[theme.mode].background};
  `}
`

Tooltip.displayName = 'Tooltip'
