import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { act, cleanup, render, screen } from '@/test'

import { CountdownCircle } from './CountdownCircle'
import { lightTheme } from '@/src/tokens'

const advanceTime = (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms)
  })
}

describe('<CountdownCircle />', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <CountdownCircle countdownSeconds={10} />
      </ThemeProvider>,
    )
    advanceTime(10000)
    expect(screen.getByTestId('countdown-circle')).toBeInTheDocument()
  })

  it('should countdown starting from supplied value', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <CountdownCircle countdownSeconds={10} />
      </ThemeProvider>,
    )
    advanceTime(1000)
    expect(screen.queryByText('9')).toBeInTheDocument()
  })

  it('should not countdown if disabled', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <CountdownCircle countdownSeconds={10} disabled />
      </ThemeProvider>,
    )
    advanceTime(1000)
    expect(screen.queryByText('10')).toBeInTheDocument()
  })

  it('should call callback on 0', () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={lightTheme}>
        <CountdownCircle callback={mockCallback} countdownSeconds={1} />
      </ThemeProvider>,
    )
    advanceTime(1000)
    expect(mockCallback).toHaveBeenCalled()
  })
  it('should use startTimestamp if provided', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <CountdownCircle
          countdownSeconds={10}
          startTimestamp={Date.now() - 5000}
        />
      </ThemeProvider>,
    )
    advanceTime(5000)
    expect(screen.queryByText('0')).toBeInTheDocument()
  })
})
