import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { act } from 'react-dom/test-utils'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'
import { Button } from '@/src/components/atoms/Button'

import { lightTheme } from '@/src/tokens'

import { Tooltip } from './Tooltip'

const TooltipHelper = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const content = <div data-testid="tooltipcontent">Content</div>
  return (
    <ThemeProvider theme={lightTheme}>
      <div style={{ width: '500px', height: '500px' }}>
        <div>outside</div>
        <Tooltip
          content={content}
          open={isOpen}
          placement="right-start"
          onDismiss={() => setIsOpen(false)}
        >
          <Button
            onClick={() => {
              setIsOpen((o) => !o)
            }}
          >
            Click me
          </Button>
        </Tooltip>
      </div>
    </ThemeProvider>
  )
}

describe('<Tooltip />', () => {
  afterEach(cleanup)
  jest.setTimeout(10000)

  it('renders', () => {
    render(<TooltipHelper />)
    expect(screen.getByTestId('dynamicpopover')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
    expect(screen.getByTestId('tooltipcontent')).toBeInTheDocument()
    expect(screen.getByText('outside')).toBeInTheDocument()
    expect(screen.getByTestId('dynamicpopover-popover')).toBeInTheDocument()
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

  it('should close if clicking outside of dropdown', async () => {
    render(<TooltipHelper />)
    act(() => {
      userEvent.click(screen.getByText('Click me'))
    })
    await waitFor(() => {
      expect(screen.getByTestId('tooltipcontent')).toBeVisible()
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
