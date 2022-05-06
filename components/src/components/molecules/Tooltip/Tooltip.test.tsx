import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { act } from 'react-dom/test-utils'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'
import { Button } from '@/src/components/atoms/Button'
import { Tooltip } from './Tooltip'

const TooltipHelper = ({ ...props }: any) => {
  const content = <div data-testid="tooltipcontent">Content</div>
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <div>
        <div>outside</div>
        <Tooltip content={content} {...props}>
          <Button>Click me</Button>
        </Tooltip>
      </div>
    </ThemeProvider>
  )
}

describe('<Tooltip />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<TooltipHelper />)
    expect(screen.getByTestId('dynamicpopover')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
    expect(screen.getByTestId('tooltipcontent')).toBeInTheDocument()
  })

  it('should show popover when clicked', () => {
    render(<TooltipHelper />)
    act(() => {
      userEvent.click(screen.getByText('Click me'))
    })
    expect(screen.getByText('Click me')).toBeVisible()
  })

  it('should close if clicking outside of dropdown', async () => {
    render(<TooltipHelper />)
    act(() => {
      userEvent.click(screen.getByText('Click me'))
    })
    act(() => {
      userEvent.click(screen.getByText('outside'))
    })
    await waitFor(() => {
      expect(screen.getByTestId('tooltipcontent')).not.toBeVisible()
    })
  })

  it('should close dropdown if button is clicked when open', () => {
    render(<TooltipHelper />)
    act(() => {
      userEvent.click(screen.getByText('Click me'))
    })
    act(() => {
      userEvent.click(screen.getByText('Click me'))
    })
    expect(screen.getByTestId('tooltipcontent')).not.toBeVisible()
  })
})
