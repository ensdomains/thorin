import * as React from 'react'

import { cleanup, render, screen, waitFor, act } from '@/test'
import { vi } from 'vitest'

import { Modal } from './Modal'

window.scroll = vi.fn()

describe('<Modal />', () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }))
  afterEach(() => {
    vi.useRealTimers()
    cleanup()
  })

  it('renders', async () => {
    render(<Modal open>Modal</Modal>)
    await act(() => vi.advanceTimersByTime(1000))
    await waitFor(() => expect(screen.getByText('Modal')).toBeVisible(), {
      timeout: 300,
    })
  })

  it('should not be visible if not open', async () => {
    render(<Modal open={false}>Modal</Modal>)
    await waitFor(() => expect(screen.queryByText('Modal')).toBeNull(), {
      timeout: 300,
    })
  })
})
