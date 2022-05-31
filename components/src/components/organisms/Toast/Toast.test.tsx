import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Toast } from './Toast'
import { lightTheme } from '@/src/tokens'

describe('<Modal />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast open title="Test" variant="desktop" onClose={() => void 0} />
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByText('Modal')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should not be visible if not open', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast
          open={false}
          title="Test"
          variant="desktop"
          onClose={() => void 0}
        />
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByText('Modal')).toBeNull(), {
      timeout: 300,
    })
  })

  it('should display not close icon if type is touch', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast open title="Test" variant="desktop" onClose={() => void 0} />
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByTestId('close-icon')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should call callback if close icon is clicked', () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast open title="Test" variant="desktop" onClose={mockCallback} />
      </ThemeProvider>,
    )
    waitFor(() => userEvent.click(screen.getByTestId('close-icon')), {
      timeout: 300,
    }).then(() => expect(mockCallback).toHaveBeenCalled())
  })
  it('should show children if desktop variant', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast open title="Test" variant="touch" onClose={() => void 0}>
          <div data-testid="action" />
        </Toast>
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByTestId('action')).toBeVisible(), {
      timeout: 300,
    })
  })
  it('should show children if touch variant and clicked', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast open title="Test" variant="touch" onClose={() => void 0}>
          <div data-testid="action" />
        </Toast>
      </ThemeProvider>,
    )
    waitFor(() => userEvent.click(screen.getByTestId('toast-touch')), {
      timeout: 300,
    }).then(() => expect(screen.getByTestId('action')).toBeVisible())
  })
})
