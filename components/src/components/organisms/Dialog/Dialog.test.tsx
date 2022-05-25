import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Dialog } from './Dialog'
import { lightTheme } from '@/src/tokens'

describe('<Modal />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog open variant="blank">
          Modal
        </Dialog>
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByText('Modal')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should not be visible if not open', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog open={false} variant="blank">
          Modal
        </Dialog>
      </ThemeProvider>,
    )
    waitFor(() => expect(screen.getByText('Modal')).toBeNull(), {
      timeout: 300,
    })
  })

  it('should display close icon if callback is provided', () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog open variant="closable" onDismiss={mockCallback}>
          Modal
        </Dialog>
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
        <Dialog open variant="closable" onDismiss={mockCallback}>
          Modal
        </Dialog>
      </ThemeProvider>,
    )
    waitFor(() => userEvent.click(screen.getByTestId('close-icon')), {
      timeout: 300,
    }).then(() => expect(mockCallback).toHaveBeenCalled())
  })
})
