import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { Button } from './Button'

describe('<Button />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(<Button>Connect Wallet</Button>)
    expect(screen.getByText(/connect/i)).toBeInTheDocument()
  })

  it('should render prefix if specified', () => {
    render(<Button prefix={() => <span>👋</span>}>Connect Wallet</Button>)
    expect(screen.getByText(/👋/i)).toBeInTheDocument()
  })
  it('should render suffix if specified', () => {
    render(<Button suffix={() => <span>👋</span>}>Connect Wallet</Button>)
    expect(screen.getByText(/👋/i)).toBeInTheDocument()
  })
  it('should show a spinner if loading', () => {
    render(<Button loading>Connect Wallet</Button>)
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})
