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

  it('should not be visible if not open', () => {
    render(
      <Toast
        open={false}
        title="Test"
        variant="desktop"
        onClose={() => void 0}
      />,
    )
    waitFor(() => expect(screen.getByText('Test')).toBeNull(), {
      timeout: 300,
    })
  })

  it('should display not close icon if type is touch', () => {
    render(<Toast open title="Test" variant="desktop" onClose={() => void 0} />)
    waitFor(
      () => expect(screen.getByTestId('toast-close-icon')).toBeVisible(),
      {
        timeout: 300,
      },
    )
  })

  it('should call callback if close icon is clicked', () => {
    const mockCallback = vi.fn()
    render(<Toast open title="Test" variant="desktop" onClose={mockCallback} />)
    waitFor(() => userEvent.click(screen.getByTestId('toast-close-icon')), {
      timeout: 300,
    }).then(() => expect(mockCallback).toHaveBeenCalled())
  })
  it('should show children if desktop variant', () => {
    render(
      <Toast open title="Test" variant="touch" onClose={() => void 0}>
        <div data-testid="action" />
      </Toast>,
    )
    waitFor(() => expect(screen.getByTestId('action')).toBeVisible(), {
      timeout: 300,
    })
  })
  it('should show children if touch variant and clicked', () => {
    render(
      <Toast open title="Test" variant="touch" onClose={() => void 0}>
        <div data-testid="action" />
      </Toast>,
    )
    waitFor(() => userEvent.click(screen.getByTestId('toast-touch')), {
      timeout: 300,
    }).then(() => expect(screen.getByTestId('action')).toBeVisible())
  })
})
