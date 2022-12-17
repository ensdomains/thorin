import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { act } from 'react-dom/test-utils'

import { cleanup, render, screen, userEvent, waitFor, fireEvent } from '@/test'
import { Button } from '@/src/components/atoms/Button'
import { Tooltip } from './Tooltip'

import { lightTheme } from '@/src/tokens'

const TooltipHelper = () => {
  const buttonId = 'buttonId'
  return (
    <ThemeProvider theme={lightTheme}>
      <div style={{ width: '400px', height: '500px' }}>
        <div>outside</div>
        <Tooltip
          {...{
            content: <div data-testid="tooltipcontent">Tooltip content</div>,
            targetId: buttonId,
            placement: 'left',
            mobilePlacement: 'left',
            onShowCallback: () => null,
            width: 250,
            mobileWidth: 150,
            open: true,
          }}
        />
        <Button
          id={buttonId}
          psuedoDisabled
          shadowless
          shouldShowTooltipIndicator
        >
          Click me
        </Button>
      </div>
    </ThemeProvider>
  )
}

describe('<Tooltip />', () => {
  afterEach(cleanup)
  jest.setTimeout(10000)

  it('renders', () => {
    render(<TooltipHelper />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
    expect(screen.getByTestId('tooltipcontent')).toBeInTheDocument()
    expect(screen.getByText('outside')).toBeInTheDocument()
  })

  it('should show popover when clicked', async () => {
    render(<TooltipHelper />)
    act(() => {
      userEvent.click(screen.getByText('Click me'))
    })
    await waitFor(() => {
      expect(screen.getByTestId('tooltipcontent')).toBeVisible()
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
