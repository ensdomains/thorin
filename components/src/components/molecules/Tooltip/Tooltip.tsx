import * as React from 'react'
import styled from 'styled-components'

import {
  DynamicPopover,
  DynamicPopoverProps,
} from '@/src/components/atoms/DynamicPopover'

const TooltipPopover = styled.div`
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.02);
  width: 230px;

  ${({ theme }) => `
    border-radius: ${theme.space['3.5']};
    padding: ${theme.space['2.5']} ${theme.space['2.5']} ${theme.space['2.5']}
    ${theme.space['3.5']};
    border-color: ${theme.colors.borderSecondary};
    background: ${theme.colors.background};
  `}
`

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

Tooltip.displayName = 'Tooltip'
