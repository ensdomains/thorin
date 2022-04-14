import * as React from 'react'
import styled from 'styled-components'

import { tokens } from '@/src/tokens'

import {
  DynamicPopover,
  DynamicPopoverPopover,
  DynamicPopoverProps,
} from '../../atoms/DynamicPopover'

export interface TooltipProps extends Omit<DynamicPopoverProps, 'popover'> {
  content?: React.ReactNode
}

export const TooltipPopover = styled.div<DynamicPopoverPopover>`
  position: absolute;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.02);
  border-radius: ${tokens.space['3.5']};
  padding: ${tokens.space['2.5']} ${tokens.space['2.5']} ${tokens.space['2.5']}
    ${tokens.space['3.5']};
  width: 230px;
  transition: 0.35s all cubic-bezier(1, 0, 0.22, 1.6);
  z-index: 20;
  ${({ open }) =>
    open
      ? `
    opacity: 1;
    visibility: visible;
    `
      : `
    opacity: 0;
    visibility: hidden;
    `}

  ${({ side, open }) => {
    if (open) return `transform: translate(0,0);`
    if (side === 'top') return `transform: translate(0, 3em);`
    if (side === 'right') return `transform: translate(-3em, 0);`
    if (side === 'bottom') return `transform: translate(0, -3em);`
    return `transform: translate(3em, 0);`
  }}

  ${({ x, y }) => `
    left: ${x}px;
    top: ${y}px;
  `}

  ${({ theme }) => `
    border-color: ${tokens.colors[theme.mode].borderSecondary}
    background: ${tokens.colors[theme.mode].background};
  `}
`

export const Tooltip = ({ content, ...props }: TooltipProps) => {
  const popover = <TooltipPopover>{content}</TooltipPopover>
  return DynamicPopover({
    popover,
    ...props,
  })
}

Tooltip.displayName = 'Tooltip'