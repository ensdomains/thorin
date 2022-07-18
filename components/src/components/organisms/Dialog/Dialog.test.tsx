import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Dialog } from './Dialog'
import { lightTheme } from '@/src/tokens'

describe('<Modal />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog open variant="blank">
          Modal
        </Dialog>
      </ThemeProvider>,
    )

    await waitFor(() => expect(screen.getByText('Modal')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should not be visible if not open', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog open={false} variant="blank">
          Modal
        </Dialog>
      </ThemeProvider>,
    )
    await waitFor(() => expect(screen.queryByText('Modal')).toBeNull(), {
      timeout: 300,
    })
  })

  it('should display close icon if callback is provided', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog open variant="closable" onDismiss={mockCallback}>
          Modal
        </Dialog>
      </ThemeProvider>,
    )
    await waitFor(
      () => expect(screen.getByTestId('close-icon')).toBeVisible(),
      {
        timeout: 300,
      },
    )
  })

  it('should call callback if close icon is clicked', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog open variant="closable" onDismiss={mockCallback}>
          Modal
        </Dialog>
      </ThemeProvider>,
    )

    userEvent.click(screen.getByTestId('close-icon'))
    await waitFor(() => expect(mockCallback).toHaveBeenCalled())
  })

  it('should show steps if available', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog currentStep={0} open stepCount={3} variant="actionable">
          Modal
        </Dialog>
      </ThemeProvider>,
    )
    await waitFor(
      () => expect(screen.getByTestId('step-container')).toBeVisible(),
      {
        timeout: 300,
      },
    )
  })
  it('should show correct step state', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog currentStep={1} open stepCount={3} variant="actionable">
          Modal
        </Dialog>
      </ThemeProvider>,
    )
    await waitFor(
      () => expect(screen.getByTestId('step-container')).toBeVisible(),
      {
        timeout: 300,
      },
    )
    expect(screen.getByTestId('step-item-0-completed')).toBeVisible()
    expect(screen.getByTestId('step-item-1-inProgress')).toBeVisible()
    expect(screen.getByTestId('step-item-2-notStarted')).toBeVisible()
  })
  it('should show a custom step state', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Dialog
          currentStep={1}
          open
          stepCount={3}
          stepStatus="completed"
          variant="actionable"
        >
          Modal
        </Dialog>
      </ThemeProvider>,
    )
    await waitFor(
      () => expect(screen.getByTestId('step-container')).toBeVisible(),
      {
        timeout: 300,
      },
    )
    expect(screen.getByTestId('step-item-0-completed')).toBeVisible()
    expect(screen.getByTestId('step-item-1-completed')).toBeVisible()
    expect(screen.getByTestId('step-item-2-notStarted')).toBeVisible()
  })
})
