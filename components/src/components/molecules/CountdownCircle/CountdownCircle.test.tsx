import * as React from 'react'

import { cleanup, render, screen, waitFor } from '@/test'

import { CountdownCircle } from './CountdownCircle'

describe('<CountdownCircle />', () => {
  afterEach(cleanup)

  it('renders', async () => {
    render(<CountdownCircle countdownAmount={10} />)
    expect(screen.getByTestId('countdown-circle')).toBeInTheDocument()
  })

  it('should countdown starting from supplied value', async () => {
    render(<CountdownCircle countdownAmount={10} />)
    await waitFor(() => {
      expect(screen.queryByText('9')).toBeInTheDocument()
    })
  })

  it('should not countdown if disabled', async () => {
    render(<CountdownCircle countdownAmount={10} disabled />)
    await new Promise((r) => setTimeout(r, 2000))
    expect(screen.queryByText('10')).toBeInTheDocument()
  })

  it('should call callback on 0', async () => {
    const mockCallback = jest.fn()
    render(<CountdownCircle callback={mockCallback} countdownAmount={1} />)
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled()
    })
  })
})
