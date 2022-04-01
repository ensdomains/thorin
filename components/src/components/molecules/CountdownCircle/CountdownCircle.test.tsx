import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, waitFor } from '@/test'

import { CountdownCircle } from './CountdownCircle'

describe('<CountdownCircle />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <CountdownCircle countdownAmount={10} />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('countdown-circle')).toBeInTheDocument()
  })

  it('should countdown starting from supplied value', async () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <CountdownCircle countdownAmount={10} />
      </ThemeProvider>,
    )
    await waitFor(() => {
      expect(screen.queryByText('9')).toBeInTheDocument()
    })
  })

  it('should not countdown if disabled', async () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <CountdownCircle countdownAmount={10} disabled />
      </ThemeProvider>,
    )
    await new Promise((r) => setTimeout(r, 2000))
    expect(screen.queryByText('10')).toBeInTheDocument()
  })

  it('should call callback on 0', async () => {
    const mockCallback = jest.fn()
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <CountdownCircle callback={mockCallback} countdownAmount={1} />
      </ThemeProvider>,
    )
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })
})
