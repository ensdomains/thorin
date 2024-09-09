import * as React from 'react'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Dialog } from './Dialog'

window.scroll = vi.fn()

describe('<Modal />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(
      <Dialog open variant="blank">
        Modal
      </Dialog>,
    )

    await waitFor(() => expect(screen.getByText('Modal')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should not be visible if not open', async () => {
    render(
      <Dialog open={false} variant="blank">
        Modal
      </Dialog>,
    )
    await waitFor(() => expect(screen.queryByText('Modal')).toBeNull(), {
      timeout: 300,
    })
  })

  it('should display close icon if callback is provided', async () => {
    const mockCallback = vi.fn()
    render(
      <Dialog open variant="closable" onDismiss={mockCallback}>
        Modal
      </Dialog>,
    )
    await waitFor(
      () => expect(screen.getByTestId('close-icon')).toBeVisible(),
      {
        timeout: 300,
      },
    )
  })

  it('should call callback if close icon is clicked', async () => {
    const mockCallback = vi.fn()
    render(
      <Dialog open variant="closable" onDismiss={mockCallback}>
        Modal
      </Dialog>,
    )

    await userEvent.click(screen.getByTestId('close-icon'))
    await waitFor(() => expect(mockCallback).toHaveBeenCalled())
  })

  it('should show steps if available', async () => {
    render(
      <Dialog currentStep={0} open stepCount={3} variant="actionable">
        Modal
      </Dialog>,
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
      <Dialog currentStep={1} open stepCount={3} variant="actionable">
        Modal
      </Dialog>,
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
      <Dialog
        currentStep={1}
        open
        stepCount={3}
        stepStatus="completed"
        variant="actionable"
      >
        Modal
      </Dialog>,
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
