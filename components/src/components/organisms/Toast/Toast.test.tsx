import * as React from 'react'

import { cleanup, render, screen, userEvent, waitFor } from '@/test'

import { Toast } from './Toast'

window.scroll = vi.fn()

describe('<Toast />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(<Toast open title="Test" variant="desktop" onClose={() => void 0} />)
    await waitFor(() => expect(screen.getByText('Test')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should not be visible if not open', async () => {
    render(
      <Toast
        open={false}
        title="Test"
        variant="desktop"
        onClose={() => void 0}
      />,
    )
    await waitFor(() => expect(screen.queryByText('Test')).toBeNull(), {
      timeout: 500,
    })
  })

  it('should display not close icon if type is touch', async () => {
    render(<Toast open title="Test" variant="desktop" onClose={() => void 0} />)
    await waitFor(
      () => expect(screen.getByTestId('toast-close-icon')).toBeVisible(),
      {
        timeout: 300,
      },
    )
  })

  it('should call callback if close icon is clicked', async () => {
    const mockCallback = vi.fn()
    render(<Toast open title="Test" variant="desktop" onClose={mockCallback} />)
    await waitFor(() => userEvent.click(screen.getByTestId('toast-close-icon')), {
      timeout: 300,
    })

    expect(mockCallback).toHaveBeenCalled()
  })
  it('should show children if desktop variant', async () => {
    render(
      <Toast open title="Test" variant="desktop" onClose={() => void 0}>
        <div data-testid="action" />
      </Toast>,
    )
    await waitFor(() => expect(screen.getByTestId('action')).toBeVisible(), {
      timeout: 300,
    })
  })
  it('should show children if touch variant and clicked', async () => {
    render(
      <Toast open title="Test" variant="touch" onClose={() => void 0}>
        <div data-testid="action" />
      </Toast>,
    )
    await waitFor(() => userEvent.click(screen.getByTestId('toast-touch')), {
      timeout: 500,
    })
    expect(screen.getByTestId('action')).toBeVisible()
  })
})
