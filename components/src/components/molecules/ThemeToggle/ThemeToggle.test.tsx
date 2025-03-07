import * as React from 'react'

import { cleanup, render, screen } from '@/test'

import { ThemeToggle } from './ThemeToggle'
import { ThemeProvider } from '../../atoms'

describe('<ThemeToggle />', () => {
  afterEach(cleanup)

  it('should render default labels', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    )

    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText('System')).toBeInTheDocument()
  })
  it('should render custom labels', () => {
    render(
      <ThemeProvider>
        <ThemeToggle
          labels={{
            light: 'Light Mode',
            dark: 'Dark Mode',
            system: 'System Mode',
          }}
        />
      </ThemeProvider>,
    )

    expect(screen.getByText('Light Mode')).toBeInTheDocument()
    expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    expect(screen.getByText('System Mode')).toBeInTheDocument()
  })
})
