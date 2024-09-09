import * as React from 'react'

import { act, cleanup, render, screen } from '@/test'

import { CountdownCircle } from './CountdownCircle'

const advanceTime = (ms: number) => {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

describe('<CountdownCircle />', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })
  afterAll(() => {
    vi.useRealTimers()
  })
  afterEach(cleanup)

  it('renders', () => {
    render(<CountdownCircle countdownSeconds={10} />)
    advanceTime(10000)
    expect(screen.getByTestId('countdown-circle')).toBeInTheDocument()
  })

  it('should countdown starting from supplied value', () => {
    render(<CountdownCircle countdownSeconds={10} />)
    advanceTime(1000)
    expect(screen.queryByText('9')).toBeInTheDocument()
  })

  it('should not countdown if disabled', () => {
    render(<CountdownCircle countdownSeconds={10} disabled />)
    advanceTime(1000)
    expect(screen.queryByText('10')).toBeInTheDocument()
  })

  it('should call callback on 0', () => {
    const mockCallback = vi.fn()
    render(<CountdownCircle callback={mockCallback} countdownSeconds={1} />)
    advanceTime(1000)
    expect(mockCallback).toHaveBeenCalled()
  })
  it('should use startTimestamp if provided', () => {
    render(
      <CountdownCircle
        countdownSeconds={10}
        startTimestamp={Date.now() - 5000}
      />,
    )
    advanceTime(5000)
    expect(screen.queryByTestId('countdown-complete-check')).toBeInTheDocument()
  })
})
