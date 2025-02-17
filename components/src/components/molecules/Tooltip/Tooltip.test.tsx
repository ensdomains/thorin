import * as React from 'react'

import { render, screen, userEvent } from '@/test'
import { Tooltip } from './Tooltip'
import { describe, it, expect } from 'vitest'
import { Button } from '../../atoms'

describe('Tooltip', () => {
  it('should render', () => {
    render(<Tooltip content={<div>Tooltip</div>}><Button data-testid="hover-button">Hover</Button></Tooltip>)
    expect(screen.getByTestId('hover-button')).toBeVisible()
  })

  it('should only render the tooltip when hovering over the button', async () => {
    render(<Tooltip content={<div>Tooltip</div>}><Button data-testid="hover-button">Hover</Button></Tooltip>)
    expect(screen.getByTestId('hover-button')).toBeVisible()
    expect(screen.getByText('Tooltip')).not.toBeVisible()

    await userEvent.hover(screen.getByTestId('hover-button'))
    expect(screen.getByText('Tooltip')).toBeVisible()
  })

  it('should not render the tooltip when tooltip content is undefined', async () => {
    render(<Tooltip><Button data-testid="hover-button">Hover</Button></Tooltip>)
    expect(screen.getByTestId('hover-button')).toBeVisible()
    expect(screen.queryByTestId('tooltip-popover')).toBeNull()

    await userEvent.hover(screen.getByTestId('hover-button'))
    expect(screen.queryByTestId('popoverContainer')).toBeNull()
  })
})
