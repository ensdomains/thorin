import * as React from 'react'

import { act, cleanup, render, screen, userEvent, waitFor } from '@/test'
import { vi } from 'vitest'

import { Toast } from './Toast'

window.scroll = vi.fn()

describe('<Toast />', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.useRealTimers()
    cleanup()
  })

  it('renders', async () => {
    render(<Toast open title="Test" variant="desktop" onClose={() => void 0} />)
    expect(screen.getByText('Test')).not.toBeVisible()
    await act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByText('Test')).toBeVisible()
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
    expect(screen.queryByText('Test')).toBeNull()
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.queryByText('Test')).toBeNull()
  })

  it('should display close icon if type is touch', async () => {
    render(<Toast open title="Test" variant="desktop" onClose={() => void 0} />)
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByTestId('toast-close-icon')).toBeVisible()
  })

  it('should call callback if close icon is clicked', async () => {
    const mockCallback = vi.fn()
    render(<Toast open title="Test" variant="desktop" onClose={mockCallback} />)
    await act(() => vi.advanceTimersByTime(1000))
    await userEvent.click(screen.getByTestId('toast-close-icon'))
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
