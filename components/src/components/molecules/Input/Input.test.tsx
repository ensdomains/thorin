import * as React from 'react'

import { ThemeProvider } from 'styled-components'

import { cleanup, render, screen, userEvent } from '@/test'

import { Input } from './Input'

describe('<Input />', () => {
  afterEach(cleanup)

  it('renders', () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <Input label="Funding Goal" />
      </ThemeProvider>,
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('receives user input', () => {
    render(
      <ThemeProvider theme={{ mode: 'light' }}>
        <Input label="Display Name" />
      </ThemeProvider>,
    )

    userEvent.type(screen.getByRole('textbox'), 'Satoshi Nakamoto')
    expect(screen.getByRole('textbox')).toHaveValue('Satoshi Nakamoto')
  })

  describe('[type=text]', () => {
    it('maxLength', () => {
      render(
        <ThemeProvider theme={{ mode: 'light' }}>
          <Input label="Short Name" maxLength={7} />
        </ThemeProvider>,
      )

      const element = screen.getByLabelText(/short/i)
      userEvent.type(element, 'Satoshi Nakamoto')
      expect(element).toHaveValue('Satoshi')
    })
  })

  describe('[type=number]', () => {
    it('filters invalid characters', () => {
      render(
        <ThemeProvider theme={{ mode: 'light' }}>
          <Input label="Funding Goal" type="number" />
        </ThemeProvider>,
      )

      const element = screen.getByLabelText(/funding/i)
      userEvent.type(element, 'Ee+')
      expect(element).toHaveValue(null)
    })

    it('max', () => {
      render(
        <ThemeProvider theme={{ mode: 'light' }}>
          <Input label="Funding Goal" max={20} type="number" />
        </ThemeProvider>,
      )

      const element = screen.getByLabelText(/funding/i)
      expect(element).toHaveValue(null)
    })

    it('units', () => {
      render(
        <ThemeProvider theme={{ mode: 'light' }}>
          <Input
            label="Funding Goal"
            placeholder="10"
            type="number"
            units="ETH"
          />
        </ThemeProvider>,
      )

      const element = screen.getByLabelText(/funding/i) as HTMLInputElement
      expect(element.placeholder).toEqual('10 ETH')
      userEvent.type(element, '20')
      expect(element).toHaveValue(20)
      expect(screen.getByTestId('ghost')).toBeInTheDocument()
    })
  })
})
