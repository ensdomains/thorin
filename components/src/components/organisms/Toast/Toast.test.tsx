import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from 'test-utils'

import { lightTheme } from '@/src/tokens'

import { Toast } from './Toast'

window.scroll = jest.fn()

describe('<Toast />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast open title="Test" variant="desktop" onClose={() => void 0} />
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByText('Test')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should not be visible if not open', async () => {
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
    await waitFor(() => expect(screen.queryByText('Test')).toBeNull(), {
      timeout: 300,
    })
  })

  it('should display not close icon if type is touch', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast open title="Test" variant="desktop" onClose={() => void 0} />
      </ThemeProvider>,
    )
    waitFor(
      () => expect(screen.getByTestId('toast-close-icon')).toBeVisible(),
      {
        timeout: 300,
      },
    )
  })

  it('should call callback if close icon is clicked', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast open title="Test" variant="desktop" onClose={mockCallback} />
      </ThemeProvider>,
    )
    await waitFor(() =>
      expect(screen.getByTestId('toast-close-icon')).toBeVisible(),
    )
    await await userEvent.click(screen.getByTestId('toast-close-icon'))
    expect(mockCallback).toHaveBeenCalled()
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
  it('should show children if touch variant and clicked', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Toast open title="Test" variant="touch" onClose={() => void 0}>
          <div data-testid="action" />
        </Toast>
      </ThemeProvider>,
    )
    await waitFor(() => expect(screen.getByTestId('toast-touch')).toBeVisible())
    await await userEvent.click(screen.getByTestId('toast-touch'))
    await waitFor(() => expect(screen.getByTestId('action')).toBeVisible())
  })
})
